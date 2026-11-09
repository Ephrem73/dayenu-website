import type { IconName } from "./Icon"

export type Service = {
  id: string
  name: string
  icon: IconName
  blurb: string
  detail: string
  image: string
  alt: string
  includes: string[]
  for: string
}

export type Author = {
  name: string
  role: string
}

export type Post = {
  slug: string
  title: string
  tag: string
  read: string
  date: string
  author: Author
  image: string
  excerpt: string
  body: string[]
}

/** Contact and identity details from the Dayenu company profile. */
export const company = {
  legalName: "Dayenu Road Cleaning Service PLC",
  tradingName: "Dayenu Road and Environment Cleaning Service PLC",
  established: "2026",
  office: "Bole Medhaniyalem (Bole Sheger), Addis Ababa",
  phones: ["09 04 77-73-01"],
  email: "dayenuenviroment@gmail.com",
  whatsapp: "09 04 77-73-01",
  whatsappUrl: "https://wa.me/251904777301",
  telegram: "@DayenuCleaning",
  telegramUrl: "https://t.me/DayenuCleaning",
  tagline: "Clean environments. Safer communities. Accountable service delivery.",
  hours: "Available 24/7 for planned operations and urgent cleaning support.",
  capabilityPdf: "/Dayenu_Capability_Statement.pdf",
}

