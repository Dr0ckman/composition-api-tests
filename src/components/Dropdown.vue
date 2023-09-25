<template>
    <div class="dropdown">
        <button type="button" class="btn btn-primary dropdown-toggle d-block mb-3" data-bs-toggle="dropdown">
            <slot></slot>
        </button>
        <ul class="dropdown-menu">
            <li v-for="option in dropdownOptions"><button class="dropdown-item" type="button"
                    @click="handleDropDown">{{ option }}</button></li>
        </ul>
    </div>
</template>

<script>
import store from '../store/index'

export default {
    name: 'Dropdown',
    props: {
        dropdownOptions: Array
    },
    setup(props) {
        const handleDropDown = (e) => { // Maneja el botón de nombres
            let selectedName = e.target.innerHTML
            store.commit('selectName', selectedName)
        }

        return { handleDropDown }
    }
}
</script>

<style scoped lang="scss"></style>