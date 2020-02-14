<template>
<div class="recommend">
  <div v-for="item in recommend" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
    export default {
        name: "RecommendView",
      props:{
          recommend:{
            type:Array,
            default(){
              return []
            }
          }
      }
    }
</script>

<style scoped>
  .recommend{

    display: flex;
    font-size: 12px;
    width:100%;
    text-align: center;
    padding:10px 0 20px;
    border-bottom: 8px solid #eeeeee ;
  }
  .recommend-item{
    flex:1
  }
  .recommend-item img{
    width:65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>
