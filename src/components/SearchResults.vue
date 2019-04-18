<template>
  <v-container class="ma-0" v-if="renderedComponent">
    <v-layout row wrap>
<!-- ----------------- FilterBox Options ----------------- -->
      <v-card id="filterBoxOptions" class="hidden-sm-and-down" xs3>
        <v-card-title primary class="title">Diet Filters: </v-card-title>
          <v-divider></v-divider>
          <v-layout column>
              <v-flex v-for="item in filterOptions" :key="item.id">
                  <v-checkbox :id="item.id" v-model="tagged" :value="item.tag" :label="item.tag">
                  </v-checkbox>
              </v-flex>
          </v-layout>
      </v-card>
<!-- ----------------- Navigation Drawer ----------------- -->
      <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
        <v-layout column>
          <v-list subheader>
            <v-list-tile>
              <ShoppingList/>
            </v-list-tile>
            <v-subheader>Diet Filters:</v-subheader>
            <v-list-tile v-for="item in filterOptions" :key="item.id">
              <v-list-tile-action>
                  <v-checkbox :id="item.id" v-model="tagged" :value="item.tag" :label="item.tag">
                  </v-checkbox>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-navigation-drawer>
<!-- ----------------- Recipe Cards ----------------- -->
      <v-flex v-for="(item, i) in updateList" :key="i" xs3 offset-xs2>
        <div class="card-container">
          <v-card class="u-clearfix">
            <div class="card-body">
              <v-card-title>
                <div class="headline">{{ item.recipe.label }}</div>
                <span class="card-author subtle">{{ item.recipe.source }}</span>
              </v-card-title>
              <v-card-text class="card-description subtle">
                <ul class="icon">
                  <li><v-icon >person</v-icon><span>{{ item.recipe.yield }}</span></li>
                  <li><v-icon>timer</v-icon><span>{{ getTime(item.recipe.totalTime) }}</span></li>
                </ul>
                <ul v-for="(health, index) in item.recipe.healthLabels" :key="index">
                  <li>{{ health }}</li>
                </ul>
                <ul v-for="(diet) in item.recipe.dietLabels" :key="diet">
                  <li>{{ diet }}</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="orange" :href="item.recipe.url" target="_blank">Read More</v-btn>
                <NutritionFacts v-bind:facts="item.recipe.totalNutrients" />
                <v-btn flat color="orange" @click="addCart(item.recipe)">Add to Cart</v-btn>
              </v-card-actions>
            </div>
            <v-img :src="item.recipe.image" height="380px"></v-img>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
<!-- ----------------- Pagination ----------------- -->
    <v-layout justify-center class="mt-3">
      <v-pagination
      v-if="updateList.length !== 0"
       v-model="page"
       :length="maxPaginationVisible"
       :total-visible="maxPaginationVisible"
      >
      </v-pagination>
    </v-layout>
    <v-dialog
      v-model="dialog"
      width="500"
    >
