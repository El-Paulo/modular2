// js/ui.js
// Gestiona todas las actualizaciones de la interfaz de usuario.

import { DOMElements } from './dom-elements.js';
import { chemotherapySchemes } from './schemes.js';
import { calculateCarboplatinDose } from './calculations.js';

/**
 * Actualiza los valores calculados en la sección de datos del paciente.
 * @param {object} calculations - El objeto de cálculos del estado.
 */
export function updateCalculationDisplays(calculations) {
    DOMElements.bsaValue.textContent = `${calculations.bsa.toFixed(2)} m²`;
    DOMElements.bmiValue.textContent = calculations.bmi.toFixed(1);
    DOMElements.clcrValue.textContent = `${calculations.clcr.toFixed(1)} mL/min`;
}

/**
 * Renderiza las tarjetas de los esquemas de quimioterapia en la grilla.
 * @param {string} searchTerm - Término de búsqueda para filtrar esquemas.
 */
export function renderSchemeCards(searchTerm = '') {
    const grid = DOMElements.schemeGrid;
    grid.innerHTML = '';
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const filteredSchemes = Object.entries(chemotherapySchemes).filter(([key, scheme]) => {
        return key.toLowerCase().includes(lowerCaseSearchTerm) ||
               scheme.name.toLowerCase().includes(lowerCaseSearchTerm) ||
               scheme.indication.toLowerCase().includes(lowerCaseSearchTerm);
    });

    if (filteredSchemes.length === 0) {
        grid.innerHTML = '<p class="text-muted">No se encontraron esquemas.</p>';
        return;
    }

    filteredSchemes.forEach(([key, scheme]) => {
        const card = document.createElement('div');
        card.className = 'scheme-card';
        card.dataset.schemeName = key;
        card.innerHTML = `
            <h3 class="scheme-name">${scheme.name}</h3>
            <p class="scheme-description">${scheme.indication}</p>
        `;
        grid.appendChild(card);
    });
}

/**
 * Resalta la tarjeta del esquema seleccionado y quita la selección de las demás.
 * @param {string|null} schemeName - El nombre del esquema a seleccionar.
 */
export function selectSchemeCard(schemeName) {
    document.querySelectorAll('.scheme-card').forEach(card => {
        if (card.dataset.schemeName === schemeName) {
            card.classList.add('selected');
        } else {
            card.classList.remove('selected');
        }
    });
}

/**
 * Actualiza la pestaña activa en la interfaz.
 * @param {string} activeTab - El ID de la pestaña activa.
 */
export function updateActiveTab(activeTab) {
    DOMElements.tabButtons.forEach(button => {
        button.classList.toggle('active', button.dataset.tab === activeTab);
    });
    // Aquí se manejaría la visibilidad del contenido de cada pestaña si fuera necesario.
    // Por ahora, el contenido del preview se actualiza basado en el estado.
}

/**
 * Genera y muestra la vista previa del documento basado en el estado actual.
 * @param {object} state - El estado completo de la aplicación.
 */
export function renderPreview(state) {
    const { patient, ui, calculations } = state;

    if (!patient.name || !patient.age || !patient.gender || !patient.weight || !patient.height) {
        DOMElements.previewContent.innerHTML = `
            <div class="preview-placeholder">
                <i class="fa-solid fa-file-invoice"></i>
                <p>Complete los datos del paciente para generar el documento.</p>
            </div>`;
        return;
    }

    let previewHTML = generateDocumentHeader(patient);
    
    // Aquí se podría tener un switch para diferentes tipos de previews
    // Por ahora, se enfoca en el preview de indicaciones.
    if (ui.selectedScheme) {
        previewHTML += generateSchemePreview(ui, calculations);
    } else {
        DOMElements.previewContent.innerHTML = `
            <div class="preview-placeholder">
                <i class="fa-solid fa-syringe"></i>
                <p>Seleccione un esquema de tratamiento para ver los detalles.</p>
            </div>`;
        return;
    }

    previewHTML += generateDocumentFooter();
    DOMElements.previewContent.innerHTML = `<div class="document-preview">${previewHTML}</div>`;
}

