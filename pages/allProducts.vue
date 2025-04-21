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
                <input type="text" placeholder="Search a Property">
                <img src="~/public/icons/search.svg" alt="">
            </div>
            <div class="dropDownMenu">
                <div class="filterItem">
                    <div class="title"><p>Quality</p> <img src="~/public/icons/arrow.svg" alt=""></div>
                    <ul>
                        <li v-for="k of qualityArr" :key="k">{{ k }}</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title"><p>Location</p> <img src="~/public/icons/arrow.svg" alt=""></div>
                    <ul>
                        <li v-for="k of locationFind" :key="k">{{ k }}</li>
                    </ul>                                                                                                               
                </div>
                <div class="filterItem">
                    <div class="title"><p>Prices</p> <img src="~/public/icons/arrow.svg" alt=""></div>
                    <ul>
                        <li v-for="k of 5" :key="k">Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title"><p>Number of Rooms</p> <img src="~/public/icons/arrow.svg" alt=""></div>
                    <ul>
                        <li v-for="k of roomsNum" :key="k">{{ k }}</li>
                    </ul>
                </div>
                <div class="filterItem">
                    <div class="title"><p>Type of Building</p> <img src="~/public/icons/arrow.svg" alt=""></div>
                    <ul>
                        <li v-for="k of typeOfBuild" :key="k">{{ k }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <Items id="Items" ref="ItemsProd" :houses="houses" />
    </div>
</template>

<script setup>
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'
import { houses } from '~/data/houses.js'  // или откуда вы импортируете

const allLocations = houses.map(h => {
    const [lat, lng] = h.locationMap.split(',').map(n => parseFloat(n.trim()))
    return { lat, lng }
})

let filterdArray = houses
let qualityArr = []
let locationFind = []
let roomsNum = []
let typeOfBuild = []

onBeforeMount(() => {
    for(let item of houses){
        qualityArr.push(item.quality)
        qualityArr = [...new Set(qualityArr)]
        locationFind.push(item.locationText.split(',')[0])
        locationFind = [...new Set(locationFind)]
        roomsNum.push(item.roomsNumber)
        roomsNum = [...new Set(roomsNum)]
        typeOfBuild.push(item.typeOfHouse)
        typeOfBuild = [...new Set(typeOfBuild)]
    }
})

</script>

<style></style>