export const tel = (phone: string) => {
  const digits = phone.replace(/[^\d+]/g, '')
  if (digits.startsWith('0')) return `tel:+251${digits.slice(1)}`
  return `tel:${digits}`
}

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fit=crop&auto=format`

export const img = {
  crew: "/assets/managed-crew.png",
  facility: "/assets/facilities.png",
  greenery: "/assets/landscaping.png",
  sweeping: "/assets/road-crew.jpg",
  shovel: u("1597668094841-6ed2b257d9d1"),
  sweeperTruck: "/assets/road-crew.jpg",
  addis: u("1626598442658-ea6a1a5943df", 2200),
  walkway: "/assets/sidewalk-crew.jpg",
  square: "/assets/sidewalk-crew.jpg",
  drain: "/assets/drainage-crew.jpg",
  flood: u("1738541923029-a5243ec88d3b"),
  construction: "/assets/post-construction.png",
  constructionSite: u("1609867271967-a82f85c48531"),
  warehouse: u("1772305336606-989a457ffbae"),
  safety: "/assets/managed-crew.png",
  planting: "/assets/landscaping.png",
  corridor: u("1643450408381-3f960eeab89b"),
  campus: "/assets/facilities.png",
  washing: "/assets/sidewalk-crew.jpg",
  night: u("1453413453658-27fec8f43f29", 2200),
}

export const services: Service[] = [
  {
    id: "road",
    name: "Road & Street Cleaning",
    icon: "road",
    blurb:
      "Manual and mechanical sweeping that keeps roads, medians and corridors free of dust, sand, litter and debris.",
    detail:
      "Planned route cleaning for city streets, road edges, medians and highway corridors. Each route is mapped, scheduled and checked by a supervisor, with day or night shifts arranged around traffic.",
    image: img.sweeping,
    alt: "Dayenu Ethiopian road sweeping crew cleaning street in Addis Ababa",
    includes: [
      "Manual or mechanical road sweeping",
      "Dust, sand, litter and debris removal",
      "Road edge and median cleaning",
      "Highway and corridor upkeep",
    ],
    for: "Municipalities and corridor programs",
  },
  {
    id: "sidewalk",
    name: "Sidewalk & Public-Space Maintenance",
    icon: "tiles",
    blurb:
      "Clean, usable sidewalks, plazas, markets, terminals and parks for the people who rely on them every day.",
    detail:
      "Routine cleaning and upkeep for shared public environments, planned around pedestrian flow so spaces stay safe, presentable and usable throughout the day.",
    image: img.washing,
    alt: "Dayenu Ethiopian public space maintenance crew pressure washing plaza in Addis Ababa",
    includes: [
      "Sidewalks and pedestrian areas",
      "Waiting areas, markets and terminals",
      "Parks and recreation spaces",
      "Shared public environments",
    ],
    for: "City administrations and public facilities",
  },
  {
    id: "drainage",
    name: "Drainage & Sanitation Support",
    icon: "drop",
    blurb:
      "Clearing accessible drains and channels, environmental sanitation and reporting of blocked or damaged infrastructure.",
    detail:
      "Support that helps water flow and public spaces stay hygienic. Our teams clear accessible drains and channels, carry out environmental sanitation and report blocked, damaged or unsafe infrastructure to the client.",
    image: img.drain,
    alt: "Dayenu Ethiopian sanitation crew clearing roadside drainage culvert in Addis Ababa",
    includes: [
      "Clearing accessible drains and channels",
      "Environmental sanitation activities",
      "Waste-management support and safe transfer",
      "Reporting blocked, damaged or unsafe infrastructure",
    ],
    for: "Municipalities and public facilities",
  },
  {
    id: "facilities",
    name: "Facilities & Institutional Cleaning",
    icon: "building",
    blurb:
      "Scheduled cleaning for offices, schools, healthcare facilities, commercial buildings, compounds and industrial sites.",
    detail:
      "Structured, supervised cleaning for buildings and compounds that need consistent standards. Industrial sites such as factories, warehouses and plants are covered in line with each site's safety requirements.",
    image: img.facility,
    alt: "Dayenu professional facilities and institutional cleaning in Addis Ababa",
    includes: [
      "Offices, schools and healthcare facilities",
      "Commercial buildings, hotels and compounds",
      "Shared service areas",
      "Factories, warehouses and industrial parks, subject to site-safety rules",
    ],
    for: "Institutions, industry and commercial sites",
  },
  {
    id: "postconstruction",
    name: "Post-Construction Cleaning",
    icon: "hardhat",
    blurb:
      "Debris removal, final cleaning, dust control and handover preparation for new roads, buildings and corridors.",
    detail:
      "Cleaning that takes a project from construction site to handover. We remove debris, control dust and carry out final cleaning, then support the upkeep of newly built roads, buildings and public corridors.",
    image: img.construction,
    alt: "Dayenu post-construction cleaning and dust control for new buildings and roads",
    includes: [
      "Construction debris removal",
      "Final cleaning and dust control",
      "Handover preparation",
      "Upkeep of new roads, buildings and corridors",
    ],
    for: "Construction and corridor projects",
  },
  {
    id: "landscaping",
    name: "Landscaping & Urban Greenery",
    icon: "leaf",
    blurb:
      "Grass cutting, garden cleaning, tree-planting support, watering and plant care for public green spaces.",
    detail:
      "Care for the green spaces that make a city more liveable. Teams maintain planted areas along roads, parks and compounds, and report on plant condition so problems are caught early.",
    image: img.planting,
    alt: "Dayenu landscaping and urban greenery team creating vibrant green spaces",
    includes: [
      "Grass cutting and garden cleaning",
      "Tree-planting support",
      "Watering and basic plant nourishment",
      "Pruning support and plant-condition reporting",
    ],
    for: "Parks, corridors and compounds",
  },
]

export const posts: Post[] = [
  {
    slug: "managed-service-not-labour-supply",
    title: "Why a managed service is more than labour supply",
    tag: "Approach",
    read: "4 min",
    date: "October 14, 2026",
    author: {
      name: "Ephrem Tadesse",
      role: "Operations Manager",
    },
    image: img.crew,
    excerpt:
      "Workers are only part of a clean city. What matters is who coordinates, supervises and reports on the work.",
    body: [
      "Supplying workers is not the same as delivering a cleaner city. A service also needs someone to recruit and induct people, track attendance, provide tools and protective equipment, organise logistics, check quality and escalate problems.",
      "Dayenu works as a managed-service provider. We take responsibility for that whole chain, so the client deals with one accountable team and sees the results in regular performance reports.",
      "Before work begins, each assignment is confirmed through a written service scope, a route or site map, a frequency schedule, a manpower plan, an equipment list, a reporting format and an agreed performance standard.",
      "Anything outside that scope needs authorisation. This protects budgets, avoids misunderstandings and keeps everyone measuring the same thing.",
    ],
  },
  {
    slug: "working-safely-beside-traffic",
    title: "Working safely beside traffic",
    tag: "Safety",
    read: "4 min",
    date: "October 22, 2026",
    author: {
      name: "Yared Bekele",
      role: "HSE & Safety Officer",
    },
    image: img.safety,
    excerpt:
      "Road cleaning puts people next to moving vehicles. These are the controls we put in place before a shift starts.",
    body: [
      "Our health and safety goal is simple: prevent injury, illness, traffic incidents and damage to property. On a roadside, that starts long before anyone picks up a broom.",
      "Every worker is issued suitable PPE, including reflective vests, gloves, masks and boots. Cones, barriers and warning signs mark the work area, and teams are trained in safe tools and methods before deployment.",
      "Supervisors carry out a risk assessment for each route and plan shifts around traffic levels. Pedestrians and road users are protected as carefully as the crew.",
      "Incidents and near misses are reported promptly and recorded. Reviewing them is how safe practice keeps improving.",
    ],
  },
  {
    slug: "a-day-in-field-operations",
    title: "What a day of field operations looks like",
    tag: "Operations",
    read: "5 min",
    date: "October 28, 2026",
    author: {
      name: "Abebe Mengistu",
      role: "Field Operations & Shift Supervisor",
    },
    image: img.sweeping,
    excerpt:
      "From the morning briefing to end-of-day closeout, each shift follows the same documented rhythm.",
    body: [
      "Each shift begins with a briefing. Supervisors confirm attendance, assign routes or sites, check PPE and equipment, and go over that day's safety points.",
      "Field teams then deploy to their assigned areas. Supervisors inspect work in progress, collect photo evidence where the client requires it, and log any issues such as blocked drains or damaged and unsafe infrastructure.",
      "At the end of the day, the team closes out. Route checklists are completed, waste transfer is confirmed and anything unresolved is carried forward.",
      "Each week and month, these daily records feed performance and corrective-action reports for the client. That record turns daily effort into results the client can check.",
    ],
  },
  {
    slug: "responsible-waste-and-water",
    title: "Responsible waste, water and chemical practices",
    tag: "Environment",
    read: "4 min",
    date: "November 2, 2026",
    author: {
      name: "Selamawit Girma",
      role: "Environmental Compliance Lead",
    },
    image: img.greenery,
    excerpt:
      "Cleaning a public space should not create a problem somewhere else. These are the environmental commitments we work to.",
    body: [
      "The waste we collect has to go somewhere. We segregate it where practical, transport it covered and take it to approved disposal points, recovering recyclable material wherever possible.",
      "Water is used efficiently and chemicals are kept to a minimum. Both are chosen and handled so they do not damage plants, drains, soil or local ecosystems.",
      "Greenery is part of the job, not a side task. Tree-planting support, watering and plant care help public spaces stay healthy as well as clean.",
      "Public awareness matters too. Community cleanup campaigns help people see a clean neighbourhood as something shared, not just something maintained.",
    ],
  },
  {
    slug: "starting-with-a-pilot",
    title: "Starting small: pilots that scale",
    tag: "Procurement",
    read: "3 min",
    date: "November 4, 2026",
    author: {
      name: "Dawit Haile",
      role: "Municipal Partnerships & Contracts Lead",
    },
    image: img.addis,
    excerpt:
      "A pilot area lets clients judge the standard before expanding by route, facility, sub-city or project.",
    body: [
      "Large public contracts carry risk on both sides. A pilot reduces it. We deploy to a defined area first, agree the performance indicators and let the results speak.",
      "Delivery follows five phases: assessment and planning, mobilization, pilot or initial deployment, full operations, then review and improvement.",
      "From a successful pilot, resources scale by route, facility, sub-city or project, with the same supervision and reporting throughout.",
      "We take part in tenders, requests for quotation, framework agreements, service-level contracts, subcontracting and public-private partnerships, subject to the client's procurement requirements and confirmed scope.",
    ],
  },
]

export const faqs: [string, string][] = [
  [
    "Do you work outside normal hours?",
    "Yes. Dayenu is available 24/7 for planned operations and urgent cleaning support. Road and public-space work is often scheduled at night or early morning to avoid peak traffic.",
  ],
  [
    "How is the scope of work agreed?",
    "Each assignment is confirmed through a service scope, route or site map, frequency schedule, manpower plan, equipment list, reporting format and agreed performance standard. Work outside that scope needs authorisation first.",
  ],
  [
    "How do you report on performance?",
    "We keep attendance and deployment records, route or site checklists, incident and near-miss logs, PPE and equipment registers, and photo evidence where required. Weekly and monthly reports cover performance and corrective action.",
  ],
  [
    "Can you start with a pilot?",
    "Yes. We can start in a defined pilot area, confirm the performance indicators, then scale by route, facility, sub-city or project.",
  ],
  [
    "What happens if a standard is not met?",
    "Supervisors inspect work during every shift. Problems and complaints are logged, corrected and tracked in our corrective-action reporting until they are resolved.",
  ],
  [
    "Do you take part in tenders and RFQs?",
    "Yes. We work through tenders, RFQs, framework agreements, pilot projects, service-level contracts, subcontracting and public-private partnerships, subject to procurement requirements and confirmed scope.",
  ],
]
