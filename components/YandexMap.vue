<template>
    <div id="map" style="width: 100%; height: 500px"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    locations: {
        type: Array,
        required: true
    }
})

const router = useRouter()

const initMap = () => {
    ymaps.ready(() => {
        const map = new ymaps.Map('map', {
            center: props.locations.length ? props.locations[0].coords : [55.76, 37.64],
            zoom: 11.5,
            controls: []
        })

        document.querySelector('.ymaps-2-1-79-gototech').style.display = 'none'
        document.querySelector('.ymaps-2-1-79-map-copyrights-promo').style.display = 'none'
        document.querySelector('.ymaps-2-1-79-copyright').style.display = 'none'

        props.locations.forEach(location => {
            const placemark = new ymaps.Placemark(location.coords, {
                hintContent: location.balloon,
                balloonContent: `<strong>${location.balloon}</strong>`
            })

            placemark.events.add('click', () => {
                router.push(`/products/${location.id}`)
            })

            map.geoObjects.add(placemark)
        })
    })
}

onMounted(() => {
    if (!window.ymaps) {
        const script = document.createElement('script')
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=a82d324e-b1dc-4510-b1f8-782e0913094e&lang=ru_RU'
        script.onload = initMap
        document.head.appendChild(script)
    } else {
        initMap()
    }
})
</script>
