#!/usr/bin/env python3
"""Preview dist/ the way GitHub Pages serves it.

    python3 scripts/build.py /lahee-portfolio && python3 scripts/serve.py /lahee-portfolio

Then open http://localhost:8000/lahee-portfolio/. Like Pages, /works serves
works.html and unknown paths get 404.html.
"""
import http.server
import os
import sys

DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')
BASE = (sys.argv[1] if len(sys.argv) > 1 else '').rstrip('/')
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=DIST, **kw)

    def send_head(self):
        path = self.path.split('?', 1)[0].split('#', 1)[0]
        if not path.startswith(BASE + '/') and path != BASE:
            return self.not_found()
        rel = path[len(BASE):] or '/'
        for candidate in (rel, rel + '.html', rel.rstrip('/') + '/index.html'):
            full = self.translate_path(candidate)
            if os.path.isfile(full):
                self.path = candidate
                return super().send_head()
        return self.not_found()

    def not_found(self):
        with open(os.path.join(DIST, '404.html'), 'rb') as f:
            body = f.read()
        self.send_response(404)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)
        return None


http.server.ThreadingHTTPServer(('', PORT), Handler).serve_forever()
