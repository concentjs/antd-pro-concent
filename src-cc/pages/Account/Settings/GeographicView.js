import React, { PureComponent } from 'react';
import { Select, Spin } from 'antd';
// import { connect } from 'dva';
import { register } from 'concent';
import styles from './GeographicView.less';

const { Option } = Select;

const nullSlectItem = {
  label: '',
  key: '',
};

// @connect(({ geographic }) => {
//   const { province, isLoading, city } = geographic;
//   return {
//     province,
//     city,
//     isLoading,
//   };
// })
@register('GeographicView', 'geographic')
class GeographicView extends PureComponent {
  componentDidMount = () => {
    this.$$dispatch('geographic/fetchProvince');
  };

  componentDidUpdate(props) {
    const { value } = this.props;

    if (!props.value && !!value && !!value.province) {
      this.$$dispatch('geographic/fetchCity', value.province.key);
    }
  }

  getProvinceOption() {
    const { province } = this.state;
    return this.getOption(province);
  }

  getCityOption = () => {
    const { city } = this.state;
    return this.getOption(city);
  };

  getOption = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.id} value={item.id}>
        {item.name}
      </Option>
    ));
  };

  selectProvinceItem = item => {
    const { onChange } = this.props;
    this.$$dispatch('geographic/fetchCity', item.key);
    onChange({
      province: item,
      city: nullSlectItem,
    });
  };

  selectCityItem = item => {
    const { value, onChange } = this.props;
    onChange({
      province: value.province,
      city: item,
    });
  };

  conversionObject() {
    const { value } = this.props;
    if (!value) {
      return {
        province: nullSlectItem,
        city: nullSlectItem,
      };
    }
    const { province, city } = value;
    return {
      province: province || nullSlectItem,
      city: city || nullSlectItem,
    };
  }

  render() {
    const { province, city } = this.conversionObject();
    const { isLoading } = this.state;
    return (
      <Spin spinning={isLoading} wrapperClassName={styles.row}>
        <Select
          className={styles.item}
          value={province}
          labelInValue
          showSearch
          onSelect={this.selectProvinceItem}
        >
          {this.getProvinceOption()}
        </Select>
        <Select
          className={styles.item}
          value={city}
          labelInValue
          showSearch
          onSelect={this.selectCityItem}
        >
          {this.getCityOption()}
        </Select>
      </Spin>
    );
  }
}

export default GeographicView;
