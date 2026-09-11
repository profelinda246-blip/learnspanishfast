/* ==========================================================================
   Learn Spanish Fast hoy — shared behaviour
   Vanilla JS, no build step. Split by feature; each is a no-op if its
   markup isn't present on the page, so this one file can be shared.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------ courses flyout
     Opens on hover (desktop) and on focus/click (keyboard + touch).
     Closes on mouseleave, Escape, or a click outside. This fixes the
     accessibility gap the design handoff explicitly flagged: the
     prototype was hover-only with no keyboard or touch support. */
  function initFlyouts() {
    document.querySelectorAll('.flyout').forEach(function (wrap) {
      var trigger = wrap.querySelector('.flyout-trigger');
      var panel = wrap.querySelector('.flyout-panel');
      if (!trigger || !panel) return;

      function open() {
        panel.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
      function close() {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }

      wrap.addEventListener('mouseenter', open);
      wrap.addEventListener('mouseleave', close);
      trigger.addEventListener('focus', open);
      wrap.addEventListener('focusout', function (e) {
        if (!wrap.contains(e.relatedTarget)) close();
      });
      wrap.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(); trigger.focus(); }
      });
      document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target)) close();
      });
    });
  }

  /* --------------------------------------------------------- FAQ accordion
     One row open at a time; clicking the open row closes it. */
  function initFaq() {
    var rows = document.querySelectorAll('.faq-row');
    if (!rows.length) return;

    rows.forEach(function (row) {
      var btn = row.querySelector('.faq-q');
      var sign = row.querySelector('.faq-sign');
      var answer = row.querySelector('.faq-a');
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        rows.forEach(function (r) {
          var b = r.querySelector('.faq-q');
          var s = r.querySelector('.faq-sign');
          var a = r.querySelector('.faq-a');
          b.setAttribute('aria-expanded', 'false');
          s.textContent = '+';
          a.hidden = true;
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          sign.textContent = '−';
          answer.hidden = false;
        }
      });
    });
  }

  /* ------------------------------------------------------------------ cart
     Persisted to localStorage so a class picked earlier survives reload
     and navigation between pages ("Add to cart" -> "All Classes" ->
     back). Checkout stays a mailto:, same as the design handoff: real
     payment is a follow-up (Stripe Payment Links), not built here. */
  var CART_KEY = 'lsf-cart-v1';

  function loadCart() {
    try {
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveCart(cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function initCart() {
    var addButtons = document.querySelectorAll('[data-add-to-cart]');
    var cartList = document.getElementById('cart-items');
    var cartHeading = document.getElementById('cart-heading');
    var cartNote = document.getElementById('cart-note');
    if (!addButtons.length && !cartList) return;

    var cart = loadCart();

    function render() {
      var total = cart.reduce(function (sum, c) { return sum + c.amount; }, 0);

      addButtons.forEach(function (btn) {
        var name = btn.getAttribute('data-add-to-cart');
        var already = cart.some(function (c) { return c.name === name; });
        btn.textContent = already ? 'Added to cart' : 'Add to cart';
        btn.disabled = already;
      });

      if (cartList) {
        cartList.innerHTML = '';
        cart.forEach(function (item, i) {
          var row = document.createElement('div');
          row.className = 'cart-item';
          row.innerHTML =
            '<span class="cart-item-name"></span>' +
            '<span class="cart-item-right">' +
              '<span class="cart-item-price"></span>' +
              '<button type="button" class="pill pill--ghost-ink" style="padding:7px 12px;font-size:13px" data-remove="' + i + '">Remove</button>' +
            '</span>';
          row.querySelector('.cart-item-name').textContent = item.name;
          row.querySelector('.cart-item-price').textContent = item.price;
          cartList.appendChild(row);
        });
        cartList.querySelectorAll('[data-remove]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var idx = parseInt(btn.getAttribute('data-remove'), 10);
            cart.splice(idx, 1);
            saveCart(cart);
            render();
          });
        });
      }

      if (cartHeading) {
        cartHeading.textContent = cart.length
          ? 'Total $' + total + ' for ' + cart.length + (cart.length === 1 ? ' class' : ' classes')
          : 'Your cart is empty';
      }
      if (cartNote) {
        cartNote.textContent = cart.length
          ? "Payment is handled by email for now: send Profe Linda your class choice and she'll reply with the payment link, your curriculum and the Zoom code the weekend before class starts."
          : 'Add a class above and it will appear here. Books and the $5 audiobook subscription are bought separately, in the two steps below.';
      }
    }

    addButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var name = btn.getAttribute('data-add-to-cart');
        var price = btn.getAttribute('data-price');
        if (cart.some(function (c) { return c.name === name; })) return;
        cart.push({ name: name, price: price, amount: parseInt(price.replace('$', ''), 10) });
        saveCart(cart);
        render();
      });
    });

    render();
  }

  /* ------------------------------------------------------- placement quiz
     Score = number ticked, min(score, 6) looks up the recommendation.
     Statements are ordered by difficulty, so count is a proxy for
     "highest thing you can do" (see BEHAVIOR.md open question
     about using the highest-ticked index instead — noted for Linda). */
  var RESULTS = [
    { level: 'Beginning I', body: "Start at the beginning, and enjoy it. This class is for true beginners and for anyone who took Spanish at school but still can't speak it. You'll acquire the top 100+ verbs and words through storytelling and finish able to talk about yourself in the present tense.", cta: 'See Beginning I' },
    { level: 'Beginning I', body: 'Beginning I is still your class. You have a few words already, which will make the first weeks comfortable rather than easy, and you’ll build real spoken fluency in the present tense from there.', cta: 'See Beginning I' },
    { level: 'Beginning II', body: 'You can speak on familiar topics in the present, so Beginning II is the right jump: real language in real situations, the basic past tense from the first class, and everything from Beginning I reinforced.', cta: 'See Beginning II' },
    { level: 'Intermediate Fall', body: 'You are ready for the intermediate track. Expect a review of the present indicative, then the past tense and a little subjunctive, all through stories and small-group talking rather than drills.', cta: 'See Intermediate Fall' },
    { level: 'Intermediate Spring', body: 'You already narrate in the past and read comfortably, so Intermediate Spring fits: longer stories, longer reading, and more time speaking about the past and the future.', cta: 'See Intermediate Spring' },
    { level: 'Intermediate-Advanced', body: 'You belong in the top class: abstract ideas across multiple tenses, real novels, and discussion at pace. Storytelling and book club in one, and no grammar drills in sight.', cta: 'See Intermediate-Advanced' },
    { level: 'Intermediate-Advanced', body: 'You can do everything on the list, so come to Intermediate-Advanced for the conversation practice and the reading, or email Profe Linda about the in-person storytelling and book club.', cta: 'See Intermediate-Advanced' }
  ];

  function initPlacement() {
    var rows = document.querySelectorAll('.check-row');
    if (!rows.length) return;

    var kicker = document.getElementById('result-kicker');
    var levelEl = document.getElementById('result-level');
    var bodyEl = document.getElementById('result-body');
    var ctaEl = document.getElementById('result-cta');
    var resetBtn = document.getElementById('result-reset');

    var picked = new Set();

    function render() {
      rows.forEach(function (row, i) {
        var dot = row.querySelector('.check-dot');
        var isPicked = picked.has(i);
        dot.classList.toggle('is-checked', isPicked);
        dot.textContent = isPicked ? '✓' : '';
        row.setAttribute('aria-pressed', isPicked ? 'true' : 'false');
      });

      var score = picked.size;
      var r = RESULTS[Math.min(score, 6)];
      kicker.textContent = score === 0 ? 'Tick the statements above' : 'Ticked ' + score + ' of 6 · suggested class';
      levelEl.textContent = r.level;
      bodyEl.textContent = r.body;
      ctaEl.textContent = r.cta;
    }

    rows.forEach(function (row, i) {
      row.addEventListener('click', function () {
        if (picked.has(i)) picked.delete(i); else picked.add(i);
        render();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        picked.clear();
        render();
      });
    }

    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFlyouts();
    initFaq();
    initCart();
    initPlacement();
  });
})();
