"""Lote de imagens do funil /sangue: gera, converte pra jpg leve e preenche o CONFIG.

Uso: python3 tools/lote_sangue.py [slot ...]   (sem argumento = todos que ainda não existem)
"""
import pathlib, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from gerar_imagem import gerar, ROOT

DIR = ROOT / "site/sangue/assets"
REF = DIR / "modelo-base/opcao-1.png"
P, Q, L = "1024x1536", "1024x1024", "1536x1024"

FOTO = "Realistic smartphone photo, natural light, plain light-grey wall, front view, no text, no watermark."
MESMA = "Keep exactly the same woman from the reference photo: same face, skin tone and long wavy dark brown hair, same black tank top and black leggings."

LOTE = {
    # slot: (prompt, tamanho, usa_referencia)
    "corpoMedio": (f"{FOTO} {MESMA} Now she is much slimmer than the reference: an average medium body, about 65 kg, narrow waist, only a small soft belly, slim arms and legs. Full body head to knees.", P, True),
    "corpoSobrepeso": (f"{FOTO} {MESMA} Now she is moderately overweight: visible belly and wider hips. Full body head to knees.", P, True),
    "corpoAcima": (f"{FOTO} {MESMA} Keep her body exactly as in the reference: clearly overweight with a visible belly. Full body head to knees.", P, True),
    "corpoPlus": (f"{FOTO} {MESMA} Now she is plus size, heavier than the reference, with a large belly and full arms. Full body head to knees.", P, True),
    "areaBarriga": (f"{FOTO} {MESMA} Close crop from chest to mid-thigh, side-front angle. A thin red dashed outline drawn around her belly area, like a fitness app highlight.", P, True),
    "areaCulotes": (f"{FOTO} {MESMA} Crop from waist to knees, front view. Thin red dashed outlines drawn around the outer upper thighs (saddlebags), like a fitness app highlight.", P, True),
    "areaCorpoTodo": (f"{FOTO} {MESMA} Full body head to knees. A thin red dashed outline traced around her whole body silhouette, like a fitness app highlight.", L, True),
    "depoisSeca": (f"{FOTO} {MESMA} Same face and hair, but after losing 25 kg: now she is truly slim and fit, about 58 kg, flat toned belly, slim defined arms and legs, narrow waist. Dramatic transformation, clearly thin. Black sports top and black leggings. Confident smile. Full body head to knees.", P, True),
    "depoisNatural": (f"{FOTO} {MESMA} Same face and hair, but after losing 20 kg: now she is clearly slim with soft natural curves, about 62 kg, flat belly, slim arms, narrow waist. Clearly thin compared to the reference. Happy smile. Full body head to knees.", P, True),
    "avatarRedondo": ("Realistic portrait photo, head and shoulders, of a friendly Brazilian female nutritionist around 40, white lab coat over a light blouse, warm smile, bright clinic office softly blurred behind. No text, no logo.", Q, False),
    "avatarSentada": ("Realistic photo of a friendly Brazilian female nutritionist around 40 in a white lab coat, sitting at a light wooden desk with a notebook and a bowl of fresh vegetables, bright clinic office. Waist up. No text, no logo.", Q, False),
    "pratoProduto": ("Overhead food photo on a light wooden table: a colorful healthy Brazilian plate with grilled fish, broccoli, sautéed kale, sweet potato and a slice of pineapple, beside a small card shaped like a red blood drop. Natural daylight, appetizing, realistic. No text.", L, False),
    "appMockup": ("Realistic photo of a hand holding a modern smartphone over a kitchen counter. The screen shows a clean nutrition app in Portuguese titled 'Seu Protocolo Tipo O' with a red blood drop icon, a green list 'Seu sangue aceita' and a red list 'Seu sangue rejeita'. Soft daylight.", P, False),
    "appPrint": ("Clean mobile app screenshot, portrait, in Brazilian Portuguese. Header with a red blood drop icon and the title 'Dieta do Sangue · Tipo O'. Sections: 'Cardápio de hoje' with breakfast, lunch and dinner cards with small food photos, a green chip 'Aceita' and a red chip 'Evitar'. Light background, rounded cards, red accent color.", P, False),
    "arg1": ("Flat lay photo: two small chalkboards on a light table, one with a green check over fresh fish, eggs and greens, the other with a red X over bread, corn and milk. Realistic, bright, no words.", L, False),
    "arg2": ("Flat lay photo of a weekly meal-prep: seven glass containers with colorful healthy Brazilian meals on a light table, a small calendar beside them. Bright, realistic, no text.", L, False),
    "arg3": ("Photo of a fresh green detox salad in a white bowl with cucumber, leafy greens, pineapple and lemon, on a light table in daylight. Realistic, no text.", L, False),
    "arg4": ("Photo of a reusable shopping bag full of fresh vegetables, fruits, eggs and fish on a kitchen counter, with a handwritten paper shopping list beside it (illegible). Realistic, bright.", L, False),
    "arg5": ("Photo of a woman's feet in sneakers standing on a bathroom scale on a light tiled floor, a measuring tape loosely on the floor beside it. Bright, realistic, no visible numbers.", L, False),
    "arg6": ("Photo of a smartphone on a table showing a WhatsApp-style group chat with many friendly messages and heart emojis (text unreadable), a cup of coffee next to it. Bright, realistic.", L, False),
    "landingFoto": ("Bright realistic photo: a colorful healthy plate of food on a light table, with four small red blood drop cards labeled O, A, B and AB arranged around the plate. Clean, appetizing, editorial.", Q, False),
}
ARGS = ["arg1", "arg2", "arg3", "arg4", "arg5", "arg6"]


def um(slot):
    prompt, size, ref = LOTE[slot]
    png = DIR / f"_png/{slot}.png"
    gerar(png, prompt, REF if ref else None, size)
    jpg = DIR / f"{slot}.jpg"
    subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "78", "-Z", "900", str(png), "--out", str(jpg)], capture_output=True, check=True)
    return slot


def preencher():
    html = ROOT / "site/sangue/index.html"
    s = html.read_text(encoding="utf-8")
    for slot in LOTE:
        if slot in ARGS or not (DIR / f"{slot}.jpg").exists():
            continue
        s, n = re.subn(rf'({slot}: )""', rf'\1"assets/{slot}.jpg"', s, count=1)
    if all((DIR / f"{a}.jpg").exists() for a in ARGS):
        s = s.replace('argumentos: ["", "", "", "", "", ""]', "argumentos: [" + ", ".join(f'"assets/{a}.jpg"' for a in ARGS) + "]")
    html.write_text(s, encoding="utf-8")


if __name__ == "__main__":
    alvo = sys.argv[1:] or [k for k in LOTE if not (DIR / f"{k}.jpg").exists()]
    with ThreadPoolExecutor(6) as ex:
        for f in [ex.submit(um, k) for k in alvo]:
            try:
                print("ok", f.result())
            except SystemExit as e:
                print("FALHOU", e)
            except Exception as e:
                print("FALHOU", e)
    preencher()
    print("CONFIG atualizado")
