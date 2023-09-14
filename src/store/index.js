import { createStore } from 'vuex'
import sucursales from '@/json/sucursales.json'

export default createStore({
    state: {
        selectedName: "Nombre",
        dataRows: [
            {
                "id": 0,
                "numeroIncidente": "",
                "codigoSucursal": "",
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
                "solucionResponsable": "",
                "tipoMaquina": ""
            }
        ],
        searchResult: [],
        sucursales: sucursales,
        subcategorias: [],
        detalles: [],
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
                    "solucionResponsable": "",
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
        restartSubcategorias(state) {
            state.subcategorias = []
        },
        addSubcategoria(state, value) {
            state.subcategorias.push(value)
        },
        restartDetalles(state) {
            state.detalles = []
        },
        addDetalle(state, value) {
            state.detalles.push(value)
        }
    },
    actions: {
    },
    modules: {
    }
})