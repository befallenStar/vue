<template>
  <div id="news_list">
    <div class="news_main">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane v-for="(item,index) of tabs" :key="index" :label="item.text" :name="item.name">
          <!-- <div class="data_row" v-for="(item,index) in news_list" :key="index">
            <a :href="item.url" class="na_pic">
              <img :src="item.thumbnail_pic_s" :alt="item.title" width="140" height="88" />
            </a>
            <div class="na_detail">
              <div class="news_title">
                <h3>
                  <a :href="item.url">{{item.title}}</a>
                </h3>
              </div>
              <div class="news_tag">
                <a href="javascript:void(0)" class="link link_more">
                  <em>{{item.category}}</em>
                </a>
                <div class="keywords">
                  <a href="javascript:void(0)">{{item.author_name}}</a>
                </div>
                <span class="time">{{item.date}}</span>
              </div>
            </div>
          </div>-->
          <newsitem v-for="(item,index) in news_list" :key="index" :item="item"></newsitem>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import newsitem from "@/components/NewsItem.vue";
export default {
  components: {newsitem},
  data() {
    return {
      type: "top",
      appkey: "4bd68be09285a2eb1a620a33d7491603",
      news_list: [],
      tabs: [
        { name: "top", text: "头条" },
        { name: "shehui", text: "社会" },
        { name: "guonei", text: "国内" },
        { name: "guoji", text: "国际" },
        { name: "yule", text: "娱乐" },
        { name: "tiyu", text: "体育" },
        { name: "junshi", text: "军事" },
        { name: "keji", text: "科技" },
        { name: "caijing", text: "财经" },
        { name: "shishang", text: "时尚" }
      ]
    };
  },
  created() {
    this.loaddata();
  },
  methods: {
    loaddata() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let _params = {
        type: this.type,
        key: this.appkey
      };
      this.axios
        .get("toutiao/index", {
          params: _params
        })
        .then(res => {
          //   console.log(JSON.stringify(res.data));
          this.news_list = res.data.result.data;
          loading.close();
        })
        .catch(error => {
          console.log(error);
          loading.close();
        });
    },
    handleClick(tab, event) {
      this.type = tab.name;
      this.news_list = [];
      this.loaddata();
    }
  }
};
</script>
<style>
body {
  line-height: 1.5;
  font-size: 12px;
  font-family: "Microsoft YaHei", "寰蒋闆呴粦", "瀹嬩綋", sans-serif;
}
blockquote,
body,
button,
code,
dd,
div,
dl,
dt,
fieldset,
form,
h1,
h2,
h3,
h4,
h5,
h6,
html,
input,
legend,
li,
ol,
p,
pre,
td,
textarea,
th,
ul {
  margin: 0;
  padding: 0;
}
a {
  color: #404040;
  text-decoration: none;
}
em {
  font-style: normal;
}
.news_main {
  margin: 0px auto;
  width: 600px;
}
.data_row {
  position: relative;
  border-bottom: 1px solid #eee;
  padding: 15px 0;
  background: #ffffff;
  height: 80px;
}
.na_pic {
  float: left;
  display: block;
  width: 140px;
  height: 88px;
  overflow: hidden;
}
:link img,
:visited img,
a img,
fieldset,
img {
  border: 0;
}
.na_detail {
  width: 445px;
  margin-left: 15px;
  float: left;
}
.news_title {
  position: relative;
}
.news_title h3 {
  font: normal 20px/26px "Microsoft Yahei";
  min-height: 40px;
  padding-bottom: 14px;
}
.news_title h3 a {
  color: #404040;
  text-decoration: none;
  font-weight: normal;
}
.news_tag {
  float: left;
  _display: inline;
}
.link {
  float: left;
  font: normal 12px/16px "SimSun";
  color: #ff9999;
  padding: 1px 7px;
  border: 1px solid #ff9999;
  border-radius: 2px;
  text-decoration: none;
  margin-right: 10px;
}
.link_more {
  position: relative;
}
.link_more::before {
  content: "";
  display: block;
  width: 11px;
  height: 11px;
  position: absolute;
  top: 3px;
  right: 50%;
  margin-right: -5px;
  filter: alpha(opacity=0);
  opacity: 0;
}
.link_more em {
  position: relative;
  white-space: nowrap;
  word-wrap: break-word;
  word-break: break-all;
  font-style: normal;
}
.news_tag .keywords {
  float: left;
  padding-right: 4px;
  height: 12px;
  line-height: 11px;
  margin-top: 4px;
  border-right: 1px solid #bbb;
  max-width: 180px;
  margin-right: 12px;
}
.news_tag .keywords a {
  font: normal 12px/12px "SimSun";
  color: #888;
  margin-right: 7px;
  text-decoration: none;
}
.news_tag span {
  font: normal 12px/21px "SimSun";
  color: #bbb;
}
</style>