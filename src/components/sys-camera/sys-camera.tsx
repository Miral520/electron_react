import React from 'react';
import './sys-camera.scss';
import { Button } from 'antd';

declare var global: any;

class SysCamera extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
    };
    this.onCamera = this.onCamera.bind(this);
  }

  onCamera() {
    // console.log(global.navigator.getUserMedia);
    // console.log(global.navigator);
    // let video = this.refs.video;
    // let constraints = {
    //   video: {width: 500, height: 500},
    //   audio: true
    // };
    // let promise = navigator.mediaDevices.getUserMedia(constraints);
    // promise.then(function (MediaStream) {
    //     video.srcObject = MediaStream;
    //     video.play();
    // }).catch(function (PermissionDeniedError) {
    //     console.log(PermissionDeniedError);
    // })
  }

  componentDidMount() {
    this.onCamera();
  }

  render() {
    return (
      <div className="sysCamera">
        <Button>开启摄像头</Button>
        <div className="sysCamera_video" ref="video"></div>
      </div>
    );
  }
};

export default SysCamera;
