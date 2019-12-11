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
  }

  render() {
    return (
      <div className="winHead">
        <div className="winHead_handle">
          <div className="winHead_handle-btn winHead_handle--close">
            <Icon type="close" className="winHead_handle-btn_icon" />
          </div>
          <div className="winHead_handle-btn winHead_handle--minus">
            <Icon type="minus" className="winHead_handle-btn_icon" />
          </div>
          <div className="winHead_handle-btn winHead_handle--fullscreen">
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
