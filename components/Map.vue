<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'

const props = defineProps({
  center: {
    type: Array,
    required: true
  },
  zoom: {
    type: Number,
    default: 15
  },
  marker: {
    type: Object,
    default: () => ({
      latitude: 41.311081,
      longitude: 69.240562,
      popup: 'Дом'
    })
  }
})

const mapContainer = ref(null)

onMounted(async () => {
  await nextTick()

  const L = await import('leaflet')

  const map = L.map(mapContainer.value).setView(props.center, props.zoom)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map)

  L.marker([props.marker.latitude, props.marker.longitude])
    .addTo(map)
    .bindPopup(props.marker.popup || '')

  setTimeout(() => {
    map.invalidateSize()
  }, 100)
})
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
  z-index: 1;
}
</style>
