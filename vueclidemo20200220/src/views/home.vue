<template>
  <!-- 1个根节点 -->
  <div>
    <h1>vue cli</h1>
    <input type="text" v-model="message" />
    <br />
    {{message}}
    <br />
    <button @click="hello">事件</button>
    <el-button>按钮</el-button>
    <el-input-number v-model="num" :precision="2" :step="0.01" :max="10"></el-input-number>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "",
      num: 1.0
    };
  },
  methods: {
    hello: function() {
      this.message = "你好";
    }
  }
};
</script>
<style>
</style>