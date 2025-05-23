<template>
  <div id="prod">
    <div class="arrowsBack">
      <NuxtLink style="color: black; display: flex; align-items: center; gap: 10px;" to="#"
        @click.prevent="$router.back()">
        <img style="transform: rotate(90deg);" src="/icons/arrow.svg" alt=""> {{ $t('def.backHome') }}
      </NuxtLink>
    </div>
    <div class="item">
      <div class="left">
        <img class="mainImg" :src="house.mainImage" alt="">
        <div class="carousel-prod" v-show="house.show">
          <div class="ar" data-edge="left" @click="dragImages('left')">
            <img class="arrow" data-edge="left" style="transform: rotate(90deg);" src="~/public/icons/arrow.svg" alt="">
          </div>
          <div class="images">
            <div class="img" v-for="i of house.allImages" :key="i">
              <img @click="showImage(i)" :src="i" alt="">
            </div>
          </div>
          <div class="ar" data-edge="right" @click="dragImages('right')">
            <img class="arrow" data-edge="right" style="transform: rotate(-90deg);" src="~/public/icons/arrow.svg"
              alt="">
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <div class="main">
            <h2>{{ house.title }} <span :class="house.quality == 1 ? 'new' : 'old'">{{ house.quality == 1 ? 'Новое' :
              'Б/У' }}</span></h2>
            <p>{{ (house.discription || house.description) || t('product.noDisc') }}</p>
          </div>
          <div class="nav">
            <div class="save">
              <img :src="likedIsActive ? '/icons/saved.svg' : '/icons/save.svg'" @click="checkWhishList('check')"
                alt="">
            </div>
            <div class="share">
              <img height="18px" :src="shareImg ? '/icons/check.svg' : '/icons/clipboard.svg'" @click="saveToClipdrop()"
                alt="">
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
        <div class="main"></div>
      </div>
    </div>

    <client-only>
      <NuxtLink target="_blank" :to="`https://yandex.com/maps/?pt=${coordsSpc[1]},${coordsSpc[0]}&z=16&l=map`">
        <YandexMap v-if="allHouse.length" :coords="[39.6542, 66.9597]" :zoom="17" :locations="allLocations" />
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
      widthWindow: [],
      likedIsActive: false,
      user: {},
      shareImg: false
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

    const userId = localStorage.getItem("user")
    if (userId) {
      axios.get(`https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/${userId}`)
        .then((res) => {
          this.alreadyLiked = res.data.data.likedHouses
          this.user = res.data.data
          for (let item of this.alreadyLiked) {
            if (window.location.href.includes(item)) {
              this.likedIsActive = true
            }
          }
        })
    }


    axios.get(`https://joylash-uz-4a09707016fe.herokuapp.com/houses/${id}`)
      .then((res) => {
        this.house = res.data.data
        this.coordsSpc = this.house.coords

        this.locationObj = {
          lat: this.house.coords[0],
          lng: this.house.coords[1]
        }

        if (this.house.additionalImages.length >= 1) this.house.show = true
        else this.house.show = false

        this.house.allImages = []
        this.house.allImages.push(this.house.mainImage)

        this.allHouse.push(this.house)
        

        for (let item of this.house.additionalImages) {
          this.house.allImages.push(item)
        }
      })
  },

  computed: {
    allLocations() { 
      return this.allHouse
        .map(h => {
          if (Array.isArray(h.coords) && h.coords.length === 2 && h._id) {
            return {
              coords: [h.coords[0], h.coords[1]],
              id: h._id,
              balloon: h.title || ''
            }
          }
          return null;
        })
        .filter(Boolean)
    },
    formattedYandexPoints() {
      return this.allHouse
        .filter(h => Array.isArray(h.coords) && h.coords.length === 2 && h._id)
        .map(h => ({
          geometry: [h.coords[1], h.coords[0]], // lng, lat
          properties: {
            id: h._id,
            title: h.title || ''
          }
        }))
    }
  },
  methods: {
    addToWhishlist() {
      if (process.client && localStorage.getItem("user")) {
        let id = window.location.href.split('products/')[1]
        if (this.alreadyLiked.length == 0) {
          this.alreadyLiked.push(id)
          axios.patch('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: this.alreadyLiked })
            .then(() => {
            })
        } else {
          if (this.alreadyLiked.includes(id)) {
          } else {
            this.alreadyLiked.push(id)
            axios.patch('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: this.alreadyLiked })
              .then((res) => {
                if (process.client) {
                  window.location.reload();
                }
              })
          }
        }
      } else {
        const localePath = this.$i18n.locale
        this.$router.push(this.localePath('/register'))

      }

    },
    checkWhishList() {
      if (localStorage.user) {
        if (this.likedIsActive) {
          let id = window.location.href.split('products/')[1]
          let newUser = this.user.likedHouses.filter(item => item != id)

          axios.patch('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: newUser })
            .then((res) => {
              axios.get('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + localStorage.user,)
                .then((res) => {
                  if (process.client) {
                    window.location.reload();
                  }
                })
                .catch((err) => {
                })
            })
        } else {
          if (process.client) {

            let id = window.location.href.split('products/')[1]

            if (this.alreadyLiked.length == 0) {
              this.alreadyLiked.push(id)

              axios.patch('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: this.alreadyLiked })
                .then((res) => {
                  if (process.client) {
                    window.location.reload()
                  }
                })
            } else {

              if (!this.alreadyLiked.includes(id)) {
                this.alreadyLiked.push(id)
                axios.patch('https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: this.alreadyLiked })
                  .then((res) => {
                    if (process.client) {
                      window.location.reload();
                    }
                  })
              }
            }
          }
        }
      } else {
        const localePath = this.$i18n.locale
        this.$router.push(this.localePath('/register'))
      }

    },
    saveToClipdrop() {
      if (process.client) {
        navigator.clipboard.writeText(window.location.href)
          .then(() => {
            this.shareImg = true
            setTimeout(() => {
              this.shareImg = false
            }, 2000)
          })
          .catch(err => {
            console.error('Ошибка копирования:', err);
          });

      }
    },
    showImage(param) {
      event.target.parentNode.parentNode.parentNode.parentNode.querySelector('.mainImg').src = param
      for (let item of event.target.parentNode.parentNode.children) {
        item.classList.remove('active')
        event.target.parentNode.classList.add('active')
      }
    },
    dragImages(param) {
      let axisX = document.querySelector('.images')
      if (param === 'right') {
        let count = 0
        let intRight = setInterval(() => {
          count += 2
          if (count >= 200) {
            clearInterval(intRight)
          }
          axisX.scrollBy({
            left: 2,
            behavior: "smooth"
          })
        }, 1)


      } else if (param === 'left') {
        let count = 0
        let intRight = setInterval(() => {
          count += 2
          if (count >= 200) {
            clearInterval(intRight)
          }
          axisX.scrollBy({
            left: -2,
            behavior: "smooth"
          })
        }, 1)
      }
    }
  }
}
</script>