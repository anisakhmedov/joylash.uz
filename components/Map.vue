<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import L from 'leaflet'

const props = defineProps({
  locations: {
    type: Array,
    required: true
  },
  zoom: {
    type: Number,
    default: 13
  }
})

const mapContainer = ref(null)
let mapInstance

function addMarkers(locs) {
  locs.forEach(loc => {
    L.marker([loc.lat, loc.lng]).addTo(mapInstance)
  })
}

function initMap() {
  if (!props.locations.length || !mapContainer.value) return
  const first = props.locations[0]
  mapInstance = L.map(mapContainer.value).setView([first.lat, first.lng], props.zoom)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance)
  addMarkers(props.locations)
}

onMounted(() => {
  initMap()
})

watch(
  () => [props.locations, props.zoom],
  ([newLocs, newZoom]) => {
    if (!mapInstance || !newLocs.length) return
    const first = newLocs[0]
    mapInstance.setView([first.lat, first.lng], newZoom)
    // можно почистить старые маркеры, но для простоты добавим новые
    addMarkers(newLocs)
  },
  { deep: true }
)
</script>

<style scoped>
.map-container {
  max-width: calc(100% - 200px);
  margin: 0 auto;
  height: 700px;
}
@import "leaflet/dist/leaflet.css";
</style>
