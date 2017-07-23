/**
 * 递归向下广播事件
 * @param componentName {String} 组件名
 * @param eventName {Stirng} 事件名
 * @param params {Array} 参数
 */
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else { // 如果没找到递归调用
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

export default {
  methods: {
      /**
       * 子组件向父组件派发事件
       * @param componentName {String} 组件名称
       * @param eventName {String} 事件名
       * @param params {Array} 参数
       */
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName; // 这里不知的作者为什么不要name属性，可能利用这个属性筛选吧
      // 循环向上遍历，找到要派发的父组件
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params)); // 调用内部emit
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
