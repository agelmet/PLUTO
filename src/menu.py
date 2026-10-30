"""PLUTO SMASHERIE — the full menu (from their iServeMe QR menu, screenshots 30 Oct 2026).
render(lang) → the <section id="menu"> HTML · schema() → schema.org Menu for the JSON-LD.
Prices: 'p' = burger alone, 'm' = God's Meal price. Edit prices/items HERE only.
Descriptions were cut short («…») in the QR screens — only the visible words are used, nothing invented."""
import html
e = lambda s: html.escape(s, quote=True)


# ingredient library: key → (el, en, kind) — kind colours the chip dot
IL = {'bun': ('Martin’s Potato Bun', 'Martin’s Potato Bun', 'bun'),
      'beef2': ('διπλό 100% μοσχαρίσιο smash μπιφτέκι', 'double 100% beef smash patty', 'beef'),
      'ch2': ('διπλό American cheese', 'double American cheese', 'cheese'),
      'ch': ('American cheese', 'American cheese', 'cheese'),
      'bmc': ('τραγανό buttermilk chicken', 'crispy buttermilk chicken', 'chicken'),
      'slaw': ('coleslaw', 'coleslaw', 'veg'), 'kslaw': ('kimchi coleslaw', 'kimchi coleslaw', 'veg'),
      'tend': ('τραγανά φιλετάκια κοτόπουλου', 'crispy chicken tenders', 'chicken'),
      'fries': ('τηγανητές πατάτες', 'fries', 'fry'), 'sweet': ('τηγανητές γλυκοπατάτες', 'fried sweet potatoes', 'fry'),
      'tmayo': ('truffle mayo', 'truffle mayo', 'sauce'), 'parm': ('παρμεζάνα', 'parmesan', 'cheese'),
      'beef': ('smash μπιφτέκι', 'smash patty', 'beef'), 'onion': ('onion strings', 'onion strings', 'veg'),
      'pickle': ('χειροποίητη πίκλα', 'homemade pickles', 'veg'),
      'pick': ('πίκλα', 'pickles', 'veg'), 'ketchup': ('κέτσαπ', 'ketchup', 'red'), 'mustard': ('μουστάρδα', 'mustard', 'mustard'),
      'mayo': ('μαγιονέζα', 'mayonnaise', 'sauce'), 'donion': ('αφυδατωμένο κρεμμύδι', 'dried onion', 'veg'),
      'onion2': ('κρεμμύδι', 'onion', 'veg')}
# what each product contains — ONLY what the restaurant's own menu shows. To add a missing ingredient: add it to IL, then here.
INGR = {'OG Double Cheeseburger': ['bun', 'beef2', 'ch2', 'pick', 'ketchup', 'mustard', 'mayo', 'donion'],
        'Double Truffle': ['bun', 'beef2', 'ch2', 'onion2', 'tmayo'], 'Pluto’s Burger': ['bun', 'beef2', 'ch2'],
        'Crispy Chicken': ['bun', 'bmc', 'ch', 'slaw'], 'Korean Spicy Chicken': ['bun', 'bmc', 'ch', 'kslaw'], 'Chicken Tenders': ['tend'],
        'Classic Fries': ['fries'], 'Sweet Potato Fries': ['sweet'], 'Truffle Parm Fries': ['fries', 'tmayo', 'parm'],
        'Lock & Load Fries': ['fries', 'beef', 'parm', 'onion', 'pickle'], 'Coleslaw': []}

