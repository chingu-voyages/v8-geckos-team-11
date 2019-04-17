<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="600"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          v-on="on"
        >
          Shopping List ({{cartSize}})
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Shopping List
        </v-card-title>
        <v-card-text>
          <template v-if="cartList.length !== 0">
            <v-layout v-for="(recipe) in cartList" :key="recipe.index">
              <v-flex xs2 >
                <v-btn color="primary" fab small dark @click="removeRecipe(recipe)">
                  <v-icon small>delete</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs5>
                <v-subheader class="ma-0 pa-0 blue--text">{{recipe.name}}</v-subheader>
                <ul class="ma-0 pa-0" v-for="(ingredient) in recipe.ingredients" :key="ingredient">
                  <li>{{ingredient}}</li>
                </ul>
                <v-divider class="mb-3 mt-3 blue darken-4"></v-divider>
              </v-flex>
            </v-layout>
          </template>
          <template v-else>
            <h3>List is Empty</h3>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="clearCart"
          >
            Clear
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      selectedRecipes: []
    }
  },
  computed: {
    cartList () {
      return this.$store.getters.CART
    },
    cartSize () {
      return this.$store.getters.CART_SIZE
    }
  },
  methods: {
    clearCart: function () {
      this.$store.dispatch('clearCart')
    },
    removeRecipe (recipe) {
      this.$store.dispatch('removeRecipe', recipe)
    }
  }
}
</script>
<style>
ul {
  list-style: none;
}
</style>
