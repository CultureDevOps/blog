"""Execute the Python snippets readers copy from the OPS-011 article."""
import pathlib
import re
import subprocess
import sys
import tempfile

article = pathlib.Path(__file__).resolve().parents[1] / "data/blog/fr/gitlab-ci-python-sans-deploiement.mdx"
text = article.read_text(encoding="utf-8")
snippets = dict(re.findall(r"```python:([^\n]+)\n(.*?)\n```", text, re.S))
assert set(snippets) == {"app.py", "test_app.py"}
assert "draft: true" in text.split("---")[1]
with tempfile.TemporaryDirectory() as directory:
    for name, source in snippets.items():
        pathlib.Path(directory, name).write_text(source + "\n", encoding="utf-8")
    subprocess.run([sys.executable, "-m", "unittest", "discover", "-s", ".", "-p", "test_*.py", "-v"], cwd=directory, check=True)
    subprocess.run([sys.executable, "-m", "compileall", "-q", "app.py", "test_app.py"], cwd=directory, check=True)
