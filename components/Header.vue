<template>
    <header id="header">
        <div class="left">
            <NuxtLink :to="$localePath('/')">Joylash</NuxtLink>
        </div>
        <div class="mid">
            <ul>
                <li>
                    <NuxtLink :to="$localePath('/')">{{ $t("def.header.house") }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="$localePath('/allProducts')">{{ $t("def.header.cate") }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="$localePath('/allProducts')">{{ $t("def.header.catalogue") }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink :to="$localePath('/whishlist')">{{ $t("def.header.wishlist") }}</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="nav-images language">
                <img @click="isActive = !isActive" src="~/public/icons/languages.svg" alt="">
                <div class="block-lang" :class="isActive ? 'active' : ''">
                    <div class="rus">
                        <NuxtLink :to="$switchLocalePath('ru')">RU</NuxtLink>
                    </div>
                    <div class="uz">
                        <NuxtLink :to="$switchLocalePath('uz')">UZ</NuxtLink>
                    </div>
                    <div class="eng">
                        <NuxtLink :to="$switchLocalePath('en')">ENG</NuxtLink>
                    </div>
                </div>
            </div>
            <div style="cursor: pointer;" class="nav-images profile" @click="checkAndRoot()">

                <img src="~/public/icons/profile.svg" alt="">

            </div>
        </div>
    </header>
</template>

<script>
// import { useLocalePath } from 'vue-i18n-routing' // Nuxt auto-imports this too

import { useRoute } from 'vue-router'
export default {
    data() {
        return {
            isActive: false,
            // router: useRoute(),
        }
    },
    methods: {
        checkAndRoot() {
            if (localStorage.user) {
                if (this.$router.path !== 'profile') this.$router.push('/profile')
                else console.log('Зачем так много кликать??? ты уже тут!!!!');
            } else this.$router.push('/register')
        }
    }
}
</script>