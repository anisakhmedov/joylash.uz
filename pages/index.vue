<template>
    <div id="mainPage">
        <div id="mainView">
            <div class="bg"></div>
            <div class="text">
                <p>Greetings, you're now in PropDown</p>
                <div class="title">Bringing Your Dream <br> Home Vision to Life.</div>
                <div class="disc">Lorem ipsum dolor sit amet consectetur. <br> Est quisque elementum aliquam a.</div>
                <NuxtLink class="btn orange" to="">Publish a Property</NuxtLink>
            </div>
        </div>
        <div class="appereance container">
            <ul>
                <div class="title">
                    <div>
                        <p>Location</p><img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <li></li>
                </div>
                <div class="title">
                    <div>
                        <p>Category</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <li></li>
                </div>
                <div class="title">
                    <div>
                        <p>Type</p> <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <li></li>
                </div>
                <div class="search title">
                    <input type="text" placeholder="Search a Property">
                    <img src="~/public/icons/search.svg" alt="">
                </div>
            </ul>
        </div>
        <div class="productView">
            <div class="_title" style="padding: 0 100px;">
                <p>Featured Property</p>
                <nav>
                    <span>Recommended Place to Live for You</span>
                </nav>
            </div>
            <div class="carousel-container">
                <div class="carousel">
                    <Items ref="carouselInner" :houses="houses" />
                </div>
            </div>
            <NuxtLink class="btn orange" to="">Show all Property</NuxtLink>
        </div>
        <client-only>
            <Map :locations="allLocations" :zoom="12" />
        </client-only>

        <div class="products">
            <div class="_title">
                <p>Recent Additions</p>
                <nav>
                    <span>Find Properties that Suits You</span>
                </nav>
            </div>
            <Items ref="ItemsProd" :houses="houses" />
        </div>
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
</script>

<style></style>