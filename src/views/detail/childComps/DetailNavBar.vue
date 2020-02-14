<template>
  <div>
    <navbar>
      <div slot="left" class="back" @click="backclick">
        <img src="~/assets/img/common/back.svg" >
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item" :class="{active:index === currentIndex}" @click="titleclick(index)">
          {{item}}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
    export default {
        name: "DetailNavBar",
      components:{
        Navbar
      },
      data(){
          return {
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
          }
      },
      methods:{
        titleclick(index){
          this.currentIndex = index;
          this.$emit('titleclick',index);
        },
        backclick(){
          this.$router.back();
        }
      }
    }
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
  .title-item{
    flex:1;
  }
  .active {
    color: var(--color-tint);

  }
  .back{
    margin-top: 2px;
  }
</style>
