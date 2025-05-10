<template>
    <div id="footer">
        <div class="title">
            <p>{{ $t('def.footer.left.main') }}</p>
        </div>
        <div class="mainBox">
            <ul class="logo">
                <p>Joylash</p>
            </ul>
            <ul class="categories">
                <li>
                    <NuxtLink to="/">
                        {{ $t('def.footer.mid.home') }}
                    </NuxtLink>
                </li>
                <li>{{ $t('def.footer.mid.blog') }}</li>
                <li>{{ $t('def.footer.mid.categories') }}</li>
                <li>{{ $t('def.footer.mid.contact') }}</li>
                <li>{{ $t('def.footer.mid.packages') }}</li>
                <li>{{ $t('def.footer.mid.licensing') }}</li>
            </ul>
            <div class="line"></div>
            <ul class="categories two">
                <li>{{ $t('def.footer.right.house') }}</li>
                <li>{{ $t('def.footer.right.apartment') }}</li>
                <li>{{ $t('def.footer.right.office') }}</li>
                <li>{{ $t('def.footer.right.warehouse') }}</li>
            </ul>
        </div>
        <div class="social">
            <div class="circle">
                <NuxtLink to="">
                    <img src="~/public/icons/X.svg" alt="">
                </NuxtLink>
            </div>
            <div class="circle">
                <img src="~/public/icons/facebook.svg" alt="">
            </div>
            <div class="circle">
                <img src="~/public/icons/instagram.svg" alt="">
            </div>
            <div class="circle">
                <img src="~/public/icons/linkedin.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>