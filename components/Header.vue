<template>
    <header id="header">
        <div class="left">
            <NuxtLink style="color: white;" to="/">
                Joylash
            </NuxtLink>
        </div>
        <div class="mid">
            <ul>
                <li><NuxtLink to="/">Home</NuxtLink></li>
                <li><NuxtLink to="/allProducts">Categories</NuxtLink></li>
                <li><NuxtLink to="/allProducts">Catalogue</NuxtLink></li>
                <li><NuxtLink to="/allProducts">Wishlist</NuxtLink></li>
            </ul>
        </div>
        <div class="right">
            <div class="nav-images language">
                <img src="~/public/icons/languages.svg" alt="">
                <div class="block-lang">
                    <div class="rus">RU</div>
                    <div class="uz">UZ</div>
                    <div class="eng">ENG</div>
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

}
</script>

<style></style>