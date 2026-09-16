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
    { level: 'Intermediate', slug: 'intermediate', body: 'You are ready for Intermediate (prerequisite: Beginning I & II). Expect a review of the present indicative, then the past tense, all through stories and small-group talking rather than drills.', cta: 'See Intermediate' },
    { level: 'Advanced I', slug: 'advanced-i', body: "You already narrate in the past and read comfortably, so Advanced I fits: a guided conversation course entirely in Spanish, across the past, present, future and subjunctive.", cta: 'See Advanced I' },
    { level: 'Advanced II', slug: 'advanced-ii', body: 'You belong in the top class: abstract ideas across multiple tenses, real conversation at pace, and no grammar drills in sight. Advanced II continues Advanced I and needs teacher approval.', cta: 'See Advanced II' },
    { level: 'Advanced II', slug: 'advanced-ii', body: 'You can do everything on the list, so come talk to Profe Linda about Advanced II or the in-person storytelling and book club.', cta: 'See Advanced II' }
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

  /* ---------------------------------------------------------- thank you
     One page (thank-you.html) shared by all 5 Stripe Payment Links,
     each configured in the Stripe Dashboard to redirect here with
     ?class=<slug> after a successful payment. Reads the slug and
     fills in that class's recap + materials; falls back to a generic
     message if the slug is missing or unrecognized. */
  function initThankYou() {
    var recap = document.getElementById('ty-recap');
    if (!recap) return;

    var CLASSES = {
      'beginning-i': {
        name: 'Beginning I',
        format: 'In person at Cuesta College, SLO, or live via Zoom',
        meets: 'Thursdays, 5:20 to 7:00pm · 7 weeks',
        term: 'Aug 27 to Oct 8, 2026',
        novel: 'Pobre Ana (paperback).',
        workbook: 'Amazon: LSF Beginning I curriculum — link coming soon. Email Profe Linda if you need it sooner.'
      },
      'beginning-ii': {
        name: 'Beginning II',
        meets: 'Thursdays, 5:20 to 7:00pm · 7 weeks',
        term: 'Oct 22 to Dec 10, 2026',
        novel: 'Las Aventuras en el Día de los Muertos.',
        workbook: 'Amazon: LSF curriculum book — link coming soon. Email Profe Linda if you need it sooner.'
      },
      'intermediate': {
        name: 'Intermediate',
        prereq: 'Beginning I & II',
        meets: 'Wednesdays, 5:20 to 7:00pm · 6 weeks',
        term: 'Sep 2 to Oct 7, 2026',
        novel: 'Pobre Ana Bailó Tango (paperback/audiobook).',
        workbook: 'Amazon: LSF curriculum book — link coming soon. Email Profe Linda if you need it sooner.'
      },
      'advanced-i': {
        name: 'Advanced I',
        prereq: 'Comfortable with the subjunctive and most tenses',
        meets: 'Tuesdays, time to be confirmed · 5 weeks',
        term: 'Sep 8 to Oct 6, 2026',
        novel: 'Vida o Muerte en el Cusco, by Blaine Ray (paperback & audiobook).',
        workbook: 'No separate workbook for Advanced I/II — it is all guided conversation.',
        continuation: {
          text: 'Advanced I & II are one continuous course — same novel, same group, no new topic. If you haven’t already, register for Advanced II too so your seat carries through.',
          href: 'https://buy.stripe.com/6oUaEQ1fafEz74pbCycZa05',
          linkText: 'Register for Advanced II →'
        }
      },
      'advanced-ii': {
        name: 'Advanced II',
        prereq: 'Advanced I, subjunctive comfort, plus teacher approval',
        meets: 'Tuesdays, time to be confirmed · 5 weeks',
        term: 'Oct 20 to Nov 17, 2026',
        novel: 'Vida o Muerte en el Cusco, by Blaine Ray — same novel, continued.',
        workbook: 'No separate workbook for Advanced I/II — it is all guided conversation.'
      }
    };

    var slug = new URLSearchParams(location.search).get('class');
    var data = slug && CLASSES[slug];
    var materials = document.getElementById('ty-materials');
    var fallback = document.getElementById('ty-fallback');

    if (!data) {
      recap.hidden = true;
      if (materials) materials.hidden = true;
      if (fallback) fallback.hidden = false;
      return;
    }

    document.getElementById('ty-heading').textContent = 'Gracias, ' + data.name + '!';
    document.getElementById('ty-lead').textContent =
      'You’re registered for ' + data.name + '. We’ll send the Zoom link and reading guide before your first class.';
    document.getElementById('ty-meets').textContent = data.meets;
    document.getElementById('ty-term').textContent = data.term;
    document.getElementById('ty-novel').textContent = data.novel;
    document.getElementById('ty-workbook').textContent = data.workbook;

    if (data.format) {
      document.getElementById('ty-format-row').hidden = false;
      document.getElementById('ty-format').textContent = data.format;
    }
    if (data.prereq) {
      document.getElementById('ty-prereq-row').hidden = false;
      document.getElementById('ty-prereq').textContent = data.prereq;
    }
    if (data.continuation) {
      var wrap = document.getElementById('ty-continuation-wrap');
      var note = document.getElementById('ty-continuation');
      wrap.hidden = false;
      note.textContent = data.continuation.text + ' ';
      var link = document.createElement('a');
      link.href = data.continuation.href;
      link.textContent = data.continuation.linkText;
      link.style.color = 'inherit';
      link.style.textDecoration = 'underline';
      note.appendChild(link);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    initFlyouts();
    initFaq();
    initPlacement();
    initThankYou();
  });
})();