# appetite copy per product (only what the product really is), badge, and a sauce that goes with it
TAG = {'OG Double Cheeseburger': ('Το κλασικό, όπως πρέπει να είναι: τραγανές άκρες, λιωμένο τυρί και οι τρεις κλασικές σάλτσες.',
                                  'The classic, done right: crispy edges, melted cheese and the three classic sauces.'),
       'Double Truffle': ('Διπλό smash με truffle mayo και κρεμμύδι. Πλούσιο, αρωματικό, αξέχαστο.',
                          'A double smash with truffle mayo and onion. Rich, fragrant, unforgettable.'),
       'Pluto’s Burger': ('Το burger που φέρει το όνομά μας — το signature του Pluto.', 'The burger that carries our name — Pluto’s signature.'),
       'Crispy Chicken': ('Τραγανό buttermilk chicken, λιωμένο τυρί και δροσερό coleslaw σε κάθε μπουκιά.',
                          'Crispy buttermilk chicken, melted cheese and fresh coleslaw in every bite.'),
       'Korean Spicy Chicken': ('Καυτερό, τραγανό, με kimchi coleslaw. Για όσους αγαπούν τη φωτιά.',
                                'Spicy, crispy, with kimchi coleslaw. For those who love the heat.'),
       'Chicken Tenders': ('Χρυσαφένια και τραγανά — φτιαγμένα για βουτιά στις σάλτσες μας.', 'Golden and crispy — made for dipping in our sauces.'),
       'Classic Fries': ('Χρυσές, τραγανές, αλατισμένες σωστά. Η τέλεια παρέα για κάθε burger.', 'Golden and crispy. The perfect partner for any burger.'),
       'Sweet Potato Fries': ('Γλυκιά και τραγανή εναλλακτική στην κλασική πατάτα.', 'A sweet, crispy twist on classic fries.'),
       'Truffle Parm Fries': ('Πατάτες ντυμένες για έξοδο: truffle mayo και παρμεζάνα από πάνω.', 'Fries dressed to impress: truffle mayo and parmesan on top.'),
       'Lock & Load Fries': ('Γεύμα από μόνες τους: smash μπιφτέκι, παρμεζάνα και onion strings πάνω σε πατάτες.',
                             'A meal on their own: smash patty, parmesan and onion strings over fries.'),
       'Coleslaw': ('Δροσερό coleslaw για να ισορροπήσει κάθε μπουκιά.', 'Fresh coleslaw to balance every bite.')}
BADGE = {'OG Double Cheeseburger': ('Το κλασικό', 'The classic'), 'Double Truffle': ('Truffle', 'Truffle'),
         'Pluto’s Burger': ('Signature', 'Signature'), 'Korean Spicy Chicken': ('Spicy', 'Spicy'), 'Lock & Load Fries': ('Γεμάτες', 'Loaded')}
PAIR = {'Chicken Tenders': 'Pluto’s Honey Mustard', 'Classic Fries': 'Pluto’s God’s Sauce', 'Sweet Potato Fries': 'Spicy Mayo'}
MEAL_EL = 'God’s Meal = το burger + πατάτες + αναψυκτικό, μόνο +4,50 € (αντί για 6,00 € χωριστά).'
MEAL_EN = 'God’s Meal = the burger + fries + a soft drink, just +€4.50 (instead of €6.00 separately).'

def chips(name, lang):
    ks = INGR.get(name) or []
    if not ks: return ''
    lab = 'Ingredients' if lang == 'en' else 'Υλικά'
    return (f'<ul class="igs" aria-label="{lab}" data-en-aria="Ingredients">'
            + ''.join(f'<li class="ig ig-{IL[k][2]}" data-en="{e(IL[k][1])}">{e(IL[k][1] if lang == "en" else IL[k][0])}</li>' for k in ks) + '</ul>')

