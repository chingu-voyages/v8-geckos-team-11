<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          flat
          color="orange"
          v-on="on"
        >
          Nutrition Facts
        </v-btn>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Nutrition Facts
        </v-card-title>

        <v-card-text>
          <ul v-for="(item) in facts" :key="item.index">
            <li>{{ item.label }} : {{ Math.ceil(item.quantity) }} {{ item.unit }}</li>
          </ul>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
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
  props: {
    facts: Object
  }
}
</script>
<style>
ul {
  list-style: none;
}
</style>
