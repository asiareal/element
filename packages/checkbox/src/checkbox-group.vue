<script>
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    name: 'ElCheckboxGroup',

    componentName: 'ElCheckboxGroup',

    mixins: [Emitter],

    props: {
      value: {},
      min: Number,
      max: Number,
      size: String,
      fill: String,
      textColor: String
    },

    watch: {
      value(value) { // value 的变化，完全由checkbox控制
        this.dispatch('ElFormItem', 'el.form.change', [value]);
      }
    }
  };
</script>

<template>
  <div class="el-checkbox-group">
    <slot></slot>
  </div>
</template>
