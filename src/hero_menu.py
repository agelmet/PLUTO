"""Hero «Δείτε το μενού» block + the full-screen menu sheet (30 Oct 2026). Used by patch/build."""
import html, json
import menu as M
e = lambda s: html.escape(s, quote=True)
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
BOOK = ('<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
        '<path d="M8 10c6-2 11-1 16 3 5-4 10-5 16-3v28c-6-2-11-1-16 3-5-4-10-5-16-3z"/><path d="M24 13v28"/><path d="M13 19h6M13 25h6M29 19h6M29 25h6"/></svg>')

def fp(v, lang): return M.fp(v, lang)

def hero(lang='el'):
    L = lang
    t = lambda el, en: en if L == 'en' else el
    cats = M.data()
    def low(c):
        ps = [i['p'] for i in c.get('items', [])] or [i['p'] for g in c.get('groups', []) for i in g['items']]
        return min(ps)
    chips = [('beef', 'Burgers', 'Burgers', low(cats[0])), ('chicken', 'Chicken', 'Chicken', low(cats[1])),
             ('fries', 'Πατάτες', 'Fries', low(cats[2])), ('drinks', 'Ποτά', 'Drinks', None)]
    ch = ''.join(f'<a href="#menu" data-open-menu="{k}"><span data-en="{e(en)}">{e(t(el, en))}</span>'
                 + (f' <em data-en="from {e(fp(v, "en"))}">{e(t("από " + fp(v, "el"), "from " + fp(v, "en")))}</em>' if v else '') + '</a>'
                 for k, el, en, v in chips)
    return (f'<div class="h-menu">'
            f'<a class="mbtn" href="#menu" data-open-menu><span class="mbtn-ic">{BOOK}</span>'
            f'<span class="mbtn-t"><b data-en="See the menu">{t("Δείτε το μενού", "See the menu")}</b>'
            f'<small data-en="Every product with its ingredients and price">{t("Κάθε προϊόν με τα υλικά και την τιμή του", "Every product with its ingredients and price")}</small></span>'
            f'<span class="mbtn-ar">{ARROW}</span></a></div>')

def sheet(lang='el'):
    t = lambda el, en: en if lang == 'en' else el
    return (f'<div class="msheet" id="msheet" role="dialog" aria-modal="true" aria-labelledby="msT" hidden>'
            f'<div class="ms-back" data-close></div>'
            f'<div class="ms-panel">'
            f'<div class="ms-top"><svg class="ms-logo" viewBox="165 235 750 610" aria-hidden="true"><use href="#lg"/></svg>'
            f'<div class="ms-tt"><p class="ms-k" data-en="Pluto Smasherie · Drosia">{t("Pluto Smasherie · Δροσιά", "Pluto Smasherie · Drosia")}</p>'
            f'<h2 id="msT" data-en="The menu">{t("Το μενού", "The menu")}</h2></div>'
            f'<button type="button" class="ms-x" data-close aria-label="{t("Κλείσιμο μενού", "Close menu")}" data-en-aria="Close menu"><i></i><i></i></button></div>'
            f'<nav class="ms-tabs" aria-label="{t("Κατηγορίες", "Categories")}" data-en-aria="Categories"></nav>'
            f'<div class="ms-body" id="msBody" tabindex="-1"></div>'
            f'</div></div>'
            f'<script type="application/json" id="menuData">{json.dumps(M.data(), ensure_ascii=False, separators=(",", ":"))}</script>')
