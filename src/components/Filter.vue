<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card color="gray">
          <v-card-title primary class="title">Filter:</v-card-title>
          <div v-for="item in filterOptions" :key="item.id" xs4>
            <v-checkbox v-model="tagged" :label="item.tag" :value="item.tag"></v-checkbox>
            <!-- <label :for="item.id">{{item.tag}}</label>
            <input type="checkbox" :id="item.id" :value="item.tag" v-model="tagged"> -->
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  computed: {
    recipeList () {
      return this.$store.getters.getRecipes
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
    // getFilteredResults () {
    //   if (this.recipe.dietLabels.indexOf(this.tag) >= 0 ||
    //     this.recipe.healthLabes.indexOf(this.tag) >= 0) {
    //     this.tagged.push(this)
    //   }
    //   return ''
    // }
  },
  data: function () {
    return {
      filterOptions: [
        { id: 1, tag: 'balanced' },
        { id: 2, tag: 'high-protein' },
        { id: 3, tag: 'high-fiber' },
        { id: 4, tag: 'low-fat' },
        { id: 5, tag: 'low-carb' },
        { id: 6, tag: 'low-sodium' },
        { id: 7, tag: 'vegan' },
        { id: 8, tag: 'vegetarian' },
        { id: 9, tag: 'dairy-free' },
        { id: 10, tag: 'low-sugar' },
        { id: 11, tag: 'low-fat-abs' },
        { id: 12, tag: 'sugar-conscious' },
        { id: 13, tag: 'fat free' },
        { id: 14, tag: 'gluten free' },
        { id: 15, tag: 'wheat free' }
      ],
      tagged: []
    }
  },
  mounted () {
    this.selectedOption = this.value
  },
  watch: {
    value: function (newValue) {
      this.selectedOption = newValue
    }
  }
}
</script>
