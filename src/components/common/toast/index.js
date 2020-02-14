import Toast from './Toast'
const obj = {};
obj.install = function (Vue) {
  //console.log('toast installed');

  const tconstructor = Vue.extend(Toast);

  const toast = new tconstructor();
  //document.body.appendChild(Toast.$el);
  toast.$mount(document.createElement('div'));
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = toast;
};
export default  obj;
