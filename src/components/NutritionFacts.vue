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

        <v-card-text ref='content'>
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
          <v-btn
            color="primary"
            flat
            @click="download"
          >
            Export to PDF
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import jsPDF from 'jspdf'

export default {
  data () {
    return {
      dialog: false
    }
  },

  props: {
    facts: Object
  },
  methods: {
    download () {
      const doc = new jsPDF('p', 'pt', 'a4')
      const contentHTML = this.$refs.content.innerHTML
      doc.text('Nutrition Facts', 20, 50)
      doc.fromHTML(contentHTML, 20, 70, {
        width: 170
      })
      doc.save('Nutrition Facts.pdf')
    }
  }
}
</script>
<style>
ul {
  list-style: none;
}

</style>
