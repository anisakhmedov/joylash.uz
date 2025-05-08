<template>
    <div ref="scrollWrapper" class="items-wrapper">
        <div class="item" v-for="house of allHouses" :id="house._id" :key="house._id">
            <div class="bg" @click="switchOnIDPage(house._id)"
                :style="`background-image:url(${house.mainImage});`">

            </div>
            <div class="info" @click="switchOnIDPage(house._id)">
                <div class="title">
                    <p>{{ house.title }}</p>
                </div>
                <div class="options">
                    <ul>
                        <li v-for="item of house.pluses" :key="item">{{ item }}</li>
                    </ul>
                </div>
                <div class="locationAndPrice">
                    <div class="location">
                        <img src="~/public/icons/location.svg" alt="">
                        <span>
                            <NuxtLink
                                :to="`https://yandex.com/maps/?pt=${house.coords[1]},${house.coords[0]}&z=16&l=map`"
                                target="_blank">Открыть карту</NuxtLink>
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
            api: 'https://joylash-778750a705b4.herokuapp.com/',
            allHouses: [],
            router: useRouter()
        }
    },
    mounted() {
        axios.get(this.api + 'houses')
            .then((res) => {
                this.allHouses = res.data.body
                for (let item of this.allHouses) item.pluses = item.pluses.splice(0, 4)
            })
            .catch((err) => {
                console.log(err);

            })
    },
    methods: {
        switchOnIDPage(param) {
            this.router.push('/products/' + param)
        }
    }
}
</script>

<style scoped></style>