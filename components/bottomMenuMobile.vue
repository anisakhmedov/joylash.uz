<template>
  <div id="menuMobile">
    <div class="circle">
      <NuxtLink :to="$localePath('/')"><img src="/icons/home.svg"></NuxtLink>
      <NuxtLink :to="$localePath('/allProducts')"><img src="/icons/layers.svg" alt=""></NuxtLink>
      <NuxtLink :to="$localePath('/createHouse')"><img src="/icons/plus.svg" alt=""></NuxtLink>
      <NuxtLink :to="$localePath('/whishlist')"><img src="/icons/star.svg" alt=""></NuxtLink>
      <div class="asd">
        <img @click="openMenu = !openMenu" src="/icons/menu.svg" alt="">
        <p class="wrapperMenu" v-show="openMenu">
          <span class="profile">
            <NuxtLink class="profA" to="/profile">
              <img src="~/public/icons/user.svg" alt="">
            </NuxtLink>
          </span>
          <span class="lang">
            <img style="filter: invert(0%);" @click="isActive = !isActive" src="~/public/icons/languages.svg" alt="">

            <span v-show="isActive" class="changeLang">
              <div class="block-lang" :class="isActive ? 'active' : ''">
                <div class="rus">
                  <NuxtLink @click="openMenu = false" :to="$switchLocalePath('ru')">
                    RU
                  </NuxtLink>
                </div>
                <div class="uz">
                  <NuxtLink @click="openMenu = false" :to="$switchLocalePath('uz')">
                    UZ
                  </NuxtLink>
                </div>
                <div class="eng">
                  <NuxtLink @click="openMenu = false" :to="$switchLocalePath('en')">
                    ENG
                  </NuxtLink>
                </div>
              </div>
            </span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// import { useLocalePath } from 'vue-i18n-routing' // Nuxt auto-imports this too

export default {
  data() {
    return {
      isActive: false,
      openMenu: false
    }
  },
  // computed: {
  //   localePath() {
  //     return useLocalePath()
  //   }
  // },
  unmounted() {
    this.isActive = false
    this.openMenu = false
  }
}
</script>

<style></style>