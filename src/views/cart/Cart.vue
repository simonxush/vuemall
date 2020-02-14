<template>
 <div class="cart">
   <navbar class="cartnav">
     <div slot="center">购物车（{{cartLength}}）</div>
   </navbar>
   <cart-list></cart-list>
   <cart-bottom-bar></cart-bottom-bar>
 </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
    export default {
        name: "cart",
      components: {
          Navbar,
        CartList,
        CartBottomBar
        },
      computed:{
          cartLength(){
            return this.$store.state.carList.length;
          }
      }
    }
</script>

<style scoped>
  .cart{

  }
.cartnav{
  background:var(--color-tint);
  color: #ffffff;
}
</style>
