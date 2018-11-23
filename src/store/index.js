import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: localStorage.getItem('city')?localStorage.getItem('city'):'深圳',
    cityID: localStorage.getItem('cityID')?localStorage.getItem('cityID'):30
  },
  getters:{
    date(){
      var date = new Date();
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
          month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      return currentdate;
    }
  },
  mutations: { 
    setCity(state, value){
      state.city = value;
    },
    setCityID(state, value){
      state.cityID = value;
    }
  },
  actions: {
    selectCity(context, params){
      context.commit('setCity', params.city);
      context.commit('setCityID', params.id);
      // 持久化保存数据
      localStorage.setItem('city', params.city);
      localStorage.setItem('cityID', params.id);

      new Date
    }
  }
})
