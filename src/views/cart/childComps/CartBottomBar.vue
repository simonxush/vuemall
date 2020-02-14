<template>
    <div class="cartbar">
      <div class="checkall">
        <check-button class="checkbutton" :is-checked="isSelectAll" @click.native="checkall" ></check-button>
        <span>全选</span>
      </div>
      <div class="totalPrice">
        合计：¥{{totalPrice}}
      </div>

      <div class="calculate">
        去计算： {{checkLength}}
      </div>
    </div>
</template>

<script>
  import CheckButton from "./CheckButton";

    export default {
        name: "CartBottomBar",
      components:{
        CheckButton
      },
      methods:{
        checkall(){
          if(this.isSelectAll){
            this.$store.state.carList.map(item =>item.checked = false)
          }else{
            this.$store.state.carList.forEach(item =>item.checked = true)
          }
        }
      },
      computed:{
        totalPrice(){
          return  this.$store.state.carList.filter(item =>{
            return item.checked
          }).reduce((prevalue,item)=>{
            return prevalue + item.price * item.count;
          },0)
        },
        checkLength(){
          return this.$store.state.carList.filter(item => item.checked).length;
        },
        isSelectAll(){

         //return  !(this.$store.state.carList.filter(item =>item.checked).length )
          if(this.$store.state.carList.length === 0) return false;
          return ! this.$store.state.carList.find(item => ! item.checked);
        }
      }
    }
</script>

<style scoped>
.cartbar{
  height: 40px;
  background: #eeeeee;
  position: relative;
  line-height: 40px;
  display: flex;
}
  .checkall{
    display: flex;
    align-items: center;
    width: 60px;
  }
.checkbutton{
 width: 20px;
  height: 20px;
  line-height: 20px;
}
.totalPrice{
  margin-left: 10px;
  flex:1;
}
.calculate{
  width: 90px;
  text-align: center;
  background: red;
  color:#fff;
}
</style>
