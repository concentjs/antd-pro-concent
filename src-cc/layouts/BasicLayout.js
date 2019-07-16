import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
// import { connect } from 'dva';
import { connectDumb } from 'concent';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import { title } from '../defaultSettings';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

const setup = ctx => {
  const getPageTitle = memoizeOne((pathname, breadcrumbNameMap) => {
    const currRouterData = matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
      return title;
    }
    const pageName = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });
    return `${pageName} - ${title}`;
  });

  const matchParamsPath = memoizeOne((pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  }, isEqual);

  ctx.defineEffect(() => {
    const { route: { routes, authority } } = ctx.props;
    ctx.dispatch('user/fetchCurrent');
    ctx.dispatch('setting/getSetting');
    ctx.dispatch('menu/getMenuData', { routes, authority });
  }, []);

  /** 模拟componentDidUpdate */
  ctx.defineEffect(() => {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = ctx.props;
    if (isMobile && !ctx.prevProps.isMobile && !collapsed) {
      ctx.settings.handleMenuCollapse(false);
    }
  }, null, 'hmcEffect', false);

  const getContext = () => {
    const { location } = ctx.props;
    return {
      location,
      breadcrumbNameMap: ctx.connectedState.menu.breadcrumbNameMap,
    };
  }

  const getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.forEach(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  const getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = ctx.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  const handleMenuCollapse = collapsed => {
    ctx.dispatch('$$global/changeLayoutCollapsed', collapsed);
  };

  const renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  return {
    getContext, matchParamsPath, getRouterAuthority, getPageTitle,
    getLayoutStyle, handleMenuCollapse, renderSettingDrawer
  };
};

const mapProps = ctx => {
  const { $$global, setting, menu } = ctx.connectedState;
  return {
    collapsed: $$global.collapsed,
    layout: setting.layout,
    menuData: menu.menuData,
    breadcrumbNameMap: menu.breadcrumbNameMap,
    ...setting, ...ctx.props, ...ctx.settings
  };
}

const BasicLayout = props => {
  const {
    navTheme,
    layout: PropsLayout,
    children,
    location: { pathname },
    isMobile,
    menuData,
    breadcrumbNameMap,
    route: { routes },
    fixedHeader,
  } = props;

  const isTop = PropsLayout === 'topmenu';
  const routerConfig = props.getRouterAuthority(pathname, routes);
  console.log('------>>>routerConfig ', routerConfig);
  const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
  const layout = (
    <Layout>
      {isTop && !isMobile ? null : (
        <SiderMenu
          logo={logo}
          theme={navTheme}
          onCollapse={props.handleMenuCollapse}
          menuData={menuData}
          isMobile={isMobile}
          {...props}
        />
      )}
      <Layout
        style={{
          ...props.getLayoutStyle(),
          minHeight: '100vh',
        }}
      >
        <Header
          menuData={menuData}
          handleMenuCollapse={props.handleMenuCollapse}
          logo={logo}
          isMobile={isMobile}
          {...props}
        />
        <Content className={styles.content} style={contentStyle}>
          <Authorized authority={routerConfig} noMatch={<Exception403 />}>
            {children}
          </Authorized>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
  return (
    <React.Fragment>
      <DocumentTitle title={props.getPageTitle(pathname, breadcrumbNameMap)}>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={props.getContext()}>
              <div className={classNames(params)}>{layout}</div>
            </Context.Provider>
          )}
        </ContainerQuery>
      </DocumentTitle>
      <Suspense fallback={<PageLoading />}>{props.renderSettingDrawer()}</Suspense>
    </React.Fragment>
  );
}

export default connectDumb({
  setup,
  mapProps,
  connect: { $$global: ['collapsed'], user: '*', setting: '*', menu: ['menuData', 'breadcrumbNameMap'] }
})(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
))
