(function () {
  var SAIDA = "https://www.google.com/search?q=previs%C3%A3o+do+tempo+curitiba";
  var toques = [];

  function sair() {
    document.documentElement.style.display = "none";
    document.title = "Previsão do tempo";
    window.location.replace(SAIDA);
  }

  window.addEventListener(
    "keydown",
    function (e) {
      if (e.key !== "Escape") return;
      var agora = Date.now();
      toques = toques.filter(function (t) {
        return agora - t < 1500;
      });
      toques.push(agora);
      if (toques.length >= 3) sair();
    },
    true,
  );

  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-sair], a[data-interno]");
    if (!link || e.defaultPrevented || e.button !== 0) return;
    if (link.hasAttribute("data-sair")) {
      e.preventDefault();
      sair();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    window.location.replace(link.href);
  });
})();
