export default {
    // 16进制色值转换为RGB(A)
    hexToRgba(hex, opacity) {
        let methodStr = '';
        let opacityStr = '';
        if (opacity) {
            methodStr = 'rgba';
            opacityStr = ', ' + opacity;
        }
        else {
            methodStr = 'rgb';
        }
        return `${methodStr}(${parseInt("0x" + hex.slice(1, 3))}, ${parseInt("0x" + hex.slice(3, 5))}, ${parseInt("0x" + hex.slice(5, 7))}${opacityStr})`; 
    },

    // 判断对象不为空
    isObjectNull(obj) {
        if(obj instanceof Object) {
            if(obj) {
                if(JSON.stringify(obj) === '{}') {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return false;
            }
        }
        else {
            return obj;
        }
    },

    // 提取整数
    getIntegerNumber(str) {
        str += '';
        return parseInt(str.replace(/[^-?\d]/g,''));
    },

    // 提取数字
    getNumber(str) {
        str += '';
        return parseFloat(str.replace(/[^(-?\d+)(\.\d+)?]/g,''));
    },

    // 设置Storage存储
    setLocal(key, value, type = 'localStorage') {
        // 将传入值统一封装为对象,并转换为字符串对象
        window[type].setItem(key, JSON.stringify({
            data: value,
            type: type
        }));
    },

    // 读取Storage存储
    getLocal(key, type = 'localStorage') {
        if(this.canGetLocal(key, type)) {
            return JSON.parse(window[type].getItem(key)).data;
        }
        else {
            return undefined;
        }
    },

    // 移除Storage存储
    removeLocal(key, type = 'localStorage') {
        if(type === 'all') {
            if(this.canGetLocal(key, 'localStorage')) {
                window.localStorage.removeItem(key);
            }
            if(this.canGetLocal(key, 'sessionStorage')) {
                window.sessionStorage.removeItem(key);
            }
        }
        else {
            if(this.canGetLocal(key, type)) {
                window[type].removeItem(key);
            }
        }
    },

    // 移除所有Storage存储
    clearLocal(type = undefined) {
        if(type) {
            window[type].clear();
        }
        else {
            window.localStorage.clear();
            window.sessionStorage.clear();
        }
    },

    // 判断某条Storage是否存在
    canGetLocal(key, type = 'localStorage') {
        if(type === 'all') {
            return Boolean(window.localStorage.getItem(key)) || Boolean(window.sessionStorage.getItem(key));
        }
        else {
            return Boolean(window[type].getItem(key));
        }
    },

    // 监听Storage存储
    watchLocal(key, callback, type = 'localStorage') {
        window.addEventListener('storage', event => {
            if(!(event.newValue) || (event.key === key && JSON.parse(event.newValue).type === type)) {
                if(event.newValue) {
                    callback(JSON.parse(event.newValue).data);
                }
                else {
                    callback();
                }
            }
        })
    },

    // 保存cookie(cookieDates 有效期/天)
    saveCookie(cookieName, cookieValue, cookieDates = 30){
        let d = new Date();
        d.setDate(d.getDate() + cookieDates);
        document.cookie = `${cookieName}=${cookieValue};expires=${d.toGMTString()}`;
    },

    // 读取cookie
    getCookie(cookieName){
        let cookieStr = unescape(document.cookie);
        let arr = cookieStr.split('; ');
        let cookieValue = '';
        for(let i = 0; i < arr.length; i++){
            let temp = arr[i].split('=');
            if(temp[0] === cookieName){
                cookieValue = temp[1];
                break;
            }
        }
        return cookieValue;
    },

    // 删除cookie
    removeCookie(cookieName) {
        document.cookie = `${encodeURIComponent(cookieName)}=; expires=${new Date()}`;
    }, 

    // 改变数组内元素位置
    setIndex(arr, index, tindex){
        //如果当前元素在拖动目标位置的下方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置的地方新增一个和当前元素值一样的元素，
        //我们再把数组之前的那个拖动的元素删除掉，所以要len+1
        if(index > tindex){
          arr.splice(tindex, 0, arr[index]);
          arr.splice(index+1, 1)
        }
        else{
        //如果当前元素在拖动目标位置的上方，先将当前元素从数组拿出，数组长度-1，我们直接给数组拖动目标位置+1的地方新增一个和当前元素值一样的元素，
        //这时，数组len不变，我们再把数组之前的那个拖动的元素删除掉，下标还是index
          arr.splice(tindex + 1, 0, arr[index]);
          arr.splice(index, 1)
        }
        return arr;
    },
}