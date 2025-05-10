<template>
    <div class="_margin"></div>
    <div id="createItem">
        <form @submit.prevent="sendForm()" action="">
            <div class="baseInfo">
                <h1>Create New House</h1>
                <input type="text" v-model="form.title" placeholder="Название" name="title" id="">
                <label for="title" :class="{ active: showErrors && !form.title }"
                    v-show="showErrors && !form.title">Пропущено поле!</label>

                <input type="number" v-model="form.price" name="price" placeholder="Цена" />
                <label for="price" :class="{ active: showErrors && !form.price }"
                    v-show="showErrors && !form.price">Пропущено поле!</label>

                <input type="text" v-model="form.discription" placeholder="Описание" name="discription" id="">
                <label for="discription" :class="{ active: showErrors && !form.discription }"
                    v-show="showErrors && !form.discription">Пропущено поле!</label>

                <input type="number" v-model="form.scale" name="scale" placeholder="Масштаб" />
                <label for="scale" :class="{ active: showErrors && !form.scale }"
                    v-show="showErrors && !form.scale">Пропущено поле!</label>

                <input type="number" v-model="form.roomsNumber" name="roomsNumber" placeholder="Кол-во комнат" />
                <label for="roomsNumber" :class="{ active: showErrors && !form.roomsNumber }"
                    v-show="showErrors && !form.roomsNumber">Пропущено поле!</label>

                <input type="text" v-model="form.typeOfHouse" placeholder="Тип стен" name="typeOfHouse" id="">
                <label for="typeOfHouse" :class="{ active: showErrors && !form.typeOfHouse }"
                    v-show="showErrors && !form.typeOfHouse">Пропущено поле!</label>

                <input type="text" v-model="form.street" placeholder="Улица и Номер дома" name="street" id="">
                <label for="street" :class="{ active: showErrors && !form.street }"
                    v-show="showErrors && !form.street">Пропущено поле!</label>

                <select v-model="qualitySelect" name="qualitySelect" id="">
                    <option selected value="1">Новый</option>
                    <option value="2">Б/У</option>
                </select>

                <input type="number" v-model="form.cilingHeight" name="cilingHeight" placeholder="Высота стен" />
                <label for="cilingHeight" :class="{ active: showErrors && !form.cilingHeight }"
                    v-show="showErrors && !form.cilingHeight">Пропущено поле!</label>

                <select @change="realseNew()" v-model="typeOfBuilding" name="typeOfBuilding" id="">
                    <option selected value="1">Квартира</option>
                    <option value="4">Офис</option>
                    <option value="2">Дом</option>
                    <option value="3">Участок</option>
                </select>

                <input type="number" name="floor" v-model="form.floor" placeholder="Этаж" />
                <label for="floor" :class="{ active: showErrors && !form.floor }">Пропущено
                    поле!</label>



                <input type="text" v-model="form.phoneNumberUser" placeholder="Номер телефона" name="phoneNumberUser"
                    id="">
                <label for="phoneNumberUser" :class="{ active: showErrors && !form.phoneNumberUser }"
                    v-show="showErrors && !form.phoneNumberUser">Пропущено поле!</label>

                <input type="text" v-model="form.sms" placeholder="Ссылка на соц.сети для связи" name="sms" id="">
                <label for="sms" :class="{ active: showErrors && !form.sms }" v-show="showErrors && !form.sms">Пропущено
                    поле!</label>





                <div class="addPluses">
                    <input type="text" placeholder="Название преимущества">
                    <div class="add" @click="newPluses()"><img src="/icons/plus.svg" alt=""></div>
                </div>

                <div class="allpluses">
                </div>
                <div id="map" style="height: 400px; width: 100%;"></div>

                <!-- Главное фото -->
                <label for="mainImage" class="image-label"
                    style="display: block; margin-top: 10px; color: black; font-size: 20px;">Главное фото</label>
                <div class="image-block" @click="triggerFileInput('mainImage')">
                    <div v-if="obj.mainImage">
                        <img :src="obj.mainImage" alt="Главное фото" style="max-width: 200px; margin-bottom: 10px;">
                    </div>
                    <p v-if="!obj.mainImage">Выберите фото</p>
                </div>
                <input type="file" id="mainImage" @change="handleMainImageChange" accept="image/*" class="file-input">

                <!-- Дополнительные фото -->
                <label for="additionalImages" class="image-label"
                    style="display: block; margin-top: 10px; color: black; font-size: 20px;">Дополнительные фото</label>
                <div class="image-block" @click="triggerFileInput('additionalImages')">
                    <div v-if="obj.additionalImages.length > 0">
                        <p>{{ obj.additionalImages.length }} фото выбрано</p>
                    </div>
                    <p v-if="obj.additionalImages.length === 0">Выберите фото</p>
                </div>
                <input type="file" id="additionalImages" @change="handleAdditionalImagesChange" multiple
                    accept="image/*" class="file-input">

                <!-- Отображение дополнительных фото -->
                <div v-if="obj.additionalImages.length > 0">
                    <h3>Дополнительные фотографии:</h3>
                    <div class="otherPhotos">
                        <div v-for="(image, index) in obj.additionalImages" :key="index" class="image-container">
                            <img :src="image" alt="Дополнительное фото" style="max-width: 200px; margin-bottom: 10px;">
                            <img class="delete-icon" src="~/public/icons/x-circle.svg" alt="Удалить"
                                @click="removeAdditionalImage(index)">
                        </div>
                    </div>
                </div>
                <input type="text" hidden value="">
            </div>
            <button>Отправить</button>
        </form>
        <div class="modalWindowProfile" v-show="isShow">
            <div class="wind">
                <img :src="isCorrect ? '/icons/correct.png' : '/icons/remove.png'" alt="">
                <h2>{{ isCorrect ? 'Товар был успешно изменен!' : 'Возникли проблемы с созданием товара' }}</h2>
                <button type="submit" @click="isShow = false">Закрыть окно</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            api: 'https://joylash-778750a705b4.herokuapp.com/houses',
            floorSwitch: true,
            typeOfBuilding: 1,
            qualitySelect: 1,
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
        axios.get(`https://joylash-778750a705b4.herokuapp.com/usersJoy/${localStorage.getItem('user')}`)
            .then((res) => {
                this.userPluses = res.data.data.codeHouses
                console.log(this.userPluses);
                
            })
            .catch((err) => {
                console.log(err);
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
                let input = event.target.parentNode.parentNode.querySelector('input[placeholder="Название преимущества"]');
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

        realseNew() {
            this.floorSwitch = this.typeOfBuilding == '1' || this.typeOfBuilding == '4';
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
            formData.append('typeOfBuilding', this.typeOfBuilding);
            formData.append('coords', JSON.stringify(this.obj.coords));
            formData.append('pluses', JSON.stringify(this.obj.pluses));

            if (this.mainImageFile) {
                formData.append('mainImage', this.mainImageFile);
            }

            this.additionalImageFiles.forEach(file => {
                formData.append('additionalImages', file);
            });


            //         let newAddForUser = (param) => {
            //                 .then((res) => {
            //             let addForPush = res.data.codeHouses
            //             addForPush.push(param)
            //             axios.patch(`https://joylash-778750a705b4.herokuapp.com/usersJoy/${localStorage.getItem('user')}`, { codeHouses: addForPush })
            //                 .then((res) => {
            //                     console.log(res);
            //                 })
            //                 .catch((err) => console.log(err))
            //         })
            //         .catch((err) => console.log(err))

            // }

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

                    axios.patch(`https://joylash-778750a705b4.herokuapp.com/usersJoy/${localStorage.getItem('user')}`, { codeHouses: addForPush })
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => console.log(err))
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
