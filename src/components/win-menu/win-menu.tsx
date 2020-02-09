import React from 'react';
import { Icon } from 'antd';
import './win-menu.scss';
// import publicFn from '@utils/utils';


// const { mixin, vars } = publicFn;

class WinMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      // title: '',
    };
    // this.closeHandle = this.closeHandle.bind(this);
  }

  render() {
    return (
      <ul className="winMenu">
        <li className="winMenuList active">
          <Icon type="home" />
        </li>
        <li className="winMenuList">
          <Icon type="home" />
        </li>
        <li className="winMenuList">
          <Icon type="home" />
        </li>
      </ul>
    );
  }
};

export default WinMenu;
