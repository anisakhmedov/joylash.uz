<template>
  <div id="register"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

onMounted(() => {
    if(process.client){
        let page = document.querySelector('#register').parentNode
        page.querySelector('#header').remove()
        page.querySelector('#footer').remove()
        page.querySelector('#formFeedback').remove()
    }
})
</script>

<style>

</style>