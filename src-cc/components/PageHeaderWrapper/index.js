import React from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
// import { connect } from 'dva';
import { registerDumb } from 'concent';
import GridContent from './GridContent';
import MenuContext from '@/layouts/MenuContext';
import PageHeader from '@/components/PageHeader';
import styles from './index.less';

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home={<FormattedMessage id="menu.home" defaultMessage="Home" />}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => {
            if (item.locale) {
              return <FormattedMessage id={item.locale} defaultMessage={item.title} />;
            }
            return item.title;
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default registerDumb({
  connect: { setting: ['contentWidth'] },
  mapProps: ctx => {
    console.log(' ------>>>>>> ', ctx.props);
    return { contentWidth: ctx.connectedState.setting.contentWidth, ...ctx.props };
  },
})(PageHeaderWrapper);

// export default connect(({ setting }) => ({
//   contentWidth: setting.contentWidth,
// }))(PageHeaderWrapper);
