import React from 'react';
import './win-head.scss';
import { Icon } from 'antd';
import 'antd/dist/antd.css';

class winHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
    this.closeHandle = this.closeHandle.bind(this);
    this.fullscreenHandle = this.fullscreenHandle.bind(this);
    this.minimizeHandle = this.minimizeHandle.bind(this);
  }

  // 关闭程序
  closeHandle() {
    global.app.quit();
  }

  // 最小化
  minimizeHandle() {
    global.ipcRenderer.send('min');
  }

  // 全屏切换
  fullscreenHandle() {
    global.ipcRenderer.send('fullscreen');
  }

  render() {
    return (
      <div className="winHead">
        <div className="winHead_handle">
          <div className="winHead_handle-btn winHead_handle--close" onClick={this.closeHandle}>
            <Icon type="close" className="winHead_handle-btn_icon" />
          </div>
          <div className="winHead_handle-btn winHead_handle--minus" onClick={this.minimizeHandle}>
            <Icon type="minus" className="winHead_handle-btn_icon" />
          </div>
          <div className="winHead_handle-btn winHead_handle--fullscreen" onClick={this.fullscreenHandle}>
            <Icon type="fullscreen" className="winHead_handle-btn_icon" />
          </div>
        </div>

        <div className="winHead_main">
          { this.props.title }
        </div>
      </div>
    );
  }
};

export default winHead;
