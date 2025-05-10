<template>
    <div id="register">
        <div class="smth">
            <form action="register" @submit.prevent="onSubmit" v-show="typeOfForm">
                <h2>{{ $t('register.get_started_now') }}</h2>
                <div>
                    <label for="">{{ $t('register.email_or_phone_number') }}</label>
                    <input type="text" v-model="email" :placeholder="$t('register.enter_email_or_phone_number')">
                    <label v-if="showErrors && errors.alreadyExists" class="error-label">{{
                        $t('register.user_already_exists') }}</label>
                </div>
                <div>
                    <label for="">{{ $t('register.password') }}</label>
                    <input type="text" v-model="password" :placeholder="$t('register.enter_password')">
                    <label v-if="showErrors && errors.passwordEmpty" class="error-label">{{
                        $t('register.field_required') }}</label>
                </div>
                <button>{{ $t('register.sign_up') }}</button>
                <p>{{ $t('register.or') }}</p>
                <span>
                    {{ $t('register.have_account') }} <p @click="typeOfForm = !typeOfForm"> {{ $t('register.sign_in') }}
                    </p>
                </span>
            </form>
            <form @submit.prevent="onSubmit" action="enter" v-show="!typeOfForm">
                <h2>{{ $t('register.welcome_back') }}</h2>
                <div>
                    <label for="">{{ $t('register.email') }}</label>
                    <input type="text" v-model="email" :placeholder="$t('register.enter_email')">
                    <label v-if="showErrors && errors.emailEmpty" class="error-label">{{ $t('register.field_required')
                        }}</label>
                </div>
                <div>
                    <label class="password" for="">{{ $t('register.password') }} <p style="cursor: pointer;">{{
                        $t('register.forgot_password') }}</p></label>
                    <input type="text" v-model="password" :placeholder="$t('register.enter_password')">
                    <label v-if="showErrors && errors.notFound" class="error-label">{{
                        $t('register.invalid_login_or_password') }}</label>
                    <div class="check" :class="checkType ? 'active' : ''" @click="checkType = !checkType">
                        <div class="box"><img src="~/public/icons/check-reg.svg" alt=""></div>
                        <p>{{ $t('register.remember_7_days') }}</p>
                    </div>
                </div>
                <button>{{ $t('register.sign_in') }}</button>
                <p>{{ $t('register.or') }}</p>
                <span>
                    {{ $t('register.dont_have_account') }} <p @click="typeOfForm = !typeOfForm"> {{
                        $t('register.sign_up') }}</p>
                </span>
            </form>
        </div>
        <div class="bg">
            <img src="~/public/images/bg_first.png" alt="">
        </div>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    data() {
        return {
            api: 'https://joylash-778750a705b4.herokuapp.com/usersJoy',
            checkType: true,
            typeOfForm: true,
            email: '',
            password: '',
            name: '',
            allUsers: [],
            showErrors: false,
            errors: {
                emailEmpty: false,
                passwordEmpty: false,
                alreadyExists: false,
                notFound: false
            }
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const res = await axios.get(this.api);
                this.allUsers = res.data.body;
            } catch (err) {
                console.error('Ошибка при загрузке пользователей:', err);
            }
        },
        async onSubmit(event) {
            const formType = event.target.getAttribute('action');
            this.resetErrors();

            const emailOrPhone = this.email.trim().toLowerCase();
            const userPassword = this.password.trim();

            if (!emailOrPhone) this.errors.emailEmpty = true;
            if (!userPassword) this.errors.passwordEmpty = true;

            if (this.errors.emailEmpty || this.errors.passwordEmpty) {
                this.showErrors = true;
                return;
            }

            if (formType === 'register') {
                const exists = this.allUsers.some(
                    user =>
                        user.email?.toLowerCase() === emailOrPhone ||
                        user.phone === emailOrPhone
                );
                if (exists) {
                    this.errors.alreadyExists = true;
                    this.showErrors = true;
                    return;
                }

                const newUser = {
                    name: this.name || 'User',
                    email: emailOrPhone,
                    password: userPassword,
                    phone: emailOrPhone.match(/^\d+$/) ? emailOrPhone : `+${Math.floor(Math.random() * 1000000000)}`
                };

                try {
                    const res = await axios.post(this.api, newUser);
                    if (res.data.ok) {
                        localStorage.setItem('user', res.data.element._id);
                        this.$router.push('/');
                    }
                } catch (err) {
                    console.error('Ошибка при регистрации:', err);
                }

            } else if (formType === 'enter') {
                const user = this.allUsers.find(
                    u =>
                        (u.email?.toLowerCase() === emailOrPhone || u.phone === emailOrPhone) &&
                        u.password === userPassword
                );

                if (user) {
                    localStorage.setItem('user', user._id);
                    this.$router.push('/');
                } else {
                    this.errors.notFound = true;
                    this.showErrors = true;
                }
            }
        },
        resetErrors() {
            this.showErrors = false;
            this.errors = {
                emailEmpty: false,
                passwordEmpty: false,
                alreadyExists: false,
                notFound: false
            };
        }
    }
};
</script>

<style>
.error-label {
    margin-top: -10px;
    font-size: 14px;
    color: red;
}
</style>