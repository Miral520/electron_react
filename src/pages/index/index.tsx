import React from 'react';
import './index.scss';
import SysCamera from '@cpt/sys-camera/sys-camera';

class Index extends React.Component<any, any> {
  render() {
    return (
      <div className="index">
        <p>ready</p>
        <SysCamera />
      </div>
    );
  }
};

export default Index;
