<template>
  <v-container grid-list-md>
<!-- ----------------- FilterBox Options ----------------- -->
    <v-card id="filterBoxOptions" class="hidden-sm-and-down" v-if="renderedComponent">
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
<!-- ----------------- Recipe Cards ----------------- -->
    <v-layout v-if="renderedComponent">
      <v-flex md8 offset-md2>
        <v-layout justify-center row wrap>
          <v-flex v-for="(item, i) in updateList" :key="i" xl4 lg6>
            <v-card
              class="mx-1 recipeCard"
              min-width="316px"
              max-width="374px"
              max-height="529px"
            >
              <v-img
                aspect-ratio
                height="300px"
                :src="item.recipe.image"
              ></v-img>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ item.recipe.label }}</div>
                  <span class="grey--text">{{ item.recipe.source }}</span>
                </div>
              </v-card-title>
              <v-card-text>
                <ul>
                  <li><v-icon>person</v-icon><span>{{ item.recipe.yield }}</span></li>
                  <li><v-icon>timer</v-icon><span>{{ getTime(item.recipe.totalTime) }}</span></li>
                </ul>
                <ul>
                  <li class="dietLabels" v-for="(diet) in item.recipe.dietLabels" :key="diet">{{ diet }}</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="orange"
                  :href="item.recipe.url"
                  target="_blank"
                  flat
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
    <v-layout align-end justify-center class="mt-3" v-if="renderedComponent">
      <v-pagination id="pagination3d"
      v-if="updateList.length !== 0"
       v-model="page"
       :length="maxPaginationVisible"
       :total-visible="maxPaginationVisible"
       prev-icon="chevron_left" prev-icon-id="prevIcon"
       next-icon="chevron_right" next-icon-id="nextIcon"
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
  watch: {
    tagged () {
      this.page = 1
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
      numItemPerPage: 10,
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

<style scoped>
#filterBoxOptions {
  position: fixed;
  top: 25.6%;
  left: 3%;
  z-index: 1;
  height: 365px;
  width: 220px;
  padding: 30px;
  transform: translateY(25%);
}

/* styling for arrows in pagination container
  maybe we can separate the arrow icons some how?
  need to figure it out... or just add them individually

#pagination3d {
  transform: perspective(125px) rotateY(-60deg);
}
*/

.layout.column > .flex {
  max-height: 40px;
}

.v-card__text {
  min-height: 100px;
}

.v-card__title--primary {
  padding-bottom: 0;
}

li {
  display: inline-block;
  margin-left: 1em;
  line-height: 1em;
}

li:first-child {
  margin-left: 0;
}

li span {
  margin-left: 7px;
}

ul {
  padding: 0;
}

</style>
