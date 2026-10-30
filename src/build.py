"""Build index.html for PLUTO SMASHERIE from src/ (body.html + style.css + script.js + art.json).
SKELETON (Advon roll, 20 Oct 2026): opening MELT (cheese pours from the top and the whole cover melts away — new type)
· hero split: huge «EAT LIKE A GOD.» + cut-out burger held up in a black glove (pointer tilt, live cheese drips, BITE it)
· nav top bar + flags · cheese ticker with drips · SIGNATURE «Πώς γίνεται ένα smash burger» pinned scroll scene
  (ball → spatula smash → lace crust → cheese melts → bun lands → Pluto appears = their logo) · kitchen: cross-section
  with a magnifying lens + 2 silent loops + still · menu as giant outlined words that fill with cheese on scroll
· story «Ο θεός με την κορώνα» wrapper photo + spinning badge · roadmap «Η αντίστροφη μέτρηση» drawn by scroll with Pluto
  walking it · FAQ split · visit + map behind cookie box · footer · mobile bar Κλήση · Οδηγίες · Instagram
Every section melts into the next one (drip edges that stretch with the scroll)."""
import html, json, pathlib, re, sys
sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import menu as MENU
import hero_menu as HMENU
S = pathlib.Path(__file__).resolve().parent
OUT = pathlib.Path('/home/claude/pluto/site')
e = lambda s: html.escape(s, quote=True)
art = json.loads((S / 'art.json').read_text())
L = art['logo']

SYMS = (f'<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">'
        f'<symbol id="lg" viewBox="165 235 750 610"><path fill="#F89D2A" fill-rule="evenodd" d="{L["or"]}"/><path fill="#E04A53" fill-rule="evenodd" d="{L["rd"]}"/><path fill="#F6EBD2" fill-rule="evenodd" d="{L["wh"]}"/></symbol>'
        f'<symbol id="phd" viewBox="160 225 470 625"><path fill="#F89D2A" fill-rule="evenodd" d="{L["or"]}"/></symbol>'
        f'<symbol id="wm" viewBox="{art["wm_vb"]}"><path fill-rule="evenodd" d="{art["wm"]}"/></symbol></svg>')

FLAG_GR = ('<svg viewBox="0 0 27 18" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="27" height="18" fill="#0D5EAF"/>'
           '<path d="M0 3h27M0 9h27M0 15h27" stroke="#fff" stroke-width="2"/><rect width="10" height="10" fill="#0D5EAF"/>'
           '<path d="M5 0v10M0 5h10" stroke="#fff" stroke-width="2"/></svg>')
FLAG_UK = ('<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><clipPath id="uk"><path d="M0 0v30h60V0z"/></clipPath>'
           '<g clip-path="url(#uk)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/>'
           '<path d="M0 0l60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/>'
           '<path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>')
st = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"'
I = {
 'I_CALL': f'<svg viewBox="0 0 24 24" {st} aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>',
 'I_DIR': f'<svg viewBox="0 0 24 24" {st} aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
 'I_MAIL': f'<svg viewBox="0 0 24 24" {st} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
 'I_IG': f'<svg viewBox="0 0 24 24" {st} aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
 'I_FB': '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.7V11H7v4h2.5v6h4v-6H17l.5-4h-4V9c0-.6.4-1 1-1z"/></svg>',
 'BOLT': '<svg viewBox="0 0 20 32" aria-hidden="true"><path d="M12 0 2 18h8l-4 14 13-20h-8l5-12z"/></svg>',
 'IC_BURGER': f'<svg viewBox="0 0 64 64" {st} stroke-width="2.6" aria-hidden="true"><path d="M10 28c0-11 10-18 22-18s22 7 22 18z"/><path d="M8 36h48"/><path d="M12 36c2 5 6 5 8 0 2 5 6 5 8 0 2 5 6 5 8 0 2 5 6 5 8 0 2 5 6 5 8 0"/><path d="M12 44h40a3 3 0 0 1 0 6H12a3 3 0 0 1 0-6z"/><path d="M24 18h.1M32 15h.1M40 18h.1"/></svg>',
 'IC_CHICKEN': f'<svg viewBox="0 0 64 64" {st} stroke-width="2.6" aria-hidden="true"><path d="M38 10c9 0 16 7 16 16 0 7-4 12-10 14l-8 2-12 12a5 5 0 1 1-7-1 5 5 0 1 1-1-7l12-12 2-8c2-9 6-16 8-16z"/><path d="M40 20c3 1 5 3 6 6"/></svg>',
 'IC_FRIES': f'<svg viewBox="0 0 64 64" {st} stroke-width="2.6" aria-hidden="true"><path d="M16 26h32l-4 30H20z"/><path d="M22 26 18 8m10 18-2-16m8 16 2-18m6 18 4-14"/><path d="M24 40c4 3 12 3 16 0"/></svg>',
 'IC_MORE': f'<svg viewBox="0 0 64 64" {st} stroke-width="2.6" aria-hidden="true"><path d="M8 50 5 18l14 12 13-18 13 18 14-12-3 32z"/><path d="M10 56h44"/></svg>',
}

