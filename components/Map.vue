<template>
  <div id="map" style="width: 100%; height: 500px;"></div>
</template>

<script>
export default {
  props: {
    locations: {
      type: Array,
      required: true
    },
    zoom: {
      type: Number,
      default: 12
    }
  },

  async mounted() {
    // Импортируем leaflet только на клиенте
    if (process.client) {
      const L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

      const map = L.map('map').setView([39.6542, 66.9597], this.zoom)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      this.locations.forEach(loc => {
        if (loc.lat && loc.lng) {
          const marker = L.marker([loc.lat, loc.lng]).addTo(map);
          marker.on('click', () => {
            window.location.href = `/products/${loc.id}`;
          });
        }
      });
    }
  }
}
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