/**
 * Genera el encabezado HTML para los documentos de vista previa.
 * @param {object} patient - Los datos del paciente.
 * @returns {string} El HTML del encabezado.
 */
function generateDocumentHeader(patient) {
    return `
        <header class="doc-header">
            <img src="assets/onco-logo.png" alt="Logo" class="doc-header-logo">
            <div class="doc-header-info">
                <strong>OncoTech - Centro de Oncología</strong><br>
                Normal Urbana 1367, La Paz, BCS<br>
                Tel: (612) 129-7171
            </div>
        </header>
        <h2 class="doc-title">Indicaciones Médicas de Quimioterapia</h2>
        <section class="doc-patient-info">
            <p><strong>Paciente:</strong> ${patient.name}</p>
            <p><strong>Edad:</strong> ${patient.age} años</p>
            <p><strong>Diagnóstico:</strong> ${patient.diagnosis || 'No especificado'}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-MX')}</p>
        </section>
    `;
}

/**
 * Genera el contenido del preview para el esquema seleccionado.
 * @param {object} ui - La parte 'ui' del estado.
 * @param {object} calculations - La parte de 'calculations' del estado.
 * @returns {string} El HTML del contenido del esquema.
 */
function generateSchemePreview(ui, calculations) {
    const scheme = chemotherapySchemes[ui.selectedScheme];
    if (!scheme) return '';

    const drugsHTML = scheme.drugs.map(drug => {
        let doseValue = '';
        let totalDose = '';
        
        if (drug.unit.toLowerCase() === 'mg/m²') {
            doseValue = `${drug.dose} ${drug.unit}`;
            totalDose = `(Total: ${Math.round(drug.dose * calculations.bsa)} mg)`;
        } else if (drug.unit.toLowerCase() === 'mg/kg') {
            doseValue = `${drug.dose} ${drug.unit}`;
            // Asumiendo que state.patient.weight está disponible
            totalDose = `(Total: ${Math.round(drug.dose * window.appState.patient.weight)} mg)`;
        } else if (drug.unit.toLowerCase() === 'auc') {
            const carboDose = calculateCarboplatinDose(drug.dose, calculations.clcr);
            doseValue = `AUC ${drug.dose}`;
            totalDose = `(Total: ${carboDose} mg)`;
        } else {
            doseValue = `${drug.dose} ${drug.unit}`;
        }

        return `
            <tr>
                <td><strong>${drug.name}</strong></td>
                <td>${doseValue} ${totalDose}</td>
                <td>${drug.route}</td>
                <td>Día(s) ${drug.day}</td>
                <td>${drug.infusionTime || 'N/A'}</td>
            </tr>
        `;
    }).join('');

    return `
        <section class="doc-section">
            <h4>Esquema de Tratamiento</h4>
            <p><strong>Nombre del Esquema:</strong> ${scheme.name}</p>
            <p><strong>Ciclo:</strong> ${ui.cycleNumber} / Frecuencia cada ${scheme.cycleDays} días</p>
        </section>
        <section class="doc-section">
            <h4>Detalle de Medicamentos</h4>
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Medicamento</th>
                        <th>Dosis</th>
                        <th>Vía</th>
                        <th>Día(s) de Adm.</th>
                        <th>Infusión</th>
                    </tr>
                </thead>
                <tbody>
                    ${drugsHTML}
                </tbody>
            </table>
        </section>
        <section class="doc-section">
            <h4>Premedicación e Indicaciones</h4>
            <p>${scheme.premedication.join(', ')}</p>
            <p>Vigilar datos de toxicidad. Mantener hidratación adecuada.</p>
        </section>
    `;
}

/**
 * Genera el pie de página para los documentos.
 * @returns {string} El HTML del pie de página.
 */
function generateDocumentFooter() {
    return `
        <footer class="doc-footer">
            <p>_________________________</p>
            <p>Dr. [Nombre del Médico Firmante]</p>
            <p>Céd. Prof. [Número de Cédula]</p>
        </footer>
    `;
}
