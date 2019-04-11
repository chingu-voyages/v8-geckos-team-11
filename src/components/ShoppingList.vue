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
          Shopping Cart
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Shopping Cart
        </v-card-title>

        <v-card-text>
          <ul v-for="(recipe) in cartList" :key="recipe.index">
            <li v-for="(ingredient) in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
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
      dialog: false
    }
  },
  computed: {
    cartList () {
      return this.$store.getters.CART
    }
  },
  methods: {
    clearCart: function () {
      this.$store.dispatch('clearCart')
    }
  }
}
</script>
<style>
ul {
  list-style: none;
}
</style>