FAQ = [
 ('Πού βρίσκεται το Pluto Smasherie;', 'Where is Pluto Smasherie?',
  'Στη Λεωφόρο Δροσιάς–Σταμάτας 3, στη Δροσιά (Τ.Κ. 145 75), πάνω στον κεντρικό δρόμο που ενώνει τη Δροσιά με τη Σταμάτα.',
  'At Drosias–Stamatas Avenue 3 in Drosia (145 75), on the main road between Drosia and Stamata.'),
 ('Τι είναι το smash burger;', 'What is a smash burger?',
  'Είναι burger όπου η μπάλα του κιμά πατιέται με δύναμη πάνω σε πολύ καυτή λάμα. Έτσι το μπιφτέκι γίνεται λεπτό, με τραγανή, καραμελωμένη κρούστα στις άκρες, και μένει ζουμερό μέσα.',
  'It is a burger where a ball of minced beef is pressed hard onto a very hot griddle. The patty turns thin, with a crispy, caramelised crust at the edges, and stays juicy inside.'),
 ('Τι άλλο σερβίρετε εκτός από burger;', 'What else do you serve besides burgers?',
  'Chicken burgers (Crispy Chicken και Korean Spicy Chicken), chicken tenders, πατάτες (κλασικές, γλυκοπατάτες, Truffle Parm και Lock & Load), coleslaw, σάλτσες, μπύρες, κρασιά και αναψυκτικά. Όλο το μενού με τις τιμές θα το βρείτε εδώ, στην ενότητα «Μενού».',
  'Chicken burgers (Crispy Chicken and Korean Spicy Chicken), chicken tenders, fries (classic, sweet potato, Truffle Parm and Lock & Load), coleslaw, sauces, beers, wines and soft drinks. You will find the full menu with prices right here, in the «Menu» section.'),
 ('Πόσο κοστίζει ένα smash burger;', 'How much is a smash burger?',
  'Τα smash burgers μας ξεκινούν από 9,90 € (OG Double Cheeseburger). Κάθε burger υπάρχει και ως God’s Meal, σε μενού, από 14,40 €.',
  'Our smash burgers start at €9.90 (OG Double Cheeseburger). Every burger also comes as a God’s Meal, from €14.40.'),
 ('Από πότε είστε ανοιχτά;', 'Since when are you open?',
  'Ανοίξαμε τη Δευτέρα 19 Οκτωβρίου 2026. Για το ωράριο, πάρτε μας τηλέφωνο στο 210 800 4455 ή δείτε το Instagram μας.',
  'We opened on Monday 19 October 2026. For our opening hours, call us on 210 800 4455 or check our Instagram.'),
 ('Πώς επικοινωνώ μαζί σας;', 'How can I contact you?',
  'Στο 210 800 4455, στο pluto2026.info@gmail.com ή με μήνυμα στο Instagram, στο @pluto_smasherie.',
  'On 210 800 4455, at pluto2026.info@gmail.com or with a message on Instagram, @pluto_smasherie.'),
 ('Από ποιες περιοχές έρχεστε εύκολα;', 'Which areas are close by?',
  'Είμαστε λίγα λεπτά με το αυτοκίνητο από τη Σταμάτα, τον Διόνυσο, την Εκάλη και τη Ροδόπολη.',
  'We are a few minutes by car from Stamata, Dionysos, Ekali and Rodopoli.'),
]
faq_html = '\n'.join(
 f'      <details class="qa"><summary><span data-en="{e(qe)}">{e(q)}</span><i aria-hidden="true"></i></summary><div class="ans"><p data-en="{e(ae)}">{e(a)}</p></div></details>'
 for q, qe, a, ae in FAQ)

body = (S / 'body.html').read_text()
body = body.replace('{{MENU}}', MENU.render('el')).replace('{{HERO_MENU}}', HMENU.hero('el')).replace('{{SHEET}}', HMENU.sheet('el')).replace('{{FAQ}}', faq_html).replace('{{WM_VB}}', art['wm_vb']).replace('{{FLAG_GR}}', FLAG_GR).replace('{{FLAG_UK}}', FLAG_UK)
body = body.replace('<i>{{BOLT}}</i>', '<i></i>')
for k, v in I.items():
    body = body.replace('{{' + k + '}}', v)
