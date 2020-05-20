import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
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
          <HomeOutlined />
        </li>
        <li className="winMenuList">
          <HomeOutlined />
        </li>
        <li className="winMenuList">
          <HomeOutlined />
        </li>
      </ul>
    );
  }
}

export default WinMenu;
