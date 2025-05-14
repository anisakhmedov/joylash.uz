<template>
    <div id="allProd">
        <div class="_margin"></div>

        <client-only>
            <Map :locations="allLocations" style="max-height: 600px;" class="active" :zoom="12" />
        </client-only>

        <client-only>
            <div class="filterBlock">
                <div class="search">
                    <input type="text" v-model="searchTitle" :placeholder="$t('allProducts.search_placeholder')" />
                    <img src="~/public/icons/search.svg" alt="">
                </div>

                <select v-model="selectedQuality">
                    <option disabled value="">{{ $t('allProducts.quality_placeholder') }}</option>
                    <option v-for="opt in qualityOptions" :key="opt.value" :value="opt.value">
                        {{ $t(opt.label) }}
                    </option>
                </select>

                <select v-model="selectedType">
                    <option disabled value="">{{ $t('allProducts.type_placeholder') }}</option>
                    <option v-for="opt in typeOptions" :key="opt.value" :value="opt.value">
                        {{ $t(opt.label) }}
                    </option>
                </select>

                <select v-model="selectedBuilding">
                    <option disabled value="">{{ $t('allProducts.building_placeholder') }}</option>
                    <option v-for="opt in buildingOptions" :key="opt.value" :value="opt.value">
                        {{ $t(opt.label) }}
                    </option>
                </select>
                <button @click="clearFilters">{{ $t('allProducts.clear_filters') }}</button>
            </div>
        </client-only>

        <Items id="Items" ref="ItemsProd" :houses="filteredHouses" />
    </div>
</template>

<script>
import Map from '~/components/Map.vue'
import Items from '~/components/Items.vue'
import axios from 'axios'

export default {
    components: { Map, Items },

    data() {
        return {
            houses: [],
            allHouse: [],

            selectedBuilding: '',
            selectedType: '',
            selectedQuality: '',
            searchTitle: '',

            buildingOptions: [
                { value: "1", label: "allProducts.buildings.flat" },
                { value: "2", label: "allProducts.buildings.office" },
                { value: "3", label: "allProducts.buildings.house" },
                { value: "4", label: "allProducts.buildings.land" },
            ],

            typeOptions: [
                { value: 1, label: "allProducts.types.rent" },
                { value: 2, label: "allProducts.types.sale" },
            ],

            qualityOptions: [
                { value: "1", label: "allProducts.qualities.used" },
                { value: "2", label: "allProducts.qualities.new" }
            ]
        }
    },

    computed: {
        filteredHouses() {
            return this.allHouse.filter(house => {
                const matchTitle = this.searchTitle
                    ? house.title?.toLowerCase().includes(this.searchTitle.toLowerCase())
                    : true;

                const matchQuality = this.selectedQuality
                    ? String(house.quality) === String(this.selectedQuality)
                    : true;

                const matchType = this.selectedType
                    ? String(house.RentOrSell) === String(this.selectedType)
                    : true;

                const matchBuilding = this.selectedBuilding
                    ? String(house.typeOfBuilding) === String(this.selectedBuilding)
                    : true;

                return matchTitle && matchQuality && matchType && matchBuilding;
            });
        },

        allLocations() {
            return this.allHouse
                .map(h => {
                    if (Array.isArray(h.coords) && h.coords.length === 2 && h._id) {
                        return {
                            lat: h.coords[0],
                            lng: h.coords[1],
                            id: h._id,
                            title: h.title || ''
                        }
                    }
                    return null;
                })
                .filter(Boolean)
        }
    },

    mounted() {
        if (process.client) {
            document.addEventListener('click', this.handleClickOutside);

            axios.get('https://joylash-778750a705b4.herokuapp.com/houses')
                .then(res => {
                    this.allHouse = res.data.body || []; // защитное присваивание
                })
                .catch(err => {
                });
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    watch: {
        allHouse: {
            immediate: true,
            handler(newVal) {
                if (Array.isArray(newVal)) {
                    this.houses = [...newVal];
                }
            }
        }
    },
    methods: {
        clearFilters() {
            this.selectedBuilding = '';
            this.selectedType = '';
            this.selectedQuality = '';
            this.searchTitle = '';
        }
    }
}
</script>

<style></style>