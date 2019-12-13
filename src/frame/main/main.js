import React from 'react';
import './main.scss';
import ScrollBar from 'react-scrollbar'
import MainRoute from '@route/main'
import WinHead from '@cpt/win-head/win-head';
import WinMenu from '@cpt/win-menu/win-menu';

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <div className="main-head">
          <WinHead title="htx" />
        </div>
        <div className="main-layout">
          <ScrollBar
            speed={0.8}
            className="main-layout_scroll"
            smoothScrolling={true}
            contentStyle={{
              width: '100%'
            }}
            verticalScrollbarStyle={{
              borderRadius: '4px',
              background: '#c5c5c5'
            }}
            horizontal={false}
          >
            <MainRoute />
          </ScrollBar>
          <div className="main-layout_menu">
            <WinMenu />
          </div>
        </div>
      </div>
    );
  }
};

export default Main;
