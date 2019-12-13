import React from 'react';
import ReactDOM from 'react-dom';
import './entry.scss';
import Main from '@frame/main/main';
import Start from '@frame/start/start';

class RenderApp extends React.Component {
  // 继承
  constructor(props) {
    super(props);
    this.state = {
      enter: false,
      timer: null,
      sec: 3000
    };
    this.setTimer = this.setTimer.bind(this);
    this.enterApp = this.enterApp.bind(this);
  }

  // 生命周期 --- 加载完毕
  componentDidMount() {
    this.setTimer();
  }

  // 设置定时器
  setTimer() {
    this.setState({
      timer: setTimeout(() => {
        this.enterApp();
      }, this.state.sec)
    });
  }

  // 进入App
  enterApp() {
    this.setState({
      enter: true
    });
    global.ipcRenderer.send('enter');
  }

  // 渲染页面
  render() {
    return this.state.enter ? <Main /> : <Start />;
  }
};

ReactDOM.render((
  <RenderApp />
), document.getElementById('root'));
