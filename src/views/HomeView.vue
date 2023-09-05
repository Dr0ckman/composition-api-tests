<template>
  <div class="container-fluid bg-dark">
    <h1 class="text-primary mb-3">Interacciones</h1>

    <hr class="text-secondary">

    <Dropdown :dropdownOptions="userOptions">{{ selectedName }}</Dropdown>

    <div>
      <input type="file" id="fileInput" accept=".json" style="display: none;">
      <button class="btn btn-secondary" onclick="document.getElementById('fileInput').click();">Importar JSON</button>
    </div>

    <button @click="filterSucursales('modelo', 'WORK CAFE')" class="btn btn-light" style="display: none;">
      Debug button. YAY!!!!!!
    </button>

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
              <input type="text" class="form-control" :id="'codigo-sucursal-' + dataRows[index].id"
                @input="handleTypingCodigoSucursal($event, index)" placeholder="Código Sucursal">
            </td>
            <td>
              <!-- Nombre de sucursal -->
              <input type="text" class="form-control" :id="'nombre-sucursal-' + dataRows[index].id"
                @input="handleTypingNombreSucursal($event, index)" placeholder="Nombre Sucursal">
            </td>
            <td>
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
              <input type="text" class="form-control" @input="dataRows[index].tipo = $event.target.value"
                placeholder="Tipo">
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
    </div>

  </div>
</template>

<script>

// JSON
import rowData from '../json/data.json'
import dataSucursales from '../json/sucursales.json'

// Componentes
import store from '../store/index'
import Dropdown from '../components/Dropdown.vue'

// VUE
import { computed } from 'vue'
import { onMounted } from 'vue'

export default {
  name: 'HomeView',
  components: {
    Dropdown
  },
  setup() {
    const jsonData = rowData
    const dataRows = store.state.dataRows
    const selectedName = computed(() => store.state.selectedName)

    // Opciones botones desplegables
    const userOptions = ["David Chavez", "Sebastián Quezada", "Sebastián parra", "Jeanpierre Peña", "Gianfranco Samarotto", "Christopher Santana", "Miguel Ángel Amaya"]
    const machineOptions = ["Tipo de máquina", "ADN", "Locker"]
    const responsibleOptions = ["Solución Responsable", "Mesa de autoservicio", "Terreno"]

    const addRow = () => {
      store.commit('addRow')
    }

    const deleteRow = (index) => {
      if (store.state.counter > 1) {
        console.log(index)
        store.commit('deleteRow', index)
      }
      else {
        // pass
      }
    }

    const filterSucursales = (key, value) => {
      const sucursales = dataSucursales
      const result = sucursales.filter(d => d[key] == value)

      console.log(result)
      return result
    }

    const handleTypingCodigoSucursal = (e, index) => {
      dataRows[index].codigoSucursal = e.target.value
      const ID = `#nombre-sucursal-${index}`
      document.querySelector(ID).value = ""
      if (filterSucursales('codigoSucursal', e.target.value)[0] !== undefined) {
        document.querySelector(ID).value = filterSucursales('codigoSucursal', e.target.value)[0].sucursal
      }
    }

    const handleTypingNombreSucursal = (e, index) => {
      dataRows[index].nombreSucursal = e.target.value
      const ID = `#codigo-sucursal-${index}`
      document.querySelector(ID).value = ""
      if (filterSucursales('sucursal', e.target.value)[0] !== undefined) {
        document.querySelector(ID).value = filterSucursales('sucursal', e.target.value)[0].codigoSucursal
      }
    }

    return {
      jsonData, dataRows, userOptions,
      machineOptions, addRow, deleteRow, responsibleOptions,
      selectedName, filterSucursales, handleTypingCodigoSucursal,
      handleTypingNombreSucursal
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
</style>
