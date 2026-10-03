import type { Locale } from "@/i18n/config";

// Datos ficticios. Los números CAS son identificadores químicos públicos.
export type Product = {
  id: string;
  name: string;
  size: string;
  price: number;
  sku: string;
  cas: string;
  days: number;
  icon: "flask" | "tube" | "drop" | "package";
};

const products: Record<Locale, Product[]> = {
  es: [
    { id: "p1", name: "Ácido cítrico anhidro", size: "500 g", price: 48.2, sku: "LS-1042", cas: "77-92-9", days: 3, icon: "flask" },
    { id: "p2", name: "Cloruro de sodio grado reactivo", size: "1 kg", price: 36.75, sku: "LS-2210", cas: "7647-14-5", days: 2, icon: "package" },
    { id: "p3", name: "Estándar de referencia de cafeína", size: "100 mg", price: 212, sku: "LS-5531", cas: "58-08-2", days: 9, icon: "tube" },
    { id: "p4", name: "Etanol absoluto", size: "4 L", price: 129.9, sku: "LS-3307", cas: "64-17-5", days: 5, icon: "drop" },
    { id: "p5", name: "Hidróxido de sodio en perlas", size: "500 g", price: 27.4, sku: "LS-1188", cas: "1310-73-2", days: 2, icon: "flask" },
    { id: "p6", name: "Agar Mueller-Hinton", size: "500 g", price: 94.6, sku: "LS-7720", cas: "9002-18-0", days: 4, icon: "package" },
  ],
  en: [
    { id: "p1", name: "Citric acid, anhydrous", size: "500 g", price: 48.2, sku: "LS-1042", cas: "77-92-9", days: 3, icon: "flask" },
    { id: "p2", name: "Sodium chloride, reagent grade", size: "1 kg", price: 36.75, sku: "LS-2210", cas: "7647-14-5", days: 2, icon: "package" },
    { id: "p3", name: "Caffeine reference standard", size: "100 mg", price: 212, sku: "LS-5531", cas: "58-08-2", days: 9, icon: "tube" },
    { id: "p4", name: "Absolute ethanol", size: "4 L", price: 129.9, sku: "LS-3307", cas: "64-17-5", days: 5, icon: "drop" },
    { id: "p5", name: "Sodium hydroxide pellets", size: "500 g", price: 27.4, sku: "LS-1188", cas: "1310-73-2", days: 2, icon: "flask" },
    { id: "p6", name: "Mueller-Hinton agar", size: "500 g", price: 94.6, sku: "LS-7720", cas: "9002-18-0", days: 4, icon: "package" },
  ],
};

export const plants = {
  es: [
    { id: "n", name: "Planta Norte", mode: "Entrega parcial", address: "Av. Industria 420, Apodaca, N.L." },
    { id: "c", name: "Planta Centro", mode: "Entrega total", address: "Calle Cobre 18, Tlalnepantla, Edo. Méx." },
    { id: "o", name: "Planta Occidente", mode: "Entrega total", address: "Periférico Sur 7710, Tlaquepaque, Jal." },
    { id: "b", name: "Planta Bajío", mode: "Entrega parcial", address: "Parque Industrial 3, El Marqués, Qro." },
  ],
  en: [
    { id: "n", name: "North plant", mode: "Partial delivery", address: "Av. Industria 420, Apodaca, N.L." },
    { id: "c", name: "Central plant", mode: "Full delivery", address: "Calle Cobre 18, Tlalnepantla, Edo. Méx." },
    { id: "o", name: "West plant", mode: "Full delivery", address: "Periférico Sur 7710, Tlaquepaque, Jal." },
    { id: "b", name: "Bajío plant", mode: "Partial delivery", address: "Parque Industrial 3, El Marqués, Qro." },
  ],
} satisfies Record<Locale, { id: string; name: string; mode: string; address: string }[]>;

export const ui = {
  es: {
    vendor: "Catálogo del proveedor",
    buyer: "Cliente corporativo",
    delivery: "Entrega parcial",
    address: "Planta Norte, Av. Industria 420",
    timer: "10 min restantes",
    cancel: "Cancelar sesión",
    products: "Productos",
    brand: "Marca",
    search: "Buscar por SKU o descripción",
    add: "Agregar",
    eta: (d: number) => `${d} días hábiles`,
    cart: "Tu carrito",
    items: (n: number) => (n === 1 ? "1 artículo" : `${n} artículos`),
    empty: "Agrega productos desde el catálogo para comenzar.",
    emptyTitle: "Tu carrito está vacío",
    subtotal: "Subtotal",
    tax: "IVA",
    total: "Total",
    transfer: "Transferir carrito",
    plantTitle: "Dirección de entrega",
    plantLead: "Elige dónde se recibirá esta orden de compra.",
    plantHelp: "¿No ves tu dirección? Contacta a tu asesor comercial.",
    plantConfirm: "Confirmar dirección",
  },
  en: {
    vendor: "Supplier catalog",
    buyer: "Corporate buyer",
    delivery: "Partial delivery",
    address: "North plant, Av. Industria 420",
    timer: "10 min left",
    cancel: "End session",
    products: "Products",
    brand: "Brand",
    search: "Search by SKU or description",
    add: "Add",
    eta: (d: number) => `${d} business days`,
    cart: "Your cart",
    items: (n: number) => (n === 1 ? "1 item" : `${n} items`),
    empty: "Add products from the catalog to get started.",
    emptyTitle: "Your cart is empty",
    subtotal: "Subtotal",
    tax: "VAT",
    total: "Total",
    transfer: "Transfer cart",
    plantTitle: "Delivery address",
    plantLead: "Choose where this purchase order will be received.",
    plantHelp: "Don't see your address? Contact your sales rep.",
    plantConfirm: "Confirm address",
  },
};

export const getProducts = (locale: Locale) => products[locale];

export const money = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
