import { createStore } from 'vuex'

export default createStore({
    state: {
        selectedName: "Nombre",
        dataRows: [
            {
                "id": 0,
                "numeroIncidente": "Número incidente",
                "codigoSucursal": 0,
                "nombreSucursal": "Nombre sucursal",
                "resumen": "Resumen",
                "abierto": "Abierto",
                "cerrado": "Cerrado",
                "tiempo": "Tiempo",
                "tipo": "Tipo",
                "categoria": "Categoría",
                "subcategoria": "Subcategoría",
                "detalle": "Detalle",
                "estado": "Estado",
                "asignadoA": "Asignado a",
                "grupo": "CHL_EU_EU_AUTO-SERVICIO",
                "abiertoPara": "Abierto para",
                "modelo": "Modelo",
                "territorial": "Territorial",
                "solucionResponsable": "Solución responsable",
                "tipoMaquina": "Tipo de máquina"
            }
        ],
        counter: 1
    },
    getters: {
    },
    mutations: {
        addRow(state) {
            state.dataRows.push(
                {
                    "id": state.counter,
                    "numeroIncidente": "Número incidente",
                    "codigoSucursal": 0,
                    "nombreSucursal": "Nombre sucursal",
                    "resumen": "Resumen",
                    "abierto": "Abierto",
                    "cerrado": "Cerrado",
                    "tiempo": "Tiempo",
                    "tipo": "Tipo",
                    "categoria": "Categoría",
                    "subcategoria": "Subcategoría",
                    "detalle": "Detalle",
                    "estado": "Estado",
                    "asignadoA": "Asignado a",
                    "grupo": "CHL_EU_EU_AUTO-SERVICIO",
                    "abiertoPara": "Abierto para",
                    "modelo": "Modelo",
                    "territorial": "Territorial",
                    "solucionResponsable": "Solución responsable",
                    "tipoMaquina": "Tipo de máquina"
                })
            state.counter++
        },
        deleteRow(state, index) {
            state.dataRows.splice(index, 1)
            state.counter--
        },
        selectName(state, name) {
            state.selectedName = name
        }
    },
    actions: {
    },
    modules: {
    }
})