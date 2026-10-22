// Serves the site's Storyblok API calls from saved JSON in /storyblok-api/,
// so the page renders the same without reaching Storyblok.
// keyFor() must match api_key() in scripts/mirror.py.
(function () {
  var API = 'https://api-us.storyblok.com/v2/cdn/';
  var ASSETS = 'https://a-us.storyblok.com/';
  var script = document.currentScript;
  var base = script ? script.src.replace(/\/storyblok-shim\.js(\?.*)?$/, '') : '';

  function keyFor(url) {
    var u = new URL(url);
    var parts = [u.pathname.slice('/v2/cdn/'.length).replace(/^\/+|\/+$/g, '').split('/').join('__')];
    var keys = [];
    u.searchParams.forEach(function (v, k) { if (k !== 'token' && k !== 'cv') keys.push(k); });
    keys.sort().forEach(function (k) { parts.push(k + '=' + u.searchParams.get(k)); });
    return parts.join('--').replace(/[^A-Za-z0-9._=-]/g, '_') + '.json';
  }

  var realFetch = window.fetch.bind(window);
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : input && input.url;
    if (!url || url.indexOf(API) !== 0) return realFetch(input, init);
    return realFetch(base + '/storyblok-api/' + keyFor(url)).then(function (res) {
      if (!res.ok) return res;
      return res.text().then(function (text) {
        return new Response(text.split(ASSETS).join(base + '/storyblok/'), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      });
    });
  };
})();
