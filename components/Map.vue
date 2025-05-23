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
    },
    center: {
      type: Object,
      default: () => ({
        lat: 39.6542,
        lng: 66.9597
      })
    }
  },

  data() {
    return {
      map: null,
      L: null,
      markers: []
    }
  },

  async mounted() {
    if (process.client) {
      const L = await import('leaflet');
      this.L = L;
      await import('leaflet/dist/leaflet.css');

      // 🛠️ Исправление путей к иконкам
      delete this.L.Icon.Default.prototype._getIconUrl;

      this.L.Icon.Default.mergeOptions({
        iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
        iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
        shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
      });


      this.map = this.L.map('map').setView([this.center.lat, this.center.lng], this.zoom);

      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.addMarkers();
    }
  },

  watch: {
    center(newCenter) {
      if (this.map && newCenter?.lat && newCenter?.lng) {
        this.map.setView([newCenter.lat, newCenter.lng], this.zoom);
      }
    },
    locations: {
      handler() {
        this.addMarkers();
      },
      deep: true
    }
  },

  methods: {
    addMarkers() {
      if (!this.map || !this.L) return;

      // Удаляем старые маркеры
      this.markers.forEach(marker => this.map.removeLayer(marker));
      this.markers = [];

      this.locations.forEach(loc => {
        if (loc.lat && loc.lng) {
          const marker = this.L.marker([loc.lat, loc.lng]).addTo(this.map);
          marker.on('click', () => {
            window.location.href = `/products/${loc.id}`;
          });
          this.markers.push(marker);
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
