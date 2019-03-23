import axios from 'axios'
const APIKEY = '3aad3324797263bbfd0e31db394a2281'
const APIID = '44f1859e'
const state = {
  recipe: null
}
const mutations = {
  setRecipe (state, payload) {
    state.recipe = payload
  },
  resetState (state) {
    state.recipe = null
  }
}
const actions = {
  callApi ({ commit }, payload) {
    let url = 'https://api.edamam.com/search?q=' + payload + '&app_id=' + APIID + '&app_key=' + APIKEY
    axios.get(url)
      .then(response => {
        console.log(response.data)
        commit('setRecipe', response.data)
      })
  }
}
const getters = {
  getRecipes (state) {
    return state.recipe
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
