<template>
<div id="detail">

<detail-nav-bar class="detail-nav" @titleclick="titleclick"></detail-nav-bar>
  <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
    <detail-comment-info :commentInfo="commentInfo" ref="comment"> </detail-comment-info>
    <goods-list :goods="recommends" ref="recommend"></goods-list>
  </scroll>
<detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
</div>
</template>

<script>

import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";






export default {
        name: "Detail",
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
      },
      data(){
          return {
            iid:null,
            topImages:null,
            goods:{},
            shop:{},
            detailInfo : {},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopY:[0,-1000,-2000,-3000]
          }
      },
      created() {
          this.iid = this.$route.params.iid;
          getDetail(this.iid).then(res =>{
            console.log(res);
            const data = res.data.result;
            this.topImages = data.itemInfo.topImages;
            this.goods = new  Goods(data.itemInfo,data.columns,data.shopInfo.services);
            this.shop = new Shop(data.shopInfo);
            this.detailInfo = data.detailInfo;
            //console.log(data.itemParams.rule);
            this.paramInfo =  new GoodsParam(data.itemParams.info,data.itemParams.rule);
            if(data.rate.cRate != 0){
              this.commentInfo = data.rate.list[0];
            }
            this.$nextTick(()=>{
              this.themeTopY = [];
              this.themeTopY.push(0);
              this.themeTopY.push(this.$refs.params.$el.offsetTop);
              this.themeTopY.push(this.$refs.comment.$el.offsetTop);
              this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
              //console.log(this.themeTopY);
            })

          });
          getRecommend().then(res=>{
           // console.log(res);
            this.recommends = res.data.data.list;
          });

      },
     methods:{
       imageLoad(){

         this.$refs.scroll.scroll.refresh();
       },
       titleclick(index){

         //console.log(index);
         this.$refs.scroll.scrollTo(0,-this.themeTopY[index],100)
       },
       contentScroll(position){
         //console.log(position);
       },
       addCart(){
         //console.log('add to cart');
         const product = {};
         product.image = this.topImages[0];
         product.title = this.goods.title;
         product.desc = this.goods.desc;
         product.price = this.goods.realPrice;
         product.iid = this.iid;

         //this.$store.cartList.push(product);
        // this.$store.commit('addCart',product);
         this.$store.dispatch('addCart',product).then(res=>{
           //console.log(res);
           this.$toast.show(res,2000);
         });
       }
     },
     updated() {

     }
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}

  .content{
    height: calc(100vh - 44px);
  }
</style>
