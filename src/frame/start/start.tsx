import React from 'react';
import './start.scss';
import { Progress } from 'antd';
import mainPic from '@img/start_main.png'

declare var global: any;

const strokeColor = {
  from: '#108ee9',
  to: '#87d068',
};

class Start extends React.Component<any, any> {
  // 继承
  constructor(props: any) {
    super(props);
    this.state = {
      add: Math.round(100 / parseInt(this.props.timer) / 20),
      percent: 0
    };
    this.setTimer = this.setTimer.bind(this);
  }

  // 生命周期---挂载完毕
  componentDidMount() {
    this.setTimer();
  }

  // 设置定时器
  setTimer() {
    let timer = setInterval(() => {
      this.setState((state: any, props: any) => ({
        percent: state.percent + state.add
      }));
      if (this.state.percent >= 100) {
        clearInterval(timer);
        global.ipcRenderer.send('enter');
      }
    }, 50);
  }

  // 渲染
  render() {
    return (
      <div className="start">
        <img className="start-bg" src={mainPic} />
        <div className="start-progress">
          <Progress percent={this.state.percent} strokeWidth={12} strokeColor={strokeColor} status="active" />
        </div>
      </div>
    );
  }
};

export default Start;
