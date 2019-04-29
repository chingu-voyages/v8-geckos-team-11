<template>
  <v-container grid-list-lg v-if="renderedComponent">
    <!-- ----------------- Navigation Drawer ----------------- -->
    <v-navigation-drawer app v-model="drawer" disable-resize-watcher>
      <v-layout column class="pt-4 pl-3">
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
<!-- ----------------- FilterBox Options ----------------- -->
    <v-layout>
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
        <v-layout justify-center row wrap>
          <v-flex v-for="(item, i) in updateList" :key="i" xs12 sm6 lg4 xl3>
            <v-card
              class="mx-1 recipeCard"
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
    <v-layout align-end justify-center class="mt-3">
      <v-pagination
      v-if="updateList.length !== 0"
       v-model="page"
       :length="maxPaginationVisible"
       :total-visible="maxPaginationVisible"
       prev-icon="chevron_left"
       next-icon="chevron_right"
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
      numItemPerPage: 5, // 10 is default
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
  },
  mounted: function () {
    this.$nextTick(function () {
      let navPageArrows = [...document.getElementsByClassName('v-pagination__navigation')]

      navPageArrows.forEach(arrow => {
        arrow.style = 'transform: none;'
      })
    })
  }
}
</script>

<style>
.v-content {
  background-image: url('../assets/In_The_Pan_Bg.png');
  background-attachment: fixed;
}

#filterBoxOptions {
  position: sticky;
  z-index: 1;
  height: 365px;
  width: minmax(10%, 220px) ;
  padding: 30px;
  transform: translateY(25%);
}

/* styling for arrows in pagination container
  maybe we can separate the arrow icons some how?
  need to figure it out... or just add them individually
*/

ul.v-pagination > li > button.v-pagination__item {
  transform: perspective(75px) translateX(-5px) rotateY(-50deg) rotateZ(5deg);
  margin: 0;
  font-size: 2rem;
  color: blue;
  box-shadow: 0 -3px -1px;
  border: 1px solid;
  border-color: #FF9800;
}

ul.v-pagination > li {
  margin: 0;
  width: 25px;
}

ul.v-pagination > li:first-child {
  margin-right: 25px;
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
