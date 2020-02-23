<template>
  <div>
    <div id="head" class="sig-head">
      <a href="/" target="_self" class="sig-img">慕课网</a>
    </div>
    <div id="main">
      <div class="login-wrap">
        <div id="signup" class="rl-modal rl-model-signup">
          <div class="rl-modal-header">
            <h1>
              <span data-fromto="signup:signin" class="xa-showSignin">登录</span>
              <span class="active-title">注册</span>
            </h1>
          </div>
          <div class="rl-modal-body js-modal-body js-registerWrap">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
              <el-form-item label="账号：" prop="username">
                <el-input v-model="form.username" clearable placeholder="请输入账号"></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input
                  type="password"
                  v-model="form.password"
                  clearable
                  placeholder="请输入密码"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="验证码：" style="margin-left:0px;" prop="checkcode">
                <el-input v-model="form.checkcode" placeholder="验证码" style="width:50%" clearable></el-input>
                <div @click="refreshCode()">
                  <s-identify :identifyCode="form.identifyCode"></s-identify>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button @click="login">登录</el-button>
              </el-form-item>
              <el-form-item>账号：admin密码：123456</el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
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
            trigger: "focus"
          }
        ],
        password: [
          {
            required: true,
            min: 6,
            max: 20,
            message: "密码长度6~20位",
            trigger: "focus"
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
      var self = this;
      let flag = true;
      if (this.form.checked) {
        if (this.form.username == "admin" && this.form.password == "123456") {
          this.axios
            .get("apply")
            .then(res => {
              console.log(res);
              self.$message({
                message: "登录成功",
                type: "success"
              });
            })
            .catch(error => {
              console.log(error);
              this.$message.error("登录失败");
            });
        } else {
          flag = false;
          this.$message.error("登录失败");
        }
      } else {
        flag = false;
        this.$message.error("登录失败");
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
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
button,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
body,
html {
  font: 14px/1.5 "PingFang SC", "微软雅黑", "Microsoft YaHei", Helvetica,
    "Helvetica Neue", Tahoma, Arial, sans-serif;
  color: #1c1f21;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: 400;
}
.sig-head {
  height: 120px;
  text-align: center;
}
a,
button,
input {
  outline: 0;
}
:link,
:visited,
ins {
  text-decoration: none;
}
.sig-img {
  display: inline-block;
  width: 384px;
  height: 46px;
  background: url(../assets/signlogo.png) no-repeat center center;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-top: 50px;
}
a:link,
a:visited {
  color: #5e5e5e;
}
#main {
  min-height: auto;
  padding: 20px 0;
}
.rl-modal {
  position: fixed;
  background: #fff;
  z-index: 100000;
  width: 384px;
  padding-top: 10px;
  padding-bottom: 20px;
  left: 50%;
  top: 50%;
  margin: -192px 0 0 -192px;
  box-shadow: 0 12px 24px 0 rgba(28, 31, 33, 0.1);
  border-radius: 12px;
  transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
}
.login-wrap .rl-modal {
  position: relative;
  margin: 0 auto;
  left: 0;
  top: 0;
  z-index: 0;
}
#signup.rl-modal {
  padding-bottom: 41px;
}
.rl-modal-header {
  position: relative;
  padding: 0 20px 25px;
}
.rl-modal-header h1 {
  font-size: 16px;
  line-height: 49px;
  font-weight: 700;
  height: 49px;
  color: #787d82;
}
.rl-modal-header h1 span {
  float: left;
  width: 80px;
  text-align: center;
  height: 49px;
  line-height: 49px;
  cursor: pointer;
}
.rl-modal-header .active-title,
.rl-modal-header span:hover {
  color: #f20d0d;
}
.rl-modal-header .active-title::after,
.rl-modal-header span:hover::after {
  content: " ";
  width: 16px;
  height: 4px;
  line-height: 4px;
  background: #f20d0d;
  border-radius: 2px;
  display: block;
  margin: 0 auto;
}
.rl-modal-body {
  padding: 0 32px;
}
</style>