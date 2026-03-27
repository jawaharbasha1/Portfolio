import os

files = ['index.html', 'js/main.js']
replacements = {
    'Gagan Chauhan': 'Jawaharbasha J.',
    'Gagan_Chauhan': 'Jawaharbasha_J',
    'Gagan CV (2).docx': 'Jawaharbasha_J_CV.docx',
    'GaganChauhan905': 'jawaharbasha1',
    'gaganChauhan': 'jawaharbasha1',
    'chauhangagan2675@gmail.com': 'jawaharbasha2006@gmail.com',
    '9053800378': '9003468778',
    "Gagan's": "Jawaharbasha's",
    'Gagan': 'Jawaharbasha',
    'GAGAN CHAUHAN': 'JAWAHARBASHA J.'
}

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements.items():
        content = content.replace(old, new)
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)

try:
    os.rename('Gagan CV (2).docx', 'Jawaharbasha_J_CV.docx')
except FileNotFoundError:
    pass
