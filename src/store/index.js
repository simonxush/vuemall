import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    carList:[]
  },
  getters:{
    cartList(state){
      return state.carList;
    }
  },
  mutations: {
    addCounter(state,payload){
      payload.count++;
    },
    addToCart(state,payload){

      payload.checked = true;
      state.carList.push(payload);
    }

  },
  actions: {
    addCart(context,payload){

      return new Promise((resolve,reject)=>{

        let oldProduct = context.state.carList.find(item => item.iid === payload.iid);

        // let index = state.carList.indexOf(payload);

        if(oldProduct){
          //let oldProduct = state.carList[index];
          //oldProduct.count+=1;
          context.commit('addCounter',oldProduct);
          resolve('当前的商品数量+1');
        }else {
          payload.count =1;
          // context.state.carList.push(payload);
          context.commit('addToCart',payload);
          resolve('添加了新的商品');
        }

      })



      /*
      let oldProduct = null;
      for(let item of sate.carList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      if(oldProduct){
        oldProduct.count+=1;
      }else{
        payload.count =1;
        state.carList.push(payload);
      }
       */

    }
  },
  modules: {
  }
})
