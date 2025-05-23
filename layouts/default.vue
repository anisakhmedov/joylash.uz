<template>
  <div id="defaultView">
    <Header v-show="!isRegisterPage" />
    <div v-show="showMargin" class="_margin"></div>
    <slot />
    <Form v-show="!isRegisterPage" />
    <Footer v-show="!isRegisterPage" />
    <bottomMenuMobile v-show="showMenu" />
    <client-only>
      <div v-show="showMenu" style="height: 50px;"></div>
      <div v-show="sizeWindow" style="height: 50px;"></div>
    </client-only>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'

const route = useRoute()
const showMenu = ref(false)
const sizeWindow = ref(false)
const showMargin = ref(true)

const isRegisterPage = computed(() => route.path.includes('register'))
const isHomePage = computed(() => route.name.includes('index'))

const updateLayoutState = () => {
  showMargin.value = !(isHomePage.value || isRegisterPage.value)

  if (process.client) {
    showMenu.value = window.innerWidth <= 600 && !isRegisterPage.value
    sizeWindow.value = window.innerWidth <= 600 && !route.path.includes('/products')
  }
}



// init
onMounted(() => {
  updateLayoutState()
})

// watch route
watch(() => route.path, () => {
  updateLayoutState()
})
</script>
