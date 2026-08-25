/* Spectrum · main.js
   Sem dependencia externa. Tudo degrada bem se o JS falhar. */

(function () {
  "use strict";

  /* marca que o JS esta ativo: so entao a revelacao pode esconder conteudo */
  document.documentElement.classList.add("js");

  /* --- topo ganha linha ao rolar --- */
  var topo = document.querySelector(".topo");
  if (topo) {
    var marcar = function () {
      topo.dataset.rolado = window.scrollY > 8 ? "1" : "0";
    };
    marcar();
    window.addEventListener("scroll", marcar, { passive: true });
  }

  /* --- menu movel --- */
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var aberto = nav.dataset.aberto === "1";
      nav.dataset.aberto = aberto ? "0" : "1";
      btn.setAttribute("aria-expanded", String(!aberto));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.dataset.aberto = "0";
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- barra de espectro: alturas estaveis, geradas uma vez --- */
  var espectro = document.querySelector(".espectro");
  if (espectro) {
    var n = window.innerWidth < 680 ? 34 : 68;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < n; i++) {
      var t = i / (n - 1);
      /* envelope: baixo nas pontas, cheio no meio, com variacao pseudo aleatoria estavel */
      var env = Math.pow(Math.sin(Math.PI * t), 0.7);
      var ruido =
        0.55 +
        0.45 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
      var h = Math.max(6, Math.round(env * ruido * 100));
      var s = document.createElement("span");
      s.style.setProperty("--h", h + "%");
      s.style.setProperty("--d", 220 + i * 11 + "ms");
      frag.appendChild(s);
    }
    espectro.appendChild(frag);
  }

  /* --- envio do formulario sem recarregar a pagina --- */
  var form = document.getElementById("form-orcamento");
  var estado = document.getElementById("form-estado");
  if (form && estado) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var botao = form.querySelector("button[type=submit]");
      var texto = botao.textContent;
      botao.disabled = true;
      botao.textContent = "Enviando";
      estado.removeAttribute("data-tipo");
      estado.textContent = "";

      var dados = new FormData(form);
      /* junta as caixas marcadas numa linha so, para chegar legivel no e-mail */
      var marcadas = Array.prototype.map.call(
        form.querySelectorAll(".opcoes input:checked"), function (i) { return i.value; }
      );
      dados.delete("Precisa de");
      dados.append("Precisa de", marcadas.length ? marcadas.join(", ") : "Não informado");

      fetch(form.action, {
        method: "POST",
        body: dados,
        headers: { Accept: "application/json" }
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (r) {
          if (r && r.success) {
            form.reset();
            estado.dataset.tipo = "ok";
            estado.textContent =
              "Solicitação enviada. Respondemos em até um dia útil no WhatsApp e no e-mail informados.";
          } else {
            throw new Error("falha");
          }
        })
        .catch(function () {
          estado.dataset.tipo = "erro";
          estado.innerHTML =
            'Não foi possível enviar. Chame no ' +
            '<a href="https://wa.me/5511917513749" rel="noopener" style="color:inherit;text-decoration:underline">WhatsApp (11) 91751-3749</a>' +
            ' ou escreva para ' +
            '<a href="mailto:comercial@spectrument.com.br" style="color:inherit;text-decoration:underline">comercial@spectrument.com.br</a>.';
        })
        .then(function () {
          botao.disabled = false;
          botao.textContent = texto;
        });
    });
  }

  /* --- revelacao por rolagem --- */
  var alvos = document.querySelectorAll("[data-revela]");
  if (!("IntersectionObserver" in window)) {
    alvos.forEach(function (el) { el.classList.add("visivel"); });
    return;
  }
  var obs = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visivel");
          obs.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
  );
  alvos.forEach(function (el) { obs.observe(el); });
})();
