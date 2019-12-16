// 代码分割
import React from 'react';
import { Spin, Alert } from 'antd';
import Loadable from 'react-loadable';

class loadingComponent extends React.Component<any, any> {
    render() {
      return (
        <Spin tip="Loading...">
            <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
            />
        </Spin>
      );
    }
  };

//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (loader: any, loading: any = loadingComponent)=>{
    return Loadable({
        loader,
        loading
    });
}