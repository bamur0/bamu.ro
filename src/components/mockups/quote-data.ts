import type { Locale } from "@/i18n/config";

// Datos ficticios para la recreación del cotizador.
export type Availability = "available" | "backorder" | "notForSale" | "discontinued";

export type QuoteProduct = {
  id: string;
  name: string;
  detail: string;
  availability: Availability;
  price: number | null;
  days: number | null;
  note?: string;
  blocked?: string;
  controlled?: boolean;
};

const products: Record<Locale, QuoteProduct[]> = {
  es: [
    { id: "q1", name: "Ácido ascórbico, estándar primario", detail: "200 mg · Químico · Vigente al 17/nov", availability: "available", price: 134, days: 6, note: "1 cotización vinculada" },
    { id: "q2", name: "Ácido cítrico, estándar de referencia", detail: "500 mg · Químico · Vigente al 17/nov", availability: "backorder", price: 96.5, days: 21, note: "Disponible a partir del 30/dic" , controlled: true },
    { id: "q3", name: "Ácido bórico grado reactivo", detail: "250 g · Químico · Vigente al 02/dic", availability: "available", price: 41.2, days: 4, blocked: "No se puede agregar: el cliente no tiene configurada la familia de este producto. Solicítalo a Finanzas." , controlled: true },
    { id: "q4", name: "Ácido acetilsalicílico, publicación técnica", detail: "Impreso · Publicación", availability: "notForSale", price: null, days: null, note: "Consulta disponibilidad con tu ejecutivo" },
    { id: "q5", name: "Ácido fólico, estándar secundario", detail: "100 mg · Biológico", availability: "discontinued", price: null, days: null, note: "Alternativa sugerida: LS-6610" },
  ],
  en: [
    { id: "q1", name: "Ascorbic acid, primary standard", detail: "200 mg · Chemical · Valid until Nov 17", availability: "available", price: 134, days: 6, note: "1 linked quote" },
    { id: "q2", name: "Citric acid, reference standard", detail: "500 mg · Chemical · Valid until Nov 17", availability: "backorder", price: 96.5, days: 21, note: "Available from Dec 30" , controlled: true },
    { id: "q3", name: "Boric acid, reagent grade", detail: "250 g · Chemical · Valid until Dec 2", availability: "available", price: 41.2, days: 4, blocked: "Can't be added: this customer has no setup for this product family. Request it from Finance." , controlled: true },
    { id: "q4", name: "Acetylsalicylic acid, technical publication", detail: "Print · Publication", availability: "notForSale", price: null, days: null, note: "Check availability with your sales rep" },
    { id: "q5", name: "Folic acid, secondary standard", detail: "100 mg · Biological", availability: "discontinued", price: null, days: null, note: "Suggested alternative: LS-6610" },
  ],
};

export const quoteUi = {
  es: {
    app: "Cotizador",
    user: "Ejecutivo de venta",
    clientPanel: "Solicitud",
    requestPanel: "Requerimiento",
    client: "Distribuidora Andina S.A.C.",
    clientType: "Cliente",
    segment: "Segmento",
    sector: "Sector",
    sectorValue: "Privado",
    industry: "Industria",
    industryValue: "Farmacéutica",
    terms: [
      ["Acepta parciales", "Sí"],
      ["Manda su guía", "No"],
      ["Ruta", "Local"],
      ["Factura", "Proveedora"],
      ["Moneda de oferta", "Dólares"],
      ["Condiciones de pago", "Prepago"],
    ],
    contact: "Contacto",
    contactName: "Lucía Paredes, Compras",
    requestId: "REQ-0249",
    requestSubject: "Asunto: cotización de estándares",
    requestBody: [
      "Buenas tardes,",
      "¿Me pueden cotizar los siguientes productos?",
      "1. Estándar primario de ácido ascórbico",
      "2. Estándar de ácido cítrico",
      "3. Ácido bórico grado reactivo",
      "Gracias.",
    ],
    quotes: [
      { id: "COT-0456", status: "Enviada" },
      { id: "COT-0457", status: "Guardada" },
      { id: "COT-0458", status: "Nueva" },
    ],
    addTitle: "Agregar productos",
    search: "Concepto, marca, catálogo o CAS",
    results: (n: number) => `${n} resultados para “ácido”`,
    filters: ["Todas las marcas", "Todas las líneas", "Todos los tipos"],
    outside: "Producto fuera del sistema",
    status: { available: "Disponible", backorder: "En back order", notForSale: "No comercializable", discontinued: "Descontinuado" },
    days: (d: number) => `${d} días hábiles`,
    add: "Agregar",
    added: "Agregado",
    inQuote: (n: number) => `${n} en cotización`,
    controlledTag: "Controlado",
    footer: (n: number, c: number) => [`${n} productos`, `${c} controlados`, `${n - c} no controlados`],
    split: "Dividir por controlados",
    collapse: "Contraer panel",
    expand: "Expandir panel",
  },
  en: {
    app: "Quoting",
    user: "Sales executive",
    clientPanel: "Request",
    requestPanel: "Requirement",
    client: "Distribuidora Andina S.A.C.",
    clientType: "Customer",
    segment: "Segment",
    sector: "Sector",
    sectorValue: "Private",
    industry: "Industry",
    industryValue: "Pharmaceutical",
    terms: [
      ["Accepts partials", "Yes"],
      ["Ships own label", "No"],
      ["Route", "Local"],
      ["Billed by", "Supplier"],
      ["Offer currency", "USD"],
      ["Payment terms", "Prepaid"],
    ],
    contact: "Contact",
    contactName: "Lucía Paredes, Procurement",
    requestId: "REQ-0249",
    requestSubject: "Subject: standards quote",
    requestBody: [
      "Good afternoon,",
      "Could you quote the following products?",
      "1. Ascorbic acid primary standard",
      "2. Citric acid standard",
      "3. Reagent-grade boric acid",
      "Thanks.",
    ],
    quotes: [
      { id: "COT-0456", status: "Sent" },
      { id: "COT-0457", status: "Saved" },
      { id: "COT-0458", status: "New" },
    ],
    addTitle: "Add products",
    search: "Item, brand, catalog or CAS",
    results: (n: number) => `${n} results for “acid”`,
    filters: ["All brands", "All lines", "All types"],
    outside: "Item not in system",
    status: { available: "Available", backorder: "Back order", notForSale: "Not for sale", discontinued: "Discontinued" },
    days: (d: number) => `${d} business days`,
    add: "Add",
    added: "Added",
    inQuote: (n: number) => `${n} in quote`,
    controlledTag: "Controlled",
    footer: (n: number, c: number) => [`${n} items`, `${c} controlled`, `${n - c} not controlled`],
    split: "Split by controlled",
    collapse: "Collapse panel",
    expand: "Expand panel",
  },
};

export const getQuoteProducts = (locale: Locale) => products[locale];
