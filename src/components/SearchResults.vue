<template>
  <v-container grid-list-lg>
    <!-- ----------------- Navigation Drawer ----------------- -->
    <v-navigation-drawer app v-model="drawer" width="250px" disable-resize-watcher>
      <v-layout column class="pt-4 pl-3">
        <v-list subheader>
          <v-list-tile>
            <About/>
          </v-list-tile>
          <v-list-tile>
            <Faq/>
          </v-list-tile>
          <v-list-tile>
            <ShoppingList/>
          </v-list-tile>
          <div v-if="renderedComponent">
            <v-subheader>Diet Filters:</v-subheader>
            <v-list-tile v-for="item in filterOptions" :key="item.id">
              <v-list-tile-action>
                  <v-checkbox :id="item.id" v-model="tagged" :value="item.tag" :label="item.tag">
                  </v-checkbox>
              </v-list-tile-action>
            </v-list-tile>
          </div>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
<!-- ----------------- FilterBox Options ----------------- -->
    <v-layout v-if="renderedComponent">
      <v-flex md3 xl2 class="hidden-sm-and-down">
        <v-card id="filterBoxOptions">
          <v-card-title primary class="title">Diet Filters: </v-card-title>
            <v-divider></v-divider>
            <v-flex class="filterCheckbox" v-for="item in filterOptions" :key="item.id">
                <v-checkbox :id="item.id" v-model="tagged" :value="item.tag" :label="item.tag">
                </v-checkbox>
            </v-flex>
        </v-card>
      </v-flex>
<!-- ----------------- Recipe Cards ----------------- -->
      <v-flex sm12 md9 xl10>
        <v-alert
          :value="alert"
          type="error"
          outline
        >
          No results found!. Try using another filter
        </v-alert>
        <v-layout justify-center row wrap>
          <v-flex v-for="(item, i) in updateList" :key="i" xs12 sm6 lg4>
            <v-card
              class="mx-1"
              min-width="280px"
              max-height="529px"
            >
              <v-img
                aspect-ratio
                max-height="300px"
                min-height="200px"
                :src="item.recipe.image"
              ></v-img>
              <v-card-title primary-title>
                <div class="cardTitle">
                  <div class="headline accent--text">{{ item.recipe.label }}</div>
                  <span>{{ item.recipe.source }}</span>
                </div>
              </v-card-title>
              <v-card-text>
                <ul class="cardList">
                  <li><v-icon>person</v-icon><span>{{ item.recipe.yield }}</span></li>
                  <li><v-icon>timer</v-icon><span>{{ getTime(item.recipe.totalTime) }}</span></li>
                </ul>
                <ul class="cardList">
                  <li class="dietLabels" v-for="(diet) in item.recipe.dietLabels" :key="diet">{{ diet }}</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  :href="item.recipe.url"
                  target="_blank"
                  flat
                  small
                >
                  Read More
                </v-btn>
                <NutritionFacts v-bind:facts="item.recipe.totalNutrients"/>
                <v-layout align-center justify-end>
                  <v-btn icon @click="addCart(item.recipe)">
                    <v-icon>add_shopping_cart</v-icon>
                  </v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        </v-flex>
    </v-layout>
<!-- ----------------- Pagination ----------------- -->
    <v-layout justify-center class="mt-3" v-if="renderedComponent">
      <v-pagination
      v-if="updateList.length !== 0"
      v-model="page"
      :length="maxPaginationVisible"
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
          class="headline primary"
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
            color="white"
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
import Faq from './Faq'
import About from './About'
export default {
  components: {
    NutritionFacts,
    ShoppingList,
    Faq,
    About
  },
  watch: {
    recipeList () {
      this.tagged = []
    },
    tagged () {
      this.page = 1
      if (this.tagged.length !== 0) {
        if (this.updateList.length !== 0) {
          this.alert = false
        } else {
          this.alert = true
        }
      } else {
        this.alert = false
      }
    },
    '$vuetify.breakpoint.mdAndUp' () {
      this.drawer = false
    }
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
  data () {
    return {
      page: 1,
      alert: false,
      numItemPerPage: 9,
      filterOptions: [
        { tag: 'Balanced' },
        { tag: 'High-Protein' },
        { tag: 'High-Fiber' },
        { tag: 'Low-Fat' },
        { tag: 'Low-Carb' },
        { tag: 'Low-Sodium' }
      ],
      tagged: [],
      dialogTitle: '',
      dialogMsg: '',
      dialog: false,
      drawer: false
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

<style>

/* .v-content {
  background-color: rgba(238, 223, 222, 0.65);
  background-attachment: fixed;
} */

#filterBoxOptions {
  position: sticky;
  z-index: 1;
  height: 365px;
  padding: 30px;
  top: 100px;
}

.cardTitle {
  width: 100%;
  max-width: max-content;
}

.filterCheckbox {
  height: 40px;
}

.headline {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card__text {
  min-height: 100px;
}

.v-card__title--primary {
  padding-bottom: 0;
}

.cardList li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}

.cardList li:first-child {
  margin-left: 0;
}

li span {
  margin-left: 7px;
}

ul {
  padding: 0;
}
</style>
