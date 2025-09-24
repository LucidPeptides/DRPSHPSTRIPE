// lib/products.ts

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  longDescription: string
  image: string
  variants: ProductVariant[]
  category: string
  featured?: boolean
  useBaseImage?: boolean
  showAffiliateProducts?: boolean
  relatedProductIds?: number[] // <-- Interface updated
  affiliateProducts?: AffiliateProduct[]
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: string | number // Price changed to accommodate "POA"
}

export interface AffiliateProduct {
  id: string
  name: string
  description: string
  image: string
  price?: string | number
  affiliateUrl: string
  platform: "Amazon" |
"Etsy" | "Other"
}

export const defaultAffiliateProducts: AffiliateProduct[] = [
  {
    id: "insulin-syringes",
    name: "1ml 30G 8mm Precision Needle - Individually Sealed 10 Pack",
    description:
      "General purpose syringes for laboratory use only. Not for human or animal use.",
    image: "/insulin-syringes.jpg",
    affiliateUrl: "https://amzn.to/3VyI69M",
    platform: "Amazon",
    price: "POA",
  },
  {
    id: "alcohol-swabs",
    name: "Cutiderm Pre-Injection Alcohol Wipes/Swabs Box of 200 Sachets",
    description: "Antiseptic wipes for general use.",
    image: "/alcohol-swabs.jpg",
    affiliateUrl: "https://amzn.to/3wP1b3g",
    platform: "Amazon",
    price: "POA",
  },
  {
    id: "Peptide Storage Box",
    name: "3D Printed Peptide Storage Box [S,M,L,XL,XXL]",
    description: "Safe storage for delicate vials out of direct sunlight",
    image: "/peptide-box.png",
    affiliateUrl: "#",
    platform: "Etsy",
    price: "POA",
  },
]

