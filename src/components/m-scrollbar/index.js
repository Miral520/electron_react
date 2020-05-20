import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

let orginScrollSize = 17; // 原生滚动条尺寸
let updataTimer = null; // 更新定时器

class MScrollBar extends React.Component {
    constructor(props) {
      super(props);
      this.content = React.createRef(); // 内容区域
      this.scrollBarX = React.createRef(); // 横向滚动条
      this.scrollBarY = React.createRef(); // 纵向滚动条
      this.init = this.init.bind(this);
      this.handleScroll = this.handleScroll.bind(this);
      this.scrollDown = this.scrollDown.bind(this);
      this.scrollMove = this.scrollMove.bind(this);
      this.scrollUp = this.scrollUp.bind(this);
      this.setScrollRel = this.setScrollRel.bind(this);
      this.setScrollAbs = this.setScrollAbs.bind(this);
      this.handleResize = this.handleResize.bind(this);
      this.updata = this.updata.bind(this);
      this.state = {
        startX: 0, // 横向开始位置
        startY: 0, // 纵向开始位置
        distanceX: 0, // 横向距离左侧滚动距离
        distanceY: 0, // 纵向距离顶部滚动距离
        direction: 'y', // 滚动方向
        showX: props.showX, // 横向滚动条显示
        showY: props.showY, // 纵向滚动条显示
        scrollToX: props.scrollToX, // 横向滚动到指定位置，单位px
        scrollToY: props.scrollToY, // 纵向滚动到指定位置，单位px
        color: props.color, // 滚动条颜色
        size: props.size, // 滚动条尺寸，单位px
        isRound: props.isRound, // 是否圆角
      };
    }

    // 初始化
    init() {
      // 延迟(异步)初始化组件
      setTimeout(() => {
        this.updata();
        this.setScrollAbs(this.state.scrollToX, this.state.scrollToY);
      }, 100);
    }

    // 滚动监听
    handleScroll(e) {
      this.setState({
        distanceX: e.target.scrollLeft / this.state.showWidth * 100,
        distanceY: e.target.scrollTop / this.state.showHeight * 100
      });
    }

    // 滚动条点击
    scrollDown(e) {
      let dir = e.target.getAttribute('direction');
      if(dir === 'y') {
        // 点击纵向滚动条
        this.setState({
          direction: dir,
          startY: e.clientY,
          addClassY: this.state.showY ? 'show active' : null
        });
      }
      else {
        // 点击横向滚动条
        this.setState({
          direction: dir,
          startX: e.clientX,
          addClassX: this.state.showX ? 'show active' : null
        });
      }
      document.addEventListener('mousemove', this.scrollMove, false);
      document.addEventListener('mouseup', this.scrollUp, false);
    };

    // 滚动条移动
    scrollMove(e) {
      e.stopPropagation();
      e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
      if(this.state.direction === 'y') {
        // 点击纵向滚动条
        this.setScrollRel(0, (e.clientY - this.state.startY) * this.state.allHeight / (this.state.showHeight));
        this.setState({
          startY: e.clientY
        });
      }
      else {
        // 点击横向滚动条
        this.setScrollRel((e.clientX - this.state.startX) * this.state.allWidth / (this.state.showWidth), 0);
        this.setState({
          startX: e.clientX
        });
      }
    };

    // 滚动条取消点击
    scrollUp(e) {
      document.removeEventListener('mousemove', this.scrollMove);
      document.removeEventListener('mouseup', this.scrollUp);
      if(this.state.direction === 'y') {
        this.setState({
          addClassY: this.state.showY ? 'show' : null
        });
      }
      else {
        this.setState({
          addClassX: this.state.showX ? 'show' : null
        });
      }
    };

    // 设置相对滚动位置
    setScrollRel(x, y) {
      this.content.current.scrollBy(x, y);
    }

    // 设置绝对滚动位置
    setScrollAbs(x, y, smooth=false) {
      this.content.current.scroll({
        top: y,
        left: x,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    // 窗口分辨率更改
    handleResize() {
      clearTimeout(updataTimer);
      updataTimer = setTimeout(this.updata, 1000);
    }

    // 重渲染更新
    updata() {
      let target = this.content.current;
      let scrollWidth = target.scrollWidth - orginScrollSize;
      let scrollHeight = target.scrollHeight - orginScrollSize;
      let clientWidth = target.clientWidth - orginScrollSize;
      let clientHeight = target.clientHeight - orginScrollSize;
      let percentX = clientWidth / scrollWidth;
      let percentY = clientHeight / scrollHeight;
      this.setState({
        allWidth: scrollWidth, // 总区域宽度
        allHeight: scrollHeight, // 总区域高度
        showWidth: clientWidth, // 显示区域宽度
        showHeight: clientHeight, // 显示区域高度
        barWidth: (percentX * 100).toFixed(2), // 横向滚动条宽度
        barHeight: (percentY * 100).toFixed(2), // 纵向滚动条高度
        addClassX: (percentX !== 1 && this.state.showX) ? 'show' : null, // 横向滚动条附加class
        addClassY: (percentY !== 1 && this.state.showY) ? 'show' : null, // 纵向滚动条附加class
      });
    }

    // 挂载完成
    componentDidMount() {
      this.init();
      window.addEventListener('resize', this.handleResize, false); // 监听窗口大小
    }

    // 卸载前
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize); // 解绑监听窗口大小
    }

    // 组件更新
    componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.children !== prevProps.children) {
        this.updata();
      }
      if(this.props.scrollToX !== prevProps.scrollToX || this.props.scrollToY !== prevProps.scrollToY) {
        this.setScrollAbs(this.props.scrollToX, this.props.scrollToY, true);
      }
    }
  
    // 渲染
    render() {
      return (
        <div className="m-scrollbar">
          <div className="m-scrollbar_full" ref={this.content} onScroll={e => this.handleScroll(e)}>
            <div className="m-scrollbar_content">
              {this.props.children}
            </div>
          </div>
          <div className={`m-scrollbar_x ${this.state.addClassX}`} style={{height: `${this.state.size}px`}}>
              <div className="m-scrollbar_show" direction="x" onMouseDown={this.scrollDown} style={{width: `${this.state.barWidth}%`, borderRadius: this.state.isRound ? `${this.state.size / 2}px` : 0, background: this.state.color, transform: `translateX(${this.state.distanceX}%)`}}></div>
          </div>
          <div className={`m-scrollbar_y ${this.state.addClassY}`} style={{width: `${this.state.size}px`}}>
              <div className="m-scrollbar_show" direction="y" onMouseDown={this.scrollDown} style={{height: `${this.state.barHeight}%`, borderRadius: this.state.isRound ? `${this.state.size / 2}px` : 0, background: this.state.color, transform: `translateY(${this.state.distanceY}%)`}}></div>
          </div>
        </div>
      );
    }
  };

  // 传入props默认值
  MScrollBar.defaultProps = {
    showX: true, // 横向滚动条显示
    showY: true, // 纵向滚动条显示
    scrollToX: 0, // 横向滚动到指定位置，单位px
    scrollToY: 0, // 纵向滚动到指定位置，单位px
    color: 'rgba(0, 0, 0, 0.3)', // 滚动条颜色，支持16进制、rgb、rgba
    size: 8, // 滚动条尺寸，单位px
    isRound: true, // 是否圆角
  };

  // 传入props类型
  MScrollBar.propTypes = {
    showX: PropTypes.bool,
    showY: PropTypes.bool,
    scrollToX: PropTypes.number,
    scrollToY: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    isRound: PropTypes.bool,
  };
  
  export default MScrollBar;