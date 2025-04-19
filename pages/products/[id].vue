<template>
  <div id="prod">
    <div class="_margin"></div>
    <div class="item">
      <div class="left">
        <img class="mainImg" src="~/public/images/bg_product.png" alt="">
        <div class="carousel-prod">
          <div class="ar">
            <img class="arrow" style="transform: rotate(90deg);" src="~/public/icons/arrow.svg" alt="">
          </div>
          <div class="images">
            <div class="img" v-for="i of 10" :key="i">
              <img src="~/public/images/bg_product.png" alt="">
            </div>
          </div>
          <div class="ar">
            <img class="arrow" style="transform: rotate(-90deg);" src="~/public/icons/arrow.svg" alt="">
          </div>

        </div>
      </div>
      <div class="right">
        <div class="title">
          <div class="main">
            <h2>Embrace Sideboard</h2>
            <p>Teixeira Design Studio</p>
          </div>
          <div class="nav">
            <div class="like">
              <img src="~/public/icons/like-prod.svg" alt="">
              <p>109</p>
            </div>
            <div class="save">
              <img src="~/public/icons/save.svg" alt="">
            </div>
            <div class="share">
              <img src="~/public/icons/share.svg" alt="">
            </div>
          </div>
        </div>
        <hr>
        <div class="price">
          <div class="main">
            <p id="price">$500.000</p>
            <div class="btns">
              <div class="add">
                <img src="~/public/icons/bag.svg" alt="">
                <p>Add To Wishlist</p>
              </div>
              <div class="call">
                <img src="~/public/icons/phone.svg" alt="">
                <p>Call</p>
              </div>
              <div class="message">
                <img src="~/public/icons/message.svg" alt="">
                <p>Message</p>
              </div>
            </div>
          </div>
        </div>
        <hr>

        <div class="options">
          <div class="itemOpt" v-for="i of 10" :key="i">
            <img src="~/public/icons/scale-org.svg" alt="">
            <p>
              100m<sup>2</sup>
            </p>
          </div>
        </div>

        <div class="agency">
          <div class="logoAgen">
            <img src="~/public/images/logo.png" alt="">
          </div>
          <div class="text">
            <div class="mainTitle">Estate Agency</div>
            <div class="titleAgen">Joylash Agency Uzbekistan</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="" style="height: 50px; "></div> -->
    <client-only>
      <Map style="max-width: none; margin-top: 30px;" :zoom="16" :locations="[locationObj]" />
    </client-only>
    <div class="discItem">
      <ul class="listItems">
        <li class="top">
          <h2>Product Description</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi fugit, nesciunt minima natus incidunt
            exercitationem nulla et neque corrupti accusantium quidem dolorum deleniti vitae commodi quod repudiandae
            sint placeat explicabo tempore non sit nobis officia! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Unde provident, nulla fugiat consectetur reiciendis hic ipsam voluptates ab maxime! Ipsam incidunt
            saepe officia molestiae distinctio ipsa. Sint in dolorem nam!</p>
        </li>
        <li>
          <h2>Benefits</h2>
          <ul>
            <li v-for="i of 7" :key="i">
              <img src="~/public/icons/check.svg" alt="">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam deserunt necessitatibus!
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h2>House Details</h2>
          <ul>
            <li v-for="i of 7" :key="i">
              <img src="~/public/icons/check.svg" alt="">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam deserunt necessitatibus!
              </p>
            </li>
          </ul>
        </li>
        <li>
          <h2>More Details</h2>
          <ul>
            <li v-for="i of 7" :key="i">
              <img src="~/public/icons/check.svg" alt="">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem laboriosam deserunt necessitatibus!
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <p style="font-size: 30px; margin: 60px 0 30px 0; font-weight: 600;">Similar Items You Might Also Like</p>
    <Items :houses="houses" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Map from '~/components/Map.vue'
import { houses } from '~/data/houses.js'

const route = useRoute()
const house = houses.find(h => h._id === route.params.id) || {}

const [lat, lng] = house.locationMap
  ? house.locationMap.split(',').map(n => parseFloat(n.trim()))
  : [0, 0]
const locationObj = { lat, lng }
</script>

<style></style>