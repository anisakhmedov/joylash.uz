<template>
    <div id="createItem">
        <div class="arrowsBack">
            <NuxtLink style="display: flex; align-items: center; gap: 10px;" to="#" @click.prevent="$router.back()">
                <img style="transform: rotate(90deg);" src="/icons/arrow.svg" alt=""> {{ $t('def.backHome') }}
            </NuxtLink>
        </div>
        <form @submit.prevent="sendForm()" action="">
            <div class="baseInfo">
                <h1>{{ $t('create_item.create_new_house') }}</h1>

                <input type="text" v-model="form.title" :placeholder="$t('create_item.title')" name="title">
                <label for="title" :class="{ active: showErrors && !form.title }" v-show="showErrors && !form.title">{{
                    $t('create_item.missing_field') }}</label>

                <input type="number" v-model="form.price" name="price" :placeholder="$t('create_item.price')" />
                <label for="price" :class="{ active: showErrors && !form.price }" v-show="showErrors && !form.price">{{
                    $t('create_item.missing_field') }}</label>

                <input type="text" v-model="form.discription" :placeholder="$t('create_item.description')"
                    name="discription">
                <label for="discription" :class="{ active: showErrors && !form.discription }"
                    v-show="showErrors && !form.discription">{{ $t('create_item.missing_field') }}</label>

                <input type="number" v-model="form.scale" name="scale" :placeholder="$t('create_item.scale')" />
                <label for="scale" :class="{ active: showErrors && !form.scale }" v-show="showErrors && !form.scale">{{
                    $t('create_item.missing_field') }}</label>

                <input type="number" v-model="form.roomsNumber" name="roomsNumber"
                    :placeholder="$t('create_item.rooms_number')" />
                <label for="roomsNumber" :class="{ active: showErrors && !form.roomsNumber }"
                    v-show="showErrors && !form.roomsNumber">{{ $t('create_item.missing_field') }}</label>

                <input type="text" v-model="form.typeOfHouse" :placeholder="$t('create_item.wall_type')"
                    name="typeOfHouse">
                <label for="typeOfHouse" :class="{ active: showErrors && !form.typeOfHouse }"
                    v-show="showErrors && !form.typeOfHouse">{{ $t('create_item.missing_field') }}</label>

                <input type="text" v-model="form.street" :placeholder="$t('create_item.street_and_number')"
                    name="street">
                <label for="street" :class="{ active: showErrors && !form.street }"
                    v-show="showErrors && !form.street">{{ $t('create_item.missing_field') }}</label>

                <select v-model="qualitySelect" name="qualitySelect">
                    <option selected value="1">{{ $t('create_item.new') }}</option>
                    <option value="2">{{ $t('create_item.used') }}</option>
                </select>

                <input type="number" v-model="form.cilingHeight" name="cilingHeight"
                    :placeholder="$t('create_item.ceiling_height')" />
                <label for="cilingHeight" :class="{ active: showErrors && !form.cilingHeight }"
                    v-show="showErrors && !form.cilingHeight">{{ $t('create_item.missing_field') }}</label>

                <select v-model="typeOfBuilding" name="typeOfBuilding">
                    <option selected value="1">{{ $t('create_item.apartment') }}</option>
                    <option value="4">{{ $t('create_item.office') }}</option>
                    <option value="2">{{ $t('create_item.house') }}</option>
                    <option value="3">{{ $t('create_item.plot') }}</option>
                </select>

                <select v-model="RentOrSell" name="RentOrSell">
                    <option selected value="1">{{ $t('create_item.sell') }}</option>
                    <option value="2">{{ $t('create_item.rent') }}</option>
                </select>

                <input type="number" name="floor" v-model="form.floor" :placeholder="$t('create_item.floor')" />
                <label for="floor" :class="{ active: showErrors && !form.floor }">{{ $t('create_item.missing_field')
                    }}</label>

                <input type="text" v-model="form.phoneNumberUser" :placeholder="$t('create_item.phone_number')"
                    name="phoneNumberUser">
                <label for="phoneNumberUser" :class="{ active: showErrors && !form.phoneNumberUser }"
                    v-show="showErrors && !form.phoneNumberUser">{{ $t('create_item.missing_field') }}</label>

                <input type="text" v-model="form.sms" :placeholder="$t('create_item.social_link')" name="sms">
                <label for="sms" :class="{ active: showErrors && !form.sms }" v-show="showErrors && !form.sms">{{
                    $t('create_item.missing_field') }}</label>

                <div class="addPluses">
                    <input type="text" data-langPla="smth" :placeholder="$t('create_item.advantage_name')" />
                    <div class="add" @click="newPluses()"><img src="/icons/plus.svg" alt=""></div>
                </div>

                <div class="allpluses"></div>
                <div id="map" style="height: 400px; width: 100%;"></div>

                <label for="mainImage" class="image-label">{{ $t('create_item.main_image') }}</label>
                <div class="image-block" @click="triggerFileInput('mainImage')">
                    <div v-if="obj.mainImage">
                        <img :src="obj.mainImage" alt="" style="max-width: 200px; margin-bottom: 10px;">
                    </div>
                    <p v-if="!obj.mainImage">{{ $t('create_item.choose_image') }}</p>
                </div>
                <input type="file" id="mainImage" @change="handleMainImageChange" accept="image/*" class="file-input">

                <label for="additionalImages" class="image-label">{{ $t('create_item.additional_images') }}</label>
                <div class="image-block" @click="triggerFileInput('additionalImages')">
                    <div v-if="obj.additionalImages.length > 0">
                        <p>{{ obj.additionalImages.length }} {{ $t('create_item.images_selected') }}</p>
                    </div>
                    <p v-if="obj.additionalImages.length === 0">{{ $t('create_item.choose_image') }}</p>
                </div>
                <input type="file" id="additionalImages" @change="handleAdditionalImagesChange" multiple
                    accept="image/*" class="file-input">

                <div v-if="obj.additionalImages.length > 0">
                    <h3>{{ $t('create_item.additional_photos') }}</h3>
                    <div class="otherPhotos">
                        <div v-for="(image, index) in obj.additionalImages" :key="index" class="image-container">
                            <img :src="image" style="max-width: 200px; margin-bottom: 10px;">
                            <img class="delete-icon" src="~/public/icons/x-circle.svg" alt="Удалить"
                                @click="removeAdditionalImage(index)">
                        </div>
                    </div>
                </div>
                <input type="text" hidden value="">
            </div>
            <button>{{ $t('create_item.submit') }}</button>
        </form>

        <div class="modalWindowProfile" v-show="isShow">
            <div class="wind">
                <img :src="isCorrect ? '/icons/correct.png' : '/icons/remove.png'" alt="">
                <h2>{{ isCorrect ? $t('create_item.success') : $t('create_item.failure') }}</h2>
                <button type="submit" @click="isShow = false">{{ $t('create_item.close') }}</button>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'

