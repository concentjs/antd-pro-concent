import React from 'react';
import { FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import PageHeader from '@/components/PageHeader';
import { connect } from 'dva';
import { connectDumb } from 'concent';
import GridContent from './GridContent';
import styles from './index.less';
import MenuContext from '@/layouts/MenuContext';

const PageHeaderWrapper = ({ children, contentWidth, wrapperClassName, top, ...restProps }) => {
  return (
    <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
      {top}
      <MenuContext.Consumer>
        {value => {
          return (
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
          );
        }}
      </MenuContext.Consumer>
      {children ? (
        <div className={styles.content}>
          <GridContent>{children}</GridContent>
        </div>
      ) : null}
    </div>
  );

};
export default connectDumb({
  connect: { setting: ['contentWidth'] },
  mapProps: ctx => {
    console.log(' ------>>>>>> ', ctx.props);
    return { contentWidth: ctx.connectedState.setting.contentWidth, ...ctx.props }
  }
})(PageHeaderWrapper)

// export default connect(({ setting }) => ({
//   contentWidth: setting.contentWidth,
// }))(PageHeaderWrapper);
