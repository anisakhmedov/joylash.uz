<template>
    <div ref="scrollWrapper" id="Items">
        <div class="item" @click="routeOnPage(n)" v-for="n in 10" :key="n" ref="scrollWrapper">

            <!-- Карточка -->
            <div class="img">
                <img src="~/public/images/bg_product.png" alt="">
            </div>
            <div class="info">
                <div class="title">
                    <div class="left">
                        <div class="price">
                            <span class="mainPrice">$1.980</span>
                        </div>
                        <p>ParadisePoint Villa</p>
                        <div class="disc">
                            Lorem ipsum dolor sit amet consectetur. Dis augue faucibus egestas tristique ullamcorper.
                        </div>
                    </div>
                    <div class="right">
                        <img src="~/public/icons/heart.svg" alt="">
                    </div>
                </div>
                <hr>
                <div class="options">
                    <ul>
                        <li><img src="~/public/icons/bed-org.svg" alt=""><span>2 Beds</span></li>
                        <li><img src="~/public/icons/shower-org.svg" alt=""><span>2 Baths</span></li>
                        <li><img src="~/public/icons/scale-org.svg" alt=""><span>200m<sup>2</sup></span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

</script>

<style scoped></style>