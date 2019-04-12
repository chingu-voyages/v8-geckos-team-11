export default {
  state: {
    cart: []
  },
  getters: {
    CART: state => {
      return state.cart
    },
    CART_SIZE: state => {
      return state.cart.length
    }
  },
  mutations: {
    ADD_CART (state, newRecipe) {
      let newId = newRecipe.uri
      state.cart.push({
        id: newId.substr(newId.indexOf('_') + 1, newId.length),
        name: newRecipe.label,
        ingredients: newRecipe.ingredientLines
      })
    },
    /*
REMOVE_CART(state, ingredient) {
  var cart = state.cart
  cart.splice(cart.indexOf(ingredient), 1)
}
*/
    CLEAR_CART (state) {
      state.cart = []
    }
  },
  actions: {
    addCart: (context, payload) => {
      context.commit('ADD_CART', payload)
    },
    clearCart: (context) => {
      context.commit('CLEAR_CART')
    }
  }
}
