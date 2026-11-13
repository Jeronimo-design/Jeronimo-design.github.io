// Selector de idioma (español / English). Se carga en <head> para no mostrar un idioma y luego cambiarlo. Sin cookies: solo recuerda la elección en este navegador.
(function () {
  var root = document.documentElement;
  var pick = function (lang) {
    lang = lang === 'en' ? 'en' : 'es';
    root.setAttribute('data-lang', lang);
    root.lang = lang;
    var t = root.getAttribute('data-title-' + lang);
    if (t) document.title = t;
    var d = document.querySelector('meta[name="description"]');
    var dl = root.getAttribute('data-desc-' + lang);
    if (d && dl) d.setAttribute('content', dl);
    var mark = function () {
      document.querySelectorAll('.lang button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-set') === lang));
      });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mark);
    else mark();
    try { localStorage.setItem('jea-web-lang', lang); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  };
  var q = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('jea-web-lang'); } catch (e) { /* idem */ }
  var nav = (navigator.language || 'es').slice(0, 2);
  pick(q || saved || (nav === 'es' ? 'es' : 'en'));
  // Anclas equivalentes entre idiomas (p. ej. un enlace a #eliminar con la página en inglés)
  var alias = { eliminar: 'delete', delete: 'eliminar' };
  var follow = function () {
    var id = location.hash.slice(1);
    var el = id && document.getElementById(id);
    if (el && el.offsetParent === null && alias[id]) {
      var other = document.getElementById(alias[id]);
      if (other) other.scrollIntoView();
    }
  };
  window.addEventListener('load', follow);
  window.addEventListener('hashchange', follow);
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.lang button');
    if (!b) return;
    pick(b.getAttribute('data-set'));
    follow();
    if (q) history.replaceState(null, '', location.pathname + location.hash);
  });
})();
