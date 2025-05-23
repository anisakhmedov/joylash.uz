<template>
    <div id="register">
        <div class="smth">
            <form action="register" @submit.prevent="onSubmit" v-show="typeOfForm">
                <h2>{{ $t('register.get_started_now') }}</h2>

                <div>
                    <label>{{ $t('register.email_or_phone') }}</label>
                    <input type="text" v-model="emailOrPhone" :placeholder="$t('register.enter_email_or_phone')" />
                    <label v-if="showErrors && errors.invalidInput" class="error-label">{{
                        $t('register.invalid_email_or_phone') }}</label>
                    <label v-if="showErrors && errors.alreadyExists" class="error-label">{{
                        $t('register.user_already_exists') }}</label>
                </div>

                <div>
                    <label>{{ $t('register.password') }}</label>
                    <input type="password" v-model="password" :placeholder="$t('register.enter_password')" />
                    <label v-if="showErrors && errors.passwordEmpty" class="error-label">{{
                        $t('register.field_required') }}</label>
                </div>

                <button>{{ $t('register.sign_up') }}</button>
                <p>{{ $t('register.or') }}</p>
                <span>
                    {{ $t('register.have_account') }}
                    <p @click="typeOfForm = !typeOfForm">{{ $t('register.sign_in') }}</p>
                </span>
            </form>

            <form action="enter" @submit.prevent="onSubmit" v-show="!typeOfForm">
                <h2>{{ $t('register.welcome_back') }}</h2>

                <div>
                    <label>{{ $t('register.email_or_phone') }}</label>
                    <input type="text" v-model="emailOrPhone" :placeholder="$t('register.enter_email_or_phone')" />
                    <label v-if="showErrors && errors.invalidInput" class="error-label">{{
                        $t('register.invalid_email_or_phone') }}</label>
                </div>

                <div>
                    <label class="password">
                        {{ $t('register.password') }}
                        <p style="cursor: pointer;">{{ $t('register.forgot_password') }}</p>
                    </label>
                    <input type="password" v-model="password" :placeholder="$t('register.enter_password')" />
                    <label v-if="showErrors && errors.notFound" class="error-label">{{
                        $t('register.invalid_login_or_password') }}</label>
                </div>

                <div class="check" :class="checkType ? 'active' : ''" @click="checkType = !checkType">
                    <div class="box">
                        <img src="~/public/icons/check-reg.svg" alt="" />
                    </div>
                    <p>{{ $t('register.remember_7_days') }}</p>
                </div>

                <button>{{ $t('register.sign_in') }}</button>
                <p>{{ $t('register.or') }}</p>
                <span>
                    {{ $t('register.dont_have_account') }}
                    <p @click="typeOfForm = !typeOfForm">{{ $t('register.sign_up') }}</p>
                </span>
            </form>
        </div>

        <div class="bg">
            <img src="~/public/images/bg_first.png" alt="" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            api: 'https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy',
            checkType: true,
            typeOfForm: true,
            emailOrPhone: '',
            password: '',
            allUsers: [],
            showErrors: false,
            errors: {
                invalidInput: false,
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
        isEmail(value) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        isPhone(value) {
            return /^\+?\d{9,15}$/.test(value);
        },
        async onSubmit(event) {
            const formType = event.target.getAttribute('action');
            this.resetErrors();

            const value = this.emailOrPhone.trim();
            const pass = this.password.trim();

            const validInput = this.isEmail(value) || this.isPhone(value);
            if (!validInput) this.errors.invalidInput = true;
            if (!pass) this.errors.passwordEmpty = true;

            if (Object.values(this.errors).some(v => v)) {
                this.showErrors = true;
                return;
            }

            if (formType === 'register') {
                const exists = this.allUsers.some(
                    user =>
                        user.email?.toLowerCase() === value.toLowerCase() || user.phone === value
                );
                if (exists) {
                    this.errors.alreadyExists = true;
                    this.showErrors = true;
                    return;
                }

                const newUser = {
                    name: 'User',
                    email: this.isEmail(value) ? value : 'smth' + Math.random().toString().slice(3),
                    phone: this.isPhone(value) ? value : 'smth' + Math.random().toString().slice(3),
                    password: pass
                };

                try {
                    const res = await axios.post(this.api, newUser);
                    (res);

                    if (res.data.ok) {
                        localStorage.setItem('user', res.data.element._id);
                        this.$router.back();
                    }
                } catch (err) {
                    console.error('Ошибка при регистрации:', err);
                }

            } else if (formType === 'enter') {
                const user = this.allUsers.find(
                    u =>
                        (u.email?.toLowerCase() === value.toLowerCase() || u.phone === value) &&
                        u.password === pass
                );

                if (user) {
                    localStorage.setItem('user', user._id);
                    this.$router.back();
                } else {
                    this.errors.notFound = true;
                    this.showErrors = true;
                }
            }
        },
        resetErrors() {
            this.showErrors = false;
            this.errors = {
                invalidInput: false,
                passwordEmpty: false,
                alreadyExists: false,
                notFound: false
            };
        }
    }
};
</script>

<style scoped>
.error-label {
    margin-top: -10px;
    font-size: 14px;
    color: red;
}
</style>