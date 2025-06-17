// js/main.js
// Punto de entrada principal de la aplicación OncoGuía Pro.

import { subscribe, getState } from './state.js';
import { setupEventListeners } from './event-listeners.js';
import * as UI from './ui.js';
import { showToast } from './utils.js';

/**
 * Función de renderizado principal. Se ejecuta cada vez que el estado cambia.
 * @param {object} state - El estado actual de la aplicación.
 */
function render(state) {
    // Actualiza los componentes de la UI basados en el estado.
    UI.updateActiveTab(state.ui.activeTab);
    UI.renderSchemeCards(state.ui.schemeSearchTerm);
    UI.selectSchemeCard(state.ui.selectedScheme);
    
    // Solo actualiza los cálculos si hay datos para evitar mostrar NaN.
    if (state.calculations.bsa > 0) {
        UI.updateCalculationDisplays(state.calculations);
    }

    // Renderiza la vista previa del documento.
    UI.renderPreview(state);
}

/**
 * Función de inicialización de la aplicación.
 */
function initializeApp() {
    console.log('OncoGuía Pro v12.0 inicializando...');
    
    // Configura todos los event listeners.
    setupEventListeners();
    
    // Se suscribe a los cambios de estado para que la función 'render' se ejecute automáticamente.
    subscribe(render);
    
    // Renderiza el estado inicial.
    UI.renderSchemeCards();
    UI.renderPreview(getState());
    
    showToast('OncoGuía Pro listo.', 'success');
}

// Inicia la aplicación una vez que el DOM está completamente cargado.
document.addEventListener('DOMContentLoaded', initializeApp);
