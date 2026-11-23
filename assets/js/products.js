/**
 * Science Park Engineering — product catalogue data.
 *
 * To add a product: copy one block, give it the next id, a unique slug,
 * one of the category keys below, and an image in assets/img/.
 * Set featured: true to show it on the home page.
 */
window.SPE_CATEGORIES = [
  { key: 'analytical', label: 'Analytical' },
  { key: 'life-science', label: 'Life science' },
  { key: 'thermal', label: 'Heating & sterilization' },
  { key: 'water-cold', label: 'Water & cold storage' },
  { key: 'clean-air', label: 'Clean air & general lab' },
  { key: 'pharma', label: 'Pharmaceutical testing' }
];

window.SPE_PRODUCTS = [
  {
    id: 1, slug: 'ph-meter', name: 'pH Meter', cat: 'analytical', img: 'assets/img/1.jpg', featured: true,
    blurb: 'Accurate benchtop pH measurement for routine and research work.',
    desc: 'A benchtop pH meter with electrode and stand for fast, repeatable pH readings of aqueous samples, buffers, and process solutions.',
    uses: ['Buffer and media preparation', 'Water and wastewater testing', 'Pharmaceutical and food quality control']
  },
  {
    id: 2, slug: 'ultra-low-freezer', name: 'Ultra Low Freezer', cat: 'water-cold', img: 'assets/img/2.jpg', dark: true,
    blurb: 'Reliable, energy-efficient freezers for critical sample storage.',
    desc: 'Upright ultra-low temperature freezers for long-term preservation of biological samples, reagents, and other temperature-sensitive materials.',
    uses: ['Long-term storage of biological samples', 'Vaccine and reagent preservation', 'Biobanking and research archives']
  },
  {
    id: 3, slug: 'microdrop-spectrophotometer', name: 'Microdrop Spectrophotometer', cat: 'analytical', img: 'assets/img/3.jpg', featured: true,
    blurb: 'Precise measurement and high-throughput analysis from micro-volume samples.',
    desc: 'A spectrophotometer built for micro-volume and plate-based measurements, so you can quantify precious samples without large dilutions.',
    uses: ['Nucleic acid and protein quantification', 'Micro-volume absorbance measurements', 'High-throughput plate assays']
  },
  {
    id: 4, slug: 'pcr-machine', name: 'PCR Machine', cat: 'life-science', img: 'assets/img/4.jpg', featured: true,
    blurb: 'Dependable thermal cycling for DNA amplification.',
    desc: 'A thermal cycler for polymerase chain reaction with programmable temperature profiles, designed for reliable, repeatable DNA amplification.',
    uses: ['DNA amplification', 'Molecular diagnostics', 'Genetics teaching and research']
  },
  {
    id: 5, slug: 'flame-photometer', name: 'Flame Photometer', cat: 'analytical', img: 'assets/img/5.jpg',
    blurb: 'Efficient, accurate detection of sodium, potassium, and lithium.',
    desc: 'A flame photometer measures the concentration of alkali and alkaline earth metals by the light they emit in a flame — a simple, robust technique for routine analysis.',
    uses: ['Sodium, potassium, and lithium determination', 'Clinical and soil sample analysis', 'Cement, glass, and fertilizer QC']
  },
  {
    id: 6, slug: 'uv-visible-spectrophotometer', name: 'UV-Visible Spectrophotometer', cat: 'analytical', img: 'assets/img/6.jpg', featured: true,
    blurb: 'Precise optical measurements across the UV and visible range.',
    desc: 'A UV-Vis spectrophotometer for absorbance, transmittance, and concentration measurements across a wide range of wavelengths.',
    uses: ['Quantitative analysis and assay', 'Pharmaceutical QC and dissolution', 'Chemistry and biochemistry teaching labs']
  },
  {
    id: 7, slug: 'microscope', name: 'Microscope', cat: 'life-science', img: 'assets/img/7.jpg', featured: true,
    blurb: 'High-resolution imaging and analysis at the microscopic level.',
    desc: 'A binocular laboratory microscope with a mechanical stage for detailed observation of slides and specimens.',
    uses: ['Biology and microbiology', 'Pathology and clinical labs', 'Classroom and university teaching']
  },
  {
    id: 8, slug: 'muffle-furnace', name: 'Muffle Furnace', cat: 'thermal', img: 'assets/img/8.jpg',
    blurb: 'High-temperature furnace for material testing and lab applications.',
    desc: 'A muffle furnace heats samples to high temperatures in an enclosed chamber, isolated from the heating elements, for clean and uniform results.',
    uses: ['Ashing and loss-on-ignition tests', 'Heat treatment of materials', 'Gravimetric analysis']
  },
  {
    id: 9, slug: 'forced-air-oven', name: 'Forced Air Oven', cat: 'thermal', img: 'assets/img/9.jpg',
    blurb: 'Controlled heating and drying with uniform air circulation.',
    desc: 'A forced-convection laboratory oven that circulates heated air for even temperature distribution throughout the chamber.',
    uses: ['Drying glassware and samples', 'Moisture content determination', 'Curing and heat-conditioning']
  },
  {
    id: 10, slug: 'autoclave', name: 'Autoclave', cat: 'thermal', img: 'assets/img/10.jpg', featured: true,
    blurb: 'Safe, reliable steam sterilization for lab, medical, and industrial use.',
    desc: 'A vertical steam autoclave for sterilizing media, glassware, instruments, and laboratory waste under pressure.',
    uses: ['Culture media and glassware sterilization', 'Instrument sterilization', 'Decontamination of lab waste']
  },
  {
    id: 11, slug: 'centrifuge', name: 'Centrifuge', cat: 'life-science', img: 'assets/img/11.jpg', featured: true,
    blurb: 'High-speed separation for laboratories and research.',
    desc: 'A benchtop centrifuge that separates the components of a sample by density using high-speed rotation.',
    uses: ['Sample separation and clarification', 'Cell and pellet harvesting', 'Clinical and research sample prep']
  },
  {
    id: 12, slug: 'distillation-apparatus', name: 'Distillation Apparatus', cat: 'water-cold', img: 'assets/img/12.jpg',
    blurb: 'Separates mixtures by differences in boiling point.',
    desc: 'A glass distillation unit that boils and condenses liquid to separate components — commonly used to produce distilled water for laboratory work.',
    uses: ['Producing distilled water', 'Solvent purification', 'Teaching and general lab use']
  },
  {
    id: 13, slug: 'flame-photometer-pfp7', name: 'Flame Photometer (PFP7)', cat: 'analytical', img: 'assets/img/13.jpg',
    blurb: 'Analytical instrument for measuring metal ion concentration.',
    desc: 'A flame photometer is an analytical instrument used to measure the concentration of metal ions such as sodium and potassium in solution.',
    uses: ['Metal ion concentration measurement', 'Clinical, agricultural, and industrial samples', 'Routine quality control']
  },
  {
    id: 14, slug: 'orbital-shaker', name: 'Orbital Shaker', cat: 'life-science', img: 'assets/img/14.jpg',
    blurb: 'Circular shaking motion to mix, agitate, or aerate samples.',
    desc: 'A laboratory shaker that provides a smooth circular motion to mix, agitate, or aerate samples in flasks and other vessels.',
    uses: ['Cell and microbial culture', 'Mixing and dissolving', 'Extraction and staining procedures']
  },
  {
    id: 15, slug: 'dr6000-hach-spectrophotometer', name: 'DR6000 Hach Spectrophotometer', cat: 'analytical', img: 'assets/img/15.jpg',
    blurb: 'High-performance instrument for water and wastewater analysis.',
    desc: 'The DR6000 Hach Spectrophotometer is a high-performance laboratory instrument designed for precise analysis of water and wastewater, offering a wide wavelength range and preprogrammed testing methods for various parameters.',
    uses: ['Water and wastewater analysis', 'Environmental monitoring', 'Industrial process water testing']
  },
  {
    id: 16, slug: 'flake-ice-maker', name: 'Flake Ice Maker', cat: 'water-cold', img: 'assets/img/16.jpg',
    blurb: 'Produces thin flake ice for rapid, mouldable cooling.',
    desc: 'A flake ice maker produces thin, flat pieces of ice, commonly used for preserving perishable goods, in laboratories, and for industrial cooling thanks to its rapid cooling efficiency and mouldability.',
    uses: ['Keeping samples and reagents cold', 'Preserving perishable goods', 'Industrial cooling applications']
  },
  {
    id: 17, slug: 'water-purifier', name: 'Water Purifier', cat: 'water-cold', img: 'assets/img/17.jpg',
    blurb: 'Removes impurities, contaminants, and microorganisms from water.',
    desc: 'A water purification system designed to remove impurities, contaminants, and microorganisms, so water is safe and clean for drinking, laboratory use, or industrial applications.',
    uses: ['Laboratory-grade water supply', 'Reagent and buffer preparation', 'Feed water for instruments']
  },
  {
    id: 18, slug: 'analytical-balance', name: 'Analytical Balance', cat: 'analytical', img: 'assets/img/18.jpg', featured: true,
    blurb: 'High-precision weighing with a draft shield.',
    desc: 'An analytical balance with an enclosed weighing chamber that protects the pan from air currents for precise, repeatable weighing of small masses.',
    uses: ['Precise sample and standard weighing', 'Formulation and pharmaceutical QC', 'Gravimetric analysis']
  },
  {
    id: 19, slug: 'shaking-incubator', name: 'Shaking Incubator', cat: 'life-science', img: 'assets/img/19.jpg',
    blurb: 'Temperature control and shaking in one enclosed unit.',
    desc: 'A benchtop shaking incubator that combines controlled temperature with orbital shaking for growing cultures under consistent conditions.',
    uses: ['Bacterial and yeast culture', 'Cell growth and expression studies', 'Solubility and enzyme studies']
  },
  {
    id: 20, slug: 'ultrasonic-cell-disruptor', name: 'Ultrasonic Cell Disruptor', cat: 'life-science', img: 'assets/img/20.jpg',
    blurb: 'Ultrasonic processor with a noise-isolating chamber.',
    desc: 'An ultrasonic processor that uses a probe to break open cells and disperse samples, supplied with a sound-isolating chamber for quieter operation.',
    uses: ['Cell lysis and homogenization', 'Emulsifying and dispersing', 'Sample preparation']
  },
  {
    id: 21, slug: 'ultrasonic-cleaner', name: 'Ultrasonic Cleaner', cat: 'clean-air', img: 'assets/img/21.jpg',
    blurb: 'Ultrasonic bath for cleaning and degassing.',
    desc: 'A stainless-steel ultrasonic bath that cleans glassware, instruments, and parts with high-frequency sound waves, and can also be used to degas liquids.',
    uses: ['Cleaning glassware and instruments', 'Degassing solvents and mobile phases', 'Dissolving and dispersing samples']
  },
  {
    id: 22, slug: 'gel-documentation-system', name: 'Gel Documentation System', cat: 'life-science', img: 'assets/img/22.jpg',
    blurb: 'Enclosed imaging cabinet for gels and blots.',
    desc: 'A gel documentation system with an enclosed darkroom cabinet for imaging and recording electrophoresis gels.',
    uses: ['DNA, RNA, and protein gel imaging', 'Recording electrophoresis results', 'Molecular biology teaching and research']
  },
  {
    id: 23, slug: 'laminar-air-flow-cabinet', name: 'Laminar Air Flow Cabinet', cat: 'clean-air', img: 'assets/img/23.jpg',
    blurb: 'Filtered, particle-free workspace for clean procedures.',
    desc: 'A laminar air flow cabinet passes filtered air across the work surface to keep it free from airborne particles during clean procedures.',
    uses: ['Media pouring and plating', 'Plant tissue culture', 'Clean assembly and sample handling']
  },
  {
    id: 24, slug: 'biosafety-cabinet', name: 'Biosafety Cabinet', cat: 'clean-air', img: 'assets/img/24.jpg',
    blurb: 'Enclosed, ventilated workspace for handling biological samples.',
    desc: 'A biosafety cabinet provides an enclosed, ventilated work area with filtered airflow to help protect the operator, the sample, and the environment.',
    uses: ['Microbiology and clinical labs', 'Cell culture work', 'Handling potentially infectious samples']
  },
  {
    id: 25, slug: 'atomic-absorption-spectrophotometer', name: 'Atomic Absorption Spectrophotometer', cat: 'analytical', img: 'assets/img/products/atomic-absorption-spectrophotometer.jpg',
    blurb: 'Measures trace metals in liquid samples.',
    desc: 'An atomic absorption spectrophotometer determines the concentration of metals in a sample by measuring how much light the atomised sample absorbs.',
    uses: ['Trace and heavy metal analysis', 'Water, soil, and food testing', 'Pharmaceutical and industrial QC']
  },
  {
    id: 26, slug: 'ultrapure-water-system', name: 'Ultrapure Water System', cat: 'water-cold', img: 'assets/img/products/ultrapure-water-system.jpg',
    blurb: 'Produces ultrapure water for sensitive laboratory work.',
    desc: 'A water purification system that polishes feed water to ultrapure quality for analytical and life-science applications.',
    uses: ['HPLC and other instrument feed water', 'Reagent and buffer preparation', 'Molecular biology and cell culture']
  },
  {
    id: 27, slug: 'fume-hood', name: 'Fume Hood', cat: 'clean-air', img: 'assets/img/products/fume-hood.jpg',
    blurb: 'Ventilated enclosure for working safely with fumes and vapours.',
    desc: 'A fume hood draws air away from the operator and exhausts it, limiting exposure to hazardous fumes, vapours, and dust during chemical work.',
    uses: ['Handling volatile chemicals and acids', 'Sample digestion and preparation', 'Teaching and research chemistry labs']
  },
  {
    id: 28, slug: 'hot-air-oven', name: 'Hot Air Oven', cat: 'thermal', img: 'assets/img/products/hot-air-oven.jpg',
    blurb: 'Dry heat for drying, baking, and sterilizing.',
    desc: 'A laboratory hot air oven provides controlled dry heat for drying, heat treatment, and dry-heat sterilization. Available in a range of chamber sizes.',
    uses: ['Drying glassware and samples', 'Dry-heat sterilization', 'Heat treatment and curing']
  },
  {
    id: 29, slug: 'incubator', name: 'Incubator', cat: 'thermal', img: 'assets/img/products/incubator.jpg',
    blurb: 'Stable, controlled temperature for cultures and samples.',
    desc: 'A laboratory incubator holds a steady temperature for growing cultures and conditioning samples. Available in a range of chamber sizes.',
    uses: ['Microbial culture', 'BOD and stability studies', 'General sample incubation']
  },
  {
    id: 30, slug: 'hotplate-magnetic-stirrer', name: 'Hotplate with Magnetic Stirrer', cat: 'clean-air', img: 'assets/img/products/hotplate-magnetic-stirrer.jpg',
    blurb: 'Heats and stirs liquids at the same time.',
    desc: 'A hotplate with built-in magnetic stirring for heating and mixing solutions on the bench. Available in analogue and digital versions.',
    uses: ['Preparing solutions and media', 'Dissolving and mixing', 'Titration and general chemistry']
  },
  {
    id: 31, slug: 'water-bath', name: 'Water Bath', cat: 'thermal', img: 'assets/img/products/water-bath.jpg',
    blurb: 'Gentle, uniform heating of samples in water.',
    desc: 'A laboratory water bath keeps samples at a constant temperature by immersing them in heated water. Available in a range of capacities.',
    uses: ['Incubating samples and reagents', 'Warming and thawing', 'Enzyme and serological work']
  },
  {
    id: 32, slug: 'homogenizer', name: 'Homogenizer', cat: 'life-science', img: 'assets/img/products/homogenizer.jpg',
    blurb: 'Blends and disperses samples into a uniform mixture.',
    desc: 'A stand-mounted homogenizer that breaks down and disperses samples in liquid to produce a uniform mixture.',
    uses: ['Tissue and cell disruption', 'Emulsions and suspensions', 'Sample preparation']
  },
  {
    id: 33, slug: 'vortex-mixer', name: 'Vortex Mixer', cat: 'clean-air', img: 'assets/img/products/vortex-mixer.jpg',
    blurb: 'Fast mixing of small tubes and vials.',
    desc: 'A compact vortex mixer that rapidly mixes the contents of tubes and small vessels with an orbital motion.',
    uses: ['Mixing tubes and vials', 'Resuspending pellets', 'Reagent preparation']
  },
  {
    id: 34, slug: 'micropipette', name: 'Micropipette', cat: 'clean-air', img: 'assets/img/products/micropipette.jpg',
    blurb: 'Accurate transfer of small liquid volumes.',
    desc: 'An adjustable micropipette for measuring and dispensing small volumes of liquid accurately and repeatably.',
    uses: ['Molecular biology and PCR setup', 'Clinical and analytical sample handling', 'Reagent dispensing']
  },
  {
    id: 35, slug: 'colony-counter', name: 'Colony Counter', cat: 'life-science', img: 'assets/img/products/colony-counter.jpg',
    blurb: 'Illuminated, magnified counting of colonies on plates.',
    desc: 'A colony counter with an illuminated stage and magnifier that makes counting bacterial colonies on culture plates quicker and more reliable.',
    uses: ['Microbiology plate counts', 'Food and water testing', 'Pharmaceutical microbiology']
  },
  {
    id: 36, slug: 'rotary-evaporator', name: 'Rotary Evaporator', cat: 'analytical', img: 'assets/img/products/rotary-evaporator.jpg',
    blurb: 'Gentle removal of solvents by evaporation under vacuum.',
    desc: 'A rotary evaporator removes solvents from samples efficiently by rotating the flask in a heated bath under reduced pressure.',
    uses: ['Solvent removal and recovery', 'Concentrating samples', 'Extraction and purification work']
  },
  {
    id: 37, slug: 'refractometer', name: 'Refractometer', cat: 'analytical', img: 'assets/img/products/refractometer.jpg',
    blurb: 'Digital measurement of refractive index and Brix.',
    desc: 'A digital refractometer measures the refractive index of a liquid to determine concentration, such as sugar content.',
    uses: ['Sugar (Brix) measurement', 'Food and beverage QC', 'Chemical and pharmaceutical concentration checks']
  },
  {
    id: 38, slug: 'melting-point-apparatus', name: 'Melting Point Apparatus', cat: 'pharma', img: 'assets/img/products/melting-point-apparatus.jpg',
    blurb: 'Determines the melting point of solid samples.',
    desc: 'A melting point apparatus heats a small sample under control to find the temperature at which it melts — a key check of identity and purity.',
    uses: ['Purity and identity testing', 'Pharmaceutical QC', 'Chemistry teaching and research']
  },
  {
    id: 39, slug: 'dissolution-tester', name: 'Dissolution Tester', cat: 'pharma', img: 'assets/img/products/dissolution-tester.jpg',
    blurb: 'Measures how tablets and capsules release their drug.',
    desc: 'A dissolution tester measures the rate at which the active ingredient is released from tablets and capsules under controlled conditions.',
    uses: ['Tablet and capsule release testing', 'Pharmaceutical QC', 'Formulation development']
  },
  {
    id: 40, slug: 'disintegration-tester', name: 'Disintegration Tester', cat: 'pharma', img: 'assets/img/products/disintegration-tester.jpg',
    blurb: 'Tests how quickly tablets and capsules break up.',
    desc: 'A disintegration tester checks how long tablets and capsules take to break apart in liquid under standard conditions.',
    uses: ['Tablet and capsule disintegration tests', 'Pharmaceutical QC', 'Formulation development']
  }
];
