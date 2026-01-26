
interface ParsedTransaction {
    amount: number;
    description: string;
    type: 'income' | 'expense';
    categoryGuess?: string;
}

export const smartParser = (text: string): ParsedTransaction => {
    const lowerText = text.toLowerCase();

    // 1. Detect Type (Default to expense unless explicit income keywords)
    const incomeKeywords = ['recibí', 'gané', 'ingreso', 'cobré', 'depósito', 'sueldo', 'pago de'];
    const isIncome = incomeKeywords.some(k => lowerText.includes(k));

    // 2. Detect Amount (Looks for numbers)
    // Matches: "50", "50.50", "50.00"
    const numberPattern = /(\d+(?:[.,]\d{1,2})?)/;
    const match = text.match(numberPattern);

    let amount = 0;
    if (match) {
        // Replace comma with dot for parsing
        amount = parseFloat(match[0].replace(',', '.'));
    }

    // 3. Detect Category (Simple keyword matching)
    // This could be enhanced with an AI service later
    let categoryGuess = 'General';

    const categories: Record<string, string[]> = {
        'Comida': ['comida', 'almuerzo', 'cena', 'desayuno', 'restaurante', 'pollo', 'pizza', 'hamburguesa', 'rappi', 'pedidosya', 'mercado', 'supermercado'],
        'Transporte': ['taxi', 'uber', 'didi', 'pasaje', 'bus', 'micro', 'gasolina', 'combustible', 'peaje'],
        'Servicios': ['luz', 'agua', 'internet', 'celular', 'plan', 'gas'],
        'Salud': ['farmacia', 'medicina', 'doctor', 'consulta', 'pastillas'],
        'Ocio': ['cine', 'netflix', 'spotify', 'juego', 'salida', 'bar', 'trago'],
        'Hogar': ['alquiler', 'mantenimiento', 'limpieza', 'artículos'],
        'Ingresos': ['sueldo', 'salario', 'honorarios', 'venta']
    };

    for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some(k => lowerText.includes(k))) {
            categoryGuess = cat;
            break;
        }
    }

    if (isIncome && categoryGuess === 'General') {
        categoryGuess = 'Ingresos';
    }

    // 4. Cleanup Description
    // Remove the number and common filler words to get a clean note
    let cleanDesc = text
        .replace(match ? match[0] : '', '')
        .replace(/\b(gaste|pague|compre|en|el|la|los|las|un|una|de|por)\b/gi, '') // Remove fillers
        .replace(/\s+/g, ' ')
        .trim();

    // Capitalize first letter
    cleanDesc = cleanDesc.charAt(0).toUpperCase() + cleanDesc.slice(1);

    return {
        amount,
        description: cleanDesc || 'Sin descripción',
        type: isIncome ? 'income' : 'expense',
        categoryGuess
    };
};
