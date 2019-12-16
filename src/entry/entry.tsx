import React from 'react';
import ReactDOM from 'react-dom';
import publicFn from '@utils/utils';
import './entry.scss';
import Main from '@frame/main/main';
import Start from '@frame/start/start';

const { mixin, vars } = publicFn;

class RenderApp extends React.Component<any, any> {
  // 渲染页面
  render() {
    let str = mixin.getUrlSearch('start');
    let index = str ? parseInt(str) : 0;
    return index ? <Main /> : <Start timer="10" />;
  }
};

ReactDOM.render((
  <RenderApp />
), document.getElementById('root'));
