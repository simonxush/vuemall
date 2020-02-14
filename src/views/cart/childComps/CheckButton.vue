<template>
    <div class="checkbutton" :class="{checked:isChecked}">
      <img src="~assets/img/cart/tick.svg">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
      props:{
          isChecked :{
            type :Boolean,
            default:false
          }
      }
    }
</script>

<style scoped>
.checkbutton{
  border-radius: 50%;
  border:2px solid #aaa;
}
  .checked{
    border-color:red;
    background: red;
  }
</style>
