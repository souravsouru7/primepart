/**
 * FAQ content, verbatim from the corporate master document.
 * Shared by the page and by the FAQPage structured data in layout.tsx.
 */

export type FaqGroup = "company" | "services" | "products";

export const FAQ_GROUPS: { id: FaqGroup; label: string; full: string }[] = [
  {
    id: "company",
    label: "Company & sourcing",
    full: "General Company & Sourcing Information",
  },
  {
    id: "services",
    label: "Services & support",
    full: "Technical Services, Maintenance & Support",
  },
  {
    id: "products",
    label: "Products & specifications",
    full: "Hydraulic Product Specifics & Applications",
  },
];

export const FAQ_ITEMS: {
  n: string;
  group: FaqGroup;
  q: string;
  a: string;
  tags: string[];
}[] = [
  {
    n: "01",
    group: "company",
    q: "What exactly is PrimePart's core area of expertise?",
    a: "We are a highly specialized technical sourcing partner, distributor, and supplier of a commendable gamut of fluid power products, hydraulic components, and engineering solutions. Spearheaded by experienced technocrats, we focus on satisfying the complex, heavy-duty needs of our customers by providing technically advanced products and customized fluid management systems.",
    tags: ["sourcing", "distribution", "fluid power"],
  },
  {
    n: "02",
    group: "company",
    q: "Do you only supply standard, catalog hydraulic components?",
    a: "Not at all. While industrial hydraulics is a major focus of our business, we aim to assist our customers on all possible requirements and deliberately do not restrict ourselves only to standard hydraulic parts. We are deeply committed to assisting you in all possible ways of sourcing parts, crossing over obsolete items, and fulfilling custom engineering requirements for specialized machinery.",
    tags: ["obsolete parts", "cross-over", "custom engineering"],
  },
  {
    n: "03",
    group: "company",
    q: "What level of quality and certification can I expect from your products?",
    a: "Quality is the cornerstone of our operation. We procure our products exclusively from established global manufacturers and principals who hold supreme expertise over their respective domains. All products offered satisfy stringent ISO standards, as well as many other strict industry standards, pressure vessel certifications, and manufacturing benchmarks.",
    tags: ["ISO standards", "certification", "quality"],
  },
  {
    n: "04",
    group: "services",
    q: "Do you offer technical support along with product supply, or do you just ship parts?",
    a: "We offer comprehensive, end-to-end technical support. A core competitive advantage of PrimePart is that we service our clients not only with component and parts supply, but we also offer dedicated, expert technical assistance. We help you troubleshoot system failures, analyze schematics, and provide customized solutions to fit your specific operational needs.",
    tags: ["technical support", "troubleshooting", "schematics"],
  },
  {
    n: "05",
    group: "services",
    q: "What heavy industries and sectors do you typically serve?",
    a: "We supply heavy-duty hydraulic, filtration, and process systems to a wide variety of highly demanding sectors. Our products are actively used and trusted in hydroelectric power generation plants, metal forging operations, steel foundries, large-scale continuous paper manufacturing mills, and the mobile earthmoving equipment sector.",
    tags: ["hydroelectric", "steel foundries", "earthmoving"],
  },
  {
    n: "06",
    group: "products",
    q: "What are the exact specifications and capabilities of your hydraulic filter elements?",
    a: "Our premium filter elements are available in multiple highly durable materials, including Inorganic glass fibre (for absolute, fine filtration), treated Paper, Stainless Steel fibre, and washable Wiremesh. We offer micron ratings ranging from an ultra-fine 3µm to 20µm (absolute filtration) and 25 µm to 300 µm (nominal filtration). Depending on your specific filter media and application placement (return line vs. pressure line), differential collapse pressures are available in 10 bar, 25 bar, or extreme 210 bar ratings.",
    tags: ["filter elements", "micron rating", "collapse pressure"],
  },
  {
    n: "07",
    group: "products",
    q: "Why should our manufacturing facility invest in Oil Condition Sensors?",
    a: "Because reactive maintenance is the most expensive way to run a plant. Reliable, real-time assessment of hydraulic fluid is the key to continuous fluid monitoring and predictive maintenance. Utilizing our online particle and moisture sensors ensures the maximum availability and effective utilization of your capital equipment. Most importantly, it helps in the total avoidance of sudden downtimes, drastically reduces fluid replacement operating costs, and prevents the catastrophic, cascading failure of expensive pumps and proportional valves.",
    tags: ["condition sensors", "predictive maintenance", "downtime"],
  },
  {
    n: "08",
    group: "products",
    q: "What kind of accumulators do you supply, and are they safe for high-pressure environments?",
    a: "Safety is paramount. Our accumulators comply strictly with international pressure vessel regulating norms and are rigorously tested. We supply high-discharge Bladder type, compact Diaphragm type, and high-volume Piston type accumulators. We also supply all necessary safety infrastructure, including Safety Shut-off blocks, Nitrogen Charging units, and full multi-bottle Accumulator Stations.",
    tags: ["accumulators", "pressure vessel", "safety"],
  },
  {
    n: "09",
    group: "products",
    q: "What brands do your filter elements cross-reference with?",
    a: "Our vast inventory allows us to supply high-quality elements that serve as exact drop-in replacements for major global brands, including HYDAC, Schroeder Industries, Stauff, RTFilter Technik, Normen, Mahle, EPE, Rexroth Bosch Group, Pall, Argo Hytos, Des-Case, Filtrec, Donaldson, Baldwin Filters, MP Filtri, Parker, and Mann Filter.",
    tags: ["HYDAC", "Parker", "drop-in replacement"],
  },
];

/** Offered when a search returns nothing, so the user never hits a dead end. */
export const SUGGESTED_TERMS = [
  "micron",
  "accumulator",
  "ISO",
  "obsolete",
  "sensors",
  "HYDAC",
];
