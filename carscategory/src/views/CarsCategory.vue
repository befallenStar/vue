<template>
  <div class="home">
    <el-button @click="request">http请求</el-button>
    <el-input type="text" v-model="first_letter"></el-input>
    <el-input type="textarea" v-model="content" autosize></el-input>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "CarsCategory",
  data() {
    return {
      appkey: "469e056346980b906a8aa27bd9534a11",
      first_letter: "",
      content: "",
      list:[]
    };
  },
  methods: {
    request() {
      let params = {
        key: this.appkey,
        first_letter: this.first_letter
      };
      let self=this;
      this.axios
        .get("cxdq/brand", {
          params:params
        })
        .then(res => {
          self.content = JSON.stringify(res.data);
          self.list=res.data.result;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
