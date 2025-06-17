// js/schemes.js
// Base de datos de esquemas de quimioterapia.

const chemotherapySchemes = {
    // --- ESQUEMAS CÁNCER COLORRECTAL ---
    "FOLFOX": {
        name: "FOLFOX",
        indication: "Cáncer colorrectal adyuvante/metastásico",
        cycleDays: 14,
        drugs: [
            { name: "Oxaliplatino", dose: 85, unit: "mg/m²", route: "IV", day: "1", infusionTime: "2 horas en Dextrosa 5%", notes: "No mezclar con soluciones salinas." },
            { name: "Leucovorina", dose: 400, unit: "mg/m²", route: "IV", day: "1", infusionTime: "2 horas" },
            { name: "5-Fluorouracilo (Bolo)", dose: 400, unit: "mg/m²", route: "IV Bolo", day: "1" },
            { name: "5-Fluorouracilo (Infusión)", dose: 2400, unit: "mg/m²", route: "Infusión IV", day: "1-2", infusionTime: "46 horas", notes: "Requiere bomba de infusión." }
        ],
        premedication: ["Antieméticos (NK1-RA + 5HT3-RA + Dexametasona)"],
        emetogenicity: "Moderado"
    },
    "FOLFIRI": {
        name: "FOLFIRI",
        indication: "Cáncer colorrectal metastásico",
        cycleDays: 14,
        drugs: [
            { name: "Irinotecán", dose: 180, unit: "mg/m²", route: "IV", day: "1", infusionTime: "90 minutos", notes: "Vigilar síndrome colinérgico." },
            { name: "Leucovorina", dose: 400, unit: "mg/m²", route: "IV", day: "1", infusionTime: "2 horas" },
            { name: "5-Fluorouracilo (Bolo)", dose: 400, unit: "mg/m²", route: "IV Bolo", day: "1" },
            { name: "5-Fluorouracilo (Infusión)", dose: 2400, unit: "mg/m²", route: "Infusión IV", day: "1-2", infusionTime: "46 horas" }
        ],
        premedication: ["Antieméticos", "Atropina (si hay síntomas colinérgicos)"],
        emetogenicity: "Moderado"
    },
     "CAPOX": {
        name: "CAPOX (o XELOX)",
        indication: "Cáncer colorrectal y gástrico",
        cycleDays: 21,
        drugs: [
            { name: "Oxaliplatino", dose: 130, unit: "mg/m²", route: "IV", day: "1", infusionTime: "2 horas en Dextrosa 5%" },
            { name: "Capecitabina", dose: 1000, unit: "mg/m² BID", route: "VO", day: "1-14", notes: "Tomar 30 min después de alimentos." }
        ],
        premedication: ["Antieméticos"],
        emetogenicity: "Moderado"
    },

    // --- ESQUEMAS CÁNCER DE MAMA ---
    "AC": {
        name: "AC",
        indication: "Cáncer de mama adyuvante",
        cycleDays: 21,
        drugs: [
            { name: "Doxorrubicina (Adriamicina)", dose: 60, unit: "mg/m²", route: "IV", day: "1", notes: "Vesicante. Vigilar cardiotoxicidad." },
            { name: "Ciclofosfamida", dose: 600, unit: "mg/m²", route: "IV", day: "1" }
        ],
        premedication: ["Antieméticos (esquema para alta emetogenicidad)"],
        emetogenicity: "Alto"
    },
    "TC": {
        name: "TC (Taxotere y Ciclofosfamida)",
        indication: "Cáncer de mama adyuvante",
        cycleDays: 21,
        drugs: [
            { name: "Docetaxel", dose: 75, unit: "mg/m²", route: "IV", day: "1", infusionTime: "1 hora" },
            { name: "Ciclofosfamida", dose: 600, unit: "mg/m²", route: "IV", day: "1" }
        ],
        premedication: ["Dexametasona (pre y post)", "Antihistamínicos", "Antieméticos"],
        emetogenicity: "Moderado"
    },
    "TCH": {
        name: "TCH",
        indication: "Cáncer de mama HER2+",
        cycleDays: 21,
        drugs: [
            { name: "Docetaxel", dose: 75, unit: "mg/m²", route: "IV", day: "1", infusionTime: "1 hora" },
            { name: "Carboplatino", dose: 6, unit: "AUC", route: "IV", day: "1", infusionTime: "1 hora" },
            { name: "Trastuzumab", dose: 6, unit: "mg/kg", route: "IV", day: "1", notes: "Dosis de carga 8 mg/kg. Vigilar FEVI." }
        ],
        premedication: ["Similar a TC", "Paracetamol/Difenhidramina para Trastuzumab"],
        emetogenicity: "Moderado"
    },
    "Paclitaxel Semanal": {
        name: "Paclitaxel Semanal",
        indication: "Cáncer de mama, ovario, pulmón",
        cycleDays: 28,
        drugs: [
            { name: "Paclitaxel", dose: 80, unit: "mg/m²", route: "IV", day: "1, 8, 15", infusionTime: "1 hora", notes: "Descanso el día 22." }
        ],
        premedication: ["Dexametasona", "Antihistamínicos (H1 y H2)", "Antieméticos"],
        emetogenicity: "Bajo"
    },
    
    // --- ESQUEMAS CÁNCER DE PULMÓN ---
    "Carbo-Paclitaxel": {
        name: "Carboplatino + Paclitaxel",
        indication: "Cáncer de pulmón no microcítico",
        cycleDays: 21,
        drugs: [
            { name: "Carboplatino", dose: 6, unit: "AUC", route: "IV", day: "1", infusionTime: "1 hora" },
            { name: "Paclitaxel", dose: 200, unit: "mg/m²", route: "IV", day: "1", infusionTime: "3 horas" }
        ],
        premedication: ["Antieméticos", "Premedicación para Paclitaxel"],
        emetogenicity: "Alto"
    },

    // --- ESQUEMAS CÁNCER GERMINAL ---
    "BEP": {
        name: "BEP",
        indication: "Tumores de células germinales (testículo)",
        cycleDays: 21,
        drugs: [
            { name: "Bleomicina", dose: 30, unit: "UI", route: "IV Bolo", day: "2, 9, 16", notes: "Riesgo de toxicidad pulmonar." },
            { name: "Etopósido", dose: 100, unit: "mg/m²", route: "IV", day: "1-5", infusionTime: "1 hora" },
            { name: "Cisplatino (Platinol)", dose: 20, unit: "mg/m²", route: "IV", day: "1-5", infusionTime: "1 hora", notes: "Nefrotóxico. Requiere hiperhidratación." }
        ],
        premedication: ["Antieméticos (alto riesgo)", "Hiperhidratación con manitol y electrolitos"],
        emetogenicity: "Alto"
    },
    
    // --- OTROS ESQUEMAS COMUNES ---
     "FOLFIRINOX": {
        name: "FOLFIRINOX",
        indication: "Cáncer de páncreas metastásico",
        cycleDays: 14,
        drugs: [
            { name: "Oxaliplatino", dose: 85, unit: "mg/m²", route: "IV", day: "1", infusionTime: "2 horas" },
            { name: "Irinotecán", dose: 180, unit: "mg/m²", route: "IV", day: "1", infusionTime: "90 minutos" },
            { name: "Leucovorina", dose: 400, unit: "mg/m²", route: "IV", day: "1", infusionTime: "2 horas" },
            { name: "5-Fluorouracilo (Bolo)", dose: 400, unit: "mg/m²", route: "IV Bolo", day: "1" },
            { name: "5-Fluorouracilo (Infusión)", dose: 2400, unit: "mg/m²", route: "Infusión IV", day: "1-2", infusionTime: "46 horas" }
        ],
        premedication: ["Antieméticos agresivos", "Puede requerir factor estimulante de colonias (G-CSF)"],
        emetogenicity: "Alto"
    },
};

export { chemotherapySchemes };
