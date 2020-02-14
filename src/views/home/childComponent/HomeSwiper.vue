<template>
  <Swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper,SwiperItem} from  "common/swiper"
    export default {
        name: "HomeSwiper",
      props:{

          banner:{
            type: Array,
            default(){
              return []
            }
          }
      },
      data(){
          return {
            isLoad :false
          }
      },
      components:{
        Swiper,
        SwiperItem
      },
      methods:{
        imageLoad(){
          if(!this.isLoad){
            this.$emit('swiperLoad');
            this.isLoad = true;
          }

        }
      }
    }
</script>

<style scoped>

</style>