# (id, giant word, title el, title en, note el, note en, items)
# item = (name, desc el, desc en, price, meal price or None)
FOOD = [
 ('m-beef', 'SMASH BURGERS', 'Μοσχαρίσια smash burgers', 'Beef smash burgers',
  'Όλα σε Martin’s Potato Bun, με διπλό 100% μοσχαρίσιο smash μπιφτέκι και διπλό American cheese.',
  'All on a Martin’s Potato Bun, with a double 100% beef smash patty and double American cheese.',
  [('OG Double Cheeseburger', 'Το κλασικό διπλό cheeseburger, όπως πρέπει να είναι.', 'The classic double cheeseburger, the way it should be.', 9.9, 14.4),
   ('Double Truffle', 'Το διπλό smash με άρωμα τρούφας.', 'The double smash with a hint of truffle.', 11.2, 15.7),
   ('Pluto’s Burger', 'Το burger που πήρε το όνομά μας.', 'The burger that carries our name.', 11.5, 16.0)]),
 ('m-chicken', 'CHICKEN', 'Chicken burgers & tenders', 'Chicken burgers & tenders',
  'Τα chicken burgers σερβίρονται σε Martin’s Potato Bun.',
  'The chicken burgers are served on a Martin’s Potato Bun.',
  [('Crispy Chicken', 'Τραγανό buttermilk chicken, American cheese και coleslaw.', 'Crispy buttermilk chicken, American cheese and coleslaw.', 9.9, 14.4),
   ('Korean Spicy Chicken', 'Τραγανό buttermilk chicken, American cheese και kimchi coleslaw.', 'Crispy buttermilk chicken, American cheese and kimchi coleslaw.', 10.5, 15.0),
   ('Chicken Tenders', 'Τραγανά φιλετάκια κοτόπουλου, για ορεκτικό ή για μοίρασμα.', 'Crispy chicken tenders, as a starter or for sharing.', 8.0, None)]),
]
FRIES = ('m-fries', 'FRIES', 'Πατάτες & σαλάτα', 'Fries & salad',
  [('Classic Fries', 'Κλασικές τραγανές τηγανητές πατάτες.', 'Classic crispy fries.', 3.5),
   ('Sweet Potato Fries', 'Τραγανές τηγανητές γλυκοπατάτες.', 'Crispy sweet potato fries.', 5.0),
   ('Truffle Parm Fries', 'Τηγανητές πατάτες με truffle mayo και παρμεζάνα.', 'Fries with truffle mayo and parmesan.', 6.5),
   ('Lock & Load Fries', 'Τηγανητές πατάτες με smash μπιφτέκι, παρμεζάνα, onion strings και χειροποίητη πίκλα.', 'Fries with a smash patty, parmesan, onion strings and homemade pickles.', 7.5),
   ('Coleslaw', '', '', 6.5)])
SAUCES = ('m-sauces', 'SAUCES', 'Σάλτσες', 'Sauces',
  [('Pluto’s God’s Sauce', 1.2, '#FFB52E'), ('Pluto’s Honey Mustard', 1.2, '#F2C14E'), ('Truffle Mayo', 1.2, '#E9DDBF'), ('Spicy Mayo', 1.2, '#F28A3C'),
   ('Caesar Dressing', 1.2, '#EFE4C8'), ('Ketchup', 0.8, '#E04A53'), ('Mustard', 0.8, '#F5C518'), ('Mayonnaise', 0.8, '#FFF7E8')])
