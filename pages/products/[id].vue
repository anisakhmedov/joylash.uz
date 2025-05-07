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
            <h2>{{ house.title }}</h2>
            <p>{{ house.description }}</p>
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
            <p id="price">${{ house.price }}</p>
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
          <div class="itemOpt" v-for="i of house.pluses" :key="i">
            <p>{{ i }}</p>
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

    <client-only>
      <Map v-if="locationObj" style="max-width: none; margin-top: 30px;" :zoom="16" :locations="[locationObj]"
        :center="locationObj" />
    </client-only>

    <div class="discItem">
      <ul class="listItems">
        <li class="top">
          <h2>Product Description</h2>
          <p>{{ house.description }}</p>
        </li>
        <li>
          <h2>Benefits</h2>
          <ul>
            <li v-for="(plus, i) in house.pluses || []" :key="i">
              <img src="~/public/icons/check.svg" alt="">
              <p>{{ plus }}</p>
            </li>
          </ul>
        </li>
        <li>
          <h2>House Details</h2>
          <ul>
            <li>
              <img src="~/public/icons/check.svg" alt="">
              <p>Floor: {{ house.floor }}</p>
            </li>
            <li>
              <img src="~/public/icons/check.svg" alt="">
              <p>Rooms: {{ house.roomsNumber }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <p style="font-size: 30px; margin: 60px 0 30px 0; font-weight: 600;">Similar Items You Might Also Like</p>
    <Items :houses="similarHouses" />
  </div>
</template>

<script>
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'
import axios from 'axios'

export default {
  components: { Map, Items },
  data() {
    return {
      house: {},
      locationObj: null,
      similarHouses: []
    }
  },
  mounted() {
    let id;
    if (process.client) {
      id = window.location.href.split('products/')[1]
    }

    axios.get(`https://joylash-778750a705b4.herokuapp.com/houses/${id}`)
      .then((res) => {
        this.house = res.data.data
        console.log(this.house);
        
      })

    if (Array.isArray(this.house.coords) && this.house.coords.length === 2) {
      const [lat, lng] = this.house.coords
      this.locationObj = { lat, lng }
    } else {
      // Самарканд (по умолчанию)
      this.locationObj = { lat: 39.6542, lng: 66.9597 }
    }
    // Если ошибка — тоже fallback на Самарканд
    this.locationObj = { lat: 39.6542, lng: 66.9597 }
    // Похожие объекты
    const response = axios.get('https://joylash-778750a705b4.herokuapp.com/houses')
    // this.similarHouses = response.data.filter(h => h._id !== id) || []
  }
}
</script>