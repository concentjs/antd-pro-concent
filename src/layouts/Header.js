import React from 'react';
import { formatMessage } from 'umi/locale';
import { Layout, message } from 'antd';
import Animate from 'rc-animate';
// import { connect } from 'dva';
import router from 'umi/router';
import { registerDumb } from 'concent';
import GlobalHeader from '@/components/GlobalHeader';
import TopNavHeader from '@/components/TopNavHeader';
import styles from './Header.less';

const { Header } = Layout;

const state = { visible: true };

const setup = ctx => {
  if (!ctx.props.autoHideHeader && !ctx.state.visible) {
    ctx.state.visible = true;
  }

  ctx.defineEffect(() => {
    document.addEventListener('scroll', ctx.settings.handScroll, { passive: true });
    return () => document.removeEventListener('scroll', ctx.settings.handScroll);
  }, []);

  const handScroll = () => {
    const { autoHideHeader } = ctx.props;
    const { visible } = ctx.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    if (!ctx.settings.ticking) {
      ctx.settings.ticking = true;
      requestAnimationFrame(() => {
        if (ctx.settings.oldScrollTop > scrollTop) {
          ctx.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          ctx.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          ctx.setState({
            visible: true,
          });
        }
        ctx.settings.oldScrollTop = scrollTop;
        ctx.settings.ticking = false;
      });
    }
  };

  const getHeadWidth = () => {
    const { isMobile, collapsed } = ctx.props;
    const { fixedHeader, layout } = ctx.connectedState.setting;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)';
  };

  const handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`,
      })}`
    );
    ctx.dispatch('clearNotices', type);
  };

  const handleMenuClick = ({ key }) => {
    if (key === 'userCenter') {
      router.push('/account/center');
      return;
    }
    if (key === 'triggerError') {
      router.push('/exception/trigger');
      return;
    }
    if (key === 'userinfo') {
      router.push('/account/settings/base');
      return;
    }
    if (key === 'logout') {
      ctx.dispatch('login/logout');
    }
  };

  const handleNoticeVisibleChange = visible => {
    if (visible) {
      ctx.dispatch('fetchNotices');
    }
  };

  return {
    handScroll,
    getHeadWidth,
    handleNoticeClear,
    handleMenuClick,
    handleNoticeVisibleChange,
  };
};

const HeaderView = props => {
  const {
    isMobile,
    handleMenuCollapse,
    setting,
    visible,
    getHeadWidth,
    handleNoticeClear,
    handleMenuClick,
    handleNoticeVisibleChange,
  } = props;

  const { navTheme, layout, fixedHeader } = setting;
  const isTop = layout === 'topmenu';
  const width = getHeadWidth();
  const HeaderDom = visible ? (
    <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
      {isTop && !isMobile ? (
        <TopNavHeader
          theme={navTheme}
          mode="horizontal"
          onCollapse={handleMenuCollapse}
          onNoticeClear={handleNoticeClear}
          onMenuClick={handleMenuClick}
          onNoticeVisibleChange={handleNoticeVisibleChange}
          {...props}
        />
      ) : (
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          onNoticeClear={handleNoticeClear}
          onMenuClick={handleMenuClick}
          onNoticeVisibleChange={handleNoticeVisibleChange}
          {...props}
        />
      )}
    </Header>
  ) : null;
  return (
    <Animate component="" transitionName="fade">
      {HeaderDom}
    </Animate>
  );
};

const mapProps = ctx => {
  const { setting, user, loading } = ctx.connectedState;
  const { currentUser } = user;
  const fetchingMoreNotices = loading['$$global/fetchMoreNotices'];
  const fetchingNotices = loading['$$global/fetchNotices'];

  const { collapsed, loadedAllNotices, notices } = ctx.moduleState;
  const { visible } = ctx.state;

  return {
    visible,
    currentUser,
    fetchingMoreNotices,
    fetchingNotices,
    setting,
    collapsed,
    loadedAllNotices,
    notices,
    dispatch: ctx.dispatch,
    ...ctx.settings,
    ...ctx.props,
    ...ctx.reducer.$$global,
  };
};

export default registerDumb({
  state,
  setup,
  mapProps,
  module: '$$global',
  connect: {
    user: ['currentUser'],
    setting: '*',
    loading: ['$$global/fetchMoreNotices', '$$global/fetchNotices'],
  },
})(HeaderView);
