// js/calculations.js
// Módulo para todas las calculadoras médicas.

/**
 * Calcula la Superficie Corporal (BSA) usando la fórmula de Mosteller.
 * @param {number} weight - Peso en kg.
 * @param {number} height - Estatura en cm.
 * @returns {number} BSA en m².
 */
function calculateBSA(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) return 0;
    return Math.sqrt((weight * height) / 3600);
}

/**
 * Calcula el Índice de Masa Corporal (BMI).
 * @param {number} weight - Peso en kg.
 * @param {number} height - Estatura en cm.
 * @returns {number} BMI en kg/m².
 */
function calculateBMI(weight, height) {
    if (!weight || !height || weight <= 0 || height <= 0) return 0;
    const heightInMeters = height / 100;
    return weight / (heightInMeters * heightInMeters);
}

/**
 * Calcula la Depuración de Creatinina (ClCr) usando la fórmula de Cockcroft-Gault.
 * @param {number} age - Edad en años.
 * @param {number} weight - Peso en kg.
 * @param {number} creatinine - Nivel de creatinina en mg/dL.
 * @param {string} gender - Sexo ('M' para masculino, 'F' para femenino).
 * @returns {number} ClCr en mL/min.
 */
function calculateClCr(age, weight, creatinine, gender) {
    if (!age || !weight || !creatinine || !gender || age <= 0 || weight <= 0 || creatinine <= 0) {
        return 0;
    }
    const clcr = ((140 - age) * weight) / (72 * creatinine);
    return gender === 'F' ? clcr * 0.85 : clcr;
}

/**
 * Calcula la dosis de Carboplatino usando la fórmula de Calvert.
 * @param {number} targetAUC - El AUC deseado (Area Under the Curve).
 * @param {number} gfr - La Tasa de Filtración Glomerular (usualmente ClCr).
 * @returns {number} Dosis total de Carboplatino en mg.
 */
function calculateCarboplatinDose(targetAUC, gfr) {
    if (!targetAUC || !gfr) return 0;
    const cappedGfr = Math.min(gfr, 125); // La GFR se limita a 125 mL/min en la fórmula.
    const dose = targetAUC * (cappedGfr + 25);
    return Math.round(dose);
}

export { calculateBSA, calculateBMI, calculateClCr, calculateCarboplatinDose };