DRINKS = ('m-drinks', 'DRINKS', 'Ποτά', 'Drinks', [
  ('Μπύρες', 'Beers', [('Corona Extra', 'κουτί 330 ml', 'can 330 ml', 4.0), ('Heineken 0,0%', 'κουτί 330 ml', 'can 330 ml', 4.0),
     ('Fischer', 'κουτί 330 ml', 'can 330 ml', 4.0), ('Jasmine Strange Brew IPA', '330 ml', '330 ml', 6.0),
     ('Norma Lager', '330 ml', '330 ml', 6.0), ('Dama Summer Ale', '330 ml', '330 ml', 6.0)]),
  ('Κρασιά & spritz', 'Wines & spritz', [('Κτήμα Χατζημιχάλη J’aime le Blanc', '187 ml', '187 ml', 5.0),
     ('Κτήμα Χατζημιχάλη J’aime le Rouge', '187 ml', '187 ml', 5.0), ('Κτήμα Χατζημιχάλη J’aime le Rosé', '187 ml', '187 ml', 5.0),
     ('Aperol Spritz', '', '', 8.0)]),
  ('Αναψυκτικά', 'Soft drinks', [('Coca-Cola', '330 ml', '330 ml', 2.5), ('Coca-Cola Light', '330 ml', '330 ml', 2.5),
     ('Coca-Cola Zero', '330 ml', '330 ml', 2.5), ('Fanta Orange', '330 ml', '330 ml', 2.5), ('Fanta Orange Blue', '330 ml', '330 ml', 2.5),
     ('Sprite', '330 ml', '330 ml', 2.5), ('Pink Grapefruit Soda', '', '', 2.5)]),
  ('Νερό', 'Water', [('Ξινόνερο', '250 ml', '250 ml', 2.5), ('Νερό', '500 ml', '500 ml', 0.5)]),
])
EN_NAME = {'Ξινόνερο': 'Sparkling water', 'Νερό': 'Water', 'Κτήμα Χατζημιχάλη J’aime le Blanc': 'Hatzimichalis Estate J’aime le Blanc',
           'Κτήμα Χατζημιχάλη J’aime le Rouge': 'Hatzimichalis Estate J’aime le Rouge', 'Κτήμα Χατζημιχάλη J’aime le Rosé': 'Hatzimichalis Estate J’aime le Rosé'}

def fp(v, lang):
    return f'€{v:.2f}' if lang == 'en' else f'{v:.2f}'.replace('.', ',') + ' €'

def price(v, m=None, lang='el'):
    a = f' data-m="{m}"' if m else ''
    return f'<span class="mp" data-p="{v}"{a}>{fp(v, lang)}</span>'

