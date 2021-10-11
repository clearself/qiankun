
const render = (options) => {
  // options是基座下发的参数，可以保存到全局的状态管理或其他地方，用于后面与基座进行通信
  
  // 可通过 options.getGlobalState() 获取基座下发的数据
  // options.setGlobalState({user: {name: ''}}) 改变全局的数据
  // options.onGlobalStateChange 监听全局数据的变化

  
//   document.querySelector('#current-env').innerHTML = 'qiankun'
  const globalState = options.getGlobalState()

  // 展示基座下发的状态
//   const node = document.createElement('div')
//   node.innerHTML = `基座下发的globalState： <code>${JSON.stringify(globalState)}</code>。<a target="_blank" href="${window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__}">打开独立运行环境</a>`

//   document.querySelector('.container').appendChild(node)
    document.querySelector('#open').innerHTML = `<a target="_blank" href="${window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__}">打开独立运行环境</a>`
    var result = document.querySelector('#result');
    var QrCode = new QrCodeRecognition({
        sweepId: '#canvas',
        uploadId: '#file',
        error: function (err) {
            // 识别错误反馈
            result.value = err;
        },
        seuccess: function (res) {
            // 识别成功反馈
            result.value = res.data;
        }
    });
    var sweep = document.getElementById('sweep')
    var file = document.getElementById('file')
    // 扫一扫
    sweep.onclick = function(){
        result.value = '';
        QrCode.sweep();
    }
    // 从相册选择
    file.onchange = function(){
        result.value = '';
        QrCode.upload();
    }

  return Promise.resolve();
};
if (window.__POWERED_BY_QIANKUN__) {
   
} else {
    
}
(global => {
  global['prehtml'] = {
    bootstrap: () => {
      console.log('purehtml bootstrap');
      return Promise.resolve();
    },
    mount: (options) => {
      console.log('purehtml mount', options);
      return render(options);
      
    },
    unmount: () => {
      console.log('purehtml unmount');
      return Promise.resolve();
    },
  };
})(window);
