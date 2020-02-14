<template>
<div class="wrapper" ref="aaa">
<!--<trace-list></trace-list>-->
  <ul class="content" >
    <li v-for="item in 100">{{item +'列'}}</li>

  </ul>
</div>
</template>

<script>
  import BScroll from 'better-scroll';
  import TraceList from "common/heat/TraceList";
    export default {
        name: "category",
      data(){
          return {
            scroll: null
          }
      },
      mounted() {
        console.log(this.$refs.aaa);
        this.scroll = new   BScroll(this.$refs.aaa,{
          probeType:3,
          click: true,
          pullUpLoad:true
        });
        this.scroll.on('scroll',(position)=>{
          console.log(position);
        });
        this.scroll.on('pullingup',()=>{
          console.log('load more....');
        })
        console.log(this.scroll);
      },
      components:{
        TraceList,
        BScroll

      }
    }
</script>

<style scoped>
 .wrapper{
   height: calc(100% - 90px);
   background-color: red;
   overflow: hidden;
 }
</style>
