<template>
    <div class="cartList">
      <scroll class="content">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"></cart-list-item>
      </scroll>

    </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import {mapGetters} from 'vuex';
  import CartListItem from "./CartListItem";

    export default {
        name: "CartList",
      components:{
        Scroll,
        CartListItem
      },
      computed:{
          ...mapGetters(['cartList'])
      }

    }
</script>

<style scoped>
  .cartList{
    height: calc(100vh - 49px - 44px - 40px)
  }
  .content{
    height: calc(100% - 40px);
    overflow: hidden;
  }

</style>
