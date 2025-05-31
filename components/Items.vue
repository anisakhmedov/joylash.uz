<template>
    <div ref="scrollWrapper" class="items-wrapper">
        <div class="item" v-for="house of allHouses" :id="house._id" :key="house._id">
            <div class="bg" @click="switchOnIDPage(house._id)">
                <img :src="house.mainImage" alt="">
            </div>
            <div class="info" @click="switchOnIDPage(house._id)">
                <div class="text">
                    <p class="title">
                        {{ house.title }} <span v-show="!windowSize" :class="house.quality == 1 ? 'new' : 'old'">{{
                            house.quality == 1 ? 'Новое'
                                : 'Б/У' }}</span>
                    </p>
                    <p class="disc">
                        {{ (house.discription || house.description) || $t('product.noDisc') }}
                    </p>
                </div>
                <div class="locationAndPrice">
                    <div class="location">
                        <img src="~/public/icons/location.svg" alt="">
                        <span>
                            <client-only>
                                <NuxtLink
                                    :to="`https://yandex.com/maps/?pt=${house.coords[1]},${house.coords[0]}&z=16&l=map`"
                                    target="_blank">{{ windowSize <= 600 ? $t('items.openMapMobile') :
                                        $t('items.openMap') }}</NuxtLink>
                            </client-only>
                        </span>
                    </div>
                    <div class="price">
                        <span class="mainPrice">${{ house.price }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, defineExpose, } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            api: 'https://joylash-uz-4a09707016fe.herokuapp.com/',
            allHouses: [],
            router: useRouter(),
            windowSize: false
        }
    },
    mounted() {
        axios.get(this.api + 'houses')
            .then((res) => {
                this.allHouses = res.data.body.filter(item => item.isModerate == true)
                for (let item of this.allHouses) item.pluses = item.pluses.splice(0, 4)
            })
            .catch((err) => {
            })

        this.windowSize = window.innerWidth <= 600
    },
    methods: {
        switchOnIDPage(param) {
            this.router.push('/products/' + param)
        }
    }
}
</script>

<style scoped></style>