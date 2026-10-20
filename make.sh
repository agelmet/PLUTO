#!/bin/bash
# PLUTO SMASHERIE — rebuild everything from src/ (cloud paths). Edit src/, never site/index.html.
set -e
cd "$(dirname "$0")"
AC=/home/claude/ac
python3 src/build.py
ADVON_TOOLS=/home/claude/tools python3 $AC/.advon/privacy/privacy_fix.py apply site >/tmp/pl-priv.json 2>/dev/null
python3 -c "import json;print('privacy left:',json.load(open('/tmp/pl-priv.json'))['left'])"
sed -i 's/είναι Smash Burgers Δροσιά\./είναι το Pluto Smasherie, Λεωφ. Δροσιάς–Σταμάτας 3, 145 75 Δροσιά./; s/is Smash Burgers Drosia\./is Pluto Smasherie, Drosias–Stamatas Ave 3, 145 75 Drosia, Greece./; s/Smash Burgers Δροσιά/Pluto Smasherie/g; s/Smash Burgers Drosia/Pluto Smasherie/g; s/Τελευταία ενημέρωση: [0-9]* [Α-ω]* 2026/Τελευταία ενημέρωση: 20 Οκτωβρίου 2026/; s/Last updated: [0-9]* [A-Za-z]* 2026/Last updated: 20 October 2026/' site/privacy.html
python3 $AC/.advon/seo_live.py fix site | tail -1
python3 $AC/.advon/favicon.py make site assets/img/pluto-smasherie-logo.svg --tile '#013241' --preview /home/claude/pluto/qa/fav.png | tail -2 | head -1
python3 $AC/.advon/seo_rank.py en site | tail -1
python3 $AC/.advon/seo_live.py schema site | tail -1
python3 $AC/.advon/seo_rank.py check site | grep -E '✗|score'
