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

      var closeTimer = null;

      function open() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        panel.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      }
      function close() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
      }
      // Small delay before closing on mouseleave, cancelled by open(): a
      // short, fast mouse move from the trigger to the panel can briefly
      // leave the .flyout box (e.g. crossing the gap above the panel), and
      // closing immediately on that would drop the menu before a click on
      // an item can land.
      function scheduleClose() {
        if (closeTimer) clearTimeout(closeTimer);
        closeTimer = setTimeout(close, 200);
      }

      wrap.addEventListener('mouseenter', open);
      wrap.addEventListener('mouseleave', scheduleClose);
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

  /* ------------------------------------------------------- placement quiz
     Score = number ticked, min(score, 6) looks up the recommendation.
     Statements are ordered by difficulty, so count is a proxy for
     "highest thing you can do" (see BEHAVIOR.md open question
     about using the highest-ticked index instead — noted for Linda). */
  var RESULTS = [
    { level: 'Beginning I', slug: 'beginning-i', body: "Start at the beginning, and enjoy it. This class is for true beginners and for anyone who took Spanish at school but still can't speak it. You'll acquire the top 100+ verbs and words through storytelling and finish able to talk about yourself in the present tense.", cta: 'See Beginning I' },
    { level: 'Beginning I', slug: 'beginning-i', body: 'Beginning I is still your class. You have a few words already, which will make the first weeks comfortable rather than easy, and you’ll build real spoken fluency in the present tense from there.', cta: 'See Beginning I' },
    { level: 'Beginning II', slug: 'beginning-ii', body: 'You can speak on familiar topics in the present, so Beginning II is the right jump: real language in real situations, the basic past tense from the first class, and everything from Beginning I reinforced.', cta: 'See Beginning II' },
    { level: 'Intermediate Fall', slug: 'intermediate-fall', body: 'You are ready for the intermediate track. Expect a review of the present indicative, then the past tense and a little subjunctive, all through stories and small-group talking rather than drills.', cta: 'See Intermediate Fall' },
    { level: 'Intermediate Spring', slug: 'intermediate-spring', body: 'You already narrate in the past and read comfortably, so Intermediate Spring fits: longer stories, longer reading, and more time speaking about the past and the future.', cta: 'See Intermediate Spring' },
    { level: 'Intermediate-Advanced', slug: 'intermediate-advanced', body: 'You belong in the top class: abstract ideas across multiple tenses, real novels, and discussion at pace. Storytelling and book club in one, and no grammar drills in sight.', cta: 'See Intermediate-Advanced' },
    { level: 'Intermediate-Advanced', slug: 'intermediate-advanced', body: 'You can do everything on the list, so come to Intermediate-Advanced for the conversation practice and the reading, or email Profe Linda about the in-person storytelling and book club.', cta: 'See Intermediate-Advanced' }
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
      ctaEl.href = 'all-classes.html#' + r.slug;
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
    initPlacement();
  });
})();
