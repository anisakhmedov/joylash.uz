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
            <Map class="map-def" v-if="isLoaded && allLocations.length" :locations="allLocations" :zoom="12" />
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

<script>
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'
import axios from 'axios'

export default {
    components: {
        Map,
        Items
    },
    data() {
        return {
            allHouse: [],
            activeIndex: null,
            isLoaded: false,
            menuRef: null,
            items: [
                { label: 'Location', options: ['Option 1', 'Option 2', 'Option 3'] },
                { label: 'Category', options: ['Option A', 'Option B', 'Option C'] },
                { label: 'Type', options: ['Option X', 'Option Y', 'Option Z'] }
            ]
        }
    },
    computed: {
        allLocations() {
            return this.allHouse
                .map(h => {
                    if (Array.isArray(h.coords) && h.coords.length === 2 && h._id) {
                        return {
                            lat: h.coords[0],
                            lng: h.coords[1],
                            id: h._id,
                            title: h.title || ''
                        }
                    }
                    return null;
                })
                .filter(Boolean)
        }
    },

    methods: {
        toggleMenu(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
        handleClickOutside(event) {
            if (this.$refs.menuRef && !this.$refs.menuRef.contains(event.target)) {
                this.activeIndex = null;
            }
        }
    },
    mounted() {
        if (process.client) {
            document.addEventListener('click', this.handleClickOutside);

            axios.get('https://joylash-778750a705b4.herokuapp.com/houses')
                .then(res => {
                    this.allHouse = res.data.body;
                    this.isLoaded = true
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
}
</script>

<style></style>