// js/dom-elements.js
// Almacena referencias a todos los elementos del DOM utilizados en la aplicación.

export const DOMElements = {
    // Contenedores principales
    appContainer: document.querySelector('.app-container'),
    notificationContainer: document.getElementById('notification-container'),

    // Header
    themeSelector: document.getElementById('themeSelector'),

    // Formulario del Paciente y Cálculos
    patientForm: document.getElementById('patientForm'),
    patientName: document.getElementById('patientName'),
    patientAge: document.getElementById('patientAge'),
    patientGender: document.getElementById('patientGender'),
    patientWeight: document.getElementById('patientWeight'),
    patientHeight: document.getElementById('patientHeight'),
    patientDiagnosis: document.getElementById('patientDiagnosis'),
    patientCreatinine: document.getElementById('patientCreatinine'),
    bsaValue: document.getElementById('bsaValue'),
    bmiValue: document.getElementById('bmiValue'),
    clcrValue: document.getElementById('clcrValue'),

    // Pestañas y Contenido
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content'),
    
    // Pestaña de Esquemas
    schemeSearch: document.getElementById('schemeSearch'),
    cycleNumber: document.getElementById('cycleNumber'),
    schemeGrid: document.getElementById('scheme-grid'),

    // Panel de Vista Previa
    previewContent: document.getElementById('previewContent'),
    printPdfBtn: document.getElementById('printPdfBtn'),
    exportJsonBtn: document.getElementById('exportJsonBtn'),
};
