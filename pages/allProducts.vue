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
            <Map :center="[41.311081, 69.240562]" />
        </client-only>

        <div class="filterBlock">
            <div class="search">
                <input type="text" placeholder="Search a Property">
                <img src="~/public/icons/search.svg" alt="">
            </div>
            <div class="moreOptions">
                <p>More Filters</p>
            </div>
            <div class="filterItem">
                <div class="title">Prices <img src="~/public/icons/arrow.svg" alt=""></div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="filterItem">
                <div class="title">Prices <img src="~/public/icons/arrow.svg" alt=""></div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="filterItem">
                <div class="title">Prices <img src="~/public/icons/arrow.svg" alt=""></div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="filterItem">
                <div class="title">Prices <img src="~/public/icons/arrow.svg" alt=""></div>
                <ul>
                    <li></li>
                </ul>
            </div>
            <div class="filterItem">
                <div class="title">Prices <img src="~/public/icons/arrow.svg" alt=""></div>
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
        <Items id="Items"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Items from '~/components/defItems.vue'
import Map from '~/components/Map.vue'

</script>

<style></style>