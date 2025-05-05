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
      type: true,
    }
  },
  methods: {
  },
  created() {
    if (process.client) {
      window.location.href.includes('register') || window.location.href.includes('test') ? this.type = false : this.type = true
    }
  }
}
</script>

<style></style>