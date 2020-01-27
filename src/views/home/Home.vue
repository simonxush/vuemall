<template>
  <div class="home">

<!--    <heat-map :heats="heat"></heat-map>-->
    <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
    <Swiper>
      <swiper-item v-for="item in banner">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
    </Swiper>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "components/common/navbar/Navbar";
import {getHomeSwiftImg} from "network/home"
import {Swiper,SwiperItem} from  "common/swiper"
//import HeatMap from "common/heat/HeatMap";
export default {
  name: 'home',
  components: {
    //HeatMap,
   // HelloWorld
    Navbar,
    Swiper,
    SwiperItem
  },
  data(){
    return {
      banner:[],
     //heat:[],
      recommend:[]
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


  }
}
</script>
<style scoped>
  .home-nav{
    background: var(--color-tint);
    color:#ffffff;
  }
</style>
