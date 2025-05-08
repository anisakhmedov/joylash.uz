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
      L: null
    }
  },

  async mounted() {
    if (process.client) {
      this.L = await import('leaflet');
      await import('leaflet/dist/leaflet.css');

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
    locations() {
      this.addMarkers(); // На случай, если маркеры тоже обновляются
    }
  },

  methods: {
    addMarkers() {
      if (!this.map || !this.L) return;

      this.locations.forEach(loc => {
        if (loc.lat && loc.lng) {
          const marker = this.L.marker([loc.lat, loc.lng]).addTo(this.map);
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
