<template>
    <div class="_margin"></div>
    <div id="createItem">
        <form @submit.prevent="sendForm()" action="">
            <div class="baseInfo">
                <h1>Create New House</h1>
                <input type="text" v-model="form.title" placeholder="Название" name="title" id="">
                <label for="err" :class="{ active: showErrors && !form.title }"
                    v-show="showErrors && !form.title">Пропущено поле!</label>

                <input type="number" v-model="form.price" placeholder="Цена" />
                <label for="err" :class="{ active: showErrors && !form.price }"
                    v-show="showErrors && !form.price">Пропущено поле!</label>

                <input type="text" v-model="form.description" placeholder="Описание" name="description" id="">
                <label for="err" :class="{ active: showErrors && !form.description }"
                    v-show="showErrors && !form.description">Пропущено поле!</label>

                <input type="number" v-model="form.scale" placeholder="Масштаб" />
                <label for="err" :class="{ active: showErrors && !form.scale }"
                    v-show="showErrors && !form.scale">Пропущено поле!</label>

                <input type="number" v-model="form.roomsNumber" placeholder="Кол-во комнат" />
                <label for="err" :class="{ active: showErrors && !form.roomsNumber }"
                    v-show="showErrors && !form.roomsNumber">Пропущено поле!</label>

                <input type="text" v-model="form.typeOfHouse" placeholder="Тип стен" name="typeOfHouse" id="">
                <label for="err" :class="{ active: showErrors && !form.typeOfHouse }"
                    v-show="showErrors && !form.typeOfHouse">Пропущено поле!</label>

                <input type="text" v-model="form.street" placeholder="Улица и Номер дома" name="street" id="">
                <label for="err" :class="{ active: showErrors && !form.street }"
                    v-show="showErrors && !form.street">Пропущено поле!</label>

                <input type="text" v-model="form.quality" placeholder="Качество" name="quality" id="">
                <label for="err" :class="{ active: showErrors && !form.quality }"
                    v-show="showErrors && !form.quality">Пропущено поле!</label>

                <input type="number" v-model="form.cilingHeight" placeholder="Высота стен" />
                <label for="err" :class="{ active: showErrors && !form.cilingHeight }"
                    v-show="showErrors && !form.cilingHeight">Пропущено поле!</label>

                <select @change="realseNew()" v-model="typeOfBuilding" name="typeOfBuilding" id="">
                    <option selected value="1">Квартира</option>
                    <option value="4">Офис</option>
                    <option value="2">Дом</option>
                    <option value="3">Участок</option>
                </select>

                <input type="number" v-model="form.floor" placeholder="Этаж" />
                <label for="err" :class="{ active: showErrors && !form.floor }">Пропущено
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
            </div>
            <button>Отправить</button>
        </form>
    </div>
    <div v-if="modalVisible" class="modal-overlay">
        <div class="modal-content">
            <h2>Успешно!</h2>
            <p>Дом успешно отправлен и находится на модерации.</p>
            <button @click="modalVisible = false">OK</button>
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
            obj: {
                pluses: [],
                coords: [],
                mainImage: null,
                additionalImages: []
            },
            map: null,
            marker: null,
            form: {
                title: '',
                price: '',
                description: '',
                scale: '',
                roomsNumber: '',
                typeOfHouse: '',
                street: '',
                quality: '',
                cilingHeight: '',
                floor: ''
            },
            modalVisible: false,
            showErrors: false,
            mainImageFile: null,
            additionalImageFiles: []
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
                console.log('Координаты:', this.obj.coords)
            })
        }
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
                floor: ''
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
                console.log(input);

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
            const isValid = Object.values(this.form).every(value => value && value.toString().trim() !== '');
            if (!isValid) return;

            const formData = new FormData();
            Object.entries(this.form).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append('typeOfBuilding', this.typeOfBuilding);
            formData.append('coords', JSON.stringify(this.obj.coords));
            formData.append('pluses', JSON.stringify(this.obj.pluses));

            if (this.mainImageFile) {
                formData.append('mainImage', this.mainImageFile);
            }

            this.additionalImageFiles.forEach(file => {
                formData.append('additionalImages', file);
            });

            console.log(formData);
            

            axios.post(this.api, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(res => {
                    this.modalVisible = true;
                    this.resetForm();
                    console.log('Форма отправлена:', res.data);
                })
                .catch(err => {
                    console.error('Ошибка при отправке:', err);
                });
        }
    }
}
</script>

<style scoped>
/* Скрываем инпуты с фотографиями */
.file-input {
    display: none;
}

/* Стили для блока, который кликабельный */
.image-block {
    cursor: pointer;
    padding: 10px;
    border: 1px dashed #ccc;
    margin-bottom: 10px;
    text-align: center;
}

.image-block p {
    font-size: 16px;
    color: #555;
}

.delete-icon {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.delete-icon:hover {
    background-color: red;
}

@media (max-width: 600px) {
    input[type="file"] {
        width: 100%;
        padding: 10px;
        font-size: 16px;
    }
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-content {
    background: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
}

.modal-content h2 {
    margin-bottom: 10px;
}
</style>
