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
              <input type="text" class="form-control bg-secondary bg-gradient" style="--bs-bg-opacity: .8;" @input="
                dataRows[index].numeroIncidente=$event.target.value" placeholder="Número incidente">
            </td>
            <td>
              <!-- Código sucursal -->
              <input type="text" class="form-control" @input="handleTypingCodigoSucursal($event, index)"
                placeholder="Código sucursal">
            </td>
            <td>
              <!-- Nombre de sucursal -->
              <input :id="`input-nombre-${index}`" type="text" class="form-control dropdown-toggle position-relative"
                placeholder="Nombre sucursal" data-bs-toggle="collapse" :href="`#collapse-nombre-${index}`"
                @input="handleNombreSucursal($event, index)" @click="handleClickingInput">
              <ul v-if="searchResult.length !== 0" class="list-group position-absolute z-2 collapse add-scrollbar"
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
              <input type="text" class="form-control bg-secondary bg-gradient" @input="dataRows[index].abierto = $event.target.value"
                placeholder="Abierto">
            </td>
            <td>
              <!-- Cerrado -->
              <input type="text" class="form-control bg-secondary bg-gradient" @input="dataRows[index].cerrado = $event.target.value"
                placeholder="Cerrado">
            </td>
            <td>
              <!-- Tiempo -->
              <input type="text" class="form-control bg-secondary bg-gradient" @input="dataRows[index].tiempo = $event.target.value"
                placeholder="Tiempo">
            </td>
            <td>
              <!-- Tipo -->
              <select class="form-select" @input="dataRows[index].tipo = $event.target.value" :id="`tipo-${index}`"
                @click="generateResumen($event, index)">
                <option selected>Tipo</option>
                <option value="CONSULTA">CONSULTA</option>
                <option value="SOLICITUD">SOLICITUD</option>
                <option value="INCIDENCIA">INCIDENCIA</option>
              </select>
            </td>
            <td>
              <!-- Categoría -->
              <select class="form-select" @input="dataRows[index].categoria = $event.target.value"
                :id="`categoria-${index}`" @click="generateResumen($event, index)">
                <option selected>Categoría</option>
                <option value="SOFTWARE">SOFTWARE</option>
                <option value="HARDWARE">HARDWARE</option>
                <option value="REDES">REDES</option>
                <option value="PANTALLA PRO">PANTALLA PRO</option>
                <option value="ADM WEB">ADM WEB</option>
                <option value="CONSULTA/OTROS">CONSULTA/OTROS</option>
              </select>
            </td>
            <td>
              <!-- Subcategoría -->
              <select class="form-select" @input="dataRows[index].subcategoria = $event.target.value"
                @click="generateSubcategorias($event, index)" :id="`subcategoria-${index}`">
                <option selected>Subcategoría</option>
                <option :value="subcategoria" v-for="subcategoria in subcategorias">{{ subcategoria }}</option>
              </select>
            </td>
            <td>
              <!-- Detalle -->
              <select class="form-select" @input="dataRows[index].detalle = $event.target.value"
                @click="generateDetalle($event, index)" :id="`detalle-${index}`">
                <option selected>Detalle</option>
                <option :value="detalle" v-for="detalle in detalles">{{ detalle }}</option>
              </select>
            </td>
            <td>
              <!-- Estado -->
              <input type="text" class="form-control bg-secondary bg-gradient" @input="dataRows[index].estado = $event.target.value"
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
              <input type="text" class="form-control bg-secondary bg-gradient" @input="dataRows[index].abiertoPara = $event.target.value"
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
              <input type="text" class="form-control bg-secondary bg-gradient" @input="dataRows[index].solucionResponsable = $event.target.value"
                placeholder="Solución responsable">
            </td>
            <td>
              <!-- Tipo de máquina -->
              <select class="form-select" @input="dataRows[index].tipoMaquina = $event.target.value"
                @click="generateResumen($event, index)">
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
            <button class="btn btn-primary" @click="generateSubcategorias">Generar subcategorias</button>
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
    let subcategorias = computed(() => store.state.subcategorias)
    let detalles = computed(() => store.state.detalles)
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
      generateResumen(e, index)
    }

    const handleClickingOption = (e, index) => {
      const inputElement = document.querySelector(`#input-nombre-${index}`)
      inputElement.value = e.target.innerHTML

      store.state.dataRows[index].nombreSucursal = e.target.innerHTML
      if (filterSucursales('sucursal', inputElement.value)[0] !== undefined) {
        e.target.parentElement.parentElement.previousElementSibling.children[0].value = filterSucursales('sucursal', inputElement.value)[0].codigoSucursal
        store.state.dataRows[index].codigoSucursal = filterSucursales('sucursal', inputElement.value)[0].codigoSucursal
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

    // Funciones subcategorias

    const generateSubcategorias = (e, index) => {
      const categoria = document.querySelector(`#categoria-${index}`).value
      store.commit('restartSubcategorias')

      if (categoria == 'SOFTWARE') {
        store.commit('addSubcategoria', 'SO')
        store.commit('addSubcategoria', 'LICENCIAS')
        store.commit('addSubcategoria', 'PAG WEB')
        store.commit('addSubcategoria', 'APLICACIONES')
        store.commit('addSubcategoria', 'CARGA/RETIRO PROD')
        store.commit('addSubcategoria', 'PROYECTO MES')
        store.commit('addSubcategoria', 'BBDD')
        store.commit('addSubcategoria', 'AGENDAMIENTO WEB')
        store.commit('addSubcategoria', 'CONSULTORA')
      } else if (categoria == 'HARDWARE') {
        store.commit('addSubcategoria', 'IMPRESORA')
        store.commit('addSubcategoria', 'TOUCH')
        store.commit('addSubcategoria', 'UPS')
        store.commit('addSubcategoria', 'LEC. CEDULA')
        store.commit('addSubcategoria', 'LEC. QR')
        store.commit('addSubcategoria', 'PANTALLA')
        store.commit('addSubcategoria', 'LEC. HUELLA')
        store.commit('addSubcategoria', 'FUENTE PODER')
        store.commit('addSubcategoria', 'CHAPA CASILLERO')
        store.commit('addSubcategoria', 'PLACA PUERTA')
        store.commit('addSubcategoria', 'FUENTE PUERTA')
      } else if (categoria == 'REDES') {
        store.commit('addSubcategoria', 'RED')
        store.commit('addSubcategoria', 'MASIVO')
        store.commit('addSubcategoria', 'WEB SERVICE')
      } else if (categoria == 'PANTALLA PRO') {
        store.commit('addSubcategoria', 'CONFIGURACION')
        store.commit('addSubcategoria', 'FISICO')
      } else if (categoria == 'ADM WEB') {
        store.commit('addSubcategoria', 'CREACION DE USUARIO')
        store.commit('addSubcategoria', 'MODIFICACION DE USUARIO')
        store.commit('addSubcategoria', 'CAMBIO PERFIL ESCRITORIOS')
      } else if (categoria == 'CONSULTA/OTROS') {
        store.commit('addSubcategoria', 'REPORTES')
        store.commit('addSubcategoria', 'GESTIONES VARIAS')
        store.commit('addSubcategoria', 'CONSULTAS')
        store.commit('addSubcategoria', 'OTROS')
      }
      generateResumen(e, index)
    }

    // Funciones detalle

    const generateDetalle = (e, index) => {
      const subcategoria = document.querySelector(`#subcategoria-${index}`).value
      store.commit('restartDetalles')

      if (subcategoria == 'SO') {
        store.commit('addDetalle', 'CARGA MATRIZ')
        store.commit('addDetalle', 'ERROR BOOTEO')
        store.commit('addDetalle', 'CAMBIO DE HORA')
        store.commit('addDetalle', 'CAMBIO DE RESOLUCION')
        store.commit('addDetalle', 'CONFIGURACION COM')
        store.commit('addDetalle', 'INICIO WINDOWS')
        store.commit('addDetalle', 'REINICIO DE SERVICIOS')
        store.commit('addDetalle', 'MODIFICACION REGEDIT')
      } else if (subcategoria == 'LICENCIAS') {
        store.commit('addDetalle', 'NUEVA MATRIZ')
        store.commit('addDetalle', 'CADUCA')
      } else if (subcategoria == 'PAG WEB') {
        store.commit('addDetalle', 'CAIDA REPORTES')
        store.commit('addDetalle', 'CAIDA ADMINISTRACION')
        store.commit('addDetalle', 'CAIDA MONITOREO')
        store.commit('addDetalle', 'MODIFICACION DE SERVICIOS')
        store.commit('addDetalle', 'AGREGAR/QUITAR SERVICIOS')
        store.commit('addDetalle', 'MAGIC INFO')
      } else if (subcategoria == 'APLICACIONES') {
        store.commit('addDetalle', 'MOC API CAIDO')
        store.commit('addDetalle', 'FRONT CAIDO')
        store.commit('addDetalle', 'EMISOR CAIDO')
        store.commit('addDetalle', 'SIN VOZ')
        store.commit('addDetalle', 'DRIVERS')
        store.commit('addDetalle', 'API IMPRESORA CAIDA')
        store.commit('addDetalle', 'API TURNOS CAIDO')
        store.commit('addDetalle', 'API PUERTAS CAIDO')
        store.commit('addDetalle', 'CONFIGURACION PANWEB')
      } else if (subcategoria == 'CARGA/RETIRO PROD') {
        store.commit('addDetalle', 'CARGA FALLIDA')
        store.commit('addDetalle', 'RETIRO FALLIDO')
        store.commit('addDetalle', 'RETIROS POR CIERRE')
      } else if (subcategoria == 'PROYECTO MES') {
        store.commit('addDetalle', 'DESINSTALACION VNC')
        store.commit('addDetalle', 'MOC API')
      } else if (subcategoria == 'BBDD') {
        store.commit('addDetalle', 'CAMBIO DE ESTRUCTURA')
        store.commit('addDetalle', 'AGREGACION DE SEGMENTOS')
        store.commit('addDetalle', 'AGREGACION DE CARTERAS')
        store.commit('addDetalle', 'MODIFICACION VALORES PYME')
        store.commit('addDetalle', 'BASE SERVER CENTRAL')
      } else if (subcategoria == 'AGENDAMIENTO WEB') {
        store.commit('addDetalle', 'NO DESCARGA AGENDA')
      } else if ('CONSULTORA') {
        store.commit('addDetalle', 'CAIDO')
        store.commit('addDetalle', 'ACTUALIZACION')
        store.commit('addDetalle', 'URL ERRONEA')
      } else if (subcategoria == 'IMPRESORA') {
        store.commit('addDetalle', 'GUILLOTINA')
        store.commit('addDetalle', 'PAPEL')
        store.commit('addDetalle', 'TAPA')
        store.commit('addDetalle', 'DRIVERS')
        store.commit('addDetalle', 'CABEZAL TERMICO')
        store.commit('addDetalle', 'NO RESPONDE')
      } else if (subcategoria == 'TOUCH') {
        store.commit('addDetalle', 'DAÑADO')
        store.commit('addDetalle', 'NO RESPONDE')
      } else if (subcategoria == 'UPS') {
        store.commit('addDetalle', 'DAÑADA')
        store.commit('addDetalle', 'PITIDO CONSTANTE')
      } else if (subcategoria == 'LEC. CEDULA') {
        store.commit('addDetalle', 'SUENA Y NO LEE')
      } else if (subcategoria == 'LEC. QR') {
        store.commit('addDetalle', 'NO SUENA')
      } else if (subcategoria == 'PANTALLA') {
        store.commit('addDetalle', 'QUEMADA')
        store.commit('addDetalle', 'DAÑADA')
        store.commit('addDetalle', 'NO ENCIENDE')
        store.commit('addDetalle', 'SIN CABLES')
      } else if (subcategoria == 'LEC. HUELLA') {
        store.commit('addDetalle', 'NO ENCIENDE')
        store.commit('addDetalle', 'NO LEE CORRECTAMENTE')
      } else if (subcategoria == 'FUENTE PODER') {
        store.commit('addDetalle', 'QUEMADA')
        store.commit('addDetalle', 'DAÑADA')
      } else if (subcategoria == 'CHAPA CASILLERO') {
        store.commit('addDetalle', 'NO ENVIA INFORMACION')
      } else if (subcategoria == 'PLACA PUERTA') {
        store.commit('addDetalle', 'NO ENCIENDE')
      } else if (subcategoria == 'FUENTE PUERTA') {
        store.commit('addDetalle', 'DAÑADA')
        store.commit('addDetalle', 'QUEMADA')
        store.commit('addDetalle', 'NO ENCIENDE')
      } else if (subcategoria == 'RED') {
        store.commit('addDetalle', 'SUCURSAL SIN RED')
        store.commit('addDetalle', 'PUNTO DE RED')
        store.commit('addDetalle', 'EQUIPO SIN RED')
        store.commit('addDetalle', 'INTERMITENCIA DE RED')
        store.commit('addDetalle', 'DESBLOQUEO MAC')
      } else if (subcategoria == 'MASIVO') {
        // PASS
      } else if (subcategoria == 'WEB SERVICE') {
        // PASS
      } else if (subcategoria == 'CONFIGURACION') {
        store.commit('addDetalle', 'RELOJ DESACTUALIZADO')
        store.commit('addDetalle', 'RESET')
        store.commit('addDetalle', 'SERVIDOR')
        store.commit('addDetalle', 'ACTUALIZACION PUBLICIDAD')
        store.commit('addDetalle', 'REFRESCO PANTALLA')
        store.commit('addDetalle', 'REINICIO REMOTO')
        store.commit('addDetalle', 'CONFIGURACION INICIAL')
      } else if (subcategoria == 'FISICO') {
        store.commit('addDetalle', 'DAÑADA')
        store.commit('addDetalle', 'PUNTO RED')
        store.commit('addDetalle', 'PUNTO ELECTRICO')
        store.commit('addDetalle', 'QUEMADA')
        store.commit('addDetalle', 'SIN CABLES')
        store.commit('addDetalle', 'SIN CONTROL REMOTO')
      } else if (subcategoria == 'CREACION DE USUARIO') {
        store.commit('addDetalle', 'USUARIO CARGADOR')
        store.commit('addDetalle', 'EJECUTIVO/LLAMADOR')
        store.commit('addDetalle', 'USUARIO ADMINISTRADOR')
      } else if (subcategoria == 'MODIFICACION DE USUARIO') {
        store.commit('addDetalle', 'CAMBIO DE SUCURSAL')
        store.commit('addDetalle', 'MODIFICACION DE DATOS')
      } else if (subcategoria == 'CAMBIO PERFIL ESCRITORIOS') {
        store.commit('addDetalle', 'CAMBIO DE SERVICIO')
        store.commit('addDetalle', 'MODIFICACION/CREACION DE ESCRITORIO')
      } else if (subcategoria == 'REPORTES') {
        store.commit('addDetalle', 'USABILIDAD')
        store.commit('addDetalle', 'CONTESTABILIDAD')
        store.commit('addDetalle', 'UPTIME')
        store.commit('addDetalle', 'CONTINUIDAD OPERACIONAL')
        store.commit('addDetalle', 'STATUS LOCKER')
      } else if (subcategoria == 'GESTIONES VARIAS') {
        store.commit('addDetalle', 'INGRESO TECNICOS')
        store.commit('addDetalle', 'COTIZACIONES')
        store.commit('addDetalle', 'ATENCION TECNICOS')
      } else if (subcategoria == 'CONSULTAS') {
        store.commit('addDetalle', 'CONSULTA DE USUARIO')
        store.commit('addDetalle', 'CONSULTA USO')
        store.commit('addDetalle', 'SOLICITUD URL')
        store.commit('addDetalle', 'INFORMACION ADICIONAL')
      } else if (subcategoria == 'OTROS') {
        store.commit('addDetalle', 'EQUIVOCADO')
        store.commit('addDetalle', 'ESTATUS DE EQUIPO')
        store.commit('addDetalle', 'TRANSFERENCIAS')
        store.commit('addDetalle', 'CORTA/NO RESPONDEN')
        store.commit('addDetalle', 'OTROS')
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

      store.state.dataRows[index].resumen = `Autoservicios | ADN|LOCKER (${codigoSucursal}) ${nombreSucursal} | ${categoria} | ${subcategoria} | ${detalle} | ${tipo} | ${codigoMaquina}`
    }

    const debugFunction = () => {
      for (let sucursal of sucursales.value) {
        console.log(sucursal.sucursal)
      }
    }

    return {
      dataRows, sucursales, selectedName, searchResult, subcategorias, filteredSucursales,
      userOptions, generateResumen, machineOptions, addRow, deleteRow, responsibleOptions,
      filterSucursales, handleTypingCodigoSucursal, handleTypingNombreSucursal,
      handleClickingOption, handleClickingInput, generateSubcategorias, handleNombreSucursal, updateID,
      debugFunction, searchSucursal, generateDetalle, detalles
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
