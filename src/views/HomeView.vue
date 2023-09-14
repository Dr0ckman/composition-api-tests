<template>
  <div class="container-fluid bg-dark">
    <h1 class="text-primary mb-3">Interacciones</h1>

    <hr class="text-secondary">

    <Dropdown :dropdownOptions="userOptions">{{ selectedName }}</Dropdown>

    <div>
      <input type="file" id="fileInput" accept=".json" style="display: none;">
      <button class="btn btn-secondary" onclick="document.getElementById('fileInput').click();">Importar JSON</button>
    </div>

    <button class="btn btn-primary d-none">Debug</button>

    <hr class="text-secondary">

    <div>
      <table class="table table-dark table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">Acciones</th>
            <th scope="col">ID</th>
            <th scope="col">Número Incidente</th>
            <th scope="col">Código Sucursal</th>
            <th scope="col">Nombre Sucursal</th>
            <th scope="col" style="min-width: 40rem;">Resumen</th>
            <th scope="col">Abierto</th>
            <th scope="col">Cerrado</th>
            <th scope="col">Tiempo</th>
            <th scope="col">Tipo</th>
            <th scope="col">Categoría</th>
            <th scope="col">Subcategoría</th>
            <th scope="col">Detalle</th>
            <th scope="col">Estado</th>
            <th scope="col">Asignado a</th>
            <th scope="col">Grupo</th>
            <th scope="col">Abierto para</th>
            <th scope="col">Modelo</th>
            <th scope="col">Territorial</th>
            <th scope="col">Solución responsable</th>
            <th scope="col">Tipo de máquina</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="(item, index) in dataRows">
            <th scope="row">
              <a @click="addRow" class="me-n2" v-if="index === dataRows.length - 1"><font-awesome-icon icon="plus" /></a>
              <a @click="deleteRow(index, 1)" class="ms-4"><font-awesome-icon icon="minus" /></a>
              <a href="#" class="ms-2"><font-awesome-icon icon="pen-square" /></a>
            </th>
            <td>
              <!-- ID -->
              {{ index }}
            </td>
            <td>
              <!-- Número incidente -->
              <input type="text" class="form-control" @input="dataRows[index].numeroIncidente = $event.target.value"
                placeholder="Número incidente">
            </td>
            <td>
              <!-- Código sucursal -->
              <input type="text" class="form-control" @input="handleTypingCodigoSucursal($event, index)"
                placeholder="Código sucursal">
            </td>
            <td>
              <!-- Nombre de sucursal -->
              <input type="text" class="form-control dropdown-toggle position-relative" placeholder="Nombre sucursal" data-bs-toggle="collapse"
                :href="`#collapse-nombre-${index}`" @input="handleNombreSucursal($event, index)"
                @click="handleClickingInput">
              <ul v-if="searchResult.length !== 0" class="list-group position-absolute z-2 overflow-scroll collapse nombre-sucursal"
                :id="`collapse-nombre-${index}`">
                <button class="list-group-item list-group-item-action" v-for="result in searchResult"
                  @click="handleClickingOption($event, index)">
                  {{ result }}
                </button>
              </ul>
            </td>
            <td @click="generateResumen($event, index)">
              <!-- Resumen -->
              {{ dataRows[index].resumen }}
            </td>
            <td>
              <!-- Abierto -->
              <input type="text" class="form-control" @input="dataRows[index].abierto = $event.target.value"
                placeholder="Abierto">
            </td>
            <td>
              <!-- Cerrado -->
              <input type="text" class="form-control" @input="dataRows[index].cerrado = $event.target.value"
                placeholder="Cerrado">
            </td>
            <td>
              <!-- Tiempo -->
              <input type="text" class="form-control" @input="dataRows[index].tiempo = $event.target.value"
                placeholder="Tiempo">
            </td>
            <td>
              <!-- Tipo -->
              <select class="form-select" @input="dataRows[index].tipo = $event.target.value" :id="`tipo-${index}`">
                <option selected>Tipo</option>
                <option value="CONSULTA">CONSULTA</option>
                <option value="SOLICITUD">SOLICITUD</option>
                <option value="INCIDENCIA">INCIDENCIA</option>
              </select>
            </td>
            <td>
              <!-- Categoría -->
              <input type="text" class="form-control" @input="dataRows[index].categoria = $event.target.value"
                placeholder="Categoría">
            </td>
            <td>
              <!-- Subcategoría -->
              <input type="text" class="form-control" @input="dataRows[index].subcategoria = $event.target.value"
                placeholder="Subcategoría">
            </td>
            <td>
              <!-- Detalle -->
              <input type="text" class="form-control" @input="dataRows[index].detalle = $event.target.value"
                placeholder="Detalle">
            </td>
            <td>
              <!-- Estado -->
              <input type="text" class="form-control" @input="dataRows[index].estado = $event.target.value"
                placeholder="Estado">
            </td>
            <td>
              <!-- Asignado a -->
              {{ selectedName }}
            </td>
            <td>
              <!-- Grupo -->
              {{ dataRows[index].grupo }}
            </td>
            <td>
              <!-- Abierto para -->
              <input type="text" class="form-control" @input="dataRows[index].abiertoPara = $event.target.value"
                placeholder="Abierto para">
            </td>
            <td>
              <!-- Modelo -->
              {{ dataRows[index].modelo }}
            </td>
            <td>
              <!-- Territorial -->
              {{ dataRows[index].territorial }}
            </td>
            <td>
              <!-- Solucion Responsable -->
              <input type="text" class="form-control" @input="dataRows[index].solucionResponsable = $event.target.value"
                placeholder="Solución responsable">
            </td>
            <td>
              <!-- Tipo de máquina -->
              <input type="text" class="form-control" @input="dataRows[index].tipoMaquina = $event.target.value"
                placeholder="Tipo de máquina">
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-light bg-secondary p-3 d-none">
        <h3>Debug zone</h3>
        <div class="row">
          <div class="col-2 mt-2">
            <input type="text" class="form-control" placeholder="searchSucursal()" @input="searchSucursal">
          </div>
        </div>
        <div class="row">
          <div class="col-2 mt-2">
            <strong>Resultados búsqueda</strong>
            <div class="bg-light rounded text-primary ps-2">
              <!-- Resultados búsqueda -->
              <p class="m-0" v-for="element in searchResult">
                {{ element }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// Componentes
import store from '../store/index'
import Dropdown from '../components/Dropdown.vue'

// VUE
import { computed, ref } from 'vue'

export default {
  name: 'HomeView',
  components: {
    Dropdown
  },
  setup() {
    let dataRows = computed(() => store.state.dataRows)
    let sucursales = computed(() => store.state.sucursales)
    let selectedName = computed(() => store.state.selectedName)
    let searchResult = computed(() => store.state.searchResult)
    let filteredSucursales = ref('')

    // Opciones botones desplegables
    const userOptions = ["David Chavez", "Sebastián Quezada", "Sebastián parra", "Jeanpierre Peña", "Gianfranco Samarotto", "Christopher Santana", "Miguel Ángel Amaya"]
    const machineOptions = ["Tipo de máquina", "ADN", "Locker"]
    const responsibleOptions = ["Solución Responsable", "Mesa de autoservicio", "Terreno"]


    // Funciones
    const addRow = () => {
      store.commit('addRow')
    }

    const deleteRow = (index) => {
      if (store.state.counter > 1) {
        store.commit('deleteRow', index)
        updateID()
      } else {
        // pass
      }
    }

    const updateID = () => {
      let c = 0
      for (let element of store.state.dataRows) {
        element.id = c
        c++
      }
    }

    const filterSucursales = (key, value) => {
      if (typeof value == 'string') {
        filteredSucursales = sucursales.value.filter(sucursal => sucursal[key].toLowerCase() == value.toLowerCase())
      } else {
        filteredSucursales = sucursales.value.filter(sucursal => sucursal[key] == value)
      }

      return filteredSucursales
    }

    const handleTypingCodigoSucursal = (e, index) => {
      e.target.parentElement.nextElementSibling.children[0].value = ""
      store.state.dataRows[index].codigoSucursal = e.target.value
      if (filterSucursales('codigoSucursal', Number(e.target.value))[0] !== undefined) {
        e.target.parentElement.nextElementSibling.children[0].value = filterSucursales('codigoSucursal', Number(e.target.value))[0].sucursal
        store.state.dataRows[index].nombreSucursal = filterSucursales('codigoSucursal', Number(e.target.value))[0].sucursal
      }
    }

    // Funciones input nombre

    const searchSucursal = (e) => {
      let searchTerm = e.target.value
      store.commit('restartSearchResults')
      for (const sucursal of sucursales.value) {
        if (sucursal.sucursal.toLowerCase().includes(searchTerm) && searchTerm !== '') {
          store.commit('addSearchResult', sucursal.sucursal)
        }
      }
    }

    const handleTypingNombreSucursal = (e, index) => {
      if (e.target.nextElementSibling !== null) {
        if (!e.target.nextElementSibling.classList.contains('show')) { // Si el menú está cerrado, abrirlo. Si está abierto, no hacer nada.
          e.target.nextElementSibling.classList.add('show')
        } else {
          // pass
        }
      }

      e.target.parentElement.previousElementSibling.children[0].value = ""
      store.state.dataRows[index].nombreSucursal = e.target.value
      if (filterSucursales('sucursal', e.target.value)[0] !== undefined) {
        e.target.parentElement.previousElementSibling.children[0].value = filterSucursales('sucursal', e.target.value)[0].codigoSucursal
        store.state.dataRows[index].codigoSucursal = filterSucursales('sucursal', e.target.value)[0].codigoSucursal
      }
    }

    const handleNombreSucursal = (e, index) => {
      searchSucursal(e)
      handleTypingNombreSucursal(e, index)
    }

    const handleClickingOption = (e, index) => {
      let inputElement = e.target.parentElement.previousElementSibling
      inputElement.value = e.target.innerHTML

      store.state.dataRows[index].nombreSucursal = e.target.value
      if (filterSucursales('sucursal', inputElement.value)[0] !== undefined) {
        e.target.parentElement.parentElement.previousElementSibling.children[0].value = filterSucursales('sucursal', inputElement.value)[0].codigoSucursal
        store.state.dataRows[index].codigoSucursal = filterSucursales('sucursal', inputElement.value)[0].codigoSucursal
      }
      e.target.parentElement.classList.remove('show')
    }

    const handleClickingInput = (e) => {
      if (e.target.value == '') {
        store.commit('restartSearchResults')
      } else {
        // pass
      }
    }

    const generateResumen = (e, index) => {
      let nombreSucursal = store.state.dataRows[index].nombreSucursal
      let codigoSucursal = store.state.dataRows[index].codigoSucursal
      let categoria = store.state.dataRows[index].categoria
      let subcategoria = store.state.dataRows[index].subcategoria
      let detalle = store.state.dataRows[index].detalle
      let tipo = store.state.dataRows[index].tipo
      let tipoMaquina = store.state.dataRows[index].tipoMaquina
      let codigoMaquina = 0

      if (tipoMaquina !== 'ADN' && tipoMaquina !== 'Locker') {
        // pass
      } else if (tipoMaquina == 'ADN' || tipoMaquina == 'Locker') {
        if (String(codigoSucursal).length < 4) {
          let zeroesToAdd = 3 - String(codigoSucursal).length
          codigoMaquina = Number("1" + "0".repeat(zeroesToAdd) + codigoSucursal)
        } else {
          codigoMaquina = codigoSucursal
        }
      } else {
        // pass
      }

      store.state.dataRows[index].resumen = `Autoservicios | ADN|LOCKER (${codigoSucursal}) ${nombreSucursal} | ${categoria} | ${subcategoria} | ${detalle} | ${tipo} | ${codigoMaquina}`
    }

    const debugFunction = () => {
      for (let sucursal of sucursales.value) {
        console.log(sucursal.sucursal)
      }
    }

    return {
      dataRows, sucursales, selectedName, searchResult, filteredSucursales, userOptions,
      generateResumen, machineOptions, addRow, deleteRow, responsibleOptions,
      filterSucursales, handleTypingCodigoSucursal, handleTypingNombreSucursal,
      handleClickingOption, handleClickingInput, handleNombreSucursal, updateID,
      debugFunction, searchSucursal
    }
  }
}
</script>

<style scoped lang="scss">
table {
  min-height: 100%;

  thead {
    tr {
      th {
        min-width: 12rem;
      }
    }
  }
}

.me-n2 {
  margin-right: -0.9rem;
}

#formFileSm {
  width: 20rem;
}

input {
  width: 100%;
}

.nombre-sucursal {
  max-height: 25rem;
}
</style>