<!-- ----------------- Added to List Dialog ----------------- -->
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{dialogTitle}}
        </v-card-title>
        <v-card-text>
          {{dialogMsg}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import NutritionFacts from './NutritionFacts'
import ShoppingList from './ShoppingList'
export default {
  components: {
    NutritionFacts,
    ShoppingList
  },
  computed: {
    recipeList () {
      return this.$store.getters.getRecipes
    },
    cartList () {
      return this.$store.getters.CART
    },
    // ----------------- Filter Computed -----------------
    // Gets currentList
    currentList () {
      return this.tagged.length > 0 ? this.getFilteredResults() : this.recipeList
    },
    // ----------------- Pagination Computed -----------------
    // Determine how many pages
    maxPaginationVisible () {
      if (this.currentList !== null) {
        return Math.ceil(this.currentList.length / this.numItemPerPage)
      }
      return 0
    },
    // Shows what recipes to use on page
    updateList () {
      if (this.currentList !== null) {
        let listItems = this.currentList
        let begin = (this.page - 1) * this.numItemPerPage
        let end = begin + this.numItemPerPage
        return listItems.slice(begin, end)
      }
      return []
    },
    // Displays search results after query
    renderedComponent () {
      return this.$store.getters.getRecipes != null
    }
  },
  props: {
    drawer: Boolean
  },
  data () {
    return {
      page: 1,
      numItemPerPage: 10,
      filterOptions: [
        { tag: 'Balanced' },
        { tag: 'High-Protein' },
        { tag: 'High-Fiber' },
        { tag: 'Low-Fat' },
        { tag: 'Low-Carb' },
        { tag: 'Low-Sodium' }
        // { tag: 'vegan' },
        // { tag: 'vegetarian' },
        // { tag: 'dairy-free' },
        // { tag: 'low-sugar' },
        // { tag: 'low-fat-abs' },
        // { tag: 'sugar-conscious' },
        // { tag: 'fat free' },
        // { tag: 'gluten free' },
        // { tag: 'wheat free' }
      ],
      tagged: [],
      dialogTitle: '',
      dialogMsg: '',
      dialog: false
    }
  },
  methods: {
    // Convert seconds into hours and minutes
    getTime (totalMinutes) {
      var minutes = totalMinutes % 60
      var hours = (totalMinutes - minutes) / 60
      var time = hours + ' hr ' + minutes + ' min'
      return time
    },
    // ----------------- Filter Methods -----------------
    // Gets list of recipe that matches desired tags if any
    getFilteredResults () {
      let filteredList = []
      filteredList = this.recipeList.filter(recipe => {
        return this.tagged.some(tag => {
          return recipe.recipe.dietLabels.includes(tag)
        })
      })
      return filteredList
    },
    // ----------------- Adding to Shopping List -----------------
    // Adds to shopping list and displays error if already added
    addCart (payload) {
      if (!this.isInCart(payload)) {
        this.$store.dispatch('addCart', payload)
        this.dialog = true
        this.dialogTitle = 'Success'
        this.dialogMsg = 'Recipe Added to Shopping List'
      } else {
        this.dialog = true
        this.dialogTitle = 'Sorry'
        this.dialogMsg = 'Recipe is already Added :('
      }
    },
    // Checks if already in shopping list
    isInCart (payload) {
      let vm = this
      if (this.cartList.length !== 0) {
        let result = this.cartList.find(elem => {
          return elem.id === vm.extractId(payload.uri)
        })
        if (result === undefined) {
          return false
        }
        return true
      }
      return false
    },
    extractId (uri) {
      return uri.substr(uri.indexOf('_') + 1, uri.length)
    }
  }
}
</script>

<style scoped>
*, *:before, *:after {
  box-sizing: inherit;
}

#filterBoxOptions {
  position: fixed;
  top: 25.6%;
  left: 3%;
  z-index: 2;
  height: 385px;
  width: 275px;
}

.container {
  min-width: 1000px;
}

.card-container {
  margin: 25px auto 0;
  position: relative;
  width: 692px;
}

.card-body {
  display: inline-block;
  float: left;
  padding-right: 20px;
  width: 310px;
  height: 100%;
}

.card-author {
  font-size: 12px;
  letter-spacing: .5px;
  text-transform: uppercase;
}

.headline {
  width: 100%;
}

html {
  background: #FAF7F2;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.icon li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}

.icon li:first-child {
  margin-left: 0;
}

.icon li span {
  margin-left: 7px;
}

.layout.column > .flex {
  max-height: 40px;
}

.subtle {
  color: #aaa;
}

.u-clearfix:before,
.u-clearfix:after {
  content: " ";
  display: table;
}

.u-clearfix:after {
  clear: both;
}

.u-clearfix {
  *zoom: 1;
}

ul {
  list-style: none;
  padding: 0;
}

.v-card {
  background-color: #fff;
  padding: 30px;
  position: relative;
  max-height: 440px;
}

.v-card-title {
  font-family: serif;
  font-size: 60px;
  font-weight: 300;
  line-height: 60px;
  margin: 10px 0;
}

.v-card-text {
  display: inline-block;
  font-weight: 300;
  line-height: 22px;
  margin: 10px 0;
}

.v-img {
  float: right;
}
</style>
