<template>
    <div ref="scrollWrapper" id="Items">
        <div class="item" v-for="n in 10" :key="n" ref="scrollWrapper">
            <!-- Карточка -->
            <div class="img">
                <img src="~/public/images/bg_product.png" alt="">
            </div>
            <div class="info">
                <div class="title">
                    <div class="left">
                        <p>ParadisePoint Villa</p>
                        <div class="price">
                            <span class="mainPrice">$1.980</span>
                            <span class="duration">/month</span>
                            <div class="disc">
                                Lorem ipsum dolor sit amet consectetur. Dis augue faucibus egestas tristique ullamcorper.
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <img src="~/public/icons/heart.svg" alt="">
                    </div>
                </div>
                <div class="options">
                    <ul>
                        <li><img src="~/public/icons/beds.svg" alt=""><span>2 Beds</span></li>
                        <li><img src="~/public/icons/shower.svg" alt=""><span>2 Baths</span></li>
                        <li><img src="~/public/icons/size.svg" alt=""><span>200m<sup>2</sup></span></li>
                        <li><img src="~/public/icons/garage.svg" alt=""><span>2 Parking Lot</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const scrollWrapper = ref(null)
defineExpose({ scrollWrapper })
</script>

<style scoped></style>