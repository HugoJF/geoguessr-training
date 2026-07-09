/**
 * Guess the language from a phrase you'd actually see on GeoGuessr — road signs,
 * shop fronts, street names, warnings. The answer is the language; `countries`
 * lists where it's spoken (some languages span several). No regional variants.
 * `note` focuses on how to tell a language apart from its look-alikes and the
 * country tell (diacritics, the local word for "street", etc). `group` drives
 * the sidebar filters so players can drill a subset.
 *
 * The game shows ONE random phrase, so every phrase must be identifiable on its
 * own: each carries a letter/diacritic/digraph the language is known for (ł ż,
 * ő ű, ç ë, doubled consonants, ij, etc). Two languages have no exclusive
 * letter and instead rely on signature vocabulary — Slovenian (shares č š ž with
 * Croatian; leans on prepovedano/izhod/naprodaj) and Indonesian (plain Latin;
 * leans on dilarang/jalan).
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
      "DIRECCIÓN PROHIBIDA", "ESTACIÓN DE AUTOBUSES", "PLAZA DE ESPAÑA", "NIÑOS JUGANDO",
      "ÁREA DE DESCANSO", "PRECAUCIÓN: OBRAS", "SÓLO CARGA Y DESCARGA",
      "AVENIDA DE ANDALUCÍA", "ATENCIÓN AL TREN", "VÍA PÚBLICA",
      "PANADERÍA", "CARNICERÍA", "CERVECERÍA",
    ],
    note: "ñ and inverted ¡ ¿ are unique. 'Calle' = street. vs Portuguese: no ção/nh/lh; vs Italian: no doubled consonants.",
  },
  {
    language: "Portuguese",
    group: "Romance",
    countries: ["Portugal", "Brazil", "Angola", "Mozambique"],
    phrases: [
      "ESTAÇÃO DE COMBOIOS", "SAÍDA DE EMERGÊNCIA", "CÂMARA MUNICIPAL", "PASSAGEM DE PEÕES",
      "CIRCULAÇÃO PROIBIDA", "SENTIDO ÚNICO", "NÃO ESTACIONAR", "ATENÇÃO ÀS OBRAS",
      "INFORMAÇÕES", "PÃO QUENTE", "AÇOUGUE", "FARMÁCIA", "PENSÃO",
    ],
    note: "ã õ ç and '-ção' endings; nh/lh digraphs. 'Rua' = street. vs Spanish: no ñ, has ~ tildes.",
  },
  {
    language: "French",
    group: "Romance",
    countries: ["France", "Belgium", "Switzerland", "Canada (Québec)", "Senegal"],
    phrases: [
      "CÉDEZ LE PASSAGE", "PASSAGE PIÉTON", "DÉFENSE DE STATIONNER", "PRIORITÉ À DROITE",
      "DÉVIATION", "À VENDRE", "PROPRIÉTÉ PRIVÉE", "BOULANGERIE-PÂTISSERIE",
      "HÔTEL DE VILLE", "CHAUSSÉE DÉFORMÉE", "ARRÊT DE BUS", "PÉAGE", "RUE PIÉTONNE",
    ],
    note: "é è ê ç à, apostrophes (l'/d'). 'Rue' = street, 'Boulangerie'. Accents lean grave/circumflex, not tildes.",
  },
  {
    language: "Italian",
    group: "Romance",
    countries: ["Italy", "San Marino", "Switzerland (Ticino)"],
    phrases: [
      "USCITA DI SICUREZZA", "ATTRAVERSAMENTO PEDONALE", "ZONA TRAFFICO LIMITATO",
      "PARCHEGGIO VIETATO", "STRADA DISSESTATA", "CADUTA MASSI", "STAZIONE FERROVIARIA",
      "FERMATA DELL'AUTOBUS", "MACELLERIA", "PASTICCERIA", "BIGLIETTERIA",
      "TABACCHERIA", "SOCCORSO PUBBLICO",
    ],
    note: "Doubled consonants (tt, zz, ll), '-zione' endings, 'Via' = street. Almost no accents except è à ò.",
  },
  {
    language: "Romanian",
    group: "Romance",
    countries: ["Romania", "Moldova"],
    phrases: [
      "PARCARE INTERZISĂ", "CEDEAZĂ TRECEREA", "IEȘIRE DE URGENȚĂ", "INTRAREA INTERZISĂ",
      "STRADĂ ÎNCHISĂ", "DRUM ÎN LUCRU", "ȘCOALĂ", "DE VÂNZARE",
      "FARMACIE DESCHISĂ", "GARĂ", "PRIMĂRIA", "BRUTĂRIE", "MĂCELĂRIE",
    ],
    note: "ă â î ș ț (comma-below ș ț). Romance vocab with Slavic loanwords. 'Strada' = street.",
  },
  {
    language: "Catalan",
    group: "Romance",
    countries: ["Spain (Catalonia)", "Andorra"],
    phrases: [
      "SORTIDA D'EMERGÈNCIA", "PLAÇA DE CATALUNYA", "ESTACIÓ DE TREN", "DIRECCIÓ PROHIBIDA",
      "ATENCIÓ AL TREN", "INFORMACIÓ", "PARADA D'AUTOBÚS", "HORARI D'ATENCIÓ",
      "PLAÇA MAJOR", "AVINGUDA DE FRANÇA", "FARMÀCIA", "ESGLÉSIA", "ESTACIÓ D'AUTOBUSOS",
    ],
    note: "Middle-dot l·l is unique, ç and grave accents. 'Carrer' = street, '-ció' endings. Looks between Spanish & French.",
  },

  // ---- Germanic ----
  {
    language: "German",
    group: "Germanic",
    countries: ["Germany", "Austria", "Switzerland"],
    phrases: [
      "VORFAHRT GEWÄHREN", "FUßGÄNGERZONE", "EINBAHNSTRAßE", "HAUPTSTRAßE",
      "FUßGÄNGERÜBERWEG", "GEÖFFNET", "STRAßENBAHN", "ÜBERHOLEN VERBOTEN",
      "NÄCHSTE AUSFAHRT", "BÄCKEREI", "MÜLLABFUHR", "GESCHÄFT ZU VERMIETEN", "GRÜNER PFEIL",
    ],
    note: "ä ö ü ß, very long compound words. '-straße/-strasse' = street. Switzerland drops ß for ss.",
  },
  {
    language: "Dutch",
    group: "Germanic",
    countries: ["Netherlands", "Belgium (Flanders)", "Suriname"],
    phrases: [
      "HOOFDSTRAAT", "DOODLOPENDE WEG", "VOORRANG VERLENEN", "NOODUITGANG",
      "OPENBAAR VERVOER", "EENRICHTINGSVERKEER", "INRIT VRIJHOUDEN", "TE KOOP",
      "WEGWERKZAAMHEDEN", "CENTRAAL STATION", "GEMEENTEHUIS", "BAKKERIJ", "SLAGERIJ",
    ],
    note: "Double vowels aa/ee/oo/uu, 'ij' digraph, '-straat' = street. Looks like German but no ß/umlauts.",
  },
  {
    language: "Swedish",
    group: "Germanic",
    countries: ["Sweden", "Finland (coastal)"],
    phrases: [
      "PARKERING FÖRBJUDEN", "LÄMNA FÖRETRÄDE", "NÖDUTGÅNG", "GÅGATA",
      "INFART FÖRBJUDEN", "VÄGARBETE", "HÅLLPLATS", "AVSMALNANDE VÄG",
      "VÅRDCENTRAL", "ÖPPETTIDER", "KÖTTAFFÄR", "STÄNGT", "ÅTERVINNING",
    ],
    note: "å ä ö. '-gatan/-vägen' = street. vs Danish/Norwegian: uses ä ö (not æ ø), and 'och'.",
  },
  {
    language: "Norwegian",
    group: "Germanic",
    countries: ["Norway"],
    phrases: [
      "INNKJØRING FORBUDT", "ENVEISKJØRING", "GLATT KJØREBANE", "NØDUTGANG",
      "GÅGATE", "KJØRING FORBUDT", "MØLLERGATA", "RØDT LYS",
      "KJØPESENTER", "KJØTTBUTIKK", "ÅPNINGSTIDER", "SLUTT PÅ MOTORVEG", "GÅRDSPLASS",
    ],
    note: "æ ø å (like Danish). '-gata/-veien' = street. vs Danish: 'ikke' & harder spellings; vs Swedish: æ ø not ä ö.",
  },
  {
    language: "Danish",
    group: "Germanic",
    countries: ["Denmark"],
    phrases: [
      "INDKØRSEL FORBUDT", "NØDUDGANG", "GÅGADE", "FODGÆNGEROVERGANG",
      "HOVEDBANEGÅRD", "ÅBNINGSTIDER", "VEJEN ER SPÆRRET", "KØRSEL FORBUDT",
      "RØDT LYS", "KØBMAND", "KØDMARKED", "BRØDUDSALG", "FÆRDSEL FORBUDT",
    ],
    note: "æ ø å (like Norwegian). '-gade/-vej' = street. Soft consonants: 'gade' not 'gata', 'øl' beer.",
  },
  {
    language: "Icelandic",
    group: "Germanic",
    countries: ["Iceland"],
    phrases: [
      "AUSTURSTRÆTI", "BÍLASTÆÐI BÖNNUÐ", "BIÐSKYLDA", "NEYÐARÚTGANGUR",
      "GÖNGUGATA", "AKSTUR BANNAÐUR", "ÞJÓÐVEGUR", "TIL SÖLU",
      "MIÐBÆR", "RÁÐHÚS", "OPIÐ", "BAKARÍ", "KJÖTBÚÐ",
    ],
    note: "þ (thorn) and ð (eth) are the giveaway — no other living language uses both. Accented vowels á é í ó ú.",
  },

  // ---- Slavic (Latin script) ----
  {
    language: "Polish",
    group: "Slavic (Latin)",
    countries: ["Poland"],
    phrases: [
      "ul. Marszałkowska", "ZAKAZ ZATRZYMYWANIA SIĘ", "PRZEJŚCIE DLA PIESZYCH", "WYJŚCIE EWAKUACYJNE",
      "ŚLISKA JEZDNIA", "SKLEP SPOŻYWCZY", "PARKING PŁATNY", "DROGA ZAMKNIĘTA",
      "DWORZEC GŁÓWNY", "NA SPRZEDAŻ", "APTEKA CAŁODOBOWA", "ŚWIEŻE PIECZYWO", "NIEBEZPIECZEŃSTWO",
    ],
    note: "Slashed ł is unique; ż ź ś ć ń ą ę. Clusters sz cz rz szcz. 'ulica/ul.' = street.",
  },
  {
    language: "Czech",
    group: "Slavic (Latin)",
    countries: ["Czechia"],
    phrases: [
      "HLAVNÍ ULICE", "ZÁKAZ PARKOVÁNÍ", "DEJ PŘEDNOST V JÍZDĚ", "NOUZOVÝ VÝCHOD",
      "PŘECHOD PRO CHODCE", "MĚSTSKÝ ÚŘAD", "OBJÍŽĎKA", "PĚŠÍ ZÓNA",
      "NÁDRAŽÍ", "OTEVŘENO", "ZÁKAZ VJEZDU", "LÉKÁRNA", "ŘEZNICTVÍ",
    ],
    note: "ř is unique to Czech; háček (č š ž ě) + ring ů. 'ulice' = street. vs Slovak: no ä ô, has ř.",
  },
  {
    language: "Slovak",
    group: "Slavic (Latin)",
    countries: ["Slovakia"],
    phrases: [
      "HLAVNÁ ULICA", "ZÁKAZ PARKOVANIA", "DAJ PREDNOSŤ V JAZDE", "NÚDZOVÝ VÝCHOD",
      "ŠMYKĽAVÁ VOZOVKA", "ZÁKAZ VJAZDU", "JEDNOSMERNÁ PREMÁVKA", "ZÁKAZ ZASTAVENIA",
      "ŽELEZNIČNÁ STANICA", "MESTSKÝ ÚRAD", "PEKÁREŇ", "LEKÁREŇ", "MÄSIARSTVO",
    ],
    note: "ä ô ľ ĺ ŕ mark it as Slovak, not Czech. 'ulica' = street. Very close to Czech otherwise.",
  },
  {
    language: "Croatian",
    group: "Slavic (Latin)",
    countries: ["Croatia", "Bosnia and Herzegovina"],
    phrases: [
      "GRADSKA VIJEĆNICA", "OPĆINA", "VOĆE I POVRĆE", "CESTA S PREDNOŠĆU",
      "CVJEĆARNICA", "NAPLATNE KUĆICE", "SLASTIČARNICA", "ŽELJEZNIČKI KOLODVOR",
      "DEŽURNA LJEKARNA", "PJEŠAČKI PRIJELAZ", "IZLAZ U SLUČAJU OPASNOSTI",
      "PARKIRALIŠTE", "ZRAČNA LUKA",
    ],
    note: "č ć ž š and crossed đ. 'ulica' = street. vs Slovenian: has ć and đ.",
  },
  {
    language: "Slovenian",
    group: "Slavic (Latin)",
    countries: ["Slovenia"],
    phrases: [
      "PARKIRANJE PREPOVEDANO", "PARKIRIŠČE", "PREHOD ZA PEŠCE", "IZHOD V SILI",
      "VSTOP PREPOVEDAN", "ENOSMERNA CESTA", "NAPRODAJ", "ŽELEZNIŠKA POSTAJA",
      "MESTNA HIŠA", "OBČINA", "DELOVNI ČAS", "SLAŠČIČARNA", "NUJNI IZHOD",
    ],
    note: "Only č š ž (no ć đ) — that's the tell vs Croatian. Signature words: 'prepovedano' = forbidden, 'izhod' = exit, 'naprodaj' = for sale.",
  },

  // ---- Slavic (Cyrillic) ----
  {
    language: "Russian",
    group: "Slavic (Cyrillic)",
    countries: ["Russia", "Belarus", "Kazakhstan", "Kyrgyzstan"],
    phrases: [
      "ВЫХОД", "ПЕШЕХОДНЫЙ ПЕРЕХОД", "МЭРИЯ", "ОБЪЕЗД", "ОТКРЫТО",
      "ЖЕЛЕЗНОДОРОЖНЫЙ ВОКЗАЛ", "ПРОДАЁТСЯ", "ВЪЕЗД ЗАПРЕЩЁН", "ПРОДУКТЫ",
      "РЕМОНТНЫЕ РАБОТЫ", "ПОСТОРОННИМ ВХОД ВОСПРЕЩЁН", "ОБЪЕКТ ОХРАНЯЕТСЯ",
      "СТОЯНКА ЗАПРЕЩЕНА",
    ],
    note: "Has ы э ъ ё but NOT і ї є (Ukrainian) or ј љ њ ћ ђ (Serbian). '-ый/-ые' endings full of ы. 'улица' = street, 'ВЫХОД' = exit.",
  },
  {
    language: "Ukrainian",
    group: "Slavic (Cyrillic)",
    countries: ["Ukraine"],
    phrases: [
      "ВИХІД", "ПІШОХІДНИЙ ПЕРЕХІД", "СТІЙ", "ЛІКАРНЯ", "МІСЬКА РАДА",
      "ОБЕРЕЖНО, ДІТИ", "ВІДЧИНЕНО", "ЗАЛІЗНИЧНИЙ ВОКЗАЛ", "ПРОДАЄТЬСЯ",
      "В'ЇЗД ЗАБОРОНЕНО", "ОБ'ЇЗД", "ДОРОЖНІ РОБОТИ", "АПТЕКА ЦІЛОДОБОВО",
    ],
    note: "Letters і ї є ґ and the apostrophe (в'їзд) are unique vs Russian — і shows up constantly. 'вулиця' = street, 'ВИХІД' = exit.",
  },
  {
    language: "Bulgarian",
    group: "Slavic (Cyrillic)",
    countries: ["Bulgaria"],
    phrases: [
      "ИЗХОД", "ЗЪБОЛЕКАР", "ПЪТНИ РАБОТИ", "БЪЛГАРСКА ПОЩА", "ЦЕНТЪР НА ГРАДА",
      "ПАРКИРАНЕТО ЗАБРАНЕНО", "ОБЩИНА СОФИЯ", "ВНИМАНИЕ", "ЖП ГАРА", "ПРОДАВА СЕ",
      "РАБОТНО ВРЕМЕ", "ВХОД ЗАБРАНЕН", "КНИЖАРНИЦА",
    ],
    note: "Cyrillic where ъ is a normal mid-word vowel (Път, Център) and there's NO ы/э/і/ј. Definite article suffixes -ът/-та/-то. 'ГАРА' = station, 'ИЗХОД' = exit.",
  },
  {
    language: "Serbian",
    group: "Slavic (Cyrillic)",
    countries: ["Serbia", "Montenegro", "Bosnia and Herzegovina"],
    phrases: [
      "БУЛЕВАР ОСЛОБОЂЕЊА", "ЗАБРАЊЕНО ПАРКИРАЊЕ", "ЗАБРАЊЕНО ЗАУСТАВЉАЊЕ",
      "ЈЕДНОСМЕРНА УЛИЦА", "ЗАБРАЊЕН УЛАЗ", "ИЗЛАЗ ЗА СЛУЧАЈ ОПАСНОСТИ", "ПАЖЊА",
      "МЕЊАЧНИЦА", "ПРОДАЈЕ СЕ", "ОДРОН КАМЕЊА", "ВОЋЕ И ПОВРЋЕ",
      "СКРЕТАЊЕ УДЕСНО", "ГРАДСКА ОПШТИНА",
    ],
    note: "Cyrillic with unique ј љ њ ћ ђ џ — look for those (Russian/Bulgarian never have them). 'улица' = street. Often mixed with Latin signage too.",
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
      "PYSÄKÖINTI KIELLETTY", "VÄISTÄMISVELVOLLISUUS", "HÄTÄULOSKÄYNTI", "MYYTÄVÄNÄ",
      "KÄVELYKATU", "LÄPIAJO KIELLETTY", "TYÖMAA", "PYSÄKKI",
      "PÄIVYSTYS", "AVOINNA JOKA PÄIVÄ", "YÖAPTEEKKI", "PÄÄTIE", "LÄHIKAUPPA",
    ],
    note: "ä ö and lots of doubled letters (kk, aa, ää), very long words. 'katu/tie' = street. No å in body text.",
  },
  {
    language: "Estonian",
    group: "Other European",
    countries: ["Estonia"],
    phrases: [
      "SISSESÕIT KEELATUD", "SÕIDUPLAAN", "PÖÖRE KEELATUD", "VARUVÄLJAPÄÄS",
      "ÜHESUUNALINE TEE", "TEETÖÖD", "MÜÜA", "TÄNAV SULETUD",
      "VÄLJAPÄÄS", "TÖÖPÄEVAD", "ÖÖAPTEEK", "PAGARIÄRI", "ÜHISTRANSPORT",
    ],
    note: "õ ä ö ü — the õ is the tell vs Finnish. 'tänav' = street. Shorter words than Finnish.",
  },
  {
    language: "Hungarian",
    group: "Other European",
    countries: ["Hungary"],
    phrases: [
      "FŐ UTCA", "VÁRAKOZNI TILOS", "ELSŐBBSÉGADÁS KÖTELEZŐ", "VÉSZKIJÁRAT",
      "GYALOGÁTKELŐHELY", "KÖTELEZŐ HALADÁSI IRÁNY", "ZSÁKUTCA", "ELADÓ",
      "VASÚTÁLLOMÁS", "VÁROSHÁZA", "NYITVA", "PÉKSÉG", "GYÓGYSZERTÁR",
    ],
    note: "Double-acute ő ű are unique. Digraphs sz cs gy ny zs. 'utca' = street, 'TILOS' = forbidden.",
  },
  {
    language: "Turkish",
    group: "Other European",
    countries: ["Turkey", "Cyprus (North)"],
    phrases: [
      "PARK YASAĞI", "YOL YAPIM ÇALIŞMASI", "ACİL ÇIKIŞ", "YAYA GEÇİDİ",
      "TEK YÖN", "GİRİLMEZ", "DİKKAT", "SATILIK DAİRE",
      "İSTASYON", "BELEDİYE", "NÖBETÇİ ECZANE", "AÇIK", "ÇIKMAZ SOKAK",
    ],
    note: "Dotless ı and dotted İ are the giveaway; ş ç ğ ö ü. 'Sokak/Cadde' = street, 'YASAK' = forbidden.",
  },
  {
    language: "Albanian",
    group: "Other European",
    countries: ["Albania", "Kosovo", "North Macedonia"],
    phrases: [
      "RRUGA KRYESORE", "JEP PËRPARËSI", "DALJE EMERGJENCE", "VENDKALIM KËMBËSORËSH",
      "RRUGA E DIBRËS", "KUJDES, PUNIME NË RRUGË", "STACIONI I AUTOBUSËVE", "SHITET",
      "BASHKIA", "ORARI I PUNËS", "FURRË BUKE", "FARMACI 24 ORË", "MISH I FRESKËT",
    ],
    note: "ë and ç with digraphs dh gj ll rr sh th xh zh. 'Rruga' = street, 'NDALOHET' = forbidden.",
  },
  {
    language: "Lithuanian",
    group: "Other European",
    countries: ["Lithuania"],
    phrases: [
      "STOVĖTI DRAUDŽIAMA", "DUOK KELIĄ", "ATSARGINIS IŠĖJIMAS", "PĖSČIŲJŲ PERĖJA",
      "PAGRINDINĖ GATVĖ", "ĮVAŽIAVIMAS DRAUDŽIAMAS", "KELIŲ REMONTAS", "IŠPARDAVIMAS",
      "GELEŽINKELIO STOTIS", "ROTUŠĖ", "PARDUOTUVĖ", "VAISTINĖ", "MĖSINĖ",
    ],
    note: "Ogonek vowels ą ę į ų plus ū ė and č š ž. 'gatvė' = street, '-as/-is' endings everywhere.",
  },
  {
    language: "Latvian",
    group: "Other European",
    countries: ["Latvia"],
    phrases: [
      "STĀVĒT AIZLIEGTS", "DODIET CEĻU", "AVĀRIJAS IZEJA", "GĀJĒJU PĀREJA",
      "GALVENĀ IELA", "APSTĀTIES AIZLIEGTS", "CEĻA REMONTS", "PĀRDOD",
      "DZELZCEĻA STACIJA", "RĀTSNAMS", "ATVĒRTS", "MAIZNĪCA", "GAĻAS VEIKALS",
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
      "CẤM ĐỖ XE", "CẤM DỪNG XE", "ĐƯỜNG MỘT CHIỀU", "LỐI THOÁT HIỂM",
      "VẠCH SANG ĐƯỜNG", "CẤM VÀO", "ĐƯỜNG ĐANG SỬA CHỮA", "BÁN NHÀ",
      "ỦY BAN NHÂN DÂN", "NHÀ GA", "MỞ CỬA", "NHÀ THUỐC", "TIỆM BÁNH",
    ],
    note: "Latin with stacked tone marks and đ ơ ư ă â ê ô — dense diacritics. 'Đường' = road, 'CẤM' = forbidden.",
  },
  {
    language: "Indonesian",
    group: "East / SE Asia",
    countries: ["Indonesia", "Malaysia"],
    phrases: [
      "DILARANG PARKIR", "DILARANG BERHENTI", "JALAN SATU ARAH", "PINTU DARURAT",
      "PENYEBERANGAN PEJALAN KAKI", "DILARANG MASUK", "ADA PERBAIKAN JALAN", "DIJUAL",
      "STASIUN KERETA", "KANTOR WALIKOTA", "BUKA", "TOKO ROTI", "PUSKESMAS",
    ],
    note: "Plain Latin with NO special letters — that absence is itself the tell. 'Jalan/Jl.' = street, 'DILARANG' = forbidden. Malay is near-identical.",
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
