<template>
    <header id="header">
        <div class="left">
            <NuxtLink style="color: white;" to="/">
                Joylash
            </NuxtLink>
        </div>
        <div class="mid">
            <ul>
                <li>
                    <NuxtLink to="/">{{ $t("def.header.house") }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/allProducts">{{ $t("def.header.cate") }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/allProducts">{{ $t("def.header.catalogue") }}</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/allProducts">{{ $t("def.header.wishlist") }}</NuxtLink>
                </li>
            </ul>
        </div>
        <div class="right">
            <div class="nav-images language">
                <img @click="isActive = !isActive" src="~/public/icons/languages.svg" alt="">
                <div class="block-lang" :class="isActive ? 'active' : ''">
                    <div class="rus">
                        <NuxtLink :to="$switchLocalePath('ru')">
                            RU
                        </NuxtLink>
                    </div>
                    <div class="uz">
                        <NuxtLink :to="$switchLocalePath('uz')">
                            UZ
                        </NuxtLink>
                    </div>
                    <div class="eng">
                        <NuxtLink :to="$switchLocalePath('en')">
                            ENG
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div class="nav-images profile">
                <NuxtLink to="/profile">
                    <img src="~/public/icons/profile.svg" alt="">
                </NuxtLink>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            isActive: false
        }
    },
}
</script>

<style></style>