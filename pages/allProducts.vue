<template>
    <div id="allProd">
        <div class="_margin"></div>

        <client-only>
            <Map :locations="allLocations" style="max-height: 600px;" class="active" :zoom="12" />
        </client-only>

        <client-only>
            <div class="filterBlock">
                <div class="search">
                    <input type="text" v-model="searchTitle" placeholder="Search a Property" />
                    <img src="~/public/icons/search.svg" alt="">
                </div>

                <select v-model="selectedQuality">
                    <option selected>{{ qualityArr.title }}</option>
                    <option v-for="k in qualityArr.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedLocation">
                    <option selected>{{ locationFind.title }}</option>
                    <option v-for="k in locationFind.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedType">
                    <option selected>{{ typeSell.title }}</option>
                    <option v-for="k in typeSell.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedRooms">
                    <option selected>{{ roomsNum.title }}</option>
                    <option v-for="k in roomsNum.arr" :key="k" :value="k">{{ k }}</option>
                </select>

                <select v-model="selectedBuilding">
                    <option selected>{{ typeOfBuild.title }}</option>
                    <option v-for="k in typeOfBuild.arr" :key="k" :value="k">{{ k }}</option>
                </select>
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
            qualityArr: { title: "Quality", arr: [] },
            locationFind: { title: "Location", arr: [] },
            typeSell: { title: "Rent or Sell", arr: ['rent', 'sell'] },
            roomsNum: { title: "Number of Rooms", arr: [] },
            typeOfBuild: { title: "Type of Building", arr: [] },
            allHouse: [],

            selectedQuality: '',
            selectedLocation: '',
            selectedRooms: '',
            selectedType: '',
            selectedBuilding: '',
            searchTitle: '',
        }
    },

    computed: {
        filteredHouses() {
            return this.houses.filter(house => {
                const matchTitle = this.searchTitle
                    ? house.title.toLowerCase().includes(this.searchTitle.toLowerCase())
                    : true

                const matchQuality = this.selectedQuality
                    ? house.quality === this.selectedQuality
                    : true

                const matchLocation = this.selectedLocation
                    ? house.street === this.selectedLocation
                    : true

                const matchRooms = this.selectedRooms
                    ? String(house.roomsNumber) === String(this.selectedRooms)
                    : true

                const matchType = this.selectedType
                    ? house.status === this.selectedType
                    : true

                const matchBuilding = this.selectedBuilding
                    ? house.typeOfHouse === this.selectedBuilding
                    : true

                return matchTitle && matchQuality && matchLocation && matchRooms && matchType && matchBuilding
            })
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
                    this.allHouse = res.data.body;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    watch: {
        houses: {
            immediate: true,
            handler(val) {
                if (!val) return
                this.initFilters()
            }
        }
    },

    methods: {
        initFilters() {
            const unique = arr => [...new Set(arr)]

            this.qualityArr.arr = unique(this.houses.map(h => h.quality))
            this.locationFind.arr = unique(this.houses.map(h => h.street))
            this.roomsNum.arr = unique(this.houses.map(h => h.roomsNumber))
            this.typeOfBuild.arr = unique(this.houses.map(h => h.typeOfHouse))
        },
        handleClickOutside(event) {
            if (this.$refs.menuRef && !this.$refs.menuRef.contains(event.target)) {
                this.activeIndex = null;
            }
        }
    }
}
</script>

<style></style>