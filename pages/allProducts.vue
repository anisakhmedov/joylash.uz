<template>
    <div id="allProd">
        <div class="_margin"></div>

        <client-only>
            <Map :locations="allLocations" style="max-height: 500px;" class="active" :zoom="12" />
        </client-only>

        <client-only>
            <div class="filterBlock">
                <div class="search">
                    <input type="text" v-model="searchTitle" placeholder="Search a Property" />
                    <img src="~/public/icons/search.svg" alt="">
                </div>

                <select v-model="selectedQuality">
                    <option selected>{{ qualityArr.title }}</option>
                    <option v-for="k in qualityArr.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedLocation">
                    <option selected>{{ locationFind.title }}</option>
                    <option v-for="k in locationFind.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedType">
                    <option selected>{{ typeSell.title }}</option>
                    <option v-for="k in typeSell.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedRooms">
                    <option selected>{{ roomsNum.title }}</option>
                    <option v-for="k in roomsNum.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedBuilding">
                    <option selected>{{ typeOfBuild.title }}</option>
                    <option v-for="k in typeOfBuild.arr" :key="k" :value="k">{{ k }}</option>
                </select>
            </div>
        </client-only>

        <Items id="Items" ref="ItemsProd" :houses="filteredHouses" />
    </div>
</template>

<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'

const { data: houses } = await useAsyncData('houses', () => Promise.resolve([
    {
        title: 'Test House',
        locationMap: '41.3111, 69.2797',
        locationText: 'Tashkent, Uzbekistan',
        quality: 'High',
        roomsNumber: 3,
        status: 'rent',
        typeOfHouse: 'Apartment'
    }
]))

// 👇 Старый формат объектов с title и arr
const qualityArr = ref({ title: "Quality", arr: [] })
const locationFind = ref({ title: "Location", arr: [] })
const typeSell = ref({ title: "Rent or Sell", arr: ['rent', 'sell'] })
const roomsNum = ref({ title: "Number of Rooms", arr: [] })
const typeOfBuild = ref({ title: "Type of Building", arr: [] })

let selectedQuality = ref('')
let selectedLocation = ref('')
let selectedRooms = ref('')
let selectedType = ref('')
let selectedBuilding = ref('')
let searchTitle = ref('')

const allLocations = computed(() => {
    return (houses.value || []).map(h => {
        const [lat, lng] = h.locationMap.split(',').map(n => parseFloat(n.trim()))
        return { lat, lng }
    })
})

onBeforeMount(() => {
    if (!houses.value) return

    const unique = arr => [...new Set(arr)]

    qualityArr.value.arr = unique(houses.value.map(h => h.quality))
    locationFind.value.arr = unique(houses.value.map(h => h.locationText.split(',')[0]))
    roomsNum.value.arr = unique(houses.value.map(h => h.roomsNumber))
    typeOfBuild.value.arr = unique(houses.value.map(h => h.typeOfHouse))


    selectedQuality = qualityArr.title
    selectedLocation = locationFind.title
    selectedType = typeSell.title
    selectedRooms = roomsNum.title
    // selectedBuilding = typeOfBuild.title
})

const filteredHouses = computed(() => {
    console.log(houses.value);
    
    return (houses.value || []).filter(house => {
        const matchTitle = searchTitle.value
            ? house.title.toLowerCase().includes(searchTitle.value.toLowerCase())
            : true

        const matchQuality = selectedQuality.value
            ? house.quality === selectedQuality.value
            : true

        const matchLocation = selectedLocation.value
            ? house.locationText.split(',')[0] === selectedLocation.value
            : true

        const matchRooms = selectedRooms.value
            ? String(house.roomsNumber) === String(selectedRooms.value)
            : true

        const matchType = selectedType.value
            ? house.status === selectedType.value
            : true

        // const matchBuilding = selectedBuilding.value
        //     ? house.typeOfHouse === selectedBuilding.value
        //     : true

        return matchTitle && matchQuality && matchLocation && matchRooms && matchType 
    })
})

watch(houses, (val) => {
    if (!val) return
    const unique = (arr) => [...new Set(arr)]

    qualityArr.value.arr = unique(val.map(h => h.quality))
    locationFind.value.arr = unique(val.map(h => h.locationText.split(',')[0]))
    roomsNum.value.arr = unique(val.map(h => h.roomsNumber))
    typeOfBuild.value.arr = unique(val.map(h => h.typeOfHouse))


}, { immediate: true })

</script>

<style></style>