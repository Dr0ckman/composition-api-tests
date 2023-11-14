<!-- Por hacer:  -->

<template>
  <div class="container-fluid bg-dark">
    <h1 class="text-primary mb-3">Interacciones</h1>

    <hr class="text-secondary">

    <Dropdown :dropdownOptions="userOptions">{{ selectedName }}</Dropdown>

    <div>
      <button class="btn btn-secondary d-block" @click="saveJSON">Descargar JSON</button>
      <button class="btn btn-secondary d-block mt-2" @click="saveCSV">Descargar CSV (para Excel)</button>
      <!-- Botón invisible modal -->
      <button type="button" class="btn btn-primary d-none" id="modal-button" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Aviso</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Esta es una versión <strong>beta</strong> del sistema de interacciones. Pese a que se encuentra en un
                estado en que es
                utilizable, hay varias funciones que aún no se implementan y otras que podrían fallar sin motivo aparente.
                Esto debido, principalmente, a que soy un programador mediocre.</p>
              <p>Lista de cosas por hacer:</p>
              <ul>
                <li>Implementar una forma de importar los .JSON guardados sin entrar a opciones del navegador.</li>
                <li>Cuando se marque una sucursal para enviar técnico, recordar enviar correo y vincular a Service Now
                  para crear la interacción.
                  Evaluar usar plantillas de correo o proveerlas en texto plano.
                </li>
                <li>Conseguir una base de datos de usuarios/ejecutivos. No tiene que ser necesariamente completa.
                  Se puede obtener una desde el administrador de ADN, pero van a faltar los ejecutivos de Work/Café, es
                  decir que si llaman desde Locker, van a haber personas que no figuren en la base. No es necesario
                  tampoco que estén vinculados a una sucursal. Es principalmente para tener un buscador de ejecutivos
                  decente y no tener que usar la guía de anexos para todo. Probablemente termine sacando esa info de la
                  misma guía de anexos con un crawler.
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-primary d-none">Debug</button>

    <hr class="text-secondary">

    <div>
      <table class="table table-sm table-dark table-striped table-responsive">
        <thead>
          <tr>
            <th scope="col" style="min-width: 20rem;">Acciones</th>
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
        <tbody class="align-middle table-group-divider">
          <tr v-for="(item, index) in dataRows">
            <th scope="row" class="ps-3">
              <a @click="addRow" class="me-n2" v-if="index === dataRows.length - 1"><font-awesome-icon icon="plus" /></a>
              <a @click="deleteRow(index, 1)" class="ms-4"><font-awesome-icon icon="minus" /></a>
              <div class="form-check form-check-inline ms-2 align-middle">
                <input class="form-check-input" type="checkbox" :id="`checkbox-${index}`" value="seEnviaTecnico"
                  style="width: 1rem; height: 1rem;" @click="handleCheck($event, index)">
                <label class="form-check-label" :for="`checkbox-${index}`">¿Se envía técnico?</label>
              </div>

            </th>
            <td :id="`id-${index}`">
              <!-- ID -->
              {{ index }}
            </td>
            <td :id="`numero-incidente-${index}`">
              <!-- Número incidente -->
              <input type="text" class="form-control bg-secondary bg-gradient" style="--bs-bg-opacity: .8;" @input="
                dataRows[index].numeroIncidente = $event.target.value" :value="dataRows[index].numeroIncidente">
            </td>
            <td :id="`codigo-sucursal-${index}`">
              <!-- Código sucursal -->
              <input type="text" :id="`input-codigo-${index}`" class="form-control"
                @input="handleTypingCodigoSucursal($event, index)" :value="dataRows[index].codigoSucursal">
            </td>
            <td :id="`nombre-sucursal-${index}`">
              <!-- Nombre de sucursal -->
              <input :id="`input-nombre-${index}`" type="text" class="form-control dropdown-toggle position-relative"
                :value="dataRows[index].nombreSucursal" data-bs-toggle="collapse" :href="`#collapse-nombre-${index}`"
                @input="handleNombreSucursal($event, index)" @click="handleClickingInput">
              <ul v-if="searchResult.length !== 0" class="list-group position-absolute z-2 collapse add-scrollbar"
                :id="`collapse-nombre-${index}`">
                <button class="list-group-item list-group-item-action" v-for="result in searchResult"
                  @click="handleClickingOption($event, index)">
                  {{ result }}
                </button>
              </ul>
            </td>
            <td :id="`resumen-${index}`">
              <!-- Resumen -->
              {{ dataRows[index].resumen }}
            </td>
            <td :id="`abierto-${index}`">
              <!-- Abierto -->
              <input type="text" class="form-control bg-secondary bg-gradient"
                @input="dataRows[index].abierto = $event.target.value" :value="dataRows[index].abierto">
            </td>
            <td :id="`cerrado-${index}`">
              <!-- Cerrado -->
              <input type="text" class="form-control bg-secondary bg-gradient"
                @input="dataRows[index].cerrado = $event.target.value" :value="dataRows[index].cerrado">
            </td>
            <td :id="`tiempo-${index}`">
              <!-- Tiempo -->
              <input type="text" class="form-control bg-secondary bg-gradient"
                @input="dataRows[index].tiempo = $event.target.value" :value="dataRows[index].tiempo">
            </td>
            <td :id="`tipo-${index}`">
              <!-- Tipo -->
              <select class="form-select" @input="dataRows[index].tipo = $event.target.value"
                @click="generateResumen($event, index)" :value="dataRows[index].tipo">
                <option selected>Tipo</option>
                <option value="CONSULTA">CONSULTA</option>
                <option value="SOLICITUD">SOLICITUD</option>
                <option value="INCIDENCIA">INCIDENCIA</option>
              </select>
            </td>
            <td :id="`categoria-${index}`">
              <!-- Categoría -->
              <select class="form-select" @input="dataRows[index].categoria = $event.target.value"
                :id="`select-categoria-${index}`" @click="handleClickingCategory($event, index)"
                :value="dataRows[index].categoria">
                <option selected>Categoría</option>
                <option value="SOFTWARE">SOFTWARE</option>
                <option value="HARDWARE">HARDWARE</option>
                <option value="REDES">REDES</option>
                <option value="PANTALLA PRO">PANTALLA PRO</option>
                <option value="ADM WEB">ADM WEB</option>
                <option value="CONSULTA/OTROS">CONSULTA/OTROS</option>
              </select>
            </td>
            <td :id="`subcategoria-${index}`">
              <!-- Subcategoría -->
              <select class="form-select" @input="dataRows[index].subcategoria = $event.target.value"
                @click="handleClickingSubcategory($event, index)" :id="`select-subcategoria-${index}`">
                <option selected>{{ dataRows[index].subcategoria }}</option>
                <option :value="subcategoria" v-for="subcategoria in subcategorias[index]">{{ subcategoria }}
                </option>
              </select>
            </td>
            <td :id="`detalle-${index}`">
              <!-- Detalle -->
              <select class="form-select" @input="dataRows[index].detalle = $event.target.value"
                @click="generateResumen($event, index)" :id="`select-detalle-${index}`">
                <option selected>{{ dataRows[index].detalle }}</option>
                <option :value="detalle" v-for="detalle in detalles[index]">{{ detalle }}</option>
              </select>
            </td>
            <td :id="`estado-${index}`">
              <!-- Estado -->
              <input type="text" class="form-control bg-secondary bg-gradient"
                @input="dataRows[index].estado = $event.target.value" :value="dataRows[index].estado">
            </td>
            <td :id="`asignado-a-${index}`">
              <!-- Asignado a -->
              {{ selectedName }}
            </td>
            <td :id="`grupo-${index}`">
              <!-- Grupo -->
              {{ dataRows[index].grupo }}
            </td>
            <td :id="`abierto-para-${index}`">
              <!-- Abierto para -->
              <input type="text" class="form-control bg-secondary bg-gradient"
                @input="dataRows[index].abiertoPara = $event.target.value" :value="dataRows[index].abiertoPara">
            </td>
            <td :id="`modelo-${index}`">
              <!-- Modelo -->
              {{ dataRows[index].modelo }}
            </td>
            <td :id="`territorial-${index}`">
              <!-- Territorial -->
              {{ dataRows[index].territorial }}
            </td>
            <td :id="`solucion-responsable-${index}`">
              {{ dataRows[index].solucionResponsable }}
            </td>
            <td :id="`tipo-maquina-${index}`">
              <!-- Tipo de máquina -->
              <select class="form-select" @input="dataRows[index].tipoMaquina = $event.target.value"
                @click="generateResumen($event, index)" :value="dataRows[index].tipoMaquina">
                <option selected>Tipo de máquina</option>
                <option value="ADN">ADN</option>
                <option value="Locker">Locker</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-light bg-secondary p-3 d-none">
        <h3>Debug zone</h3>
        <div class="row">
          <div class="col-2 mt-2">
            <button class="btn btn-primary" @click="convertJSONToCSV">Convertir JSON a CSV</button>
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
import { Tooltip } from 'bootstrap'

