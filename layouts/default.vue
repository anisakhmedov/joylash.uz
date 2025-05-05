<template>
  <div id="defaultView">
    <Header v-show="!isRegisterPage" />
    <slot />
    <Form v-show="!isRegisterPage" />
    <Footer v-show="!isRegisterPage" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isRegisterPage = computed(() => route.path === '/register')
</script>

<style></style>