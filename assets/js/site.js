/**
 * Science Park Engineering — site behaviour (no dependencies).
 * Product data lives in products.js.
 */
(function () {
  'use strict';

  var PRODUCTS = window.SPE_PRODUCTS || [];
  var CATEGORIES = window.SPE_CATEGORIES || [];
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function productNo(p) { return 'No. ' + String(p.id).padStart(2, '0'); }
  function catLabel(key) {
    var match = CATEGORIES.filter(function (c) { return c.key === key; })[0];
    return match ? match.label : '';
  }

  /* ---------- Smooth scrolling (Lenis) ---------- */

  var lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ lerp: 0.085, wheelMultiplier: 1, smoothWheel: true });
    (function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    })(performance.now());
  }

  function headerOffset() {
    var h = document.querySelector('.site-header');
    var t = document.querySelector('.toolbar');
    var sticky = t && getComputedStyle(t).position === 'sticky';
    return (h ? h.offsetHeight : 0) + (sticky ? t.offsetHeight : 0) + 16;
  }

  // Same-page anchor links glide to their section
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link || !lenis) return;
    var id = link.getAttribute('href').slice(1);
    var target = id && document.getElementById(id);
    if (!target || target.closest('dialog')) return;
    if (document.getElementById('catalogue-grid') && link.classList.contains('pcard')) return;
    e.preventDefault();
    if (id === 'main') lenis.scrollTo(0, { duration: 1.4 });
    else lenis.scrollTo(target, { offset: -headerOffset(), duration: 1.4 });
    if (id !== 'main') history.pushState(null, '', '#' + id);
  });

  /* ---------- Header: mobile menu + shadow when scrolled ---------- */

  var header = $('.site-header');
  var nav = $('.nav');
  var toggle = $('.nav-toggle');

  function setMenu(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    // Swap the icon's class rather than replacing the element: replacing it detaches
    // the clicked node, and the outside-click handler below would then close the menu.
    var icon = toggle.querySelector('i');
    if (icon) icon.className = open ? 'bi bi-x-lg' : 'bi bi-list';
  }
  if (nav && toggle) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) {
      if (!e.target.isConnected || e.target.closest('.site-header')) return;
      setMenu(false);
    });
  }

  var toTop = $('.to-top');
  var progress = null;
  if (header) {
    progress = document.createElement('span');
    progress.className = 'scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    header.appendChild(progress);
  }
  function onScroll() {
    var y = window.scrollY;
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--progress', max > 0 ? Math.min(y / max, 1).toFixed(4) : 0);
    }
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Cursor spotlight on cards ---------- */

  document.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    var card = e.target.closest && e.target.closest('.pcard, .service, .value, .panel');
    if (!card) return;
    var rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
    card.style.setProperty('--my', (e.clientY - rect.top) + 'px');
  }, { passive: true });

  /* ---------- Highlight the nav link of the section in view ---------- */

  var spyLinks = $$('.nav__links a[href^="#"]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        spyLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyLinks.forEach(function (link) {
      var section = document.getElementById(link.getAttribute('href').slice(1));
      if (section) spy.observe(section);
    });
  }

  /* ---------- Reveal on scroll ---------- */

  // Once an element has faded in, drop the reveal classes so its stagger delay
  // no longer applies to hover transitions.
  function settle(el) {
    setTimeout(function () { el.classList.remove('reveal', 'is-in'); }, 1600);
  }

  var revealObserver = null;
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
        settle(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }
  function watchReveals(root) {
    $$('.reveal:not(.is-in)', root).forEach(function (el) {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.remove('reveal');
    });
  }

  /* ---------- Counters ---------- */

  function runCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = target.toLocaleString('en-US'); return; }
    var start = null;
    var duration = 1400;
    function tick(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-US');
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Product cards ---------- */

  function cardHTML(p, hrefBase, index) {
    return '' +
      '<a class="pcard reveal" href="' + hrefBase + '#' + esc(p.slug) + '" style="--d:' + Math.min(index, 8) * 50 + 'ms">' +
        '<div class="pcard__media' + (p.dark ? ' is-dark' : '') + '">' +
          '<span class="pcard__no">' + productNo(p) + '</span>' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">' +
        '</div>' +
        '<div class="pcard__body">' +
          '<span class="pcard__cat">' + esc(catLabel(p.cat)) + '</span>' +
          '<h3 class="pcard__name">' + esc(p.name) + '</h3>' +
          '<p class="pcard__blurb">' + esc(p.blurb) + '</p>' +
          '<span class="pcard__more">View details <i class="bi bi-arrow-up-right" aria-hidden="true"></i></span>' +
        '</div>' +
      '</a>';
  }

  /* Home page: featured products */
  var featuredGrid = $('#featured-grid');
  if (featuredGrid) {
    featuredGrid.innerHTML = PRODUCTS
      .filter(function (p) { return p.featured; })
      .slice(0, 8)
      .map(function (p, i) { return cardHTML(p, 'products.html', i); })
      .join('');
  }
  $$('[data-product-count]').forEach(function (el) { el.textContent = PRODUCTS.length; });

  /* ---------- Catalogue page ---------- */

  var grid = $('#catalogue-grid');
  if (grid) {
    var chipsEl = $('#catalogue-chips');
    var searchEl = $('#catalogue-search');
    var countEl = $('#catalogue-count');
    var dialog = $('#product-dialog');
    var state = { cat: 'all', q: '' };
    var visible = PRODUCTS.slice();
    var current = null;

    var chipData = [{ key: 'all', label: 'All products', n: PRODUCTS.length }].concat(
      CATEGORIES.map(function (c) {
        return {
          key: c.key,
          label: c.label,
          n: PRODUCTS.filter(function (p) { return p.cat === c.key; }).length
        };
      }).filter(function (c) { return c.n > 0; })
    );
    chipsEl.innerHTML = chipData.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + esc(c.key) + '" aria-pressed="' + (c.key === 'all') + '">' +
        esc(c.label) + ' <span>' + c.n + '</span></button>';
    }).join('');

    function render() {
      var q = state.q.trim().toLowerCase();
      visible = PRODUCTS.filter(function (p) {
        if (state.cat !== 'all' && p.cat !== state.cat) return false;
        if (!q) return true;
        return (p.name + ' ' + p.blurb + ' ' + p.desc + ' ' + catLabel(p.cat) + ' ' + p.uses.join(' '))
          .toLowerCase().indexOf(q) !== -1;
      });

      if (visible.length) {
        grid.innerHTML = visible.map(function (p, i) { return cardHTML(p, '', i); }).join('');
      } else {
        grid.innerHTML = '<div class="empty"><strong>No products match that search</strong>' +
          '<p>Try a different word, or ask us — we supply far more than is listed here.</p>' +
          '<a class="btn btn--primary btn--sm" href="index.html#contact">Ask about a product</a></div>';
      }
      countEl.textContent = 'Showing ' + visible.length + ' of ' + PRODUCTS.length + ' products';
      watchReveals(grid);
    }

    chipsEl.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      state.cat = chip.getAttribute('data-cat');
      $$('.chip', chipsEl).forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      render();
    });
    searchEl.addEventListener('input', function () { state.q = searchEl.value; render(); });

    /* Product detail dialog, driven by the URL hash so every product is linkable */
    function fill(p) {
      current = p;
      var media = $('.pdialog__media', dialog);
      media.classList.toggle('is-dark', !!p.dark);
      $('.pdialog__no', dialog).textContent = productNo(p);
      var img = $('img', media);
      img.src = p.img;
      img.alt = p.name;
      $('#pd-cat', dialog).textContent = catLabel(p.cat);
      $('#pd-title', dialog).textContent = p.name;
      $('#pd-desc', dialog).textContent = p.desc;
      $('#pd-uses', dialog).innerHTML = p.uses.map(function (u) {
        return '<li><i class="bi bi-check2" aria-hidden="true"></i><span>' + esc(u) + '</span></li>';
      }).join('');
      $('#pd-quote', dialog).href = 'index.html?product=' + encodeURIComponent(p.name) + '#contact';
      $('.pdialog__body', dialog).scrollTop = 0;
      $('.pdialog__inner', dialog).scrollTop = 0;
      document.title = p.name + ' — Science Park Engineering';
    }

    function bySlug(slug) {
      return PRODUCTS.filter(function (p) { return p.slug === slug; })[0];
    }

    function syncFromHash() {
      var p = bySlug(decodeURIComponent(location.hash.slice(1)));
      if (p) {
        fill(p);
        if (!dialog.open) {
          dialog.showModal();
          if (lenis) lenis.stop();
        }
      } else if (dialog.open) {
        dialog.close();
      }
    }

    function step(dir) {
      var list = visible.indexOf(current) !== -1 ? visible : PRODUCTS;
      var i = list.indexOf(current);
      var next = list[(i + dir + list.length) % list.length];
      history.replaceState(null, '', '#' + next.slug);
      fill(next);
    }

    dialog.addEventListener('close', function () {
      if (lenis) lenis.start();
      document.title = dialog.getAttribute('data-page-title');
      if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    });
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close(); // click on the backdrop
    });
    $('.pdialog__close', dialog).addEventListener('click', function () { dialog.close(); });
    $('#pd-prev', dialog).addEventListener('click', function () { step(-1); });
    $('#pd-next', dialog).addEventListener('click', function () { step(1); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    dialog.setAttribute('data-page-title', document.title);
    window.addEventListener('hashchange', syncFromHash);
    render();
    syncFromHash();
  }

  /* ---------- Product line page: live search ---------- */

  var lineSearch = $('#line-search');
  if (lineSearch) {
    var lineEmpty = $('#line-empty');
    var lineCount = $('#line-count');
    var lineTotal = $$('#equipment [data-line-item]').length;
    lineSearch.addEventListener('input', function () {
      var q = lineSearch.value.trim().toLowerCase();
      var any = false;
      $$('[data-line-section]').forEach(function (section) {
        var sectionHas = false;
        $$('[data-line-group]', section).forEach(function (group) {
          var heading = $('h3', group);
          var groupMatches = !!q && group.classList.contains('glass-card') && heading.textContent.toLowerCase().indexOf(q) !== -1;
          var groupHas = false;
          $$('[data-line-item]', group).forEach(function (item) {
            var show = !q || groupMatches || item.textContent.toLowerCase().indexOf(q) !== -1;
            item.hidden = !show;
            if (show) groupHas = true;
          });
          group.hidden = !groupHas;
          if (groupHas) sectionHas = true;
        });
        section.hidden = !sectionHas;
        if (sectionHas) any = true;
      });
      lineEmpty.hidden = any;
      if (lineCount) {
        var shown = $$('#equipment [data-line-item]').filter(function (el) { return !el.hidden; }).length;
        lineCount.textContent = q ? shown + ' of ' + lineTotal + ' equipment types' : lineTotal + ' equipment types';
      }
      if (lenis) lenis.resize();
    });
  }

  watchReveals(document);

  /* ---------- Contact form (Formspree) ---------- */

  var form = $('#contact-form');
  if (form) {
    var status = $('.form__status', form);
    var submit = $('button[type="submit"]', form);

    // Arriving from a product's "Request a quote" button
    var product = new URLSearchParams(location.search).get('product');
    if (product) {
      form.elements.subject.value = 'Quote request: ' + product;
      form.elements.message.placeholder = 'Tell us the quantity, model, or specifications you need for the ' + product + '.';
    }

    function setStatus(state, text) {
      status.setAttribute('data-state', state);
      status.textContent = text;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      setStatus('loading', 'Sending…');
      submit.disabled = true;

      fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form)
      })
        .then(function (response) {
          return response.json().then(function (data) {
            if (!response.ok || !data.ok) throw new Error('Formspree rejected the submission');
          });
        })
        .then(function () {
          form.reset();
          setStatus('ok', 'Your message has been sent. Thank you!');
        })
        .catch(function (err) {
          console.error(err);
          setStatus('error', 'Something went wrong. Please try again, or email us directly.');
        })
        .then(function () { submit.disabled = false; });
    });
  }
})();