// VUE
import { computed, ref, onMounted, nextTick, onUpdated } from 'vue'

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
    let subcategorias = computed(() => store.state.subcategorias)
    let detalles = computed(() => store.state.detalles)
    let filteredSucursales = ref('')

    // Opciones botones desplegables
    const userOptions = ["David Chavez", "Sebastián Quezada", "Sebastián parra", "Jeanpierre Peña", "Gianfranco Samarotto", "Christopher Santana", "Miguel Ángel Amaya"]
    const machineOptions = ["Tipo de máquina", "ADN", "Locker"]
    const responsibleOptions = ["Solución Responsable", "Mesa de autoservicio", "Terreno"]

    // Funciones

    onMounted(() => {
      restoreSession()
      showWarning()
    })

    onUpdated(() => {
      saveJSONToBrowserStorage()
    })

    const showWarning = () => {
      document.querySelector('#modal-button').click()
    }

    async function restoreSession(e, index) {
      if (localStorage.getItem('savedData') !== null) {
        const savedData = JSON.parse(localStorage.getItem('savedData'))
        while (store.state.dataRows.length < savedData.length) {
          addRow()
        }

        await nextTick()

        let c = 0
        for (let element of savedData) {
          store.state.dataRows[c].id = savedData[c].id
          store.state.dataRows[c].numeroIncidente = savedData[c].numeroIncidente
          store.state.dataRows[c].codigoSucursal = savedData[c].codigoSucursal
          store.state.dataRows[c].nombreSucursal = savedData[c].nombreSucursal
          store.state.dataRows[c].resumen = savedData[c].resumen
          store.state.dataRows[c].abierto = savedData[c].abierto
          store.state.dataRows[c].cerrado = savedData[c].cerrado
          store.state.dataRows[c].tiempo = savedData[c].tiempo
          store.state.dataRows[c].tipo = savedData[c].tipo
          store.state.dataRows[c].categoria = savedData[c].categoria
          store.state.dataRows[c].subcategoria = savedData[c].subcategoria
          store.state.dataRows[c].detalle = savedData[c].detalle
          store.state.dataRows[c].estado = savedData[c].estado
          store.state.dataRows[c].asignadoA = savedData[c].asignadoA
          store.state.dataRows[c].grupo = savedData[c].grupo
          store.state.dataRows[c].abiertoPara = savedData[c].abiertoPara
          store.state.dataRows[c].modelo = savedData[c].modelo
          store.state.dataRows[c].territorial = savedData[c].territorial
          store.state.dataRows[c].solucionResponsable = savedData[c].solucionResponsable
          store.state.dataRows[c].solucionResponsable == 'TERRENO'
            ? document.querySelector(`#checkbox-${c}`).checked = true
            : document.querySelector(`#checkbox-${c}`).checked = false
          store.state.dataRows[c].tipoMaquina = savedData[c].tipoMaquina

          c++
        }
      }
    }

    const saveJSON = () => {
      const dataRowsJSON = JSON.stringify(store.state.dataRows)
      const blob = new Blob([dataRowsJSON], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = "savedData.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }

    const saveCSV = () => {
      const dataRowsCSV = convertJSONToCSV()
      const blob = new Blob([dataRowsCSV], { type: 'text/plain' })
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');
      a.download = "savedData.csv";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/csv', a.download, a.href].join(':');
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      a.dispatchEvent(e);
    }

    const saveJSONToBrowserStorage = () => {
      const dataRowsJSON = JSON.stringify(store.state.dataRows)
      window.localStorage.setItem('savedData', dataRowsJSON)
    }

    const convertJSONToCSV = () => {
      const items = store.state.dataRows
      const replacer = (key, value) => value === null ? '' : value
      const header = Object.keys(items[0])
      const csv = [
        header.join(','), // header row first
        ...items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
      ].join('\r\n')

      return csv
    }

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

    // Mientras el contador sea menor o igual 
    // a la cantidad de elementos en dataRows, cambiar los ID.
    const updateID = () => {
      let c = 0
      while (c < store.state.dataRows.length) {
        store.commit('changeID', {
          index: c,
          value: c
        })
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
      document.getElementById(`input-nombre-${index}`).value = ""
      store.state.dataRows[index].codigoSucursal = e.target.value
      if (filterSucursales('codigoSucursal', Number(e.target.value))[0] !== undefined) {
        document.querySelector(`#input-nombre-${index}`).value = filterSucursales('codigoSucursal', Number(e.target.value))[0].sucursal
        store.state.dataRows[index].nombreSucursal = filterSucursales('codigoSucursal', Number(e.target.value))[0].sucursal
        store.state.dataRows[index].modelo = filterSucursales('codigoSucursal', Number(e.target.value))[0].modelo
        store.state.dataRows[index].territorial = filterSucursales('codigoSucursal', Number(e.target.value))[0].territorial
      } else {
        document.querySelector(`#input-nombre-${index}`).value = ""
        store.state.dataRows[index].nombreSucursal = ""
      }
      generateResumen(e, index)
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
      if (document.querySelector(`collapse-nombre-${index}`) !== null) {
        if (!document.querySelector(`#nombre-sucursal-${index}`).classList.contains('show')) { // Si el menú está cerrado, abrirlo. Si está abierto, no hacer nada.
          document.querySelector(`#nombre-sucursal-${index}`).classList.add('show')
        } else {
          // pass
        }
      }

      document.querySelector(`#input-codigo-${index}`).value = ""
      store.state.dataRows[index].nombreSucursal = e.target.value
      if (filterSucursales('sucursal', e.target.value)[0] !== undefined) {
        document.querySelector(`#input-codigo-${index}`).value = filterSucursales('sucursal', e.target.value)[0].codigoSucursal
        store.state.dataRows[index].codigoSucursal = filterSucursales('sucursal', String(e.target.value))[0].codigoSucursal
        store.state.dataRows[index].modelo = filterSucursales('sucursal', String(e.target.value))[0].modelo
        store.state.dataRows[index].territorial = filterSucursales('sucursal', String(e.target.value))[0].territorial
      } else {
        document.querySelector(`#input-codigo-${index}`).value = ""
      }
    }

    const handleNombreSucursal = (e, index) => {
      searchSucursal(e)
      handleTypingNombreSucursal(e, index)
      generateResumen(e, index)
    }

    const handleClickingOption = (e, index) => {
      const inputElement = document.querySelector(`#input-nombre-${index}`)
      inputElement.value = e.target.innerHTML

      e.stopPropagation();

      if (filterSucursales('sucursal', inputElement.value)[0] !== undefined) {
        store.state.dataRows[index].nombreSucursal = e.target.innerHTML
        document.querySelector(`#input-codigo-${index}`).value = filterSucursales('sucursal', inputElement.value)[0].codigoSucursal
        console.log(e.target.parentElement.parentElement.previousElementSibling.children[0])
        store.state.dataRows[index].codigoSucursal = filterSucursales('sucursal', inputElement.value)[0].codigoSucursal
        store.state.dataRows[index].modelo = filterSucursales('sucursal', inputElement.value)[0].modelo
        store.state.dataRows[index].territorial = filterSucursales('sucursal', inputElement.value)[0].territorial
      }
      e.target.parentElement.classList.remove('show')
      generateResumen(e, index)
    }

    const handleClickingInput = (e) => {
      if (e.target.value == '') {
        store.commit('restartSearchResults')
      } else {
        // pass
      }
    }

    const handleClickingCategory = (e, index) => {
      store.commit('restartSubcategorias', index)
      store.commit('restartDetalles', index)
      // Reiniciar a valor por defecto el selector:
      document.querySelector(`#select-subcategoria-${index}`).value = 'Subcategoría'
      document.querySelector(`#select-detalle-${index}`).value = 'Detalle'
      generateSubcategorias(e, index)
      generateResumen(e, index)
    }

    const handleClickingSubcategory = (e, index) => {
      generateDetalle(e, index)
      generateResumen(e, index)
    }

    // Funciones subcategorias

    const generateSubcategorias = (e, index) => {
      const categoria = document.querySelector(`#select-categoria-${index}`).value
      store.commit('restartSubcategorias')

      if (categoria == 'SOFTWARE') {
        store.commit({
          type: 'addSubcategoria',
          index: index,
          subcategorias:
            [
              'SO',
              'LICENCIAS',
              'PAG WEB',
              'APLICACIONES',
              'CARGA/RETIRO PROD',
              'PROYECTO MES',
              'BBDD',
              'AGENDAMIENTO WEB',
              'CONSULTORA'
            ]
        }
        )
      } else if (categoria == 'HARDWARE') {
        store.commit({
          type: 'addSubcategoria',
          index: index,
          subcategorias: [
            'IMPRESORA',
            'TOUCH',
            'UPS',
            'LEC. CEDULA',
            'LEC. QR',
            'PANTALLA',
            'LEC. HUELLA',
            'FUENTE PODER',
            'CHAPA CASILLERO',
            'PLACA PUERTA',
            'FUENTE PUERTA'
          ]
        })
      } else if (categoria == 'REDES') {
        store.commit({
          type: 'addSubcategoria',
          index: index,
          subcategorias: [
            'RED',
            'MASIVO',
            'WEB SERVICE'
          ]
        })
      } else if (categoria == 'PANTALLA PRO') {
        store.commit({
          type: 'addSubcategoria',
          index: index,
          subcategorias: [
            'CONFIGURACION',
            'FISICO'
          ]
        })
      } else if (categoria == 'ADM WEB') {
        store.commit({
          type: 'addSubcategoria',
          index: index,
          subcategorias: [
            'CREACION DE USUARIO',
            'MODIFICACION DE USUARIO',
            'CAMBIO PERFIL ESCRITORIOS'
          ]
        })
      } else if (categoria == 'CONSULTA/OTROS') {
        store.commit({
          type: 'addSubcategoria',
          index: index,
          subcategorias: [
            'REPORTES',
            'GESTIONES VARIAS',
            'CONSULTAS',
            'OTROS'
          ]
        })
      }
      generateResumen(e, index)
    }

    // Funciones detalle

    const generateDetalle = (e, index) => {
      const subcategoria = store.state.dataRows[index].subcategoria
      store.commit('restartDetalles')

      if (subcategoria == 'SO') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'CARGA MATRIZ',
            'ERROR BOOTEO',
            'CAMBIO DE HORA',
            'CAMBIO DE RESOLUCION',
            'CONFIGURACION COM',
            'INICIO WINDOWS',
            'REINICIO DE SERVICIOS',
            'MODIFICACION REGEDIT'
          ]
        })
      } else if (subcategoria == 'LICENCIAS') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'NUEVA MATRIZ',
            'CADUCA'
          ]
        })
      } else if (subcategoria == 'PAG WEB') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'CAIDA REPORTES',
            'CAIDA ADMINISTRACION',
            'CAIDA MONITOREO',
            'MODIFICACION DE SERVICIOS',
            'AGREGAR/QUITAR SERVICIOS',
            'MAGIC INFO',
          ]
        })
      } else if (subcategoria == 'APLICACIONES') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'MOC API CAIDO',
            'FRONT CAIDO',
            'EMISOR CAIDO',
            'SIN VOZ',
            'DRIVERS',
            'API IMPRESORA CAIDA',
            'API TURNOS CAIDO',
            'API PUERTAS CAIDO',
            'CONFIGURACION PANWEB',
          ]
        })
      } else if (subcategoria == 'CARGA/RETIRO PROD') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'CARGA FALLIDA',
            'RETIRO FALLIDO',
            'RETIROS POR CIERRE'
          ]
        })
      } else if (subcategoria == 'PROYECTO MES') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'DESINSTALACION VNC',
            'MOC API'
          ]
        })
      } else if (subcategoria == 'BBDD') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'CAMBIO DE ESTRUCTURA',
            'AGREGACION DE SEGMENTOS',
            'AGREGACION DE CARTERAS',
            'MODIFICACION VALORES PYME',
            'BASE SERVER CENTRAL'
          ]
        })
      } else if (subcategoria == 'AGENDAMIENTO WEB') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'NO DESCARGA AGENDA'
          ]
        })
      } else if (subcategoria == 'CONSULTORA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'CAIDO',
            'ACTUALIZACION',
            'URL ERRONEA'
          ]
        })
      } else if (subcategoria == 'IMPRESORA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'GUILLOTINA',
            'PAPEL',
            'TAPA',
            'DRIVERS',
            'CABEZAL TERMICO',
            'NO RESPONDE'
          ]
        })

      } else if (subcategoria == 'TOUCH') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'DAÑADO',
            'NO RESPONDE'
          ]
        })

      } else if (subcategoria == 'UPS') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'DAÑADA',
            'PITIDO CONSTANTE'
          ]
        })
      } else if (subcategoria == 'LEC. CEDULA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'SUENA Y NO LEE'
          ]
        })
      } else if (subcategoria == 'LEC. QR') {
        store.commit(
          {
            type: 'addDetalle',
            index: index,
            detalles: [
              'NO SUENA'
            ]
          })
      } else if (subcategoria == 'PANTALLA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'QUEMADA',
            'DAÑADA',
            'NO ENCIENDE',
            'SIN CABLES']
        })

      } else if (subcategoria == 'LEC. HUELLA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'NO ENCIENDE',
            'NO LEE CORRECTAMENTE'
          ]
        })

      } else if (subcategoria == 'FUENTE PODER') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'QUEMADA',
            'DAÑADA'
          ]
        })
      } else if (subcategoria == 'CHAPA CASILLERO') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'NO ENVIA INFORMACION'
          ]
        })
      } else if (subcategoria == 'PLACA PUERTA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'NO ENCIENDE'
          ]
        })
      } else if (subcategoria == 'FUENTE PUERTA') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'DAÑADA',
            'QUEMADA',
            'NO ENCIENDE'
          ]
        })
      } else if (subcategoria == 'RED') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'SUCURSAL SIN RED',
            'PUNTO DE RED',
            'EQUIPO SIN RED',
            'INTERMITENCIA DE RED',
            'DESBLOQUEO MAC'
          ]
        })
      } else if (subcategoria == 'MASIVO') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: []
        })
      } else if (subcategoria == 'WEB SERVICE') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: []
        })
      } else if (subcategoria == 'CONFIGURACION') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'RELOJ DESACTUALIZADO',
            'RESET',
            'SERVIDOR',
            'ACTUALIZACION PUBLICIDAD',
            'REFRESCO PANTALLA',
            'REINICIO REMOTO',
            'CONFIGURACION INICIAL'
          ]
        })
      } else if (subcategoria == 'FISICO') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles: [
            'DAÑADA',
            'PUNTO RED',
            'PUNTO ELECTRICO',
            'QUEMADA',
            'SIN CABLES',
            'SIN CONTROL REMOTO'
          ]
        })
      } else if (subcategoria == 'CREACION DE USUARIO') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'USUARIO CARG,ADOR',
              'EJECUTIVO/LLAMADOR',
              'USUARIO ADMINISTRADOR'
            ]
        })
      } else if (subcategoria == 'MODIFICACION DE USUARIO') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'CAMBIO DE SUCURSAL',
              'MODIFICACION DE DATOS'
            ]
        })
      } else if (subcategoria == 'CAMBIO PERFIL ESCRITORIOS') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'CAMBIO DE SERVICIO',
              'MODIFICACION/CREACION DE ESCRITORIO'
            ]
        })
      } else if (subcategoria == 'REPORTES') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'USABILIDAD',
              'CONTESTABILIDAD',
              'UPTIME',
              'CONTINUIDAD OPERACIONAL',
              'STATUS LOCKER'
            ]
        })
      } else if (subcategoria == 'GESTIONES VARIAS') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'INGRESO TECNICOS',
              'COTIZACIONES',
              'ATENCION TECNICOS'
            ]
        })
      } else if (subcategoria == 'CONSULTAS') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'CONSULTA DE USUARIO',
              'CONSULTA USO',
              'SOLICITUD URL',
              'INFORMACION ADICIONAL'
            ]
        })
      } else if (subcategoria == 'OTROS') {
        store.commit({
          type: 'addDetalle',
          index: index,
          detalles:
            [
              'EQUIVOCADO',
              'ESTATUS DE EQUIPO',
              'TRANSFERENCIAS',
              'CORTA/NO RESPONDEN',
              'OTROS'
            ]
        })
      }
      generateResumen(e, index)
    }

    // Funciones resumen

    const generateResumen = (e, index) => {
      let nombreSucursal = store.state.dataRows[index].nombreSucursal
      let codigoSucursal = store.state.dataRows[index].codigoSucursal
      let categoria = store.state.dataRows[index].categoria
      let subcategoria = store.state.dataRows[index].subcategoria
      let detalle = store.state.dataRows[index].detalle
      let tipo = store.state.dataRows[index].tipo
      let tipoMaquina = store.state.dataRows[index].tipoMaquina
      let codigoMaquina = 0

      if (String(codigoSucursal).length < 4) {
        let zeroesToAdd = 3 - String(codigoSucursal).length
        codigoMaquina = Number("1" + "0".repeat(zeroesToAdd) + codigoSucursal)
      } else {
        codigoMaquina = codigoSucursal
      }

      if (tipoMaquina == 'ADN') {
        codigoMaquina = `ADN-TUR${codigoMaquina}`
      } else if (tipoMaquina == 'Locker') {
        codigoMaquina = `Locker-${codigoMaquina}`
      } else {
        // pass
      }

      store.state.dataRows[index].resumen = `Autoservicios | ADN|LOCKER (${codigoSucursal}) ${nombreSucursal} | ${categoria} | ${subcategoria} | ${detalle} | ${tipo} | ${codigoMaquina} ${store.state.dataRows[index].solucionResponsable == 'TERRENO' ? '(T)' : ''}`
    }

    const debugFunction = (e, index) => {
      document.querySelector(`#checkbox-${index}`).checked
        ? store.state.dataRows[index].solucionResponsable = 'TERRENO'
        : store.state.dataRows[index].solucionResponsable = 'MESA AUTOSERVICIO'
      generateResumen(e, index)
    }

    const handleCheck = (e, index) => {
      document.querySelector(`#checkbox-${index}`).checked
        ? store.state.dataRows[index].solucionResponsable = 'TERRENO'
        : store.state.dataRows[index].solucionResponsable = 'MESA AUTOSERVICIO'
      generateResumen(e, index)
    }

    return {
      dataRows, sucursales, selectedName, searchResult, subcategorias, filteredSucursales,
      userOptions, generateResumen, machineOptions, addRow, deleteRow, responsibleOptions,
      filterSucursales, handleTypingCodigoSucursal, handleTypingNombreSucursal,
      handleClickingOption, handleClickingInput, generateSubcategorias, handleNombreSucursal, updateID,
      debugFunction, searchSucursal, generateDetalle, detalles, handleClickingCategory, handleClickingSubcategory,
      saveJSON, restoreSession, convertJSONToCSV, saveCSV, showWarning, handleCheck
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

.add-scrollbar {
  max-height: 25rem;
  overflow: scroll;
}
</style>