def T(el, en, lang, tag='span', cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<{tag}{c} data-en="{e(en)}">{e(en if lang == "en" else el)}</{tag}>'

def big(word):
    return f'<h3 class="big mh-big" aria-hidden="true"><span class="o">{e(word)}</span><span class="f">{e(word)}</span></h3>'

def head(word, el, en, lang):
    return (f'<header class="mh">{big(word)}'
            f'<p class="mh-t"><span class="mh-dot" aria-hidden="true"></span>{T(el, en, lang)}</p></header>')

def item(name, del_, den, p, m, lang, i):
    bd = BADGE.get(name); tg = TAG.get(name)
    b = f'<span class="mi-b" data-en="{e(bd[1])}">{e(bd[1] if lang == "en" else bd[0])}</span>' if bd else ''
    t = f'<p class="mi-t" data-en="{e(tg[1])}">{e(tg[1] if lang == "en" else tg[0])}</p>' if tg else ''
    return (f'<li class="mi rv" style="--i:{i}"><div class="mi-top"><h4 class="mi-n">{e(name)}{b}</h4>'
            f'<span class="mi-dots" aria-hidden="true"></span>{price(p, m, lang)}</div>' + t + chips(name, lang) + '</li>')

TABS = [('m-beef', 'Burgers', 'Burgers'), ('m-chicken', 'Chicken', 'Chicken'), ('m-fries', 'Πατάτες', 'Fries'),
        ('m-sauces', 'Σάλτσες', 'Sauces'), ('m-drinks', 'Ποτά', 'Drinks')]

def render(lang='el'):
    L = lang
    out = ['<section class="menu" id="menu" aria-labelledby="meH">',
           '  <div class="amb" data-k="crowns" aria-hidden="true"></div>',
           '  <div class="wrap">',
           '    <div class="me-head">',
           f'      <p class="eyebrow" data-en="The menu">{"The menu" if L == "en" else "Το μενού"}</p>',
           f'      <h2 id="meH" class="lc" data-fx="flip" data-en="What we serve">{"What we serve" if L == "en" else "Τι σερβίρουμε"}</h2>',
           '      ' + T('Όλο το μενού μας με τις τιμές — από το πρώτο smash μέχρι την τελευταία σάλτσα.',
                         'Our full menu with prices — from the first smash to the last sauce.', L, 'p', 'me-lead'),
           '    </div>',
           f'    <nav class="mtabs" aria-label="{"Menu categories" if L == "en" else "Κατηγορίες μενού"}" data-en-aria="Menu categories"><div class="mtabs-in">'
           + ''.join(f'<a href="#{i}" data-en="{e(en)}">{e(en if L == "en" else el)}</a>' for i, el, en in TABS)
           + '<i class="mtabs-blob" aria-hidden="true"></i></div></nav>',
           '    <div class="meal-sw rv" role="group" aria-label="' + ('Price' if L == 'en' else 'Τιμή') + '" data-en-aria="Price">'
           + f'<button type="button" class="on" data-meal="0" aria-pressed="true">{T("Μόνο το burger", "Burger only", L)}</button>'
           + f'<button type="button" data-meal="1" aria-pressed="false">God’s Meal</button><i class="meal-k" aria-hidden="true"></i></div>',
           '    ' + T(MEAL_EL, MEAL_EN, L, 'p', 'meal-note'),
           '    <div class="mgrid mgrid-food">']
    for bid, word, tel, ten, nel, nen, items in FOOD:
        out.append(f'      <div class="mblock" id="{bid}">{head(word, tel, ten, L)}'
                   '<ul class="mlist">'
                   + ''.join(item(n, a, b, p, m, L, i) for i, (n, a, b, p, m) in enumerate(items)) + '</ul></div>')
    out.append('    </div>')
    fid, fw, fel, fen, fitems = FRIES
    sid, sw, sel, sen, sitems = SAUCES
    out.append('    <div class="mgrid mgrid-sides">')
    out.append(f'      <div class="mblock" id="{fid}">{head(fw, fel, fen, L)}<ul class="mlist">'
               + ''.join(item(n, a, b, p, None, L, i) for i, (n, a, b, p) in enumerate(fitems)) + '</ul></div>')
    out.append(f'      <div class="mblock" id="{sid}">{head(sw, sel, sen, L)}'
               + T('Για να βουτήξετε ό,τι θέλετε.', 'For dipping anything you like.', L, 'p', 'mb-note')
               + '<ul class="tubs">'
               + ''.join(f'<li class="tub rv" style="--i:{i};--sc:{c}"><span class="tub-c" aria-hidden="true"><i></i></span>'
                         f'<span class="tub-n">{e(n)}</span>{price(p, None, L)}</li>' for i, (n, p, c) in enumerate(sitems))
               + '</ul></div>')
    out.append('    </div>')
    did, dw, dl, den, groups = DRINKS
    out.append(f'    <div class="mblock mblock-drinks" id="{did}">{head(dw, dl, den, L)}<div class="mgrid mgrid-drinks">')
    cols = [groups[:2], groups[2:]]
    for col in cols:
        out.append('      <div class="dcol">')
        for gel, gen, its in col:
            out.append(f'        <div class="dgrp">{T(gel, gen, L, "h4", "dg-t")}<ul class="dlist">'
                       + ''.join(f'<li class="di rv" style="--i:{i}"><span class="di-n">'
                                 + (T(n, EN_NAME[n], L) if n in EN_NAME else e(n))
                                 + (' ' + T(sel_, sen_, L, 'small') if sel_ else '')
                                 + f'</span><span class="mi-dots" aria-hidden="true"></span>{price(p, None, L)}</li>'
                                 for i, (n, sel_, sen_, p) in enumerate(its)) + '</ul></div>')
        out.append('      </div>')
    out.append('    </div></div>')
    out.append('    ' + T('Οι τιμές είναι σε ευρώ και περιλαμβάνουν ΦΠΑ. Για αλλεργίες ή ερωτήσεις, πάρτε μας τηλέφωνο στο 210 800 4455.',
                           'Prices are in euro and include VAT. For allergies or questions, call us on 210 800 4455.', L, 'p', 'me-note'))
    out += ['  </div>', '  <div class="drip-edge" data-c="#013241" data-n="1"></div>', '</section>']
    return '\n'.join(out)

def schema():
    def mi(name, desc, p):
        d = {'@type': 'MenuItem', 'name': name, 'offers': {'@type': 'Offer', 'price': f'{p:.2f}', 'priceCurrency': 'EUR'}}
        ig = ', '.join(IL[k][0] for k in INGR.get(name, []))
        if ig: d['description'] = ig[0].upper() + ig[1:] + '.'
        return d
    secs = []
    for bid, word, tel, ten, nel, nen, items in FOOD:
        secs.append({'@type': 'MenuSection', 'name': tel, 'description': nel, 'hasMenuItem': [mi(n, a, p) for n, a, b, p, m in items]})
    secs.append({'@type': 'MenuSection', 'name': 'God’s Meal', 'description': 'Burger + πατάτες + αναψυκτικό.', 'hasMenuItem': [mi(n + ' — God’s Meal', '', m) for *_, items in FOOD for n, a, b, p, m in items if m]})
    secs.append({'@type': 'MenuSection', 'name': FRIES[2], 'hasMenuItem': [mi(n, a, p) for n, a, b, p in FRIES[4]]})
    secs.append({'@type': 'MenuSection', 'name': SAUCES[2], 'hasMenuItem': [mi(n, '', p) for n, p, c in SAUCES[4]]})
    for gel, gen, its in DRINKS[4]:
        secs.append({'@type': 'MenuSection', 'name': gel, 'hasMenuItem': [mi((n + ' ' + s).strip(), '', p) for n, s, s2, p in its]})
    return {'@type': 'Menu', '@id': '#menu', 'name': 'Μενού Pluto Smasherie', 'inLanguage': 'el', 'hasMenuSection': secs}


def data():
    """compact JSON for the hero menu sheet (built by script.js)."""
    ig = lambda n: [list(IL[k]) for k in INGR.get(n, [])]
    sp = {n: p for n, p, c in SAUCES[4]}
    def ex(n):
        o = {}
        if n in TAG: o['t'] = list(TAG[n])
        if n in BADGE: o['b'] = list(BADGE[n])
        if n in PAIR: o['pr'] = [PAIR[n], sp[PAIR[n]]]
        return o
    cats = [{'id': 'beef', 'el': 'Smash burgers', 'en': 'Smash burgers', 'items': [dict({'n': n, 'ig': ig(n), 'p': p, 'm': m}, **ex(n)) for n, a, b, p, m in FOOD[0][6]]},
            {'id': 'chicken', 'el': 'Chicken', 'en': 'Chicken', 'items': [dict({'n': n, 'ig': ig(n), 'p': p, 'm': m}, **ex(n)) for n, a, b, p, m in FOOD[1][6]]},
            {'id': 'fries', 'el': 'Πατάτες & σαλάτα', 'en': 'Fries & salad', 'items': [dict({'n': n, 'ig': ig(n), 'p': p}, **ex(n)) for n, a, b, p in FRIES[4]]},
            {'id': 'sauces', 'el': 'Σάλτσες', 'en': 'Sauces', 'kind': 'tubs', 'items': [{'n': n, 'p': p, 'c': c} for n, p, c in SAUCES[4]]},
            {'id': 'drinks', 'el': 'Ποτά', 'en': 'Drinks', 'kind': 'drinks', 'groups': [
                {'el': gel, 'en': gen, 'items': [{'n': n, 'ne': EN_NAME.get(n, n), 's': s1, 'se': s2, 'p': p} for n, s1, s2, p in its]} for gel, gen, its in DRINKS[4]]}]
    return cats
