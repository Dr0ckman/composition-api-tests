<template>
  <div class="container-fluid">
    <h1 class="text-primary mb-3">Interacciones</h1>

    <hr>

    <Dropdown :dropdownOptions="userOptions">{{ selectedName }}</Dropdown>

    <div>
      <input type="file" id="fileInput" accept=".json" style="display: none;">
      <button class="btn btn-secondary" onclick="document.getElementById('fileInput').click();">Importar JSON</button>
    </div>

    <hr>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Acciones</th>
            <th>ID</th>
            <th>Número Incidente</th>
            <th>Código Sucursal</th>
            <th>Nombre Sucursal</th>
            <th style="min-width: 40rem;">Resumen</th>
            <th>Abierto</th>
            <th>Cerrado</th>
            <th>Tiempo</th>
            <th>Tipo</th>
            <th>Categoría</th>
            <th>Subcategoría</th>
            <th>Detalle</th>
            <th>Estado</th>
            <th>Asignado a</th>
            <th>Grupo</th>
            <th>Abierto para</th>
            <th>Modelo</th>
            <th>Territorial</th>
            <th>Solución responsable</th>
            <th>Tipo de máquina</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in dataRows" :key="item.id">
            <td>
              <a @click="addRow" class="me-n2" v-if="item.id === dataRows.length - 1"><font-awesome-icon
                  icon="plus" /></a>
              <a @click="deleteRow(item.id, 1)" class="ms-4"><font-awesome-icon icon="minus" /></a>
              <a href="#" class="ms-2"><font-awesome-icon icon="pen-square" /></a>
            </td>
            <td>
              <!-- ID -->
              {{ item.id }}
            </td>
            <td>
              <!-- Número incidente -->
              <input type="text" :value="dataRows[item.id].numeroIncidente" 
              @input="dataRows[item.id].numeroIncidente=$event.target.value">
            </td>
            <td>
              <!-- Código sucursal -->
              <input type="text" v-model="dataRows[item.id].codigoSucursal">
            </td>
            <td>
              <!-- Nombre de sucursal -->
              <input type="text" v-model="dataRows[item.id].nombreSucursal">

            </td>
            <td class="bg-warning-subtle">
              <!-- Resumen -->
              {{ dataRows[item.id].resumen }}
            </td>
            <td>
              <!-- Abierto -->
              <input type="text" v-model="dataRows[item.id].abierto">
            </td>
            <td>
              <!-- Cerrado -->
              <input type="text" v-model="dataRows[item.id].cerrado">
            </td>
            <td>
              <!-- Tiempo -->
              <input type="text" v-model="dataRows[item.id].tiempo">
            </td>
            <td>
              <!-- Tipo -->
              <input type="text" v-model="dataRows[item.id].tipo">
            </td>
            <td>
              <!-- Categoría -->
              <input type="text" v-model="dataRows[item.id].categoria">
            </td>
            <td>
              <!-- Subcategoría -->
              <input type="text" v-model="dataRows[item.id].subcategoria">
            </td>
            <td>
              <!-- Detalle -->
              <input type="text" v-model="dataRows[item.id].detalle">
            </td>
            <td>
              <!-- Estado -->
              <input type="text" v-model="dataRows[item.id].estado">
            </td>
            <td class="bg-warning-subtle">
              <!-- Asignado a -->
              {{ selectedName }}
            </td>
            <td class="bg-warning-subtle">
              <!-- Grupo -->
              {{ dataRows[item.id].grupo }}
            </td>
            <td>
              <!-- Abierto para -->
              <input type="text" v-model="dataRows[item.id].abiertoPara">
            </td>
            <td class="bg-warning-subtle">
              <!-- Modelo -->
              {{ dataRows[item.id].modelo }}
            </td>
            <td class="bg-warning-subtle">
              <!-- Territorial -->
              {{ dataRows[item.id].territorial }}
            </td>
            <td>
              <!-- Solucion Responsable -->
              <input type="text" v-model="dataRows[item.id].solucionResponsable">
            </td>
            <td>
              <!-- Tipo de máquina -->
              <input type="text" v-model="dataRows[item.id].tipoMaquina">
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import store from '../store/index'
import rowData from '../json/data.json'
import Dropdown from '../components/Dropdown.vue'
import { computed } from 'vue'

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
      console.log(index)
      store.commit('deleteRow', index)
      
    }

    return {
      jsonData, dataRows, userOptions,
      machineOptions, addRow, deleteRow, responsibleOptions,
      selectedName
    }
  }
}
</script>

<style scoped lang="scss">
table {
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
