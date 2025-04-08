<template>
    <div id="mainPage">
        <div id="mainView">
            <div class="bg"></div>
            <div class="text">
                <p>Greetings, you're now in PropDown</p>
                <div class="title">Bringing Your Dream <br> Home Vision to Life.</div>
                <div class="disc">Lorem ipsum dolor sit amet consectetur. <br> Est quisque elementum aliquam a.</div>
                <NuxtLink class="btn" to="">Publish a Property</NuxtLink>
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
            <div class="title">
                <p>Featured Property</p>
                <nav>
                    <span>Recommended Place to Live for You</span>
                    <div class="arrows">
                        <div class="left">
                            <img @click="scrollCarousel(1)" src="~/public/icons/arrow-orange.svg" alt="">
                        </div>
                        <div class="right">
                            <img @click="scrollCarousel(2)" src="~/public/icons/arrow-orange.svg" alt="">
                        </div>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Карусель -->
        <div class="carousel-container">
            <div class="carousel">
                <Items ref="carouselInner" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Items from '~/components/Items.vue'

const carouselInner = ref(null)

const scrollCarousel = (direction) => {
    let el = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('.carousel-container')



}

onMounted(() => {
    console.log(123);
    let el = document.querySelector('.carousel-container')
    let wrap = el.firstChild.firstChild.children
    console.log(wrap);
    let num = 1
    for (let item of wrap) {
        
        console.log(item);
        el.scrollTo()
    }
})
</script>

<style></style>