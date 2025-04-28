// navbar.js

// 1️⃣ Load navbar.html, inject it, then initialize all behavior:
async function loadNavbar() {
  const resp = await fetch('navbar.html');
  const html = await resp.text();
  document.getElementById('navbar-placeholder').innerHTML = html;
  initNavbar();
}

// 2️⃣ Wire up everything after navbar is in place:
function initNavbar() {
  // — Dark/Light toggle
  const $themeIcon = $('#themeIcon');
  function updateIcon(isLight) {
    $themeIcon.attr('src', isLight ? 'images/lightmode.png' : 'images/darkmode.png');
  }
  const saved = localStorage.getItem('theme');
  if (saved === 'light') $('html').addClass('light-mode');
  updateIcon($('html').hasClass('light-mode'));

  $('#modeToggle').off('click').on('click', () => {
    const nowLight = $('html').toggleClass('light-mode').hasClass('light-mode');
    updateIcon(nowLight);
    localStorage.setItem('theme', nowLight ? 'light' : 'dark');
  });

  // — Active‐link highlighting
  const current = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-link').each(function () {
    $(this).toggleClass('active', $(this).attr('href') === current);
  });

  // — Particles.js background
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number:     { value: 50 },
        size:       { value: 3 },
        color:      { value: '#ff4c60' },
        line_linked:{ enable: true, distance: 150, color: '#ff4c60', opacity: 0.4, width: 1 }
      }
    });
  }

// Image-click modal
if ($('#imageModal').length) {
  $('.card-img-top').css('cursor','pointer').on('click', function() {
    $('#modalImg').attr('src', this.src);
    $('#imageModal')
      .addClass('image-modal--visible')  // show as flex
      .hide()                            // start hidden
      .fadeIn(200);
  });

  $('#imageModal').on('click', () => {
    $('#imageModal')
      .fadeOut(200, () => {
        $('#imageModal').removeClass('image-modal--visible');
      });
  });
}


  // — “See More” truncation
  const charLimit = 100;
  $('.card-text').each(function () {
    const $p    = $(this);
    const full  = $p.text().trim();
    if (full.length <= charLimit) return;

    const vis = full.slice(0, charLimit).trim();
    const hid = full.slice(charLimit).trim();
    $p.html(`
      ${vis}
      <span class="ellipsis">…</span>
      <span class="more-content" style="display:none;">${hid}</span>
      <a href="#" class="read-more">See More</a>
    `);
  });

  // Unbind any old and bind exactly one delegated handler
  $('.project-container')
    .off('click', '.read-more')
    .on('click', '.read-more', function(e) {
      e.preventDefault();
      const $link     = $(this);
      const $ellipsis = $link.siblings('.ellipsis');
      const $more     = $link.siblings('.more-content');
      const show      = !$more.is(':visible');

      if (show) {
        $ellipsis.fadeOut(200);
        $more.slideDown(200);
        $link.text('See Less');
      } else {
        $more.slideUp(200);
        $ellipsis.fadeIn(200);
        $link.text('See More');
      }
    });
}

// 3️⃣ Kickoff on DOM ready
$(function(){
  loadNavbar();
});
