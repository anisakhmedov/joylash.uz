<template>
    <div id="register">
        <div class="smth">
            <form action="" @submit.prevent="onSubmit" v-show="typeOfForm">
                <h2>Get Started Now</h2>
                <div>
                    <label for="">Name</label>
                    <input type="text" v-model="name" placeholder="Enter your name">
                </div>
                <div>
                    <label for="">Email</label>
                    <input type="text" v-model="email" placeholder="Enter your email">
                </div>
                <div>
                    <label for="">Password</label>
                    <input type="text" v-model="password" placeholder="Enter your password">
                </div>
                <button>Sign Up</button>
                <p>or</p>
                <span>
                    Have an Account? <p @click="typeOfForm = !typeOfForm"> Sign In</p>
                </span>
            </form>
            <form @submit.prevent="onSubmit" action="" v-show="!typeOfForm">
                <h2>Welcome Back!</h2>
                <div>
                    <label for="">Email</label>
                    <input type="text" v-model="email" placeholder="Enter your email">
                </div>
                <div>
                    <label class="password" for="">Password <p style="cursor: pointer;">forgot password</p></label>
                    <input type="text" v-model="password" placeholder="Enter your password">
                    <div class="check" :class="checkType ? 'active' : ''" @click="checkType = !checkType">
                        <div class="box"><img src="~/public/icons/check-reg.svg" alt=""></div>
                        <p>Remember for 7 days</p>
                    </div>
                </div>
                <button>Sign In</button>
                <p>or</p>
                <span>
                    Don't have an account? <p @click="typeOfForm = !typeOfForm"> Sign Up</p>
                </span>
            </form>
        </div>
        <div class="bg">
            <img src="~/public/images/bg_first.png" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'

const api = 'https://joylash-778750a705b4.herokuapp.com/usersJoy'
const checkType = ref(true);
const typeOfForm = ref(true);
const email = ref('');
let allUsers = ref([]);
const password = ref('');
const name = ref('');
const error = ref('');
const router = useRouter();

onMounted(async () => {
    await axios.get(api)
        .then((res) => allUsers = res.data.body)
        .catch((err) => console.log(err))

    await console.log(allUsers);
        
})

const onSubmit = async () => {
    let obj = {
        name: name.value,
        email: email.value,
        password: password.value,
    }
    console.log(obj);

    axios.post(api, obj)
        .then((res) => console.log(res))
        .then((err) => console.log(err))
    // error.value = '';
    // try {
    //     const response = await axios.post('https://joylash-778750a705b4.herokuapp.com/usersJoy', {
    //         email: email.value,
    //         password: password.value
    //     });
    //     await router.push('/');
    // } catch (err: any) {
    //     error.value = err.response?.data?.message || 'Ошибка входа';
    // }
};
</script>

<style></style>