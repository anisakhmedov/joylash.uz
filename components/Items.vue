<template>
    <div ref="scrollWrapper" class="items-wrapper">
        <div class="item" @click="routeOnPage(house._id)" v-for="house in houses" :key="house._id" ref="scrollWrapper">
            <!-- Карточка -->
            <div class="bg"></div>
            <div class="info">
                <div class="title">
                    <p>{{house.title}}</p>
                </div>
                <div class="options">
                    <ul>
                        <li><img src="~/public/icons/beds.svg" alt=""><span>2 Beds</span></li>
                        <li><img src="~/public/icons/shower.svg" alt=""><span>2 Baths</span></li>
                        <li><img src="~/public/icons/size.svg" alt=""><span>200m<sup>2</sup></span></li>
                        <li><img src="~/public/icons/garage.svg" alt=""><span>2 Parking Lot</span></li>
                    </ul>
                </div>
                <div class="locationAndPrice">
                    <div class="location">
                        <img src="~/public/icons/location.svg" alt="">
                        <span>{{ house.locationText }}</span>
                    </div>
                    <div class="price">
                        <span class="mainPrice">{{house.price}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'
const router = useRouter()

const scrollWrapper = ref(null)

defineExpose({ scrollWrapper })

let routeOnPage = function (prop) {
    router.push(`/products/${prop}`)
    console.log(prop);
    
}

defineProps({
    houses: {
        type: Array,
        required: true
    }
})
</script>

<style scoped></style>