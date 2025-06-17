// js/state.js
// Gestiona el estado global de la aplicación.

// El objeto 'state' es la única fuente de verdad para los datos de la aplicación.
const state = {
    patient: {
        name: '',
        age: 0,
        gender: '',
        weight: 0,
        height: 0,
        diagnosis: '',
        creatinine: 0,
    },
    calculations: {
        bsa: 0,
        bmi: 0,
        clcr: 0,
    },
    ui: {
        activeTab: 'schemes', // 'schemes', 'requests', etc.
        selectedScheme: null, // Almacenará el nombre del esquema seleccionado
        schemeSearchTerm: '',
        cycleNumber: 1,
    },
};

// 'listeners' almacenará funciones que deben ejecutarse cuando el estado cambia.
const listeners = [];

/**
 * Permite que otros módulos se "suscriban" a los cambios de estado.
 * @param {Function} listener - La función a ejecutar cuando el estado cambie.
 */
export function subscribe(listener) {
    listeners.push(listener);
}

/**
 * Notifica a todos los suscriptores que el estado ha cambiado.
 * Típicamente se llama después de una actualización de estado.
 */
function notify() {
    for (const listener of listeners) {
        listener(state);
    }
}

/**
 * Función para actualizar el estado de forma segura.
 * Combina los nuevos datos con el estado existente y notifica a los suscriptores.
 * @param {object} newState - Un objeto con las partes del estado a actualizar.
 */
export function setState(newState) {
    Object.assign(state.patient, newState.patient);
    Object.assign(state.calculations, newState.calculations);
    Object.assign(state.ui, newState.ui);
    // Tras cualquier cambio, se notifica a los suscriptores para que la UI se actualice.
    notify();
}

/**
 * Devuelve una copia del estado actual para evitar modificaciones directas.
 * @returns {object} El estado actual de la aplicación.
 */
export function getState() {
    return { ...state };
}