export const products: Product[] = [
  {
    id: 1,
    name: "BPC-157",
    slug: "bpc-157",
    relatedProductIds: [2, 11, 27], // TB-500, Blends, KPV
    description:
      "Body Protection Compound-157 is a synthetic peptide derived from a protective protein found in gastric juice.",
    longDescription: `BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide, consisting of 15 amino acids derived from a protective protein found in gastric juice. It is the subject of extensive research due to its potent cytoprotective and regenerative properties. The primary mechanism is thought to involve the upregulation of growth factors and the promotion of angiogenesis (the formation of new blood vessels), which are critical for tissue repair. Studies investigate its remarkable ability to accelerate healing in a variety of tissues, including tendons, ligaments, muscles, and the gastrointestinal tract. Its systemic effects make it a versatile compound for research into healing processes and injury recovery.`,
    image: "",
    useBaseImage: true,
    featured: true,
    showAffiliateProducts: false,
    variants: [
      { id: "bpc-157-5mg", name: "5mg", sku: "BC5", price: "POA" },
      { id: "bpc-157-10mg", name: "10mg", sku: "BC10", price: "POA" },
      { id: "bpc-157-20mg", name: "20mg", sku: "BC20", price: "POA" },
      { id: "bpc-157-tablet", name: "Tablet", sku: "B157", price: "POA"
},
    ],
    category: "Healing & Recovery",
  },
  {
    id: 2,
    name: "TB-500",
    slug: "tb-500",
    relatedProductIds: [1, 11, 25], // BPC-157, Blends, GHK-Cu
    description:
      "A synthetic fragment of the naturally occurring protein Thymosin Beta-4, studied for healing and recovery.",
    longDescription: `TB-500 is the synthetic version of Thymosin Beta-4, a 43-amino acid protein that is naturally present in virtually all human and animal cells. It is a key mediator of cell migration and differentiation, playing a crucial role in tissue repair and regeneration. Research focuses on its ability to upregulate actin, a cell-building protein, which promotes cell migration to sites of injury. This action, combined with its anti-inflammatory and pro-angiogenic properties, makes TB-500 a significant subject in studies on accelerated recovery from muscle, tendon, and ligament injuries, as well as in research into cardiac and neurological repair.`,
    image: "",
    useBaseImage: true,
    featured: true,
    showAffiliateProducts: false,
    variants: [
      { id: "tb-500-10mg", name: "10mg", sku: "BT10", price: "POA" },
      { id: "tb-500-20mg", name: "20mg", sku: "BT20", price: "POA" },
    ],
    category: "Healing & Recovery",
  },
  {
    id: 5,
    name: "Retatrutide",
    slug: "retatrutide",
    relatedProductIds: [10, 26],
    description:
      "A novel triple-agonist peptide targeting GIP, GLP-1, and glucagon receptors for metabolic research.",
    longDescription: `Retatrutide is a cutting-edge, investigational triple-agonist peptide that targets three distinct receptors involved in metabolism: the glucagon-like peptide-1 (GLP-1), glucose-dependent insulinotropic polypeptide (GIP), and glucagon receptors. This multi-faceted mechanism of action represents a significant evolution from single and dual-agonist peptides. By simultaneously modulating these three pathways, Retatrutide is researched for its potential to produce profound effects on appetite suppression, energy expenditure, and glycemic control, positioning it as a frontier compound in the study of obesity and metabolic syndrome.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "retatrutide-5mg", name: "5mg", sku: "RT5", price: "POA" },
      { id: "retatrutide-10mg", name: "10mg", sku: "RT10", price: "POA" },
      { id: "retatrutide-12mg", name: "12mg", sku: "RT12",
price: "POA" },
      { id: "retatrutide-15mg", name: "15mg", sku: "RT15", price: "POA" },
      { id: "retatrutide-20mg", name: "20mg", sku: "RT20", price: "POA" },
      { id: "retatrutide-24mg", name: "24mg", sku: "RT24", price: "POA" },
      { id: "retatrutide-30mg", name: "30mg", sku: "RT30", price: "POA" },
      { id: "retatrutide-36mg", name: "36mg", sku: "RT36", price: "POA" },
      { id: "retatrutide-40mg", name: "40mg", sku: "RT40", price: "POA" },
      { id:
"retatrutide-50mg", name: "50mg", sku: "RT50", price: "POA" },
      { id: "retatrutide-60mg", name: "60mg", sku: "RT60", price: "POA" },
    ],
    category: "Weight Management",
  },
  {
    id: 6,
    name: "Bacteriostatic Water",
    slug: "bacteriostatic-water",
    description:
      "Sterile water containing 0.9% benzyl alcohol, used for reconstituting peptide vials.",
    longDescription: `Bacteriostatic Water is a sterile, non-pyrogenic water preparation used to dilute or dissolve medications for injection. It contains 0.9% benzyl alcohol as a bacteriostatic preservative, which inhibits bacterial growth and allows for repeated withdrawals from the same vial. This makes it an essential and safe solvent for reconstituting lyophilized peptide powders for research purposes.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "bac-water-3ml", name: "3ml", sku: "BA03", price: "POA" },
      { id: "bac-water-10ml", name: "10ml", sku: "WA10", price: "POA" },
      {
        id: "bac-water-benzyl-10ml",
        name: "10ml (Benzyl Alcohol)",
        sku:
"BA10",
        price: "POA",
      },
    ],
    category: "Supplies",
  },
  {
    id: 10,
    name: "Cagrilintide",
    slug: "cagrilintide",
    relatedProductIds: [5, 26],
    description:
      "A long-acting amylin analogue studied for weight management, often in combination with GLP-1 agonists.",
    longDescription: `Cagrilintide is a long-acting analogue of amylin, a hormone that works with insulin to regulate blood glucose and promotes satiety. It is researched for its ability to reduce food intake and body weight, showing particular promise when studied in combination with a GLP-1 agonist, where it may offer synergistic effects on weight management.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "cagrilintide-5mg", name: "5mg", sku: "CGL5", price: "POA" },
      { id: "cagrilintide-10mg", name: "10mg", sku: "CGL10", price: "POA" },
    ],
    category: "Weight Management",
  },
  {
    id: 11,
    name: "Peptide Blends",
    slug: "peptide-blends",
    relatedProductIds: [1, 2],
    description:
      "Synergistic combinations of research peptides designed for targeted and enhanced effects.",
    longDescription: `Peptide blends are combinations of two or more peptides in a single formulation, designed to produce a synergistic effect that may be more potent or comprehensive than the individual components alone. These blends offer convenience and a multi-faceted approach for researchers exploring combined biological pathways.
    
**Healing & Recovery Blends (BPC-157, TB-500, KPV):**
This combination is considered a cornerstone of regenerative research.
The blend of BPC-157 and TB-500 is studied for its powerful, systemic healing capabilities, targeting everything from connective tissues and muscle to the gastrointestinal tract.
The addition of KPV introduces a potent anti-inflammatory component, making these blends a focus for comprehensive injury recovery and gut health studies.
**Weight Management Blends (Cagrilintide, Retatrutide):**
These blends combine next-generation metabolic peptides. A blend like Cagrilintide (an amylin analogue) and a Retatrutide (a triple-agonist) is investigated for its dual-pathway approach to promoting satiety and reducing food intake, potentially leading to more significant weight management outcomes than either compound alone.
**Cognitive Enhancement Blends (Selank + Semax):**
This blend pairs two powerful Russian neuropeptides.
Semax is researched for its strong nootropic and neuroprotective effects, enhancing focus and memory.
Selank provides a potent anxiolytic (anti-anxiety) effect without sedation. Together, they are studied for comprehensive cognitive support, mood regulation, and stress reduction.
**Cosmetic & Wellness Blends (GLOW, KLOW):**
These blends are formulated for research into skin health and overall wellness.
They combine the systemic healing of BPC-157 and TB-500 with GHK-Cu, a copper peptide known for stimulating collagen production.
The 'KLOW' variant adds KPV for its anti-inflammatory properties, creating a comprehensive subject for studies into skin rejuvenation and anti-aging.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      {
        id: "blend-cs5",
        name: "Cagrilintide + Semaglutide 5mg",
        sku: "CS5",
        price: "POA",
      },
      {
        id: "blend-cs10",
        name: "Cagrilintide + Semaglutide 10mg",
        sku: "CS10",
        price: "POA",
      },
      {
        id: "blend-rc10",
        name: "Retatrutide + Cagrilintide 10mg",
        sku: "RC10",
        price: "POA",
      },
      {
        id: "blend-bb10",
        name: "BPC-157 + TB-500 10mg",
        sku: "BB10",
        price: "POA",
      },
      {
        id: "blend-bb20",
        name: "BPC-157 + TB-500 20mg",
        sku: "BB20",
        price: "POA",
      },
      {
        id: "blend-btk20",
        name: "BPC-157 + TB-500 + KPV 20mg",
        sku: "BTK20",
        price: "POA",
      },
      {
        id: "blend-glow50",
        name: "GLOW (BPC + GHK-CU + TB500) 50mg",
        sku: "GLOW50",
        price: "POA",
      },
      {
        id: "blend-glow70",
        name: "GLOW (BPC + GHK-CU + TB500) 70mg",
        sku: "GLOW70",
        price: "POA",
      },
      {
        id: "blend-klow80",
        name: "KLOW (BPC + GHK-CU + TB500 + KPV) 80mg",
        sku: "KLOW80",
        price: "POA",
      },
      {
        id: "blend-ss20", name: "Selank + Semax 20mg", sku: "SS20", price: "POA" },
      {
        id: "blend-bb500-tablet",
        name: "BPC-157 + TB-500 (Tablet)",
        sku: "BB500",
        price: "POA",
      },
    ],
    category: "Peptide Blends",
  },
  {
    id: 14,
    name: "Melanotan I (MT-1)",
    slug: "melanotan-1",
    relatedProductIds: [15, 25], // MT-2, GHK-Cu
    description:
      "An analogue of alpha-melanocyte-stimulating hormone (α-MSH) researched for skin pigmentation.",
    longDescription: `Melanotan I, also known as Afamelanotide, is a synthetic peptide analogue of α-MSH (alpha-melanocyte-stimulating hormone). Its primary application in research is for inducing skin pigmentation by stimulating melanogenesis. This process increases the production of melanin, potentially offering a protective effect against UV radiation damage. It is noted for having fewer side effects compared to its successor, MT-2.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [{ id: "mt1-10mg", name: "10mg", sku: "MT1", price: "POA" }],
    category: "Tanning Peptides",
  },
  {
    id: 15,
    name: "Melanotan II (MT-2)",
    slug: "melanotan-2",
    relatedProductIds: [14, 25], // MT-1, GHK-Cu
    description:
      "A synthetic analogue of α-MSH studied for skin tanning and libido enhancement.",
    longDescription: `Melanotan II is another synthetic analogue of α-MSH. Like MT-1, it potently stimulates melanin production, leading to skin tanning. However, unlike its predecessor, MT-2 also demonstrates effects on the central nervous system, binding to melanocortin receptors that influence libido. This dual action makes it a subject of research for both its pigmentation and aphrodisiac properties.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [{ id: "mt2-10mg", name: "10mg", sku: "ML10", price: "POA" }],
    category: "Tanning Peptides",
  },
  {
    id: 16,
    name: "DSIP",
    slug: "dsip",
    relatedProductIds: [19, 17], // Oxytocin, Selank
    description:
      "Delta Sleep-Inducing Peptide, a neuropeptide researched for its effects on sleep and stress regulation.",
    longDescription: `DSIP (Delta Sleep-Inducing Peptide) is a naturally occurring neuropeptide primarily found in the brain, known for its role in sleep architecture. It is researched for its ability to promote slow-wave delta sleep, the deepest and most restorative phase of sleep. Studies also investigate its potential to normalize circadian rhythms, reduce stress, and act as an antioxidant.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "dsip-2mg", name: "2mg", sku: "DS2", price: "POA" },
      { id: "dsip-5mg", name: "5mg", sku: "DS5", price: "POA" },
      { id: "dsip-10mg", name: "10mg", sku: "DS10", price: "POA" },
      { id: "dsip-15mg", name: "15mg", sku: "DS15", price: "POA" },
    ],
    category: "Wellness & Sleep",
  },
  {
    id: 17,
    name: "Selank",
    slug: "selank",
    relatedProductIds: [18, 11], // Semax, Blends
    description:
      "A synthetic neuropeptide with anxiolytic (anti-anxiety) and nootropic properties.",
    longDescription: `Selank is a synthetic analogue of the human peptide tuftsin, which has been modified to increase its stability and neurological effects. It is researched in the field of cognitive enhancement for its potent anxiolytic (anti-anxiety) properties without causing sedation or cognitive impairment. It's also studied for its potential to improve memory, enhance mood, and modulate the immune system.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "selank-5mg", name: "5mg", sku: "SK5", price: "POA" },
      { id: "selank-10mg", name: "10mg", sku: "SK10", price: "POA" },
      { id: "selank-30mg", name: "30mg", sku: "SK30", price: "POA" },
    ],
    category: "Cognitive Enhancement",
  },
  {
    id: 18,
    name: "Semax",
    slug: "semax",
    relatedProductIds: [17, 11], // Selank, Blends
    description:
      "A neuropeptide studied for its potent nootropic, neuroprotective, and neurorestorative effects.",
    longDescription: `Semax is a synthetic peptide developed from a fragment of the adrenocorticotropic hormone (ACTH). It is a powerful nootropic researched for its ability to enhance cognitive functions like attention, memory formation, and mental clarity. It is also studied for its significant neuroprotective and neurorestorative properties, showing potential in research related to stroke recovery and neurodegenerative conditions.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "semax-5mg", name: "5mg", sku: "XA5", price: "POA" },
      { id: "semax-10mg", name: "10mg", sku: "XA10", price: "POA" },
      { id: "semax-30mg", name: "30mg", sku: "XA30", price: "POA" },
    ],
    category: "Cognitive Enhancement",
  },
  {
    id: 19,
    name: "Oxytocin",
    slug: "oxytocin",
    relatedProductIds: [16, 17], // DSIP, Selank
    description:
      "A neuropeptide hormone involved in social bonding, reproduction, and childbirth.",
    longDescription: `Oxytocin is a hormone and neuropeptide produced in the hypothalamus, often dubbed the "love hormone" for its crucial role in social bonding, trust, and empathy. In research settings, it is studied for its wide-ranging effects on social behavior, anxiety reduction, mood elevation, and its potential therapeutic applications in various psychological conditions.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "oxytocin-5mg", name: "5mg", sku: "OT5", price: "POA" },
      { id: "oxytocin-10mg", name: "10mg", sku: "OT10", price: "POA" },
    ],
    category: "Wellness & Sleep",
  },
  {
    id: 20,
    name:
"Epithalon",
    slug: "epithalon",
    relatedProductIds: [21, 22, 28], // N-Acetyl Epitalon, SS-31, Glutathione
    description:
      "A synthetic peptide studied for its role in regulating the pineal gland and its anti-aging potential.",
    longDescription: `Epithalon is a synthetic tetrapeptide version of Epitalamin, a peptide naturally produced by the pineal gland. It is a primary focus in longevity research due to its studied ability to activate the enzyme telomerase, which rebuilds and lengthens telomeres at the ends of chromosomes. By protecting genetic material, it is investigated for its potential to slow age-related decline and regulate circadian rhythms.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "epithalon-5mg", name: "5mg", sku: "ET5", price: "POA" },
      { id: "epithalon-10mg", name: "10mg", sku: "ET10", price: "POA" },
      { id: "epithalon-40mg", name: "40mg", sku: "ET40", price: "POA" },
      { id: "epithalon-50mg", name: "50mg", sku: "ET50", price: "POA" },
],
    category: "Longevity & Anti-Aging",
  },
  {
    id: 21,
    name: "N-Acetyl Epitalon Amidate",
    slug: "n-acetyl-epitalon-amidate",
    relatedProductIds: [20, 22], // Epithalon, SS-31
    description:
      "A modified form of Epithalon with potentially enhanced bioavailability and stability.",
    longDescription: `N-Acetyl Epitalon Amidate is an advanced, modified version of the Epithalon peptide. The N-acetylation and amidation are chemical modifications at the peptide's terminals, designed to increase its stability against enzymatic degradation and improve its ability to cross the blood-brain barrier. This potentially enhances its bioavailability and potency for longevity research.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [{ id: "na-epithalon-5mg", name: "5mg", sku: "NET5", price: "POA" }],
    category: "Longevity & Anti-Aging",
  },
  {
    id: 22,
    name: "SS-31",
    slug: "ss-31",
    relatedProductIds: [20, 28], // Epithalon, Glutathione
    description:
      "A mitochondria-targeting antioxidant peptide researched for age-related diseases.",
    longDescription: `SS-31, also known as Elamipretide, is a small, water-soluble tetrapeptide that selectively targets the inner mitochondrial membrane. It is researched for its potent ability to reduce mitochondrial oxidative stress and restore cellular bioenergetics. By improving the function of mitochondria, the powerhouses of the cell, it shows significant potential in studies of age-related and metabolic conditions.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "ss-31-10mg", name: "10mg", sku: "2S10", price: "POA" },
      { id: "ss-31-50mg", name: "50mg", sku: "2S50", price: "POA" },
    ],
    category: "Longevity & Anti-Aging",
  },
  {
    id: 25,
    name: "GHK-Cu",
    slug:
"ghk-cu",
    relatedProductIds: [1, 2, 15], // BPC-157, TB-500, MT-2
    description:
      "A copper peptide complex studied for its skin regeneration and anti-inflammatory effects.",
    longDescription: `GHK-Cu is a naturally occurring human copper peptide complex with a wide range of regenerative and protective actions. It is extensively researched in skincare and cosmetics for its ability to stimulate collagen and elastin production, improve skin firmness and elasticity, reduce inflammation, and accelerate wound healing, making it a key ingredient in anti-aging and skin repair studies.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "ghk-cu-50mg", name: "50mg", sku: "CU50", price: "POA" },
      { id: "ghk-cu-100mg", name: "100mg", sku: "CU100", price: "POA" },
    ],
    category: "Cosmetic & Skin",
},
  {
    id: 26,
    name: "5-amino-1mq",
    slug: "5-amino-1mq",
    relatedProductIds: [5, 10],
    description:
      "A small molecule inhibitor of NNMT, an enzyme linked to metabolism and obesity.",
    longDescription: `5-amino-1mq is a small molecule drug, not a peptide, that membrane-permeably inhibits the enzyme Nicotinamide N-methyltransferase (NNMT). Elevated NNMT activity in fat tissue is associated with obesity and other metabolic diseases. By inhibiting this enzyme, 5-amino-1mq is researched as a potential agent for increasing metabolic rate, reducing fat accumulation, and reversing diet-induced obesity.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "5-amino-5mg", name: "5mg", sku: "5AM", price: "POA" },
      { id: "5-amino-10mg", name: "10mg", sku: "10AM", price: "POA" },
      { id: "5-amino-50mg", name: "50mg", sku: "50AM", price: "POA" },
      { id: "5-amino-tablet", name: "Tablet", sku: "AMQ50", price:
"POA" },
    ],
    category: "Weight Management",
  },
  {
    id: 27,
    name: "KPV",
    slug: "kpv",
    relatedProductIds: [1, 2, 28], // BPC-157, TB-500, Glutathione
    description: "An anti-inflammatory tripeptide fragment of α-MSH.",
    longDescription: `KPV is the C-terminal tripeptide fragment of alpha-melanocyte-stimulating hormone (α-MSH) and contains the hormone's potent anti-inflammatory properties. It is researched for its ability to reduce inflammation both systemically and locally, showing significant potential in studies related to inflammatory bowel disease, gut health, and skin conditions like psoriasis and eczema.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "kpv-10mg", name: "10mg", sku: "KP10", price: "POA" },
      { id: "kpv-tablet", name: "Tablet", sku: "KP500", price: "POA" },
    ],
    category: "Healing & Recovery",
  },
  {
    id: 28,
    name: "Glutathione",
    slug: "glutathione",
    relatedProductIds: [22, 27], // SS-31, KPV
    description:
      "The body's master antioxidant, crucial for detoxification and immune function.",
    longDescription: `Glutathione is a tripeptide and the most abundant antioxidant naturally produced in the human body. It plays a critical role in neutralizing free radicals, detoxifying harmful substances, regenerating other antioxidants like Vitamins C and E, and supporting a healthy immune system. Research explores the use of supplemental glutathione for its systemic health and anti-aging benefits.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [{ id: "glutathione", name: "200mg", sku: "GTT", price: "POA" }],
    category: "Wellness & Sleep",
  },
  {
    id: 30,
    name: "Vitamin B12 Injection",
    slug: "vitamin-b12-injection",
    description:
      "An injectable form of Vitamin B12, essential for energy metabolism and nervous system health.",
    longDescription: `Vitamin B12 (Cobalamin) is a crucial water-soluble nutrient essential for red blood cell formation, neurological function, and DNA synthesis. Injectable forms, such as Methylcobalamin or Cyanocobalamin, are studied for their high bioavailability, providing a direct route to address deficiencies and support energy metabolism, cognitive function, and overall well-being.`,
    image: "",
    useBaseImage: true,
    showAffiliateProducts: false,
    variants: [
      { id: "b12-1ml", name: "1ml", sku: "B1201", price: "POA" },
      { id: "b12-10ml", name: "10ml", sku: "B1210", price: "POA" },
    ],
    category: "Supplies",
  },
]

export function getProductById(id: number): Product |
undefined {
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((product) => product.category === category)
}

export function getAffiliateProductsForProduct(
  productId: number,
): AffiliateProduct[] {
  const product = getProductById(productId)
  if (!product || product.showAffiliateProducts === false) {
    return []
  }
  return product.affiliateProducts || defaultAffiliateProducts
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  return products.find(
    (product) => product.slug?.toLowerCase() === slug.toLowerCase(),
  )
}

export async function getRelatedProducts(slug: string): Promise<Product[]> {
  const current = products.find((p) => p.slug === slug)
  if (!current) return []

  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
}