export default {
  state: {
    cart: []
  },
  getters: {
    CART: state => {
      return state.cart
    }
  },
  mutations: {
    GET_CART (state, recipe) {
      state.newRecipe = recipe
    },
    ADD_CART (state, newRecipe) {
      state.cart.push({
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
