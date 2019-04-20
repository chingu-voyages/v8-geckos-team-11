<template>
  <v-card
    :loading="loading"
    class="mx-auto my-5"
    max-width="374"
  >
    <v-img
      aspect-ratio
      height="300"
      src="item.recipe.image"
    ></v-img>
    <v-card-title primary-title>
      <div>
        <div class="headline">{{ item.recipe.label }}</div>
        <span class="grey--text">{{ item.recipe.source }}</span>
      </div>
    </v-card-title>
    <v-card-text>
      <div>Low-Carbs - Sugar-Conscious - Peanut-Free</div>
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
</template>
