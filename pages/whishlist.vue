<template>
    <div id="whishlistUser">
        <div class="wrapper" :style="allHouses.length == 0 ? 'padding-top: 200px;' : 'padding-top: 0;'">
            <div class="nav" v-show="allHouses.length == 0">
                <p class="emptyList">Список пустой! :(</p>
                <NuxtLink :to="$localePath('/allProducts')">Смотреть объявления</NuxtLink>
            </div>
            <div ref="scrollWrapper" v-show="allHouses.length != 0" class="items-wrapper">
                <div class="item" v-for="house of allHouses" :id="house._id" :key="house._id">
                    <div class="bg" @click="switchOnIDPage(house._id)">
                        <img :src="house.mainImage" alt="">
                    </div>
                    <div class="info" @click="switchOnIDPage(house._id)">
                        <p class="title">
                            {{ house.title }} <span v-show="!widthWindow" :class="house.quality == 1 ? 'new' : 'old'">{{
                                house.quality == 1 ? 'Новое' : 'Б/У' }}</span>
                        </p>
                        <p class="disc">
                            {{ house.description || "laskjdlkajsldkjalskdjlaksjdlkajslkdjlaksjdlakdjlaksdjlkasjdlakjd"
                            }}
                        </p>
                        <div class="locationAndPrice">
                            <div class="location">
                                <img src="~/public/icons/location.svg" alt="">
                                <span>
                                    <NuxtLink
                                        :to="`https://yandex.com/maps/?pt=${house.coords[1]},${house.coords[0]}&z=16&l=map`"
                                        target="_blank">{{ $t('items.openMap') }}</NuxtLink>
                                </span>
                            </div>
                            <div class="price">
                                <span class="mainPrice">${{ house.price }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="del" @click="deleteFromUser(house._id)">
                        <p>Remove</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
export default {
    data() {
        return {
            allLiked: [],
            allHouses: [],
            widthWindow: false,
            user: []
        }
    },
    async mounted() {
        if (process.client) {
            window.innerWidth <= 600 ? this.widthWindow = true : this.widthWindow = false
        }

        await axios.get('https://joylash-778750a705b4.herokuapp.com/usersJoy/' + localStorage.user)
            .then((res) => {
                this.allLiked = res.data.data.likedHouses
                this.user = res.data.data
            })
            .catch((err) => {
            })
        await axios.get('https://joylash-778750a705b4.herokuapp.com/houses')
            .then(async (response) => {
                for (let item of response.data.body) {
                    for (let i of this.allLiked) {
                        if (item._id === i) {
                            item.pluses = item.pluses.splice(0, 4)
                            this.allHouses.push(item)
                        }
                    }
                }

            })
            .catch((err) => {
            })

    },
    methods: {
        deleteFromUser(param) {
            let newUser = this.user.likedHouses.filter(item => item != param)
            axios.patch('https://joylash-778750a705b4.herokuapp.com/usersJoy/' + localStorage.user, { likedHouses: newUser })
                .then((res) => {
                    if (process.client) {
                        window.location.reload()
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        switchOnIDPage(param) {
            this.router.push('/products/' + param)
        }
    }
}
</script>

<style></style>