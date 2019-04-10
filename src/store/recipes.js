// import axios from 'axios'
// const APIKEY = '3aad3324797263bbfd0e31db394a2281'
// const APIID = '44f1859e'
import APIDATA from './api.js'
const state = {
  recipe: null,
  shopping: []
}
const mutations = {
  setRecipe (state, payload) {
    state.recipe = payload
  },
  resetState (state) {
    state.recipe = null
  },
  setShoppingItem (state, payload) {
    state.shopping.push(payload)
  }
}
const actions = {
  callApi ({ commit }, payload) {
    // let url = 'https://api.edamam.com/search?q=' + payload + '&app_id=' + APIID + '&app_key=' + APIKEY + '&from=0&to=50'
    // commit('resetState')
    // axios.get(url)
    //   .then(response => {
    //     console.log(response.data)
    //     commit('setRecipe', response.data.hits)
    //   })
    if (payload !== '') {
      commit('resetState')
      commit('setRecipe', APIDATA.hits)
    }
  },
  addItemToShoppingList ({ commit }, payload) { // adds items to the shopping list
    commit('setShoppingItem', payload)
  }
}
const getters = {
  getRecipes (state) {
    return state.recipe
  },
  getShoppingList (state) { // return shopping list
    return state.shopping
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
