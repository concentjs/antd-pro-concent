import React from 'react';
import { List, Icon, Tag } from 'antd';
// import { connect } from 'dva';
import { registerDumb } from 'concent';
import ArticleListContent from '@/components/ArticleListContent';
import styles from './Articles.less';

const Articles = props => {
  console.log('%c@@@ Account/Center/Articles', 'color:green;border:1px solid green;');
  const { list } = props;
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );
  return (
    <List
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={item => (
        <List.Item
          key={item.id}
          actions={[
            <IconText type="star-o" text={item.star} />,
            <IconText type="like-o" text={item.like} />,
            <IconText type="message" text={item.message} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle} href={item.href}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default registerDumb({
  module: 'list',
  mapProps: ctx => ({ list: ctx.moduleState.list }),
})(Articles);
