<template>
    <div id="allProd">
        <div class="_margin"></div>
        <nav>
            <div>
                <NuxtLink to="/">Home</NuxtLink> / <span>All Products</span>
            </div>
            <p>Search properties</p>
            <p id="numberOfAvaible"></p>
        </nav>

        <client-only>
            <Map :locations="allLocations" class="active" :zoom="12" />
        </client-only>

        <div class="filterBlock">
            <div class="search">
                <input type="text" v-model="searchTitle" placeholder="Search a Property">
                <img src="~/public/icons/search.svg" alt="">
            </div>
            <div class="dropDownMenu">
                <div class="filterItem">
                    <div class="title">
                        <p>{{ qualityArr.title }}</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul>
                        <li @click="filterFunc(k, 1)" v-for="k of qualityArr.arr" :key="k">{{ k }}</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title">
                        <p>{{ locationFind.title }}</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul>
                        <li @click="filterFunc(k, 2)" v-for="k of locationFind.arr" :key="k">{{ k }}</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title">
                        <p>City</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul>
                        <li>Samarkand</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title">
                        <p>{{ roomsNum.title }}</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul>
                        <li @click="filterFunc(k, 3)" v-for="k of roomsNum.arr" :key="k">{{ k }}</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title">
                        <p>{{ typeOfBuild.title }}</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul>
                        <li @click="filterFunc(k, 4)" v-for="k of typeOfBuild.arr" :key="k">{{ k }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <Items id="Items" ref="ItemsProd" :houses="filteredHouses" />
    </div>
</template>

<script setup>
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'
import { houses } from '~/data/houses.js'

const allLocations = houses.map(h => {
    const [lat, lng] = h.locationMap.split(',').map(n => parseFloat(n.trim()))
    return { lat, lng }
})

let filterdArray = houses
let qualityArr = { title: "Quality", arr: [] }
let locationFind = { title: "Location", arr: [] }
let roomsNum = { title: "Number of Rooms", arr: [] }
let typeOfBuild = { title: "Type of Building", arr: [] }

onBeforeMount(() => {
    for (let item of houses) {
        qualityArr.arr.push(item.quality)
        qualityArr.arr = [...new Set(qualityArr.arr)]
        locationFind.arr.push(item.locationText.split(',')[0])
        locationFind.arr = [...new Set(locationFind.arr)]
        roomsNum.arr.push(item.roomsNumber)
        roomsNum.arr = [...new Set(roomsNum.arr)]
        typeOfBuild.arr.push(item.typeOfHouse)
        typeOfBuild.arr = [...new Set(typeOfBuild.arr)]
    }
})

const selectedQuality = ref('')
const selectedLocation = ref('')
const selectedRooms = ref('')
const selectedType = ref('')
const searchTitle = ref('')

function filterFunc(value, type) {
    if (type === 1) selectedQuality.value = value
    if (type === 2) selectedLocation.value = value
    if (type === 3) selectedRooms.value = value
    if (type === 4) selectedType.value = value
    console.log(selectedLocation);
}

const filteredHouses = computed(() => {
    return houses.filter(house => {
        const matchTitle = searchTitle.value
            ? house.title.toLowerCase().includes(searchTitle.value.toLowerCase())
            : true

        const matchQuality = selectedQuality.value
            ? house.quality === selectedQuality.value
            : true

        const matchLocation = selectedLocation.value
            ? house.locationText === selectedLocation.value
            : true

        const matchRooms = selectedRooms.value
            ? house.roomsNumber === selectedRooms.value
            : true

        const matchType = selectedType.value
            ? house.typeOfHouse === selectedType.value
            : true

        return matchTitle && matchQuality && matchLocation && matchRooms && matchType
    })
})
</script>

<style></style>