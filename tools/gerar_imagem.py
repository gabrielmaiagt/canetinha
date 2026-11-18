"""Gera imagens com a API da OpenAI (gpt-image-2) e salva em disco.

Uso:
  python3 tools/gerar_imagem.py SAIDA.png "prompt" [--ref foto.png] [--size 1024x1536] [--quality medium]

Com --ref, usa o endpoint de edição: a foto de referência mantém a mesma pessoa.
A chave vem do .env na raiz do projeto (OPENAI_API_KEY), nunca do código.
"""
import argparse, base64, json, os, pathlib, sys, urllib.request, uuid

MODELO = os.environ.get("IMG_MODEL", "gpt-image-2")
ROOT = pathlib.Path(__file__).resolve().parent.parent


def chave():
    if os.environ.get("OPENAI_API_KEY"):
        return os.environ["OPENAI_API_KEY"]
    env = ROOT / ".env"
    for linha in env.read_text().splitlines() if env.exists() else []:
        if linha.startswith("OPENAI_API_KEY="):
            return linha.split("=", 1)[1].strip()
    sys.exit("OPENAI_API_KEY não encontrada no .env")


def multipart(campos, arquivos):
    b = uuid.uuid4().hex
    corpo = b""
    for k, v in campos.items():
        corpo += f'--{b}\r\nContent-Disposition: form-data; name="{k}"\r\n\r\n{v}\r\n'.encode()
    for k, p in arquivos:
        corpo += f'--{b}\r\nContent-Disposition: form-data; name="{k}"; filename="{p.name}"\r\nContent-Type: image/png\r\n\r\n'.encode() + p.read_bytes() + b"\r\n"
    return corpo + f"--{b}--\r\n".encode(), f"multipart/form-data; boundary={b}"


def gerar(saida, prompt, ref=None, size="1024x1536", quality="medium"):
    h = {"Authorization": f"Bearer {chave()}"}
    if ref:
        corpo, ct = multipart({"model": MODELO, "prompt": prompt, "size": size, "quality": quality}, [("image[]", pathlib.Path(ref))])
        url = "https://api.openai.com/v1/images/edits"
    else:
        corpo = json.dumps({"model": MODELO, "prompt": prompt, "size": size, "quality": quality, "n": 1}).encode()
        ct, url = "application/json", "https://api.openai.com/v1/images/generations"
    req = urllib.request.Request(url, data=corpo, headers={**h, "Content-Type": ct})
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            dados = json.load(r)
    except urllib.error.HTTPError as e:
        sys.exit(f"Erro {e.code}: {e.read().decode()[:500]}")
    out = pathlib.Path(saida)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_bytes(base64.b64decode(dados["data"][0]["b64_json"]))
    print("ok", out)


if __name__ == "__main__":
    a = argparse.ArgumentParser()
    a.add_argument("saida"); a.add_argument("prompt")
    a.add_argument("--ref"); a.add_argument("--size", default="1024x1536"); a.add_argument("--quality", default="medium")
    x = a.parse_args()
    gerar(x.saida, x.prompt, x.ref, x.size, x.quality)
