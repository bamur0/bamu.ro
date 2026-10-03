import type { Locale } from "@/i18n/config";

// Datos ficticios. Los números CAS son identificadores químicos públicos.
export type InfoStatus = "expired" | "expiring" | "approval" | "current" | "discontinued";

export type CatalogRow = {
  id: string;
  name: string;
  status: InfoStatus;
  expires: string;
  cat: string;
  qty: string;
  container: string;
  cas: string;
};

const rows: Record<Locale, CatalogRow[]> = {
  es: [
    { id: "c1", name: "Paracetamol, estándar de referencia", status: "expired", expires: "02 sep 2026", cat: "RS-1724-001", qty: "25 mg", container: "Ampolleta", cas: "103-90-2" },
    { id: "c2", name: "Ibuprofeno, estándar de referencia", status: "expired", expires: "14 sep 2026", cat: "RS-1724-002", qty: "50 mg", container: "Blíster", cas: "15687-27-1" },
    { id: "c3", name: "Omeprazol, estándar secundario", status: "expiring", expires: "21 oct 2026", cat: "RS-1724-003", qty: "100 mg", container: "Caja", cas: "73590-58-6" },
    { id: "c4", name: "Clorhidrato de metformina", status: "expiring", expires: "04 nov 2026", cat: "RS-1724-004", qty: "1 g", container: "Bolsa de aluminio", cas: "1115-70-4" },
    { id: "c5", name: "Clorhidrato de sertralina", status: "approval", expires: "18 mar 2027", cat: "RS-1724-005", qty: "50 mg", container: "Ampolleta", cas: "79559-97-0" },
    { id: "c6", name: "Ciprofloxacino, estándar primario", status: "current", expires: "30 jun 2027", cat: "RS-1724-006", qty: "25 mg", container: "Blíster", cas: "85721-33-1" },
    { id: "c7", name: "Atorvastatina cálcica", status: "current", expires: "12 ago 2027", cat: "RS-1724-007", qty: "50 mg", container: "Caja", cas: "134523-03-8" },
    { id: "c8", name: "Besilato de amlodipino", status: "discontinued", expires: "01 ene 2026", cat: "RS-1724-008", qty: "25 mg", container: "Frasco de vidrio", cas: "111470-99-6" },
  ],
  en: [
    { id: "c1", name: "Paracetamol, reference standard", status: "expired", expires: "Sep 02, 2026", cat: "RS-1724-001", qty: "25 mg", container: "Ampoule", cas: "103-90-2" },
    { id: "c2", name: "Ibuprofen, reference standard", status: "expired", expires: "Sep 14, 2026", cat: "RS-1724-002", qty: "50 mg", container: "Blister", cas: "15687-27-1" },
    { id: "c3", name: "Omeprazole, secondary standard", status: "expiring", expires: "Oct 21, 2026", cat: "RS-1724-003", qty: "100 mg", container: "Box", cas: "73590-58-6" },
    { id: "c4", name: "Metformin hydrochloride", status: "expiring", expires: "Nov 04, 2026", cat: "RS-1724-004", qty: "1 g", container: "Foil bag", cas: "1115-70-4" },
    { id: "c5", name: "Sertraline hydrochloride", status: "approval", expires: "Mar 18, 2027", cat: "RS-1724-005", qty: "50 mg", container: "Ampoule", cas: "79559-97-0" },
    { id: "c6", name: "Ciprofloxacin, primary standard", status: "current", expires: "Jun 30, 2027", cat: "RS-1724-006", qty: "25 mg", container: "Blister", cas: "85721-33-1" },
    { id: "c7", name: "Atorvastatin calcium", status: "current", expires: "Aug 12, 2027", cat: "RS-1724-007", qty: "50 mg", container: "Box", cas: "134523-03-8" },
    { id: "c8", name: "Amlodipine besylate", status: "discontinued", expires: "Jan 01, 2026", cat: "RS-1724-008", qty: "25 mg", container: "Glass jar", cas: "111470-99-6" },
  ],
};

export const catalogUi = {
  es: {
    app: "Portal de proveedores",
    supplier: "Proveedor",
    title: "Catálogo de productos",
    search: "Buscar por catálogo, CAS o descripción",
    add: "Agregar producto",
    tabs: { all: "Todos", expired: "Vencidos", expiring: "Por vencer", approval: "En aprobación", discontinued: "Descontinuados" },
    status: { expired: "Vencido", expiring: "Por vencer", approval: "En aprobación", current: "Vigente", discontinued: "Descontinuado" },
    cols: ["Descripción", "Vigencia de la información", "Catálogo", "Cantidad", "Contenedor", "CAS"],
    empty: "No hay productos en este estado.",
    showing: (n: number, total: number) => `${n} de ${total} productos`,
    edit: "Editar",
    // Historial
    detail: "Detalle del producto",
    product: "Ciprofloxacino, estándar primario",
    history: "Historial de cambios",
    filterAll: "Todos",
    filterSupplier: "Proveedor",
    filterDistributor: "Distribuidor",
    events: [
      { who: "distributor", org: "Distribuidor", user: "catalogo.mx", date: "16 ago 2026, 20:08 (UTC−6)", changes: [["Descripción", "Ciprofloxacina estándar", "Ciprofloxacino, estándar primario"], ["Catálogo", "RS-1724-60", "RS-1724-006"]] },
      { who: "supplier", org: "Proveedor", user: "proveedor.ana", date: "16 ago 2026, 18:30 (UTC+5:30)", changes: [["Vigencia de la información", "01 jun 2026", "30 jun 2027"]] },
      { who: "supplier", org: "Proveedor", user: "proveedor.luis", date: "15 ago 2026, 15:28 (UTC+5:30)", changes: [["Contenedor", "Caja", "Blíster"]] },
    ],
  },
  en: {
    app: "Supplier portal",
    supplier: "Supplier",
    title: "Product catalog",
    search: "Search by catalog, CAS or description",
    add: "Add product",
    tabs: { all: "All", expired: "Expired", expiring: "Expiring soon", approval: "Awaiting approval", discontinued: "Discontinued" },
    status: { expired: "Expired", expiring: "Expiring soon", approval: "Awaiting approval", current: "Current", discontinued: "Discontinued" },
    cols: ["Description", "Information valid until", "Catalog", "Quantity", "Container", "CAS"],
    empty: "No products in this state.",
    showing: (n: number, total: number) => `${n} of ${total} products`,
    edit: "Edit",
    detail: "Product detail",
    product: "Ciprofloxacin, primary standard",
    history: "Change history",
    filterAll: "All",
    filterSupplier: "Supplier",
    filterDistributor: "Distributor",
    events: [
      { who: "distributor", org: "Distributor", user: "catalog.mx", date: "Aug 16, 2026, 20:08 (UTC−6)", changes: [["Description", "Ciprofloxacine standard", "Ciprofloxacin, primary standard"], ["Catalog", "RS-1724-60", "RS-1724-006"]] },
      { who: "supplier", org: "Supplier", user: "supplier.ana", date: "Aug 16, 2026, 18:30 (UTC+5:30)", changes: [["Information valid until", "Jun 01, 2026", "Jun 30, 2027"]] },
      { who: "supplier", org: "Supplier", user: "supplier.luis", date: "Aug 15, 2026, 15:28 (UTC+5:30)", changes: [["Container", "Box", "Blister"]] },
    ],
  },
};

export const getCatalogRows = (locale: Locale) => rows[locale];
