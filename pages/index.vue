<template>
    <div id="mainPage">
        <div id="mainView">
            <div class="bg"></div>
            <div class="text">
                <p>Greetings, you're now in PropDown</p>
                <div class="title">Bringing Your Dream <br> Home Vision to Life.</div>
                <div class="disc">Lorem ipsum dolor sit amet consectetur. <br> Est quisque elementum aliquam a.</div>
                <NuxtLink class="btn orange" to="/allProducts">Publish a Property</NuxtLink>
            </div>
        </div>
        <div class="appereance container" ref="menuRef">
            <ul>
                <div v-for="(item, index) in items" :key="index" class="title"
                    :class="{ active: activeIndex === index }">
                    <div class="toggle" @click="toggleMenu(index)">
                        <p>{{ item.label }}</p>
                        <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul class="submenu">
                        <NuxtLink to="/allProducts" v-for="(option, idx) in item.options" :key="idx">{{ option }}
                        </NuxtLink>
                    </ul>
                </div>

                <div class="search title">
                    <input type="text" placeholder="Search a Property" />
                    <img src="~/public/icons/search.svg" alt="" />
                </div>
            </ul>
        </div>
        <!-- <div class="_margin"></div> -->
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
            <NuxtLink class="btn orange" to="allProducts">Show all Property</NuxtLink>
        </div>
        <client-only>
            <Map :locations="allLocations" style="margin-top: 30px;" :zoom="12" />
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

const allLocations = houses.map(h => {
    const [lat, lng] = h.locationMap.split(',').map(n => parseFloat(n.trim()))
    return { lat, lng }
})

const activeIndex = ref(null)
const menuRef = ref(null)

const items = [
    { label: 'Location', options: ['Option 1', 'Option 2', 'Option 3'] },
    { label: 'Category', options: ['Option A', 'Option B', 'Option C'] },
    { label: 'Type', options: ['Option X', 'Option Y', 'Option Z'] },
]

function toggleMenu(index) {
    activeIndex.value = activeIndex.value === index ? null : index
}

function handleClickOutside(event) {
    if (menuRef.value && !menuRef.value.contains(event.target)) {
        activeIndex.value = null
    }

}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

const { $axios } = useNuxtApp();

// const { data, error } = await useAsyncData('checkAuth', () =>
//     $axios.get('/auth/check')
// );

// if (error.value) {
//     console.log('Not authorized');
//     await navigateTo('/login');
// }
</script>

<style></style>