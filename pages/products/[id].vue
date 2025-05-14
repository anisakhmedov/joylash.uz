<template>
  <div id="prod">
    <div class="_margin"></div>
    <div class="item">
      <div class="left">
        <img class="mainImg" :src="house.mainImage" alt="">
        <div class="carousel-prod">
          <div class="ar">
            <img class="arrow" style="transform: rotate(90deg);" src="~/public/icons/arrow.svg" alt="">
          </div>
          <div class="images">
            <div class="img" v-for="i of house.additionalImages" :key="i">
              <img :src="i" alt="">
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
            <h2>{{ house.title }} <span :class="house.quality == 1 ? 'new' : 'old'">{{ house.quality == 1 ? 'Новое' :
              'Б/У' }}</span></h2>
            <p>{{ house.description || t('product.noDisc') }}</p>
          </div>
          <div class="nav">
            <div class="save">
              <img src="~/public/icons/save.svg" @click="addToWhishlist()" alt="">
            </div>
            <div class="share">
              <img src="~/public/icons/share.svg" @click="saveToClipdrop()" alt="">
            </div>
          </div>
        </div>
        <hr>
        <div class="price">
          <div class="main">
            <p id="price">${{ house.price }}</p>
            <div class="btns">
              <div class="add" @click="addToWhishlist()">
                <img src="~/public/icons/bag.svg" alt="">
                <p>{{ t('product.add_to_wishlist') }}</p>
              </div>
              <a class="call" :href="`tel:${house.phoneNumberUser}`" style="display: flex;">
                <img src="~/public/icons/phone.svg" alt="">
                <p style="color: white;">{{ t('product.call') }}</p>
              </a>
              <a :href="house.sms" class="message">
                <img src="~/public/icons/message.svg" alt="">
                <p>{{ t('product.message') }}</p>
              </a>
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
      <NuxtLink target="_blank" :to="`https://yandex.com/maps/?pt=${coordsSpc[1]},${coordsSpc[0]}&z=16&l=map`">
        <Map style="margin-top: 50px;" v-if="locationObj && allLocations.length" :zoom="16" :locations="allLocations"
          :center="locationObj" />
      </NuxtLink>
    </client-only>


    <div class="discItem">
      <ul class="listItems">
        <li class="top">
          <h2>{{ t('product.product_description') }}</h2>
          <p>{{ house.discription || t('product.noDisc') }}</p>
        </li>
        <li>
          <h2>{{ t('product.benefits') }}</h2>
          <ul>
            <li v-for="(plus, i) in house.pluses || []" :key="i">
              <img src="~/public/icons/check.svg" alt="">
              <p>{{ plus }}</p>
            </li>
          </ul>
        </li>
        <li>
          <h2>{{ t('product.house_details') }}</h2>
          <ul>
            <li>
              <img src="~/public/icons/check.svg" alt="">
              <p>{{ t('product.floor') }} {{ house.floor }}</p>
            </li>
            <li>
              <img src="~/public/icons/check.svg" alt="">
              <p>{{ t('product.roomsNumber') }} {{ house.roomsNumber }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <p class="smthID" style="font-size: 30px; margin: 60px 0 30px 0; font-weight: 600;">{{ t('product.similar_items') }}
    </p>
    <Items :houses="similarHouses" />
    <div id="mobileVersion" v-show="widthWindow">
      <NuxtLink :to="'tel:' + house.phoneNumberUser">Позвонить</NuxtLink>
      <NuxtLink :to="house.sms">SMS</NuxtLink>
    </div>
  </div>
</template>

<script>
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'
import axios from 'axios'
import { defineComponent } from 'vue'

export default {
  components: { Map, Items },
  data() {
    return {
      house: {},
      locationObj: null,
      similarHouses: [],
      allHouse: [],
      coordsSpc: [],
      alreadyLiked: [],
      widthWindow: []
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  mounted() {
    let id;
    if (process.client) {
      id = window.location.href.split('products/')[1]

      window.innerWidth <= 600 ? this.widthWindow = true : this.widthWindow = false
    }

    axios.get('https://joylash-778750a705b4.herokuapp.com/usersJoy/' + localStorage.user,)
      .then((res) => {
        this.alreadyLiked = res.data.data.likedHouses

      })
      .catch((err) => {
      })


    axios.get(`https://joylash-778750a705b4.herokuapp.com/houses/${id}`)
      .then((res) => {
        this.house = res.data.data
        this.coordsSpc = this.house.coords

        this.locationObj = {
          lat: this.house.coords[0],
          lng: this.house.coords[1]
        }

        this.allHouse = [{
          lat: this.house.coords[0],
          lng: this.house.coords[1],
          id: this.house._id,
          title: this.house.title
        }]
      })
  },

  computed: {
    allLocations() {
      return this.allHouse
        .map(h => {
          if (h.lat && h.lng && h.id) {
            return {
              lat: h.lat,
              lng: h.lng,
              id: h.id,
              title: h.title || ''
            }
          }
          return null;
        })
        .filter(Boolean)
    }
  },
  methods: {
    addToWhishlist() {
      if (process.client) {

        let id = window.location.href.split('products/')[1]

        if (this.alreadyLiked.length == 0) {
          this.alreadyLiked.push(id)

          axios.patch('https://joylash-778750a705b4.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: this.alreadyLiked })
            .then((res) => {
            })
            .catch((err) => {

            })

        } else {


          if (this.alreadyLiked.includes(id)) {
            alert('Уже добавлен')
          } else {
            this.alreadyLiked.push(id)
            axios.patch('https://joylash-778750a705b4.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: this.alreadyLiked })
          }
        }
      }
    },
    addNewLike() {
    },
    saveToClipdrop() {
      if (process.client) {
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            alert('Ссылка скопирована в буфер обмена!');
          })
          .catch(err => {
            console.error('Ошибка копирования:', err);
          });

      }
    }
  }
}
</script>