assert '{{' not in body, re.findall(r'\{\{\w+\}\}', body)
body = SYMS + '\n' + body

css = (S / 'style.css').read_text() + (S / 'hero_menu.css').read_text()
css_min = re.sub(r'\s*\n\s*', '', re.sub(r'/\*.*?\*/', '', css, flags=re.S))
js = (S / 'script.js').read_text().replace('/* ---------- FAQ: one open', (S / 'hero_menu.js').read_text() + '/* ---------- FAQ: one open', 1)
fonts = (S.parent / 'work' / 'fonts.css').read_text().replace('\n', '')

TITLE = 'Smash Burgers Δροσιά | Pluto Smasherie — Eat Like a God'
DESC = 'Pluto Smasherie στη Δροσιά: ζουμερά smash burgers με τραγανές άκρες και λιωμένο τυρί, fried chicken και loaded fries. Λεωφ. Δροσιάς–Σταμάτας 3 · 210 800 4455.'
GBP = 'https://maps.google.com/?cid=13492553042540232839'
ld = {'@context': 'https://schema.org', '@graph': [
 {'@type': 'Restaurant', '@id': '#restaurant', 'name': 'Pluto Smasherie', 'alternateName': ['Pluto', 'PLUTO Smasherie'],
  'description': 'Smash burger restaurant in Drosia, Attica: smash burgers, fried chicken and loaded fries.',
  'slogan': 'Eat Like a God.', 'servesCuisine': ['Burgers', 'Smash burgers', 'Fried chicken', 'American'],
  'telephone': '+30 210 800 4455', 'email': 'pluto2026.info@gmail.com',
  'image': 'assets/img/pluto-smasherie-smash-burger-drosia-1100.webp', 'logo': 'assets/icons/icon-512.png',
  'address': {'@type': 'PostalAddress', 'streetAddress': 'Λεωφ. Δροσιάς–Σταμάτας 3', 'addressLocality': 'Δροσιά',
              'postalCode': '145 75', 'addressRegion': 'Αττική', 'addressCountry': 'GR'},
  'geo': {'@type': 'GeoCoordinates', 'latitude': 38.1209119, 'longitude': 23.8590225},
  'hasMap': GBP, 'areaServed': ['Δροσιά', 'Σταμάτα', 'Διόνυσος', 'Εκάλη', 'Ροδόπολη'],
  'acceptsReservations': False, 'hasMenu': MENU.schema(), 'priceRange': '€', 'knowsAbout': ['Smash burgers', 'Fried chicken', 'Loaded fries', 'Burgers στη Δροσιά'],
  'sameAs': ['https://www.instagram.com/pluto_smasherie/', 'https://www.facebook.com/p/Pluto-Smasherie-61594371047403/', GBP]},
 {'@type': 'WebSite', 'name': 'Pluto Smasherie', 'alternateName': ['Pluto Smasherie Δροσιά', 'Pluto smash burgers'], 'inLanguage': ['el', 'en']},
 {'@type': 'FAQPage', 'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, qe, a, ae in FAQ]},
]}

head = f'''<!doctype html>
<html lang="el">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cut">
<title>{e(TITLE)}</title>
<meta name="description" content="{e(DESC)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#013241">
<meta name="color-scheme" content="light only">
<meta property="og:type" content="restaurant.restaurant">
<meta property="og:site_name" content="Pluto Smasherie">
<meta property="og:title" content="{e(TITLE)}">
<meta property="og:description" content="{e(DESC)}">
<meta property="og:image" content="assets/img/pluto-smasherie-og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="el_GR">
<meta property="og:locale:alternate" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="assets/img/pluto-smasherie-smash-burger-drosia-820.webp" as="image" fetchpriority="high" imagesrcset="assets/img/pluto-smasherie-smash-burger-drosia-520.webp 520w, assets/img/pluto-smasherie-smash-burger-drosia-820.webp 820w, assets/img/pluto-smasherie-smash-burger-drosia-1100.webp 1100w" imagesizes="(max-width:760px) 88vw, 46vw">
<link rel="preload" href="assets/fonts/fira-sans-extra-condensed-latin-900-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/manrope-greek-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<script>document.documentElement.classList.add('js')</script>
<style id="advon-fonts">{fonts}</style>
<style>{css_min}</style>
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False, separators=(',', ':'))}</script>
</head>
<body>
'''
out = head + body + f'\n<script>{js}</script>\n</body>\n</html>\n'
OUT.mkdir(parents=True, exist_ok=True)
(OUT / 'index.html').write_text(out)
print('index.html', len(out) // 1024, 'KB · css', len(css_min) // 1024, 'KB · js', len(js) // 1024, 'KB')
