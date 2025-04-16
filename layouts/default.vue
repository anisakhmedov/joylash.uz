<template>
  <div id="defaultView">
    <Header v-show="type" />
    <slot />
    <Form v-show="type" />
    <Footer v-show="type" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: true
    }
  },
  methods: {
  },
  created() {
    if (process.client) {
      if (window.location.href.includes('register') || window.location.href.includes('signIn')) {
        this.type = false
        console.log('reg or sign in');

      } else {
        this.type = true
        console.log('default');

      }
    }
  }
}
</script>

<style></style>