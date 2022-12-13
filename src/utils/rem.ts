//rem等比适配配置文件
//基准大小
const baseSize = 10;
//设置rem函数
function setRem() {
  //当前页面宽度相对于750px宽的缩放比例，可根据自己需求修改
  const scale = document.documentElement.clientWidth / 750;
  //设置页面根节点字体大小（Math.min(scale,2)指最高放大比例为2，可根据实际业务需求调整）
  document.documentElement.style.fontSize =
    baseSize * Math.min(scale, 2) + "px";
}

export const initRem = () => {
  //初始化
  setRem();
  //改变窗口大小时重新设置rem
  window.onresize = function () {
    setRem();
  };
};
