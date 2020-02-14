<template>
  <div id="home">

<!--    <heat-map :heats="heat"></heat-map>-->
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
<!--    <tab-control-->
<!--      :titles="['流行','新款','精选']"-->
<!--      @tabClick="tabClick"-->
<!--      ref="tabcontrol1"-->
<!--      :class="tab-controll"-->
<!--      v-show="isTabFixed"></tab-control>-->
<scroll class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadmore">
  <HomeSwiper :banner="banner" @swiperLoad="swiperLoad"></HomeSwiper>
  <recommend-view :recommend="recommend"></recommend-view>
  <feature-view></feature-view>
  <tab-control
    :titles="['流行','新款','精选']"
    @tabClick="tabClick" ref="tabcontrol2"></tab-control>
  <GoodsList :goods="showGoods"></GoodsList>

<!--  <ul>-->
<!--    <li v-for="item in 100">{{item+'列'}}</li>-->
<!--  </ul>-->
</scroll>
    <back-top @click.native="backtopClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeSwiper from "./childComponent/HomeSwiper";

import RecommendView from "./childComponent/RecommendView";
import FeatureView from "./childComponent/FeatureView";

import Navbar from "components/common/navbar/Navbar";
import TabControl from "content/tabControl/TabControl";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "content/backtop/BackTop";

import GoodsList from "content/goods/GoodsList";
import {getHomeSwiftImg,getHomeGoods} from "network/home"




export default {
  name: 'home',
  components: {
    FeatureView,
    RecommendView,
    HomeSwiper,
    Navbar,
    TabControl,
    Scroll,
    BackTop,
    GoodsList
  },
  data(){
    return {
      banner:[],
     //heat:[],
      recommend:[],
      goods:{
        'pop':{ page:0,list:[]},
       'new' :{ page:0,list:[]},
        'sell' :{page:0,list:[]}
      },
      currentType:'pop',
      isShow : false,
      tabOffsetTop:0,
      isTabFixed: false,
      saveY : 0
    }
  },
  created() {
    getHomeSwiftImg().then(res =>{
      console.log(res.data.data);
      //this.result = res;

      this.banner = res.data.data.banner.list;
      this.recommend = res.data.data.recommend.list;
    })

    // getHeat().then(res =>{
    //
    //   console.log(res);
    //   this.heat = res.data.info.list;
    // })
   this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh,500);
    this.$bus.$on('imageLoad',()=>{

      //console.log('------');
      //this.$refs.scroll.scroll && this.$refs.scroll.scroll.refresh();
      refresh();
    })
    //console.log(this.$refs.tabcontrol.$el);
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    },

  },
  activated() {
    console.log('home actived...');
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    console.log('home deactived....');
    this.saveY = this.$refs.scroll.scroll.y;
  },
  methods:{
    //防抖动处理函数
    debounce(func,delay){
      let timer = null
      return function (...args) {

        if(timer) clearTimeout(timer);
        timer = setTimeout(()=>{
          func.apply(this,args)
        },delay)
      }
    },
    tabClick(index){
      // console.log(index);
      switch (index) {

        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell'
              break;
      }
      this.$refs.tabcontrol1.currentIndex = index;
      this.$refs.tabcontrol2.currentIndex = index;
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page +=1;
      });
    },
backtopClick(){
 // console.log('backtopClick');
  this.$refs.scroll.scrollTo(0,0);
},
    contentScroll(position){
      //console.log(position);
      this.isShow = -position.y > 4000;
      this.isTabFixed = (-position.y) >this.tabOffsetTop;
    },
    loadmore(){
      console.log('load more.....');
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.finishPullUp();
    },
    swiperLoad(){
      //console.log(this.$refs.tabcontrol.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop;

    }
  }

}
</script>
<style scoped>
  #home{
    /*padding-top: 44px;*/
    height: 100vh;
  }
  .home-nav{
    background: var(--color-tint);
    color:#ffffff;
    /*position: fixed;*/
    /*left:0;*/
    /*right:0;*/
    /*top:0;*/
    /*z-index: 9;*/

  }
  .tab-controll{
    position: relative;
    z-index: 9;
  }
  /*.tab-control{*/
  /*  position: sticky;*/
  /*  top:44px;*/
  /*  background: #ffffff;*/
  /*  z-index:9;*/
  /*}*/
  .content{
    height:  calc(100% - 93px);
    overflow: hidden;
    top:44px;
  }
</style>
