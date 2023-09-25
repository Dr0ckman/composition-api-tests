import { createStore } from 'vuex'
import sucursales from '@/json/sucursales.json'

export default createStore({
    state: {
        selectedName: "Nombre",
        dataRows: [
            {
                "id": 0,
                "numeroIncidente": "",
                "codigoSucursal": 0,
                "nombreSucursal": "",
                "resumen": "",
                "abierto": "",
                "cerrado": "",
                "tiempo": "",
                "tipo": "",
                "categoria": "",
                "subcategoria": "",
                "detalle": "",
                "estado": "",
                "asignadoA": "",
                "grupo": "CHL_EU_EU_AUTO-SERVICIO",
                "abiertoPara": "",
                "modelo": "",
                "territorial": "",
                "solucionResponsable": "MESA AUTOSERVICIO",
                "tipoMaquina": ""
            }
        ],
        searchResult: [],
        sucursales: sucursales,
        subcategorias: [
            {

            },
        ], //JSON
        detalles: [], //JSON
        counter: 1,
    },
    getters: {
    },
    mutations: {
        addRow(state) {
            state.dataRows.push(
                {
                    "id": state.counter,
                    "numeroIncidente": "",
                    "codigoSucursal": 0,
                    "nombreSucursal": "",
                    "resumen": "",
                    "abierto": "",
                    "cerrado": "",
                    "tiempo": "",
                    "tipo": "",
                    "categoria": "",
                    "subcategoria": "",
                    "detalle": "",
                    "estado": "",
                    "asignadoA": "",
                    "grupo": "CHL_EU_EU_AUTO-SERVICIO",
                    "abiertoPara": "",
                    "modelo": "",
                    "territorial": "",
                    "solucionResponsable": "MESA AUTOSERVICIO",
                    "tipoMaquina": ""
                })
            state.counter++
        },
        deleteRow(state, index) {
            state.dataRows.splice(index, 1)
            state.counter--
        },
        selectName(state, name) {
            state.selectedName = name
        },
        restartSearchResults(state) {
            state.searchResult = []
        },
        addSearchResult(state, value) {
            state.searchResult.push(value)
        },
        restartSubcategorias(state, index) {
            state.subcategorias[index] = []
        },
        addSubcategoria(state, payload) {
            state.subcategorias[payload.index] = payload.subcategorias
        },
        restartDetalles(state, index) {
            state.detalles[index] = []
        },
        addDetalle(state, payload) {
            state.detalles[payload.index] = payload.detalles
        },
        changeID(state, payload) {
            state.dataRows[payload.index].id = payload.value
        }
    },
    actions: {
    },
    modules: {
    }
})