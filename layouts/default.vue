<template>
  <div id="defaultView">
    <Header v-show="!isRegisterPage" />
    <slot />
    <Form v-show="!isRegisterPage" />
    <Footer v-show="!isRegisterPage" />
    <bottomMenuMobile v-show="showMenu" />
    <div style="height: 50px;"></div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
let showMenu;
if(process.client){
  showMenu = computed(() => window.innerWidth <= 600)
}
const isRegisterPage = computed(() => route.path === '/register' )
</script>

<style></style>