export default {
    data() {
        return {
            api: 'https://joylash-uz-4a09707016fe.herokuapp.com/houses',
            floorSwitch: true,
            typeOfBuilding: 1,
            qualitySelect: 1,
            RentOrSell: 1,
            isCorrect: true,
            isShow: false,
            obj: {
                pluses: [],
                coords: [],
                mainImage: null,
                additionalImages: []
            },
            map: null,
            marker: null,
            userInfo: Object,
            form: {
                title: '',
                price: '',
                discription: '',
                scale: '',
                roomsNumber: '',
                typeOfHouse: '',
                street: '',
                cilingHeight: '',
                floor: '',
                phoneNumberUser: '',
                sms: ''
            },
            modalVisible: true,
            showErrors: false,
            mainImageFile: null,
            additionalImageFiles: [],
            userPluses: []
        }
    },

    mounted() {
        if (process.client) {
            const { $L } = useNuxtApp()

            this.map = $L.map('map').setView([39.6542, 66.9598], 14) // zoom 14 — ближе

            $L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.map)

            this.map.on('click', (e) => {
                const { lat, lng } = e.latlng

                if (this.marker) {
                    this.marker.setLatLng([lat, lng])
                } else {
                    this.marker = $L.marker([lat, lng]).addTo(this.map)
                }

                this.obj.coords = [lat, lng]
            })
        }
        axios.get(`https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/${localStorage.getItem('user')}`)
            .then((res) => {
                this.userPluses = res.data.data.codeHouses
            })
            .catch((err) => {
            })


    },

    methods: {
        resetForm() {
            this.form = {
                title: '',
                price: '',
                discription: '',
                scale: '',
                roomsNumber: '',
                typeOfHouse: '',
                street: '',
                quality: '',
                cilingHeight: '',
                floor: '',
                phoneNumberUser: '',
                sms: '',
            }
            this.obj = {
                pluses: [],
                coords: [],
                mainImage: null,
                additionalImages: []
            }
            this.typeOfBuilding = 1
            this.floorSwitch = true
            this.showErrors = false

            const plusesBlock = document.querySelector('.allpluses')
            if (plusesBlock) plusesBlock.innerHTML = ''

            if (this.marker) {
                this.map.removeLayer(this.marker)
                this.marker = null
            }
        },
        newPluses() {
            if (process.client) {
                let input = event.target.parentNode.parentNode.querySelector('input[data-langPla]');
                let text = input.value;

                if (text.length >= 5) {
                    let block = document.createElement('div');
                    let img = document.createElement('img');
                    let textSpan = document.createElement('span');

                    block.classList.add('pluses');
                    img.src = '/icons/x-circle.svg';
                    img.style.cursor = 'pointer';
                    textSpan.innerHTML = text;

                    block.append(textSpan, img);
                    document.querySelector('.allpluses').append(block);
                    input.value = '';

                    this.obj.pluses.push(text);

                    img.onclick = () => {
                        block.remove();
                        this.obj.pluses = this.obj.pluses.filter(item => item !== text);
                    };
                }
            }
        },

        triggerFileInput(inputId) {
            document.getElementById(inputId).click();
        },

        handleMainImageChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.mainImageFile = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.obj.mainImage = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },

        handleAdditionalImagesChange(event) {
            const files = Array.from(event.target.files);
            if (files.length > 0) {
                this.additionalImageFiles = files;
                files.forEach(file => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        this.obj.additionalImages.push(reader.result);
                    };
                    reader.readAsDataURL(file);
                });
            }
        },

        removeAdditionalImage(index) {
            this.obj.additionalImages.splice(index, 1);
            this.additionalImageFiles.splice(index, 1);
        },

        sendForm() {
            this.showErrors = true;
            const isValid = Object.values(this.form).every(value => value !== null && value !== undefined && value.toString().trim() !== '');

            const formData = new FormData();
            Object.entries(this.form).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append('userCreated', localStorage.getItem('user'))
            formData.append('quality', this.qualitySelect);
            formData.append('RentOrSell', this.RentOrSell);
            formData.append('typeOfBuilding', this.typeOfBuilding);
            formData.append('coords', JSON.stringify(this.obj.coords));
            formData.append('pluses', JSON.stringify(this.obj.pluses));

            if (this.mainImageFile) {
                formData.append('mainImage', this.mainImageFile);
            }

            this.additionalImageFiles.forEach(file => {
                formData.append('additionalImages', file);
            });

            axios.post(this.api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.isShow = true;
                    this.isCorrect = true;
                    this.resetForm();
                    newAddForUser(res.data._id)

                    axios.patch(`https://joylash-uz-4a09707016fe.herokuapp.com/usersJoy/${localStorage.getItem('user')}`, { codeHouses: addForPush })
                        .then((res) => {
                        })
                        .catch((err) => { })
                })
                .catch(err => {
                    this.isCorrect = false;
                    this.isShow = true;
                });
        }
    }
}
</script>

<style scoped></style>
