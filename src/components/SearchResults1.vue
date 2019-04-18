<template>
  <v-container class="ma-0">
    <v-layout row wrap>
      <v-flex>
        <div class="card-container">
          <v-card class="u-clearfix">
            <div class="card-body">
              <v-card-title>
                <div class="headline">Roast Beef Stew</div>
                <span class="card-author subtle">Random author</span>
              </v-card-title>
              <v-card-text class="card-description subtle">
                <ul class="icon">
                  <li><v-icon >person</v-icon><span>2</span></li>
                  <li><v-icon>timer</v-icon><span>1 hr 2 mins</span></li>
                </ul>
                <ul>
                  <li>Low-Card</li>
                  <li>Sugar-Conscious</li>
                  <li>Peanut-Free</li>
                  <li>Tree-Nut-Free</li>
                  <li>Alcohol-Free</li>
                </ul>
              </v-card-text>
              <v-card-actions>
                <v-btn flat color="orange">Read More</v-btn>
                <v-btn flat color="orange">Nutrition Facts</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn flat color="orange" @click="addCart(item.recipe)">Add to Cart</v-btn>
              </v-card-actions>
            </div>
            <v-img src="https://www.edamam.com/web-img/98a/98aa5d5cc0d88b28c2b9221a099b1a14.jpg" height="380px"></v-img>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
*, *:before, *:after {
  box-sizing: inherit;
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
