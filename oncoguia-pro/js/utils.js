// js/utils.js
// Funciones de utilidad como exportaciones y notificaciones.

import { DOMElements } from './dom-elements.js';

/**
 * Muestra una notificación tipo "toast".
 * @param {string} message - El mensaje a mostrar.
 * @param {string} type - El tipo de notificación ('success', 'error', 'info').
 */
export function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconClass = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
    }[type];

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i><span>${message}</span>`;
    
    DOMElements.notificationContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Exporta el estado actual de la aplicación como un archivo JSON.
 * @param {object} state - El estado completo de la aplicación.
 */
export function exportStateAsJson(state) {
    try {
        const dataStr = JSON.stringify({
            patient: state.patient,
            calculations: state.calculations,
            ui: state.ui,
            timestamp: new Date().toISOString()
        }, null, 2);
        
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        const patientName = state.patient.name.replace(/\s+/g, '_') || 'paciente';
        a.download = `OncoGuia_${patientName}_${new Date().toISOString().slice(0,10)}.json`;
        
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('Datos exportados como JSON.', 'success');
    } catch (error) {
        console.error('Error al exportar JSON:', error);
        showToast('Error al exportar los datos.', 'error');
    }
}

/**
 * Exporta el contenido del panel de vista previa a un archivo PDF.
 */
export async function exportPreviewToPdf() {
    const previewElement = DOMElements.previewContent;
    showToast('Generando PDF, por favor espere...', 'info');

    try {
        // Usa html2canvas para tomar una "foto" del contenido del preview
        const canvas = await html2canvas(previewElement, {
            scale: 2, // Aumenta la resolución para mejor calidad
            useCORS: true,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/png');
        
        // Inicializa jsPDF
        // El objeto de opciones define el formato (a4) y las unidades (mm)
        const pdf = new jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        let imgWidth = pdfWidth - 20; // Ancho de la imagen con márgenes
        let imgHeight = imgWidth / ratio;

        // Si la imagen es más alta que la página, ajusta por altura
        if (imgHeight > pdfHeight - 20) {
            imgHeight = pdfHeight - 20;
            imgWidth = imgHeight * ratio;
        }

        const x = (pdfWidth - imgWidth) / 2; // Centrar horizontalmente
        const y = 10; // Margen superior

        pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
        pdf.save(`OncoGuia_Documento_${new Date().toISOString().slice(0,10)}.pdf`);
        
        showToast('PDF generado correctamente.', 'success');

    } catch (error) {
        console.error('Error al generar PDF:', error);
        showToast('No se pudo generar el PDF.', 'error');
    }
}
