import Vue from 'vue'
import Vuex from 'vuex'
import recipe from './recipes'
import shoppinglist from './shoppinglist'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    recipe,
    shoppinglist
  }
})
