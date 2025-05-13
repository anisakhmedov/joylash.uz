<template>
  <div id="defaultView">
    <Header v-show="!isRegisterPage" />
    <slot />
    <Form v-show="!isRegisterPage" />
    <Footer v-show="!isRegisterPage" />
    <bottomMenuMobile v-show="showMenu" />
    <clien-only>
      <div v-show="showMenu" style="height: 50px;" ></div>
      <div v-show="sizeWindow" style="height: 100px;"></div>
    </clien-only>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
let showMenu;
let sizeWindow;
if (process.client) {
  showMenu = computed(() => window.innerWidth <= 600 && route.path !== '/register')
  sizeWindow = computed(() => window.innerWidth <= 400)
}
const isRegisterPage = computed(() => route.path === '/register')
</script>

<style></style>