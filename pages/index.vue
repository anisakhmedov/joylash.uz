<template>
    <div id="mainPage">
        <div id="mainView">
            <div class="bg"></div>
            <div class="text">
                <p>{{ $t('mainPage.1ViewText.p1') }}</p>
                <div class="title">{{ $t('mainPage.1ViewText.h1') }}</div>
                <div class="disc">{{ $t('mainPage.1ViewText.disc') }}<br></div>
                <NuxtLink class="btn orange" :to="$localePath('/allProducts')">{{ $t('mainPage.items2.smth') }}
                </NuxtLink>
            </div>
        </div>

        <div class="appereance container" ref="menuRef">
            <ul>
                <div v-for="(item, index) in items" :key="index" class="title"
                    :class="{ active: activeIndex === index }">
                    <div class="toggle" @click="toggleMenu(index)">
                        <p>
                            {{ item[this.$i18n.locale]?.label }}
                        </p>

                        <img src="~/public/icons/arrow.svg" alt="">
                    </div>
                    <ul class="submenu">
                        <NuxtLink :to="$localePath('/allProducts')"
                            v-for="(option, idx) in item[this.$i18n.locale]?.options" :key="idx">
                            {{ option }}
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
                <p>{{ $t('mainPage.items.label') }}</p>
                <nav>
                    <span>{{ $t('mainPage.items.title') }}</span>
                </nav>
            </div>
            <div class="slider">

                <div @click="moveSlider('left')" class="ar left">
                    <div class="block">
                        <img src="/icons/arrow.svg" alt="">
                    </div>
                </div>
                <div class="carousel-container">
                    <div class="carousel">
                        <Items ref="carouselInner" :houses="houses" />
                    </div>
                </div>
                <div class="ar right" @click="moveSlider('right')">
                    <div class="block">
                        <img src="/icons/arrow.svg" alt="">
                    </div>
                </div>
            </div>
            <NuxtLink class="btn orange" :to="$localePath('/allProducts')">{{ $t('mainPage.items.showAll') }}</NuxtLink>
        </div>
        <client-only>
            <Map class="map-def" v-if="isLoaded && allLocations.length" :locations="allLocations" :zoom="12" />
        </client-only>

        <div class="products">
            <div class="_title">
                <p>{{ $t('mainPage.items2.label') }}</p>
                <nav>
                    <span>{{ $t('mainPage.items2.title') }}</span>
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
            locationLang: '',
            items: [
                {
                    "uz": {
                        "label": "Uy holati",
                        "options": ["Yangi", "Ishlatilgan"]
                    },
                    "ru": {
                        "label": "Состояние дома",
                        "options": ["Новое", "Б/У"]
                    },
                    "en": {
                        "label": "House condition",
                        "options": ["New", "Used"]
                    }
                },
                {
                    "uz": {
                        "label": "Toifa",
                        "options": ["Ijaraga", "Sotuvga"]
                    },
                    "ru": {
                        "label": "Категория",
                        "options": ["Аренда", "Продажа"]
                    },
                    "en": {
                        "label": "Category",
                        "options": ["Rent", "Sale"]
                    }
                },
                {
                    "uz": {
                        "label": "Turi",
                        "options": ["Uy", "Kvartira", "Ofis", "Yer uchastkasi"]
                    },
                    "ru": {
                        "label": "Тип недвижимости",
                        "options": ["Дом", "Квартира", "Офис", "Участок"]
                    },
                    "en": {
                        "label": "Property type",
                        "options": ["House", "Apartment", "Office", "Land plot"]
                    }
                }
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
        },
        moveSlider(param) {
            let axisX = document.querySelector('.carousel-container')
            if (param === 'right') {
                let count = 0
                let intRight = setInterval(() => {
                    count += 2
                    if (count >= 200) {
                        clearInterval(intRight)
                    }
                    axisX.scrollBy({
                        left: 6,
                        behavior: "smooth"
                    })
                }, 1)


            } else if (param === 'left') {
                let count = 0
                let intRight = setInterval(() => {
                    count += 2
                    if (count >= 200) {
                        clearInterval(intRight)
                    }
                    axisX.scrollBy({
                        left: -6,
                        behavior: "smooth"
                    })
                }, 1)
            }
        }
    },
    mounted() {
        if (process.client) {
            document.querySelector('.carousel-container').scrollLeft = -100

            document.querySelector('.carousel-container').scrollTo = 100
            document.addEventListener('click', this.handleClickOutside);

            axios.get('https://joylash-778750a705b4.herokuapp.com/houses')
                .then(res => {
                    this.allHouse = res.data.body;
                    this.isLoaded = true
                })
                .catch(err => {
                });
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    beforeMount() {
    }
}
</script>

<style></style>