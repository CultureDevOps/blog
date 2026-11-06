"""Run the Python examples from both published language versions."""
import pathlib
import re
import subprocess
import sys
import tempfile

root = pathlib.Path(__file__).resolve().parents[1]
articles = [
    root / "data/blog/fr/gitlab-ci-python-sans-deploiement.mdx",
    root / "data/blog/en/gitlab-ci-python-tests-without-deployment.mdx",
]

for article in articles:
    text = article.read_text(encoding="utf-8")
    snippets = dict(re.findall(r"```python:([^\n]+)\n(.*?)\n```", text, re.S))
    assert set(snippets) == {"app.py", "test_app.py"}, article
    assert re.search(r"^draft: false$", text.split("---")[1], re.M), article
    with tempfile.TemporaryDirectory() as directory:
        for name, source in snippets.items():
            pathlib.Path(directory, name).write_text(source + "\n", encoding="utf-8")
        subprocess.run(
            [sys.executable, "-m", "unittest", "discover", "-s", ".", "-p", "test_*.py", "-v"],
            cwd=directory,
            check=True,
        )
        subprocess.run(
            [sys.executable, "-m", "compileall", "-q", "app.py", "test_app.py"],
            cwd=directory,
            check=True,
        )
    print(f"Validated bilingual Python examples: {article.name}")
