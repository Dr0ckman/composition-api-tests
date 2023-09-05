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

    <div>
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
          <tr v-for="(item, index) in dataRows">
            <td>
              <a @click="addRow" class="me-n2" v-if="index === dataRows.length - 1"><font-awesome-icon icon="plus" /></a>
              <a @click="deleteRow(index, 1)" class="ms-4"><font-awesome-icon icon="minus" /></a>
              <a href="#" class="ms-2"><font-awesome-icon icon="pen-square" /></a>
            </td>
            <td>
              <!-- ID -->
              {{ index }}
            </td>
            <td>
              <!-- Número incidente -->
              <input type="text" @input="dataRows[index].numeroIncidente = $event.target.value"
                placeholder="Número incidente">
            </td>
            <td>
              <!-- Código sucursal -->
              <input type="text" @input="dataRows[index].codigoSucursal = $event.target.value"
                placeholder="Código Sucursal">
            </td>
            <td>
              <!-- Nombre de sucursal -->
              <input type="text" @input="dataRows[index].nombreSucursal = $event.target.value"
                placeholder="Nombre Sucursal">
            </td>
            <td class="bg-warning-subtle">
              <!-- Resumen -->
              {{ dataRows[index].resumen }}
            </td>
            <td>
              <!-- Abierto -->
              <input type="text" @input="dataRows[index].abierto = $event.target.value" placeholder="Abierto">
            </td>
            <td>
              <!-- Cerrado -->
              <input type="text" @input="dataRows[index].cerrado = $event.target.value" placeholder="Cerrado">
            </td>
            <td>
              <!-- Tiempo -->
              <input type="text" @input="dataRows[index].tiempo = $event.target.value" placeholder="Tiempo">
            </td>
            <td>
              <!-- Tipo -->
              <input type="text" @input="dataRows[index].tipo = $event.target.value" placeholder="Tipo">
            </td>
            <td>
              <!-- Categoría -->
              <input type="text" @input="dataRows[index].categoria = $event.target.value" placeholder="Categoría">
            </td>
            <td>
              <!-- Subcategoría -->
              <input type="text" @input="dataRows[index].subcategoria = $event.target.value" placeholder="Subcategoría">
            </td>
            <td>
              <!-- Detalle -->
              <input type="text" @input="dataRows[index].detalle = $event.target.value" placeholder="Detalle">
            </td>
            <td>
              <!-- Estado -->
              <input type="text" @input="dataRows[index].estado = $event.target.value" placeholder="Estado">
            </td>
            <td class="bg-warning-subtle">
              <!-- Asignado a -->
              {{ selectedName }}
            </td>
            <td class="bg-warning-subtle">
              <!-- Grupo -->
              {{ dataRows[index].grupo }}
            </td>
            <td>
              <!-- Abierto para -->
              <input type="text" @input="dataRows[index].abiertoPara = $event.target.value" placeholder="Abierto para">
            </td>
            <td class="bg-warning-subtle">
              <!-- Modelo -->
              {{ dataRows[index].modelo }}
            </td>
            <td class="bg-warning-subtle">
              <!-- Territorial -->
              {{ dataRows[index].territorial }}
            </td>
            <td>
              <!-- Solucion Responsable -->
              <input type="text" @input="dataRows[index].solucionResponsable = $event.target.value"
                placeholder="Solución responsable">
            </td>
            <td>
              <!-- Tipo de máquina -->
              <input type="text" @input="dataRows[index].tipoMaquina = $event.target.value" placeholder="Tipo de máquina">
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
import sucursales from '../json/data.json'

// Componentes
import store from '../store/index'
import Dropdown from '../components/Dropdown.vue'

// VUE
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
      if (store.state.counter > 1) {
        console.log(index)
        store.commit('deleteRow', index)
      }
      else {
        // pass
      }

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
  // min-height: 100vh;

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
