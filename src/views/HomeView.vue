<template>
  <div class="container-fluid">
    <h1 class="text-primary mb-3">Interacciones</h1>

    <hr>
    <div class="btn-group dropend">
      <button type="button" class="btn btn-primary dropdown-toggle d-block mb-3" data-bs-toggle="dropdown">
        Nombre
      </button>
      <ul class="dropdown-menu">
        <li><button class="dropdown-item" type="button" @click="handleDropDown">David Chavez</button></li>
        <li><button class="dropdown-item" type="button" @click="handleDropDown">Sebastián Parra</button></li>
        <li><button class="dropdown-item" type="button" @click="handleDropDown">Jeanpierre Peña</button></li>
        <li><button class="dropdown-item" type="button" @click="handleDropDown">Gianfranco Samarotto</button></li>
        <li><button class="dropdown-item" type="button" @click="handleDropDown">Christopher Santana</button></li>
        <li><button class="dropdown-item" type="button" @click="handleDropDown">Miguel Angel Amaya</button></li>
        <li><button class="dropdown-item" type="button" @click="handleDropDown">Sebastian Quezada</button></li>
      </ul>
    </div>
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
          <!-- <tr v-for="el in jsonData">
            <td v-for="element in el" :key="element.id">
              {{ element }}
            </td>
          </tr> -->
          <tr v-for="(item, index) in dataRows">
            <td>
              <a href="#" class="me-n2" v-if="index === dataRows.length - 1"><font-awesome-icon icon="plus" /></a>
              <a href="#" class="ms-4"><font-awesome-icon icon="minus" /></a>
              <a href="#" class="ms-2"><font-awesome-icon icon="pen-square" /></a>
            </td>
            <td>{{ index }}</td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td class="bg-warning-subtle"></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td class="bg-warning-subtle"></td>
            <td contenteditable=""></td>
            <td contenteditable=""></td>
            <td class="bg-warning-subtle"></td>
            <td class="bg-warning-subtle"></td>
            <td contenteditable=""></td>
            <td>
              <div class="btn-group dropend">
                <button type="button" class="btn btn-primary dropdown-toggle d-block mb-3" data-bs-toggle="dropdown">
                  Nombre
                </button>
                <ul class="dropdown-menu">
                  <li><button class="dropdown-item" type="button" @click="handleDropDown">ADN</button></li>
                  <li><button class="dropdown-item" type="button" @click="handleDropDown">LOCKER</button></li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import rowData from '../json/data.json'
import { ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const jsonData = rowData
    let dataRows = ref(["", "", "", "", "", "", "", "", ""])

    const handleDropDown = (e) => { // Maneja el botón de nombres
      // let selectedName = e.target.innerHTML;
      // let dropDownSelector = document.querySelector(e.target.parentElement.parentElement.previousSibling);
      // dropDownSelector.innerHTML = selectedName;
      console.log(e.target.parentElement.parentElement.previousSibling)
    }

    const addRow = () => {
      dataRows.push("")
    }

    return { handleDropDown, jsonData, dataRows }
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
}</style>
