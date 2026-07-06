/**
 * Guess the language from a phrase you'd actually see on GeoGuessr — road signs,
 * shop fronts, street names, warnings. The answer is the language; `countries`
 * lists where it's spoken (some languages span several). No regional variants.
 * `note` focuses on how to tell a language apart from its look-alikes and the
 * country tell (diacritics, the local word for "street", etc). `group` drives
 * the sidebar filters so players can drill a subset.
 */
export type LanguageGroup =
  | "Romance"
  | "Germanic"
  | "Slavic (Latin)"
  | "Slavic (Cyrillic)"
  | "Other European"
  | "Middle East / South Asia"
  | "East / SE Asia"
  | "Caucasus";

export interface LanguageClue {
  language: string;
  group: LanguageGroup;
  countries: string[];
  phrases: string[];
  note: string;
}

export const LANGUAGES: LanguageClue[] = [
  // ---- Romance ----
  {
    language: "Spanish",
    group: "Romance",
    countries: ["Spain", "Mexico", "Argentina", "Colombia", "Chile", "Peru"],
    phrases: [
      "SALIDA", "CALLE MAYOR", "PROHIBIDO APARCAR", "PANADERÍA", "FARMACIA DE GUARDIA",
      "AYUNTAMIENTO", "CEDA EL PASO", "ABIERTO", "ESTACIÓN", "SE VENDE",
      "PELIGRO", "PLAZA DE ESPAÑA", "CERVECERÍA",
    ],
    note: "ñ and inverted ¡ ¿ are unique. 'Calle' = street. vs Portuguese: no ção/nh/lh; vs Italian: no doubled consonants.",
  },
  {
    language: "Portuguese",
    group: "Romance",
    countries: ["Portugal", "Brazil", "Angola", "Mozambique"],
    phrases: [
      "SAÍDA", "RUA DA LIBERDADE", "ESTACIONAMENTO PROIBIDO", "PADARIA", "FARMÁCIA",
      "CÂMARA MUNICIPAL", "PARE", "ABERTO", "ESTAÇÃO", "VENDE-SE",
      "PERIGO", "PEDESTRES", "TALHO",
    ],
    note: "ã õ ç and '-ção' endings; nh/lh digraphs. 'Rua' = street. vs Spanish: no ñ, has ~ tildes.",
  },
  {
    language: "French",
    group: "Romance",
    countries: ["France", "Belgium", "Switzerland", "Canada (Québec)", "Senegal"],
    phrases: [
      "SORTIE", "RUE DE LA PAIX", "STATIONNEMENT INTERDIT", "BOULANGERIE", "PHARMACIE",
      "MAIRIE", "CÉDEZ LE PASSAGE", "OUVERT", "GARE", "À VENDRE",
      "DANGER", "CENTRE-VILLE", "TABAC",
    ],
    note: "é è ê ç à, apostrophes (l'/d'). 'Rue' = street, 'Boulangerie'. Accents lean grave/circumflex, not tildes.",
  },
  {
    language: "Italian",
    group: "Romance",
    countries: ["Italy", "San Marino", "Switzerland (Ticino)"],
    phrases: [
      "USCITA", "VIA ROMA", "DIVIETO DI SOSTA", "PANIFICIO", "TABACCHERIA",
      "MUNICIPIO", "DARE PRECEDENZA", "APERTO", "STAZIONE", "VENDESI",
      "PERICOLO", "CENTRO", "MACELLERIA",
    ],
    note: "Doubled consonants (tt, zz, ll), '-zione' endings, 'Via' = street. Almost no accents except è à ò.",
  },
  {
    language: "Romanian",
    group: "Romance",
    countries: ["Romania", "Moldova"],
    phrases: [
      "IEȘIRE", "STRADA VICTORIEI", "PARCARE INTERZISĂ", "BRUTĂRIE", "FARMACIE",
      "PRIMĂRIA", "CEDEAZĂ TRECEREA", "DESCHIS", "GARĂ", "DE VÂNZARE",
      "PERICOL", "CENTRU", "MĂCELĂRIE",
    ],
    note: "ă â î ș ț (comma-below ș ț). Romance vocab with Slavic loanwords. 'Strada' = street.",
  },
  {
    language: "Catalan",
    group: "Romance",
    countries: ["Spain (Catalonia)", "Andorra"],
    phrases: [
      "SORTIDA", "CARRER MAJOR", "PROHIBIT APARCAR", "FORN DE PA", "FARMÀCIA",
      "AJUNTAMENT", "CEDIU EL PAS", "OBERT", "ESTACIÓ", "ES VEN",
      "PERILL", "PLAÇA", "CARNISSERIA",
    ],
    note: "Middle-dot l·l is unique, ç and grave accents. 'Carrer' = street, '-ció' endings. Looks between Spanish & French.",
  },

  // ---- Germanic ----
  {
    language: "German",
    group: "Germanic",
    countries: ["Germany", "Austria", "Switzerland"],
    phrases: [
      "AUSFAHRT", "HAUPTSTRASSE", "PARKEN VERBOTEN", "BÄCKEREI", "APOTHEKE",
      "RATHAUS", "VORFAHRT GEWÄHREN", "GEÖFFNET", "BAHNHOF", "ZU VERKAUFEN",
      "GEFAHR", "EINBAHNSTRASSE", "METZGEREI",
    ],
    note: "ä ö ü ß, very long compound words. '-straße/-strasse' = street. Switzerland drops ß for ss.",
  },
  {
    language: "Dutch",
    group: "Germanic",
    countries: ["Netherlands", "Belgium (Flanders)", "Suriname"],
    phrases: [
      "UITGANG", "HOOFDSTRAAT", "VERBODEN TE PARKEREN", "BAKKERIJ", "APOTHEEK",
      "GEMEENTEHUIS", "VOORRANG VERLENEN", "GEOPEND", "STATION", "TE KOOP",
      "GEVAAR", "EENRICHTINGSVERKEER", "SLAGERIJ",
    ],
    note: "Double vowels aa/ee/oo/uu, 'ij' digraph, '-straat' = street. Looks like German but no ß/umlauts.",
  },
  {
    language: "Swedish",
    group: "Germanic",
    countries: ["Sweden", "Finland (coastal)"],
    phrases: [
      "UTGÅNG", "STORGATAN", "PARKERING FÖRBJUDEN", "GÅGATA", "VÅRDCENTRAL",
      "STADSHUS", "LÄMNA FÖRETRÄDE", "ÖPPET", "CENTRALSTATION", "TILL SALU",
      "STÄNGT", "INFART FÖRBJUDEN", "KÖTTAFFÄR",
    ],
    note: "å ä ö. '-gatan/-vägen' = street. vs Danish/Norwegian: uses ä ö (not æ ø), and 'och'.",
  },
  {
    language: "Norwegian",
    group: "Germanic",
    countries: ["Norway"],
    phrases: [
      "UTGANG", "STORGATA", "INNKJØRING FORBUDT", "BAKERI", "KOMMUNEHUSET",
      "GLATT VEIBANE", "VIKEPLIKT", "ÅPENT", "SENTRALSTASJON", "TIL SALGS",
      "STENGT", "ALL STANS FORBUDT", "SLAKTERI",
    ],
    note: "æ ø å (like Danish). '-gata/-veien' = street. vs Danish: 'ikke' & harder spellings; vs Swedish: æ ø not ä ö.",
  },
  {
    language: "Danish",
    group: "Germanic",
    countries: ["Denmark"],
    phrases: [
      "UDGANG", "HOVEDGADE", "PARKERING FORBUDT", "BAGERI", "GÅGADE",
      "VEJARBEJDE", "HOLD TILBAGE", "ÅBEN", "HOVEDBANEGÅRD", "TIL SALG",
      "LUKKET", "INDKØRSEL FORBUDT", "SLAGTER",
    ],
    note: "æ ø å (like Norwegian). '-gade/-vej' = street. Soft consonants: 'gade' not 'gata', 'øl' beer.",
  },
  {
    language: "Icelandic",
    group: "Germanic",
    countries: ["Iceland"],
    phrases: [
      "ÚTGANGUR", "AUSTURSTRÆTI", "BÍLASTÆÐI BÖNNUÐ", "BAKARÍ", "APÓTEK",
      "RÁÐHÚS", "BIÐSKYLDA", "OPIÐ", "MIÐBÆR", "TIL SÖLU",
      "HÆTTA", "EINSTEFNA", "KJÖTBÚÐ",
    ],
    note: "þ (thorn) and ð (eth) are the giveaway — no other living language uses both. Accented vowels á é í ó ú.",
  },

  // ---- Slavic (Latin script) ----
  {
    language: "Polish",
    group: "Slavic (Latin)",
    countries: ["Poland"],
    phrases: [
      "WYJŚCIE", "SKLEP SPOŻYWCZY", "UWAGA — ROBOTY DROGOWE", "ul. Marszałkowska",
      "PIEKARNIA", "PRZEJŚCIE DLA PIESZYCH", "ZAKAZ WJAZDU", "APTEKA",
      "DWORZEC GŁÓWNY", "KAWIARNIA", "PARKING PŁATNY", "OTWARTE", "NIEBEZPIECZEŃSTWO",
    ],
    note: "Slashed ł is unique; ż ź ś ć ń ą ę. Clusters sz cz rz szcz. 'ulica/ul.' = street.",
  },
  {
    language: "Czech",
    group: "Slavic (Latin)",
    countries: ["Czechia"],
    phrases: [
      "NOUZOVÝ VÝCHOD", "HLAVNÍ ULICE", "ZÁKAZ PARKOVÁNÍ", "PEKÁRNA", "LÉKÁRNA",
      "RADNICE", "DEJ PŘEDNOST V JÍZDĚ", "OTEVŘENO", "NÁDRAŽÍ", "NA PRODEJ",
      "NEBEZPEČÍ", "ZÁKAZ VJEZDU", "ŘEZNICTVÍ",
    ],
    note: "ř is unique to Czech; háček (č š ž ě) + ring ů. 'ulice' = street. vs Slovak: no ä ô, has ř.",
  },
  {
    language: "Slovak",
    group: "Slavic (Latin)",
    countries: ["Slovakia"],
    phrases: [
      "NÚDZOVÝ VÝCHOD", "HLAVNÁ ULICA", "ZÁKAZ PARKOVANIA", "PEKÁREŇ", "LEKÁREŇ",
      "RADNICA", "DAJ PREDNOSŤ V JAZDE", "OTVORENÉ", "STANICA", "NA PREDAJ",
      "NEBEZPEČENSTVO", "ZÁKAZ VJAZDU", "MÄSIARSTVO",
    ],
    note: "ä ô ľ ĺ ŕ mark it as Slovak, not Czech. 'ulica' = street. Very close to Czech otherwise.",
  },
  {
    language: "Croatian",
    group: "Slavic (Latin)",
    countries: ["Croatia", "Bosnia and Herzegovina"],
    phrases: [
      "IZLAZ", "ZABRANJENO ZAUSTAVLJANJE", "ZABRANJENO PARKIRANJE", "PEKARNICA", "LJEKARNA",
      "GRADSKA VIJEĆNICA", "USTUPI PRVENSTVO", "OTVORENO", "KOLODVOR", "PRODAJE SE",
      "OPASNOST", "ZABRANJEN ULAZ", "MESNICA",
    ],
    note: "č ć ž š and crossed đ. 'ulica' = street. vs Slovenian: has ć and đ.",
  },
  {
    language: "Slovenian",
    group: "Slavic (Latin)",
    countries: ["Slovenia"],
    phrases: [
      "IZHOD", "GLAVNI TRG", "PARKIRANJE PREPOVEDANO", "PEKARNA", "LEKARNA",
      "MESTNA HIŠA", "PREDNOST", "ODPRTO", "ŽELEZNIŠKA POSTAJA", "NAPRODAJ",
      "NEVARNOST", "PREPOVEDAN VSTOP", "MESARIJA",
    ],
    note: "Only č š ž (no ć đ) — that's the tell vs Croatian. Lots of 'prepovedano'. 'ulica' = street.",
  },

  // ---- Slavic (Cyrillic) ----
  {
    language: "Russian",
    group: "Slavic (Cyrillic)",
    countries: ["Russia", "Belarus", "Kazakhstan", "Kyrgyzstan"],
    phrases: [
      "ВЫХОД", "ПЕШЕХОДНЫЙ ПЕРЕХОД", "ПАРКОВКА ЗАПРЕЩЕНА", "МЭРИЯ", "ОСТОРОЖНО",
      "ОТКРЫТО", "ЖЕЛЕЗНОДОРОЖНЫЙ ВОКЗАЛ", "ПРОДАЁТСЯ", "ОПАСНО", "ВЪЕЗД ЗАПРЕЩЁН",
      "ПРОДУКТЫ", "ОБЪЕЗД", "РЕМОНТ ДОРОГИ",
    ],
    note: "Has ы э ъ but NOT і ї є (Ukrainian) or ђ љ (Serbian). 'улица' = street, 'ВЫХОД' = exit.",
  },
  {
    language: "Ukrainian",
    group: "Slavic (Cyrillic)",
    countries: ["Ukraine"],
    phrases: [
      "ВИХІД", "ВУЛИЦЯ", "СТІЙ", "ЛІКАРНЯ", "ПАРКУВАННЯ ЗАБОРОНЕНО",
      "РАТУША", "ОБЕРЕЖНО", "ВІДЧИНЕНО", "ЗАЛІЗНИЧНИЙ ВОКЗАЛ", "ПРОДАЄТЬСЯ",
      "НЕБЕЗПЕЧНО", "В'ЇЗД ЗАБОРОНЕНО", "КРАМНИЦЯ",
    ],
    note: "Letters і ї є ґ and the apostrophe are unique vs Russian. 'вулиця' = street, 'ВИХІД' = exit.",
  },
  {
    language: "Bulgarian",
    group: "Slavic (Cyrillic)",
    countries: ["Bulgaria"],
    phrases: [
      "ИЗХОД", "ПЛОЩАД", "СПРИ", "ЗЪБОЛЕКАР", "ПАРКИРАНЕТО ЗАБРАНЕНО",
      "ОБЩИНА", "ВНИМАНИЕ", "РАБОТНО ВРЕМЕ", "ГАРА", "ПРОДАВА СЕ",
      "ОПАСНОСТ", "ВХОД ЗАБРАНЕН", "КНИЖАРНИЦА",
    ],
    note: "Cyrillic where ъ is a normal mid-word vowel (Държава). 'ГАРА' = station, 'ИЗХОД' = exit. No Serbian ј љ њ.",
  },
  {
    language: "Serbian",
    group: "Slavic (Cyrillic)",
    countries: ["Serbia", "Montenegro", "Bosnia and Herzegovina"],
    phrases: [
      "ИЗЛАЗ", "БУЛЕВАР ОСЛОБОЂЕЊА", "ПЕШАЧКИ ПРЕЛАЗ", "АПОТЕКА", "ЗАБРАЊЕНО ПАРКИРАЊЕ",
      "ОПШТИНА", "ПАЖЊА", "ОТВОРЕНО", "ЖЕЛЕЗНИЧКА СТАНИЦА", "ПРОДАЈЕ СЕ",
      "КЛИЗАВ КОЛОВОЗ", "ЗАБРАЊЕН УЛАЗ", "МЕСАРА",
    ],
    note: "Cyrillic with unique ј љ њ ћ ђ џ. 'улица' = street. Often mixed with Latin signage too.",
  },

  // ---- Other European ----
  {
    language: "Greek",
    group: "Other European",
    countries: ["Greece", "Cyprus"],
    phrases: [
      "ΕΞΟΔΟΣ", "ΟΔΟΣ", "ΣΤΑΜΑΤΑ", "ΦΑΡΜΑΚΕΙΟ", "ΑΠΑΓΟΡΕΥΕΤΑΙ Η ΣΤΑΘΜΕΥΣΗ",
      "ΔΗΜΑΡΧΕΙΟ", "ΠΡΟΣΟΧΗ", "ΑΝΟΙΚΤΟ", "ΣΤΑΘΜΟΣ", "ΠΩΛΕΙΤΑΙ",
      "ΚΙΝΔΥΝΟΣ", "ΑΠΑΓΟΡΕΥΕΤΑΙ Η ΕΙΣΟΔΟΣ", "ΑΡΤΟΠΟΙΕΙΟ",
    ],
    note: "Greek alphabet: Σ Δ Ω Φ Ψ Θ Ξ. 'ΟΔΟΣ' = street, 'ΕΞΟΔΟΣ' = exit. Unmistakable.",
  },
  {
    language: "Finnish",
    group: "Other European",
    countries: ["Finland"],
    phrases: [
      "ULOSKÄYNTI", "KATU", "PYSÄKÖINTI KIELLETTY", "LEIPOMO", "APTEEKKI",
      "KAUPUNGINTALO", "VÄISTÄMISVELVOLLISUUS", "AVOINNA", "RAUTATIEASEMA", "MYYTÄVÄNÄ",
      "VAARA", "AJO KIELLETTY", "LIHAKAUPPA",
    ],
    note: "ä ö and lots of doubled letters (kk, aa, ää), very long words. 'katu/tie' = street. No å in body text.",
  },
  {
    language: "Estonian",
    group: "Other European",
    countries: ["Estonia"],
    phrases: [
      "VÄLJAPÄÄS", "TÄNAV", "PARKIMINE KEELATUD", "PAGARIÄRI", "APTEEK",
      "RAEKODA", "ANNA TEED", "AVATUD", "RAUDTEEJAAM", "MÜÜA",
      "OHT", "SISSESÕIT KEELATUD", "LIHAPOOD",
    ],
    note: "õ ä ö ü — the õ is the tell vs Finnish. 'tänav' = street. Shorter words than Finnish.",
  },
  {
    language: "Hungarian",
    group: "Other European",
    countries: ["Hungary"],
    phrases: [
      "KIJÁRAT", "FŐ UTCA", "PARKOLNI TILOS", "PÉKSÉG", "GYÓGYSZERTÁR",
      "VÁROSHÁZA", "ELSŐBBSÉGADÁS KÖTELEZŐ", "NYITVA", "PÁLYAUDVAR", "ELADÓ",
      "VESZÉLY", "BEHAJTANI TILOS", "HENTES",
    ],
    note: "Double-acute ő ű are unique. Digraphs sz cs gy ny zs. 'utca' = street, 'TILOS' = forbidden.",
  },
  {
    language: "Turkish",
    group: "Other European",
    countries: ["Turkey", "Cyprus (North)"],
    phrases: [
      "ÇIKIŞ", "CADDE", "PARK YASAK", "FIRIN", "ECZANE",
      "BELEDİYE", "YOL VER", "AÇIK", "İSTASYON", "SATILIK",
      "TEHLİKE", "GİRİLMEZ", "KASAP",
    ],
    note: "Dotless ı and dotted İ are the giveaway; ş ç ğ ö ü. 'Sokak/Cadde' = street, 'YASAK' = forbidden.",
  },
  {
    language: "Albanian",
    group: "Other European",
    countries: ["Albania", "Kosovo", "North Macedonia"],
    phrases: [
      "DALJE", "RRUGA", "NDALOHET PARKIMI", "FURRË BUKE", "FARMACI",
      "BASHKIA", "JEP PËRPARËSI", "HAPUR", "STACIONI", "SHITET",
      "RREZIK", "NDALOHET HYRJA", "MISHTORE",
    ],
    note: "ë and ç with digraphs dh gj ll rr sh th xh zh. 'Rruga' = street, 'NDALOHET' = forbidden.",
  },
  {
    language: "Lithuanian",
    group: "Other European",
    countries: ["Lithuania"],
    phrases: [
      "IŠĖJIMAS", "GATVĖ", "STOVĖTI DRAUDŽIAMA", "KEPYKLA", "VAISTINĖ",
      "ROTUŠĖ", "DUOK KELIĄ", "ATIDARYTA", "GELEŽINKELIO STOTIS", "PARDUODAMA",
      "PAVOJUS", "ĮVAŽIAVIMAS DRAUDŽIAMAS", "MĖSINĖ",
    ],
    note: "Ogonek vowels ą ę į ų plus ū ė and č š ž. 'gatvė' = street, '-as/-is' endings everywhere.",
  },
  {
    language: "Latvian",
    group: "Other European",
    countries: ["Latvia"],
    phrases: [
      "IZEJA", "IELA", "STĀVĒT AIZLIEGTS", "MAIZNĪCA", "APTIEKA",
      "RĀTSNAMS", "DODIET CEĻU", "ATVĒRTS", "DZELZCEĻA STACIJA", "PĀRDOD",
      "BĪSTAMI", "IEBRAUKT AIZLIEGTS", "GAĻAS VEIKALS",
    ],
    note: "Macron vowels ā ē ī ū plus ķ ļ ņ ģ (comma-below). 'iela' = street, 'AIZLIEGTS' = forbidden.",
  },

  // ---- Middle East / South Asia ----
  {
    language: "Arabic",
    group: "Middle East / South Asia",
    countries: ["Saudi Arabia", "Egypt", "UAE", "Morocco", "Jordan", "Iraq"],
    phrases: [
      "الخروج", "شارع", "قف", "صيدلية", "ممنوع الوقوف",
      "بلدية", "انتبه", "مفتوح", "محطة", "للبيع",
      "طريق مغلق", "ممنوع الدخول", "مخبز",
    ],
    note: "Flowing connected cursive with dots above/below, right-to-left. No extra Persian letters پ چ ژ گ.",
  },
  {
    language: "Hebrew",
    group: "Middle East / South Asia",
    countries: ["Israel"],
    phrases: [
      "יציאה", "רחוב", "עצור", "בית מרקחת", "חניה אסורה",
      "עירייה", "זהירות", "פתוח", "תחנה", "למכירה",
      "סכנה", "אין כניסה", "מאפייה",
    ],
    note: "Blocky letters that sit on the baseline, right-to-left, no connecting cursive. 'רחוב' = street.",
  },
  {
    language: "Persian",
    group: "Middle East / South Asia",
    countries: ["Iran", "Afghanistan", "Tajikistan"],
    phrases: [
      "فروشگاه", "خیابان", "ایست", "داروخانه", "پارک ممنوع",
      "شهرداری", "احتیاط", "باز", "ایستگاه", "فروشی",
      "گذرگاه پیاده", "ورود ممنوع", "نانوایی",
    ],
    note: "Arabic script PLUS Persian-only letters پ چ ژ گ. 'خیابان' = street. Vocabulary differs from Arabic.",
  },
  {
    language: "Hindi",
    group: "Middle East / South Asia",
    countries: ["India", "Nepal"],
    phrases: [
      "निकास", "सड़क", "रुको", "दवाई की दुकान", "पार्किंग निषेध",
      "नगर पालिका", "सावधान", "खुला", "स्टेशन", "बिक्री हेतु",
      "खतरा", "प्रवेश निषेध", "बेकरी",
    ],
    note: "Devanagari: horizontal top bar connecting letters. 'सड़क' = road. Same script as Nepali/Marathi.",
  },
  {
    language: "Bengali",
    group: "Middle East / South Asia",
    countries: ["Bangladesh", "India (West Bengal)"],
    phrases: [
      "প্রস্থান", "রাস্তা", "থামুন", "ফার্মেসি", "পার্কিং নিষেধ",
      "পৌরসভা", "সতর্ক", "খোলা", "স্টেশন", "বিক্রয়",
      "বিপদ", "প্রবেশ নিষেধ", "বেকারি",
    ],
    note: "Top bar like Devanagari but more curved/triangular forms. 'রাস্তা' = road.",
  },
  {
    language: "Tamil",
    group: "Middle East / South Asia",
    countries: ["India (Tamil Nadu)", "Sri Lanka", "Singapore"],
    phrases: [
      "வெளியேறு", "தெரு", "நிறுத்து", "மருந்தகம்", "நிறுத்துதல் தடை",
      "நகராட்சி", "எச்சரிக்கை", "திறந்துள்ளது", "நிலையம்", "விற்பனைக்கு",
      "ஆபத்து", "நுழைவு தடை", "பேக்கரி",
    ],
    note: "Rounded with loops and no top bar. 'தெரு' = street. South India, Sri Lanka, Singapore.",
  },
  {
    language: "Sinhala",
    group: "Middle East / South Asia",
    countries: ["Sri Lanka"],
    phrases: [
      "පිටවීම", "පාර", "නවතින්න", "ෆාමසිය", "වාහන නැවැත්වීම තහනම්",
      "නගර සභාව", "අවවාදයයි", "විවෘතයි", "ස්ථානය", "විකිණීමට",
      "අනතුර", "ඇතුල්වීම තහනම්", "බේකරිය",
    ],
    note: "Very round, ornate, curly letters. 'පාර' = road. Unique to Sri Lanka.",
  },

  // ---- East / Southeast Asia ----
  {
    language: "Japanese",
    group: "East / SE Asia",
    countries: ["Japan"],
    phrases: [
      "止まれ", "お手洗い", "きっぷうりば", "コンビニ", "ドラッグストア",
      "パン屋", "売り物件", "ようこそ", "立ち入り禁止", "駐車場あり",
      "ラーメン", "さくら通り", "たばこ",
    ],
    note: "Mix of kanji with hiragana (curvy) and katakana (angular). The kana mixed in = Japanese, not Chinese.",
  },
  {
    language: "Korean",
    group: "East / SE Asia",
    countries: ["South Korea", "North Korea"],
    phrases: [
      "출구", "입구", "정지", "약국", "주차금지",
      "시청", "주의", "영업중", "역", "매매",
      "위험", "진입금지", "빵집",
    ],
    note: "Hangul: square blocks built from circles (ㅇ) and lines. The rings are the tell.",
  },
  {
    language: "Chinese",
    group: "East / SE Asia",
    countries: ["China", "Taiwan", "Singapore"],
    phrases: [
      "药房", "禁止停车", "营业中", "车站", "危险",
      "禁止通行", "面包店", "请勿吸烟", "收银台", "医院",
      "儿童优先", "欢迎光临", "购物中心",
    ],
    note: "Dense square characters with NO kana mixed in → Chinese, not Japanese. Taiwan uses traditional forms.",
  },
  {
    language: "Thai",
    group: "East / SE Asia",
    countries: ["Thailand"],
    phrases: [
      "ทางออก", "ถนน", "หยุด", "ร้านขายยา", "ห้ามจอด",
      "เทศบาล", "ระวัง", "เปิด", "สถานี", "ขาย",
      "อันตราย", "ห้ามเข้า", "ร้านเบเกอรี่",
    ],
    note: "Loops and curls with tall spikes, no spaces between words. 'ถนน' = road.",
  },
  {
    language: "Lao",
    group: "East / SE Asia",
    countries: ["Laos"],
    phrases: [
      "ທາງອອກ", "ຖະໜົນ", "ຢຸດ", "ຮ້ານຂາຍຢາ", "ຫ້າມຈອດ",
      "ເທດສະບານ", "ລະວັງ", "ເປີດ", "ສະຖານີ", "ຂາຍ",
      "ອັນຕະລາຍ", "ຫ້າມເຂົ້າ", "ຮ້ານເບເກີຣີ",
    ],
    note: "Like Thai but rounder, simpler, fewer spikes. 'ຖະໜົນ' = road.",
  },
  {
    language: "Khmer",
    group: "East / SE Asia",
    countries: ["Cambodia"],
    phrases: [
      "ចេញ", "ផ្លូវ", "ឈប់", "ឱសថស្ថាន", "ហាមចត",
      "សាលាក្រុង", "ប្រយ័ត្ន", "បើក", "ស្ថានីយ៍", "លក់",
      "គ្រោះថ្នាក់", "ហាមចូល", "ហាងនំបុ័ង",
    ],
    note: "Tall, ornate, with lots of subscript curls hanging below. 'ផ្លូវ' = road. Unique to Cambodia.",
  },
  {
    language: "Vietnamese",
    group: "East / SE Asia",
    countries: ["Vietnam"],
    phrases: [
      "LỐI RA", "ĐƯỜNG", "DỪNG LẠI", "NHÀ THUỐC", "CẤM ĐỖ XE",
      "ỦY BAN NHÂN DÂN", "CHÚ Ý", "MỞ CỬA", "NHÀ GA", "BÁN",
      "NGUY HIỂM", "CẤM VÀO", "TIỆM BÁNH",
    ],
    note: "Latin with stacked tone marks and đ ơ ư ă â ê ô — dense diacritics. 'Đường' = road, 'CẤM' = forbidden.",
  },
  {
    language: "Indonesian",
    group: "East / SE Asia",
    countries: ["Indonesia", "Malaysia"],
    phrases: [
      "KELUAR", "JALAN", "BERHENTI", "PUSKESMAS", "DILARANG PARKIR",
      "KANTOR WALIKOTA", "AWAS", "BUKA", "STASIUN", "DIJUAL",
      "BAHAYA", "DILARANG MASUK", "TOKO ROTI",
    ],
    note: "Plain Latin, no diacritics. 'Jalan/Jl.' = street, 'DILARANG' = forbidden. Malay is near-identical.",
  },

  // ---- Caucasus ----
  {
    language: "Georgian",
    group: "Caucasus",
    countries: ["Georgia"],
    phrases: [
      "გასასვლელი", "ქუჩა", "გაჩერდი", "აფთიაქი", "გაჩერება აკრძალულია",
      "მერია", "ყურადღება", "ღიაა", "სადგური", "იყიდება",
      "საფრთხე", "შესვლა აკრძალულია", "საცხობი",
    ],
    note: "Rounded, looping, no capital letters. 'ქუჩა' = street. Its own alphabet, unique to Georgia.",
  },
  {
    language: "Armenian",
    group: "Caucasus",
    countries: ["Armenia"],
    phrases: [
      "ԵԼՔ", "ՓՈՂՈՑ", "ԿԱՆԳ", "ԴԵՂԱՏՈՒՆ", "ԿԱՅԱՆՈՒՄՆ ԱՐԳԵԼՎԱԾ Է",
      "ՔԱՂԱՔԱՊԵՏԱՐԱՆ", "ՈՒՇԱԴՐՈՒԹՅՈՒՆ", "ԲԱՑ Է", "ԿԱՅԱՐԱՆ", "ՎԱՃԱՌՎՈՒՄ Է",
      "ՎՏԱՆԳ", "ՄՈՒՏՔՆ ԱՐԳԵԼՎԱԾ Է", "ՀԱՑԱԲՈՒԼԿԵՂԵՆ",
    ],
    note: "Angular letters with hooks and right-angles. 'ՓՈՂՈՑ' = street. Its own alphabet, unique to Armenia.",
  },
];

/** Ordered, de-duplicated group list — the single source for the sidebar filters. */
export const LANGUAGE_GROUPS: LanguageGroup[] = [...new Set(LANGUAGES.map((l) => l.group))];
