import React from 'react';
import './start.scss';

declare var global: any;

class Start extends React.Component<any, any> {
  // 继承
  constructor(props: any) {
    super(props);
    this.state = {
      showSec: parseInt(this.props.timer),
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
      if (this.state.showSec) {
        this.setState((state: any, props: any) => ({
          showSec: state.showSec - 1
        }));
      }
      else {
        clearInterval(timer);
        global.ipcRenderer.send('enter');
      }
    }, 1000);
  }

  // 渲染
  render() {
    return (
      <div className="start">{this.state.showSec}</div>
    );
  }
};

export default Start;
