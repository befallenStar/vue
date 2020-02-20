<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号：" prop="username" style="margin-bottom:33px;">
        <el-input v-model="form.username" clearable placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password" style="margin-bottom:33px;">
        <el-input
          type="password"
          v-model="form.password"
          clearable
          placeholder="请输入密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码：" style="margin-left:0px;margin-bottom:33px;" prop="checkcode">
        <el-input v-model="form.checkcode" placeholder="验证码" style="width:50%" clearable></el-input>
        <div @click="refreshCode()">
          <s-identify :identifyCode="form.identifyCode"></s-identify>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="login()">登录</el-button>
      </el-form-item>
      <el-form-item>账号：admin密码：123456</el-form-item>
    </el-form>
  </div>
</template>
<script>
import SIdentify from "../components/IdentifyCode";
export default {
  data() {
    const validate = (rule, value, callback) => {
      let code = Number(value);
      if (code == this.form.identifyCode) {
        this.form.checked = true;
      } else {
        this.form.checked = false;
      }
    };
    return {
      form: {
        username: "",
        password: "",
        checkcode: "",
        identifyCodes: "1234567890",
        identifyCode: "",
        checked: false
      },
      rules: {
        username: [
          {
            required: true,
            min: 3,
            message: "账号长度不小于3位",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 20,
            message: "密码长度6~20位",
            trigger: "blur"
            // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{6,20}$/
          }
        ],
        checkcode: [
          {
            required: true,
            type: "number",
            validator: validate,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      let flag = true;
      if (this.form.checked) {
        if (this.form.username == "admin" && this.form.password == "123456")
          alert("登陆成功");
        else {
          alert("账号或密码错误");
          flag = false;
        }
      } else {
        alert("验证码错误");
        flag = false;
        this.refreshCode();
      }
      this.refresh();
      return flag;
    },
    refresh() {
      this.form.username = "";
      this.form.password = "";
      this.form.checkcode = "";
      this.form.checked = false;
      this.refreshCode();
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    // 切换验证码
    refreshCode() {
      this.form.identifyCode = "";
      this.makeCode(this.form.identifyCodes, 4);
    },
    // 生成四位随机验证码
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.form.identifyCode += this.form.identifyCodes[
          this.randomNum(0, this.form.identifyCodes.length)
        ];
      }
      console.log(this.form.identifyCode);
    }
  },
  components: {
    SIdentify
  },
  mounted() {
    // 验证码初始化
    this.form.identifyCode = "";
    this.makeCode(this.form.identifyCodes, 4);
  }
};
</script>
<style>
body {
  width: 40%;
  position: fixed;
  left: 30%;
}
</style>