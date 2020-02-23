<template>
                  <div class="data_row">
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
          </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    props:['item']
}
</script>
<style>
    
</style>