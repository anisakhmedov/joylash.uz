<template>
    <div id="profile">
        <div class="_margin"></div>
        <div class="info">
            <div class="colorGrd"></div>
            <div class="main">
                <div class="infoMain">
                    <div class="photo">
                        <img :src="userInfo.image" alt="">
                    </div>
                    <div class="infoUser">
                        <div class="name">{{ userInfo.name }}</div>
                        <div class="mail">{{ userInfo.email }}</div>
                    </div>
                </div>
                <form action="">
                    <div class="inputs">
                        <div class="inp">
                            <label>Full Name</label>
                            <input data-inp="name" name="name" type="text" :disabled="btnsActive" :value="userInfo.name"
                                placeholder="Your First Name">
                            <label class="err">You must fill this form!</label>
                        </div>
                        <div class="inp">
                            <label>Nickname</label>
                            <input data-inp="nickname" :value="userInfo.nickname == '' ? '' : userInfo.nickname"
                                name="nickname" type="text" :disabled="btnsActive" placeholder="Your Nuckname">
                            <label class="err">You must fill this form!</label>
                        </div>
                        <div class="inp">
                            <label>Email</label>
                            <input data-inp="email" name="email" type="text" :disabled="btnsActive"
                                :value="userInfo.email" placeholder="Your Email">
                            <label class="err">You must fill this form!</label>
                        </div>
                        <div class="inp">
                            <label>Phone Number</label>
                            <input :value="userInfo.phone == '' ? '' : userInfo.phone" data-inp="phone" name="phone"
                                type="text" :disabled="btnsActive" placeholder="Your Phone Number">
                            <label class="err">You must fill this form!</label>
                        </div>
                        <div class="inp">
                            <label>Password</label>
                            <input type="text" disabled :value="userInfo.password" placeholder="**********">
                        </div>
                        <div class="inp">
                            <label>Reset Your Password</label>
                            <input name="password" type="text" :disabled="btnsActive" placeholder="New Password">
                        </div>
                    </div>
                    <div class="btns">
                        <button @click="btnsActive = !btnsActive" :disabled="!btnsActive"
                            :style="!btnsActive ? 'opacity: 0.5; cursor: not-allowed;' : 'opacity: 1;'">Edit</button>
                        <button :disabled="btnsActive"
                            :style="btnsActive ? 'opacity: 0.5; cursor: not-allowed;' : 'opacity: 1;'"
                            @click="sendNewInfo()">Submit New Information</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="allProductsCreated">
        <h3>Ваши объявления!</h3>
        <div class="wrapper">
            <div class="item"></div>
        </div>
    </div>
    <div class="modalWindowProfile" v-show="isShow">
        <div class="wind">
            <img :src="allCorrect ? '/icons/correct.png' : '/icons/remove.png'" alt="">
            <h2>{{ allCorrect ? 'Профиль был успешно изменен!' : 'Возникли проблемы с изменением профиля' }}</h2>
            <button @click="isShow = false">Закрыть окно</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            api: 'https://joylash-778750a705b4.herokuapp.com/',
            userInfo: '',
            btnsActive: true,
            allCorrect: true,
            isShow: false,
            donaArray: []
        }
    },
    mounted() {
        let userId = localStorage.getItem('user')
        axios.get(`${this.api}usersJoy/${userId}`)
            .then((res) => {
                this.userInfo = res.data.data

            })
        axios.get(`${this.api}houses`)
            .then((res) => {
                for(let item of res.data.body){
                    // for(let userHome of this.userInfo.)
                    // if(item._id == )
                }
                this.donaArray = res.data.body
            })
    },
    methods: {
        sendNewInfo() {
            event.preventDefault()
            let allItems = event.target.parentNode.parentNode.querySelectorAll('input[data-inp]')

            let counter = 0
            let obj = {}
            let fm = new FormData(event.target.parentNode.parentNode)

            fm.forEach((val, key) => {
                obj[key] = val
            })

            if (obj.password == '') {
                obj.password = this.userInfo.password
            }

            let checkFunc = (param) => {
                for (let item of allItems) {
                    if (item.getAttribute('data-inp') == param) {
                        item.parentNode.querySelector('.err').classList.add('active')
                    } else if (item.value.length >= 1) {
                        item.parentNode.querySelector('.err').classList.remove('active')
                    }
                }
            }

            for (let item in obj) {
                if (obj[item] == '') {
                    counter++
                    checkFunc(item)
                }
            }

            if (counter == 0) {
                console.log(counter);
                axios.patch(this.api + 'usersJoy/' + this.userInfo._id, obj)
                    .then((res) => {
                        for (let item of allItems) {
                            item.parentNode.querySelector('.err').classList.remove('active')
                        }

                        this.allCorrect = true

                        if(process.client){
                            this.isShow = true
                        }
                    })
                    .catch((err) => this.allCorrect = false)
            }

        },
    }
}
</script>

<style></style>