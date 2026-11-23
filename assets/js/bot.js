/**
 * Science Park Engineering — rule-based help bot.
 *
 * No server and no AI: it matches keywords in the visitor's message and
 * answers from the fixed replies below, in English, Bangla, or Banglish
 * (Bangla typed in English letters) — whichever the visitor used.
 *
 * To change an answer, edit REPLIES. To teach it a new question, add an
 * entry to INTENTS (keywords) and a matching entry to REPLIES.
 */
(function () {
  'use strict';

  var PRODUCTS = window.SPE_PRODUCTS || [];
  var PDF = 'assets/docs/science-park-engineering-company-profile.pdf';
  var WHATSAPP = 'https://wa.me/8801864226212';
  var STORE_KEY = 'spe-bot-v2';

  /* ---------- Language detection ---------- */

  var BANGLISH_WORDS = [
    'ki', 'koto', 'kto', 'dam', 'daam', 'ache', 'achhe', 'ase', 'kothay', 'kothai', 'kivabe', 'kibhabe', 'kemne',
    'chai', 'lagbe', 'apnader', 'apnar', 'apni', 'ami', 'amar', 'amader', 'kobe', 'hobe', 'korte', 'korben', 'kori',
    'pabo', 'pawa', 'thikana', 'jante', 'bolun', 'bolen', 'kono', 'dorkar', 'kinte', 'kinbo', 'jabe', 'shob', 'sob',
    'gulo', 'kemon', 'assalamu', 'salam', 'dhonnobad', 'vai', 'bhai', 'accha', 'thik', 'keno', 'kon', 'diben', 'den',
    'nibo', 'nite', 'theke', 'jonno', 'shathe', 'sathe', 'hoy', 'nai', 'nei', 'ar', 'ebong', 'naki', 'dekhte', 'dekhan',
    'korbo', 'parbo', 'pari', 'paren', 'lage', 'chacchi', 'dekhbo', 'janbo', 'jabo', 'bolben', 'niben', 'achen', 'koren', 'kore', 'hocche'
  ];

  function detectLanguage(text, previous) {
    if (/[ঀ-৿]/.test(text)) return 'bn';
    var padded = ' ' + normalize(text) + ' ';
    for (var i = 0; i < BANGLISH_WORDS.length; i++) {
      if (padded.indexOf(' ' + BANGLISH_WORDS[i] + ' ') !== -1) return 'bl';
    }
    // No clear signal (e.g. just "microscope"): stay in the language already in use
    var words = padded.trim().split(' ').length;
    return words <= 2 && previous ? previous : 'en';
  }

  function normalize(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9ঀ-৿]+/g, ' ').trim();
  }

  /* ---------- Intents: what the visitor is asking about ---------- */

  var INTENTS = [
    { id: 'greeting', kw: ['hi', 'hello', 'hey', 'salam', 'assalamu', 'assalamualaikum', 'good morning', 'good evening', 'হাই', 'হ্যালো', 'হেলো', 'সালাম', 'আসসালামু', 'নমস্কার'] },
    { id: 'thanks', kw: ['thanks', 'thank you', 'thank', 'thx', 'dhonnobad', 'donnobad', 'shukriya', 'ধন্যবাদ', 'শুকরিয়া'] },
    { id: 'bye', kw: ['bye', 'goodbye', 'see you', 'allah hafez', 'khoda hafez', 'biday', 'বিদায়', 'আল্লাহ হাফেজ', 'খোদা হাফেজ'] },
    { id: 'price', kw: ['price', 'prices', 'cost', 'quote', 'quotation', 'rate', 'how much', 'budget', 'dam', 'daam', 'dor', 'koto', 'kto', 'mullo', 'taka', 'দাম', 'দর', 'মূল্য', 'কত', 'টাকা', 'কোটেশন', 'কোটেশান'] },
    { id: 'address', kw: ['address', 'location', 'located', 'where', 'office', 'map', 'direction', 'showroom', 'thikana', 'kothay', 'kothai', 'ঠিকানা', 'কোথায়', 'অফিস', 'লোকেশন', 'ম্যাপ'] },
    { id: 'contact', kw: ['contact', 'phone', 'call', 'number', 'mobile', 'email', 'mail', 'whatsapp', 'reach', 'jogajog', 'jogajok', 'nombor', 'যোগাযোগ', 'ফোন', 'নাম্বার', 'নম্বর', 'মোবাইল', 'ইমেইল', 'মেইল', 'হোয়াটসঅ্যাপ', 'কল'] },
    { id: 'services', kw: ['service', 'services', 'servicing', 'install', 'installation', 'commission', 'commissioning', 'repair', 'maintenance', 'support', 'consultation', 'warranty', 'guarantee', 'sheba', 'seba', 'meramot', 'সেবা', 'সার্ভিস', 'সার্ভিসিং', 'ইনস্টলেশন', 'মেরামত', 'ওয়ারেন্টি', 'সাপোর্ট'] },
    { id: 'brands', kw: ['brand', 'brands', 'principal', 'principals', 'manufacturer', 'company er product', 'origin', 'country', 'ব্র্যান্ড', 'কোম্পানির', 'দেশ'] },
    { id: 'glassware', kw: ['glassware', 'glass', 'beaker', 'burette', 'flask', 'funnel', 'pipette', 'duran', 'pyrex', 'glassco', 'গ্লাসওয়্যার', 'বিকার', 'ফ্লাস্ক', 'ব্যুরেট', 'কাচের'] },
    { id: 'profile', kw: ['profile', 'pdf', 'catalog', 'catalogue', 'brochure', 'download', 'product list', 'প্রোফাইল', 'ক্যাটালগ', 'ডাউনলোড', 'পিডিএফ', 'তালিকা'] },
    { id: 'products', kw: ['product', 'products', 'equipment', 'instrument', 'instruments', 'machine', 'item', 'items', 'supply', 'sell', 'available', 'stock', 'jontro', 'jontropati', 'ki ki', 'পণ্য', 'প্রোডাক্ট', 'যন্ত্র', 'যন্ত্রপাতি', 'মেশিন', 'ইকুইপমেন্ট', 'কি কি', 'কী কী'] },
    { id: 'delivery', kw: ['delivery', 'deliver', 'shipping', 'ship', 'courier', 'outside dhaka', 'ডেলিভারি', 'কুরিয়ার', 'ঢাকার বাইরে', 'dhakar baire', 'pathaben', 'পাঠাবেন'] },
    { id: 'about', kw: ['about', 'who are you', 'company', 'science park', 'apnara ke', 'apnader somporke', 'সম্পর্কে', 'কারা', 'প্রতিষ্ঠান'] },
    { id: 'human', kw: ['human', 'agent', 'person', 'talk to someone', 'representative', 'manush', 'kotha bolte', 'মানুষ', 'কথা বলতে', 'প্রতিনিধি'] }
  ];

  // Extra names people use for products, including Bangla spellings
  var PRODUCT_ALIASES = {
    'ph-meter': ['ph meter', 'ph', 'পিএইচ'],
    'ultra-low-freezer': ['freezer', 'ultra low', 'ফ্রিজার'],
    'microdrop-spectrophotometer': ['microdrop', 'nanodrop', 'spectrophotometer', 'স্পেকট্রোফটোমিটার'],
    'pcr-machine': ['pcr', 'thermal cycler', 'পিসিআর'],
    'flame-photometer': ['flame photometer', 'photometer', 'ফটোমিটার'],
    'uv-visible-spectrophotometer': ['uv vis', 'uv visible', 'uv', 'spectrophotometer'],
    'microscope': ['microscope', 'মাইক্রোস্কোপ', 'অণুবীক্ষণ'],
    'muffle-furnace': ['muffle', 'furnace', 'ফার্নেস'],
    'forced-air-oven': ['forced air oven', 'oven', 'ওভেন'],
    'autoclave': ['autoclave', 'sterilizer', 'অটোক্লেভ'],
    'centrifuge': ['centrifuge', 'সেন্ট্রিফিউজ'],
    'distillation-apparatus': ['distillation', 'distiller', 'distilled water', 'ডিস্টিলেশন'],
    'flame-photometer-pfp7': ['pfp7', 'jenway'],
    'orbital-shaker': ['orbital shaker', 'shaker', 'শেকার'],
    'dr6000-hach-spectrophotometer': ['dr6000', 'hach'],
    'flake-ice-maker': ['ice maker', 'flake ice', 'ice machine', 'আইস'],
    'water-purifier': ['water purifier', 'purifier', 'water purification', 'পিউরিফায়ার'],
    'analytical-balance': ['analytical balance', 'balance', 'weighing', 'scale', 'ব্যালেন্স'],
    'shaking-incubator': ['shaking incubator'],
    'ultrasonic-cell-disruptor': ['cell disruptor', 'sonicator', 'ultrasonic processor'],
    'ultrasonic-cleaner': ['ultrasonic cleaner', 'ultrasonic bath'],
    'gel-documentation-system': ['gel doc', 'gel documentation'],
    'laminar-air-flow-cabinet': ['laminar', 'laminar flow', 'লামিনার'],
    'biosafety-cabinet': ['biosafety', 'bio safety', 'safety cabinet'],
    'atomic-absorption-spectrophotometer': ['atomic absorption', 'aas'],
    'ultrapure-water-system': ['ultrapure', 'ultra pure'],
    'fume-hood': ['fume hood', 'fume cupboard', 'ফিউম'],
    'hot-air-oven': ['hot air oven', 'oven'],
    'incubator': ['incubator', 'ইনকিউবেটর'],
    'hotplate-magnetic-stirrer': ['hotplate', 'hot plate', 'magnetic stirrer', 'stirrer', 'স্টিরার'],
    'water-bath': ['water bath', 'ওয়াটার বাথ'],
    'homogenizer': ['homogenizer', 'homogeniser'],
    'vortex-mixer': ['vortex'],
    'micropipette': ['micropipette', 'micro pipette', 'মাইক্রোপিপেট'],
    'colony-counter': ['colony counter'],
    'rotary-evaporator': ['rotary evaporator', 'rotavapor', 'rota evaporator'],
    'refractometer': ['refractometer', 'brix'],
    'melting-point-apparatus': ['melting point'],
    'dissolution-tester': ['dissolution'],
    'disintegration-tester': ['disintegration']
  };

  function contains(padded, raw, keyword) {
    // Bangla keywords: plain substring. Latin keywords: whole words only.
    if (/[ঀ-৿]/.test(keyword)) return raw.indexOf(keyword) !== -1;
    return padded.indexOf(' ' + keyword + ' ') !== -1 ||
      padded.indexOf(' ' + keyword + 's ') !== -1 ||
      padded.indexOf(' ' + keyword + 'es ') !== -1;
  }

  function findIntents(text) {
    var norm = normalize(text);
    var padded = ' ' + norm + ' ';
    var found = [];
    INTENTS.forEach(function (intent) {
      var score = 0;
      intent.kw.forEach(function (kw) {
        if (contains(padded, norm, kw)) score += kw.split(' ').length;
      });
      if (score) found.push({ id: intent.id, score: score });
    });
    found.sort(function (a, b) { return b.score - a.score; });
    return found.map(function (f) { return f.id; });
  }

  function findProducts(text) {
    var norm = normalize(text);
    var padded = ' ' + norm + ' ';
    var matches = [];
    PRODUCTS.forEach(function (p) {
      var names = [normalize(p.name)].concat(PRODUCT_ALIASES[p.slug] || []);
      var best = 0;
      names.forEach(function (name) {
        if (contains(padded, norm, name)) best = Math.max(best, name.length);
      });
      if (best) matches.push({ product: p, score: best });
    });
    matches.sort(function (a, b) { return b.score - a.score; });
    // Keep only the most specific matches ("uv spectrophotometer" should not list every spectrophotometer)
    var top = matches.length ? matches[0].score : 0;
    return matches.filter(function (m) { return m.score >= top - 2; }).slice(0, 4).map(function (m) { return m.product; });
  }

  /* ---------- Replies ---------- */

  function t(lang, en, bn, bl) { return lang === 'bn' ? bn : lang === 'bl' ? bl : en; }
  function link(href, label, external) {
    return '<a class="bot-link" href="' + href + '"' + (external ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' + label + '</a>';
  }
  function quoteHref(name) { return 'index.html?product=' + encodeURIComponent(name) + '#contact'; }

  var REPLIES = {
    welcome: function () {
      return 'Assalamu alaikum! I can answer quick questions about our products, prices, address and services.<br>' +
        'আপনি <b>বাংলা</b>, <b>English</b> বা <b>Banglish</b> — যেকোনো ভাবে লিখতে পারেন।';
    },
    greeting: function (l) {
      return t(l,
        'Hello! How can I help you today? You can ask about a product, a price, our address, or our services.',
        'আসসালামু আলাইকুম! কীভাবে সাহায্য করতে পারি? পণ্য, দাম, ঠিকানা বা সেবা নিয়ে জিজ্ঞেস করতে পারেন।',
        'Assalamu alaikum! Kivabe shahajjo korte pari? Product, dam, thikana ba service niye jiggesh korte paren.');
    },
    thanks: function (l) {
      return t(l, 'You\'re welcome! Ask me anything else, any time.', 'আপনাকেও ধন্যবাদ! আর কিছু জানার থাকলে জিজ্ঞেস করুন।', 'Apnakeo dhonnobad! Ar kichu janar thakle jiggesh korun.');
    },
    bye: function (l) {
      return t(l, 'Thank you for visiting Science Park Engineering. Goodbye!', 'সায়েন্স পার্ক ইঞ্জিনিয়ারিং-এ আসার জন্য ধন্যবাদ। আল্লাহ হাফেজ!', 'Science Park Engineering-e ashar jonno dhonnobad. Allah hafez!');
    },
    price: function (l) {
      return t(l,
        'Prices depend on the model, brand and specification, so we quote each request individually. Tell us the item and quantity and we will reply with a price — usually within one business day.',
        'দাম মডেল, ব্র্যান্ড ও স্পেসিফিকেশনের উপর নির্ভর করে, তাই আমরা প্রতিটি অনুরোধের জন্য আলাদা কোটেশন দিই। কোন পণ্য ও কতটি লাগবে জানালে আমরা দাম জানিয়ে দেব — সাধারণত এক কর্মদিবসের মধ্যে।',
        'Dam model, brand ar specification-er upor nirbhor kore, tai amra protita request-er jonno alada quotation dei. Kon product ar koyta lagbe janale amra dam janiye dibo — shadharonoto ek kormodibosh-er moddhe.') +
        '<br>' + link('index.html#contact', t(l, 'Request a quote', 'কোটেশন চান', 'Quotation chan')) + ' · ' + link(WHATSAPP, 'WhatsApp', true);
    },
    address: function (l) {
      return t(l, '<b>Corporate office:</b>', '<b>কর্পোরেট অফিস:</b>', '<b>Corporate office:</b>') +
        ' 10, Kader Tropical Heights, G-23/C, Tikatuli, Hathkhola, Dhaka-1203<br>' +
        t(l, '<b>Registered address:</b>', '<b>রেজিস্টার্ড ঠিকানা:</b>', '<b>Registered thikana:</b>') +
        ' 14, Kakrail, 3rd floor, Room No: 06, Dhaka-1000<br>' +
        link('https://www.google.com/maps/search/?api=1&query=Kader+Tropical+Heights,+Tikatuli,+Hathkhola,+Dhaka+1203', t(l, 'Open in Google Maps', 'গুগল ম্যাপে দেখুন', 'Google Maps-e dekhun'), true);
    },
    contact: function (l) {
      return t(l, 'You can reach us here:', 'আমাদের সাথে যোগাযোগ করুন:', 'Amader shathe jogajog korun:') + '<br>' +
        t(l, 'Phone', 'ফোন', 'Phone') + ': ' + link('tel:+8801864226212', '01864-226212') + ', ' + link('tel:+8801922406225', '01922-406225') + '<br>' +
        'WhatsApp: ' + link(WHATSAPP, '01864-226212', true) + '<br>' +
        t(l, 'Email', 'ইমেইল', 'Email') + ': ' + link('mailto:scienceparkengineering18@gmail.com', 'scienceparkengineering18@gmail.com');
    },
    services: function (l) {
      return t(l,
        'We provide six services: <b>supply</b>, <b>installation</b>, <b>commissioning</b>, <b>servicing</b>, <b>consultation</b> and ongoing <b>support</b>. Warranty terms depend on the product and brand — please ask us about the item you need.',
        'আমরা ছয়টি সেবা দিই: <b>সরবরাহ</b>, <b>ইনস্টলেশন</b>, <b>কমিশনিং</b>, <b>সার্ভিসিং</b>, <b>পরামর্শ</b> এবং নিয়মিত <b>সাপোর্ট</b>। ওয়ারেন্টি পণ্য ও ব্র্যান্ডের উপর নির্ভর করে — আপনার দরকারি পণ্যটির কথা জানালে আমরা বিস্তারিত জানাব।',
        'Amra chhoyti sheba dei: <b>supply</b>, <b>installation</b>, <b>commissioning</b>, <b>servicing</b>, <b>consultation</b> ar niyomito <b>support</b>. Warranty product ar brand-er upor nirbhor kore — apnar dorkari product-er kotha janale amra bistarito janabo.') +
        '<br>' + link('index.html#services', t(l, 'See our services', 'সেবাগুলো দেখুন', 'Sheba-gulo dekhun'));
    },
    brands: function (l) {
      return t(l,
        'We work with brands such as Radwag, Ohaus, DLAB, Optika, Scilogex, JSR, Nabertherm, HiMedia, Takara and more — sourced from Germany, USA, Spain, Poland, Japan, Korea, India and China.',
        'আমরা Radwag, Ohaus, DLAB, Optika, Scilogex, JSR, Nabertherm, HiMedia, Takara সহ আরও অনেক ব্র্যান্ডের পণ্য সরবরাহ করি — জার্মানি, যুক্তরাষ্ট্র, স্পেন, পোল্যান্ড, জাপান, কোরিয়া, ভারত ও চীন থেকে।',
        'Amra Radwag, Ohaus, DLAB, Optika, Scilogex, JSR, Nabertherm, HiMedia, Takara shoho aro onek brand-er product supply kori — Germany, USA, Spain, Poland, Japan, Korea, India ar China theke.') +
        '<br>' + link('index.html#brands', t(l, 'See all brands', 'সব ব্র্যান্ড দেখুন', 'Shob brand dekhun'));
    },
    glassware: function (l) {
      return t(l,
        'Yes — we supply laboratory glassware from <b>Duran</b>, <b>Pyrex</b> and <b>Glassco</b>: beakers, burettes, conical flasks, Büchner funnels, BOD bottles, chromatography columns and more, in all common sizes.',
        'জি, আমরা <b>Duran</b>, <b>Pyrex</b> ও <b>Glassco</b> ব্র্যান্ডের ল্যাবরেটরি গ্লাসওয়্যার সরবরাহ করি: বিকার, ব্যুরেট, কনিক্যাল ফ্লাস্ক, বুখনার ফানেল, BOD বোতল, ক্রোমাটোগ্রাফি কলাম ইত্যাদি — সব প্রচলিত সাইজে।',
        'Ji, amra <b>Duran</b>, <b>Pyrex</b> ar <b>Glassco</b> brand-er laboratory glassware supply kori: beaker, burette, conical flask, Buchner funnel, BOD bottle, chromatography column ityadi — shob procholito size-e.') +
        '<br>' + link('product-line.html#glassware', t(l, 'See the glassware list', 'গ্লাসওয়্যারের তালিকা দেখুন', 'Glassware-er talika dekhun'));
    },
    profile: function (l) {
      return t(l,
        'You can download our company profile and product list as a PDF (16 pages).',
        'আমাদের কোম্পানি প্রোফাইল ও পণ্যের তালিকা PDF আকারে (১৬ পৃষ্ঠা) ডাউনলোড করতে পারেন।',
        'Amader company profile ar product list PDF hishebe (16 page) download korte paren.') +
        '<br><a class="bot-link" href="' + PDF + '" download="Science-Park-Engineering-Company-Profile.pdf">' + t(l, 'Download PDF', 'PDF ডাউনলোড করুন', 'PDF download korun') + '</a>';
    },
    products: function (l) {
      return t(l,
        'We supply more than 140 kinds of laboratory equipment plus a full range of glassware — analytical instruments, life-science equipment, ovens and autoclaves, water systems, safety cabinets, and pharmaceutical testers. Type a product name (for example <i>microscope</i>) and I will find it for you.',
        'আমরা ১৪০টিরও বেশি ধরনের ল্যাবরেটরি যন্ত্রপাতি এবং সব ধরনের গ্লাসওয়্যার সরবরাহ করি — অ্যানালিটিক্যাল ইনস্ট্রুমেন্ট, লাইফ সায়েন্স ইকুইপমেন্ট, ওভেন ও অটোক্লেভ, ওয়াটার সিস্টেম, সেফটি ক্যাবিনেট এবং ফার্মাসিউটিক্যাল টেস্টার। যেকোনো পণ্যের নাম লিখুন (যেমন <i>microscope</i>), আমি খুঁজে দেব।',
        'Amra 140-er beshi dhoroner laboratory equipment ar shob dhoroner glassware supply kori — analytical instrument, life science equipment, oven ar autoclave, water system, safety cabinet ar pharmaceutical tester. Jekono product-er naam likhun (jemon <i>microscope</i>), ami khuje dibo.') +
        '<br>' + link('products.html', t(l, 'Products with photos', 'ছবিসহ পণ্য', 'Chhobi shoho product')) + ' · ' + link('product-line.html', t(l, 'Full product line', 'সম্পূর্ণ তালিকা', 'Puro talika'));
    },
    delivery: function (l) {
      return t(l,
        'Delivery and installation arrangements depend on the item and your location. Please share what you need and where, and our team will confirm the details.',
        'ডেলিভারি ও ইনস্টলেশনের ব্যবস্থা পণ্য ও আপনার অবস্থানের উপর নির্ভর করে। কী লাগবে এবং কোথায় — জানালে আমাদের টিম বিস্তারিত নিশ্চিত করবে।',
        'Delivery ar installation-er bebostha product ar apnar location-er upor nirbhor kore. Ki lagbe ar kothay — janale amader team bistarito nishchit korbe.') +
        '<br>' + link('index.html#contact', t(l, 'Send us a message', 'আমাদের মেসেজ দিন', 'Amader message din')) + ' · ' + link(WHATSAPP, 'WhatsApp', true);
    },
    about: function (l) {
      return t(l,
        'Science Park Engineering is a provider, importer and supplier of laboratory equipment in Bangladesh. We serve pharmaceuticals, education, research, textiles and industrial quality control with instruments, chemicals, reagents and consumables.',
        'সায়েন্স পার্ক ইঞ্জিনিয়ারিং বাংলাদেশে ল্যাবরেটরি যন্ত্রপাতির আমদানিকারক ও সরবরাহকারী প্রতিষ্ঠান। আমরা ফার্মাসিউটিক্যালস, শিক্ষা, গবেষণা, টেক্সটাইল ও ইন্ডাস্ট্রিয়াল কোয়ালিটি কন্ট্রোল খাতে যন্ত্রপাতি, কেমিক্যাল, রিএজেন্ট ও কনজিউমেবলস সরবরাহ করি।',
        'Science Park Engineering Bangladesh-e laboratory equipment-er importer ar supplier. Amra pharmaceuticals, shikkha, gobeshona, textile ar industrial quality control khat-e instrument, chemical, reagent ar consumables supply kori.') +
        '<br>' + link('index.html#about', t(l, 'More about us', 'আমাদের সম্পর্কে আরও', 'Amader shomporke aro'));
    },
    human: function (l) {
      return t(l,
        'Of course — you can talk to our team directly:',
        'অবশ্যই — আমাদের টিমের সাথে সরাসরি কথা বলতে পারেন:',
        'Obosshoi — amader team-er shathe shorashori kotha bolte paren:') +
        '<br>' + link('tel:+8801864226212', t(l, 'Call 01864-226212', 'কল করুন 01864-226212', 'Call korun 01864-226212')) + ' · ' + link(WHATSAPP, 'WhatsApp', true);
    },
    product: function (l, products, wantsPrice) {
      var intro = products.length === 1
        ? t(l, 'Yes, we supply this:', 'জি, এটি আমরা সরবরাহ করি:', 'Ji, eta amra supply kori:')
        : t(l, 'Here is what I found:', 'আমি এগুলো পেয়েছি:', 'Ami egulo peyechi:');
      var list = products.map(function (p) {
        return '<span class="bot-product"><img src="' + p.img + '" alt="" loading="lazy"><span><b>' + p.name + '</b><br>' +
          link('products.html#' + p.slug, t(l, 'View details', 'বিস্তারিত দেখুন', 'Bistarito dekhun')) + ' · ' +
          link(quoteHref(p.name), t(l, 'Get a quote', 'কোটেশন চান', 'Quotation chan')) + '</span></span>';
      }).join('');
      var price = wantsPrice ? '<br>' + t(l,
        'The price depends on the model and specification — send a quote request and we will reply with it.',
        'দাম মডেল ও স্পেসিফিকেশনের উপর নির্ভর করে — কোটেশনের অনুরোধ পাঠালে আমরা দাম জানিয়ে দেব।',
        'Dam model ar specification-er upor nirbhor kore — quotation request pathale amra dam janiye dibo.') : '';
      return intro + list + price;
    },
    fallback: function (l) {
      return t(l,
        'Sorry, I did not understand that. I can help with products, prices, our address, contact details and services — or you can talk to our team directly.',
        'দুঃখিত, বুঝতে পারিনি। আমি পণ্য, দাম, ঠিকানা, যোগাযোগ ও সেবা নিয়ে সাহায্য করতে পারি — অথবা সরাসরি আমাদের টিমের সাথে কথা বলতে পারেন।',
        'Dukkhito, bujhte parini. Ami product, dam, thikana, jogajog ar service niye shahajjo korte pari — othoba shorashori amader team-er shathe kotha bolte paren.') +
        '<br>' + link(WHATSAPP, 'WhatsApp', true) + ' · ' + link('tel:+8801864226212', '01864-226212') + ' · ' + link('product-line.html', t(l, 'Full product line', 'সম্পূর্ণ তালিকা', 'Puro talika'));
    }
  };

  var CHIPS = [
    { ask: { en: 'What products do you have?', bn: 'আপনাদের কী কী পণ্য আছে?', bl: 'Apnader ki ki product ache?' }, label: { en: 'Products', bn: 'পণ্য', bl: 'Product' } },
    { ask: { en: 'How do I get a price?', bn: 'দাম কীভাবে জানব?', bl: 'Dam kivabe janbo?' }, label: { en: 'Prices', bn: 'দাম', bl: 'Dam' } },
    { ask: { en: 'Where is your office?', bn: 'আপনাদের অফিস কোথায়?', bl: 'Apnader office kothay?' }, label: { en: 'Address', bn: 'ঠিকানা', bl: 'Thikana' } },
    { ask: { en: 'How can I contact you?', bn: 'কীভাবে যোগাযোগ করব?', bl: 'Kivabe jogajog korbo?' }, label: { en: 'Contact', bn: 'যোগাযোগ', bl: 'Jogajog' } },
    { ask: { en: 'What services do you offer?', bn: 'আপনারা কী কী সেবা দেন?', bl: 'Apnara ki ki sheba den?' }, label: { en: 'Services', bn: 'সেবা', bl: 'Sheba' } },
    { ask: { en: 'Download company profile', bn: 'কোম্পানি প্রোফাইল ডাউনলোড', bl: 'Company profile download' }, label: { en: 'Profile PDF', bn: 'প্রোফাইল PDF', bl: 'Profile PDF' } }
  ];

  function answer(text, lang) {
    var intents = findIntents(text);
    var products = findProducts(text);
    var wantsPrice = intents.indexOf('price') !== -1;

    if (products.length) return REPLIES.product(lang, products, wantsPrice);
    // Small talk only wins when nothing more specific was asked
    var specific = intents.filter(function (id) { return ['greeting', 'thanks', 'bye'].indexOf(id) === -1; });
    // "products" is the broadest topic, so any narrower one mentioned alongside it wins
    var narrow = specific.filter(function (id) { return id !== 'products'; });
    var id = narrow[0] || specific[0] || intents[0];
    return id ? REPLIES[id](lang) : REPLIES.fallback(lang);
  }

  /* ---------- Widget ---------- */

  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html != null) node.innerHTML = html;
    return node;
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var state = { open: false, lang: 'en', log: [] };
  try {
    var saved = JSON.parse(sessionStorage.getItem(STORE_KEY));
    if (saved && Array.isArray(saved.log)) state = saved;
  } catch (e) { /* storage unavailable: start fresh */ }
  function save() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  var launcher = el('button', 'bot-launcher', '<i class="bi bi-chat-dots" aria-hidden="true"></i><span>Help</span>');
  launcher.type = 'button';
  launcher.setAttribute('aria-label', 'Open help chat');
  launcher.setAttribute('aria-expanded', 'false');

  var panel = el('section', 'bot-panel');
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Science Park Engineering help chat');
  panel.setAttribute('data-lenis-prevent', '');
  panel.hidden = true;
  panel.innerHTML =
    '<header class="bot-head">' +
      '<span class="bot-head__avatar"><img src="assets/img/logo%20(2).png" alt=""></span>' +
      '<span class="bot-head__text"><b>SPE Help</b><small>বাংলা · English · Banglish</small></span>' +
      '<button type="button" class="bot-head__btn" data-bot-reset aria-label="Start over" title="Start over"><i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i></button>' +
      '<button type="button" class="bot-head__btn" data-bot-close aria-label="Close chat"><i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
    '</header>' +
    '<div class="bot-log" role="log" aria-live="polite"></div>' +
    '<div class="bot-chips"></div>' +
    '<form class="bot-form">' +
      '<label class="sr-only" for="bot-input">Your message</label>' +
      '<input id="bot-input" type="text" autocomplete="off" maxlength="300" placeholder="Type a message… / মেসেজ লিখুন…">' +
      '<button type="submit" aria-label="Send"><i class="bi bi-send-fill" aria-hidden="true"></i></button>' +
    '</form>' +
    '<p class="bot-note">Automated answers — for anything else, call or WhatsApp us.</p>';

  document.body.appendChild(launcher);
  document.body.appendChild(panel);

  var log = panel.querySelector('.bot-log');
  var chips = panel.querySelector('.bot-chips');
  var form = panel.querySelector('.bot-form');
  var input = panel.querySelector('#bot-input');

  function bubble(from, html) {
    var row = el('div', 'bot-msg bot-msg--' + from, html);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
    return row;
  }
  function renderChips() {
    chips.innerHTML = '';
    CHIPS.forEach(function (chip) {
      var button = el('button', 'bot-chip', chip.label[state.lang]);
      button.type = 'button';
      button.addEventListener('click', function () { send(chip.ask[state.lang]); });
      chips.appendChild(button);
    });
  }
  function say(from, html) {
    state.log.push({ from: from, html: html });
    if (state.log.length > 40) state.log.shift();
    save();
    return bubble(from, html);
  }

  function send(text) {
    text = String(text).trim();
    if (!text) return;
    state.lang = detectLanguage(text, state.lang);
    say('user', escapeHtml(text));
    renderChips();

    var typing = bubble('bot', '<span class="bot-typing"><i></i><i></i><i></i></span>');
    var reply = answer(text, state.lang);
    setTimeout(function () {
      typing.remove();
      say('bot', reply);
    }, 450);
  }

  function setOpen(open) {
    state.open = open;
    panel.hidden = !open;
    launcher.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.documentElement.classList.toggle('bot-open', open);
    if (typeof pauseNudges === 'function') {
      if (open) pauseNudges();
      else scheduleNudge(NUDGE_EVERY);
    }
    save();
    if (open) {
      if (!state.log.length) say('bot', REPLIES.welcome());
      log.scrollTop = log.scrollHeight;
      if (window.matchMedia('(min-width: 641px)').matches) input.focus();
    }
  }

  function reset() {
    state.log = [];
    state.lang = 'en';
    log.innerHTML = '';
    say('bot', REPLIES.welcome());
    renderChips();
  }

  launcher.addEventListener('click', function () { setOpen(!state.open); });
  panel.querySelector('[data-bot-close]').addEventListener('click', function () { setOpen(false); launcher.focus(); });
  panel.querySelector('[data-bot-reset]').addEventListener('click', reset);
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    send(input.value);
    input.value = '';
  });
  panel.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setOpen(false); launcher.focus(); }
  });

  /* ---------- Occasional nudge beside the launcher ---------- */

  var NUDGES = [
    'Need help finding a product? Ask me.',
    'দাম বা ঠিকানা জানতে চান? আমাকে জিজ্ঞেস করুন।',
    'Kono product khujchen? Ami shahajjo korte pari.',
    'You can write in বাংলা, English or Banglish.'
  ];
  var NUDGE_FIRST = 8000;    // first nudge after 8 s
  var NUDGE_EVERY = 45000;   // then every 45 s
  var NUDGE_SHOW = 7000;     // each stays for 7 s
  var NUDGE_MAX = 4;         // per page view

  var nudge = el('div', 'bot-nudge');
  nudge.hidden = true;
  nudge.innerHTML = '<button type="button" class="bot-nudge__text"></button>' +
    '<button type="button" class="bot-nudge__close" aria-label="Dismiss"><i class="bi bi-x" aria-hidden="true"></i></button>';
  document.body.appendChild(nudge);
  var nudgeText = nudge.querySelector('.bot-nudge__text');
  var nudgeTimer = null;
  var nudgeHideTimer = null;

  function hideNudge() {
    clearTimeout(nudgeHideTimer);
    nudge.hidden = true;
  }
  var nudgeCount = 0;
  // Pause while the chat is open; they start again after it is closed
  function pauseNudges() {
    clearTimeout(nudgeTimer);
    hideNudge();
    launcher.classList.remove('has-badge');
  }
  function scheduleNudge(delay) {
    clearTimeout(nudgeTimer);
    if (!state.nudgesOff && nudgeCount < NUDGE_MAX) nudgeTimer = setTimeout(showNudge, delay);
  }
  // The visitor pressed ×: no more nudges for this visit
  function stopNudges() {
    pauseNudges();
    state.nudgesOff = true;
    save();
  }
  function showNudge() {
    if (state.open || state.nudgesOff || nudgeCount >= NUDGE_MAX) return;
    if (document.hidden) { scheduleNudge(NUDGE_EVERY); return; }
    nudgeText.textContent = NUDGES[nudgeCount % NUDGES.length];
    nudgeCount += 1;
    nudge.hidden = false;
    launcher.classList.add('has-badge');
    nudgeHideTimer = setTimeout(hideNudge, NUDGE_SHOW);
    scheduleNudge(NUDGE_EVERY);
  }
  nudgeText.addEventListener('click', function () { setOpen(true); });
  nudge.querySelector('.bot-nudge__close').addEventListener('click', stopNudges);
  if (!state.open) scheduleNudge(NUDGE_FIRST);

  // Restore an earlier conversation when moving between pages
  state.log.forEach(function (m) { bubble(m.from, m.html); });
  renderChips();
  if (state.open) setOpen(true);

  // Exposed for testing in the browser console: SPEBot.answer('microscope er dam koto')
  window.SPEBot = { answer: function (text) { return answer(text, detectLanguage(text, 'en')); }, detectLanguage: detectLanguage };
})();
