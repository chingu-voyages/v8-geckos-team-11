<template>
  <v-container grid-list-md>
    <v-layout fluid row wrap>
      <v-flex v-for="(item, i) in updateList" :key="i" xl6 lg12>
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
    }
  },
  data () {
    return {
      page: 1,
      numItemPerPage: 10
    }
  },
  methods: {
    getTime (totalMinutes) {
      var minutes = totalMinutes % 60
      var hours = (totalMinutes - minutes) / 60
      var time = hours + ' hr ' + minutes + ' min'
      return time
    },
    addCart (payload) {
      this.$store.dispatch('addCart', payload)
      console.log(payload)
    }
  }
}
</script>
<style scoped>
*, *:before, *:after {
  box-sizing: inherit;
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
