<template>
  <v-container v-if="renderedComponent">
    <v-layout row wrap>
<!-- inserting filter here -->
    <v-container id="filterBoxOptions" lg3>
          <v-flex>
            <v-card color="gray" light>
              <v-card-title primary class="title">Diet Filters: </v-card-title>
              <div>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex v-for="item in filterOptions" :key="item.id" wrap lg3>
                        <v-checkbox :id="item.id" v-model="tagged" :value="item.tag" :label="item.tag">
                        </v-checkbox>
                    </v-flex>
                </v-layout>
                <button v-if="tagged.length > 0" v-on:click="getFilteredResults()">
                    Apply Filters
                </button>
              </div>
            </v-card>
          </v-flex>
    </v-container>
<!--end of filter-->

      <v-flex v-for="(item, i) in updateList" :key="i" xl6 lg8>
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
              </v-card-actions>
            </div>
            <v-img :src="item.recipe.image" height="380px"></v-img>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
    <v-layout justify-center class="mt-3">
      <v-pagination
      v-if="updateList.length !== 0"
       v-model="page"
       :length="maxPaginationVisible"
       :total-visible="maxPaginationVisible"
      >
      </v-pagination>
    </v-layout>
  </v-container>
</template>
<script>
import NutritionFacts from './NutritionFacts'

export default {
  components: {
    NutritionFacts
  },
  computed: {
    recipeList () {
      return this.$store.getters.getRecipes
    },
    maxPaginationVisible () {
      if (this.recipeList !== null) {
        return Math.ceil(this.recipeList.length / this.numItemPerPage)
      }
      return 0
    },
    updateList () {
      if (this.recipeList !== null) {
        let listItems = this.recipeList
        let begin = (this.page - 1) * this.numItemPerPage
        let end = begin + this.numItemPerPage
        return listItems.slice(begin, end)
      }
      return []
    },
    renderedComponent () {
      return this.$store.getters.getRecipes != null
    }
  },
  data () {
    return {
      page: 1,
      numItemPerPage: 10,
      filterOptions: [
        { id: '1', tag: 'balanced' },
        { id: '2', tag: 'high-protein' },
        { id: '3', tag: 'high-fiber' },
        { id: '4', tag: 'low-fat' },
        { id: '5', tag: 'low-carb' },
        { id: '6', tag: 'low-sodium' }
        // { id: '7', tag: 'vegan' },
        // { id: '8', tag: 'vegetarian' },
        // { id: '9', tag: 'dairy-free' },
        // { id: '10', tag: 'low-sugar' },
        // { id: '11', tag: 'low-fat-abs' },
        // { id: '12', tag: 'sugar-conscious' },
        // { id: '13', tag: 'fat free' },
        // { id: '14', tag: 'gluten free' },
        // { id: '15', tag: 'wheat free' }
      ],
      tagged: []
    }
  },
  methods: {
    getTime (totalMinutes) {
      var minutes = totalMinutes % 60
      var hours = (totalMinutes - minutes) / 60
      var time = hours + ' hr ' + minutes + ' min'
      return time
    },
    getFilteredResults () {
      let filterRecipeList = this.recipeList.filter(recipe=>{
        return (this.tagged.includes(recipe.dietLabels) || this.tagged.includes(recipe.healthLabels))
      })
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
