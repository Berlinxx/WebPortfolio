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

  // — Active-link highlighting
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

  // — Image-click modal
  if ($('#imageModal').length) {
    $('.card-img-top').css('cursor','pointer').on('click', function() {
      $('#modalImg').attr('src', this.src);
      $('#imageModal')
        .addClass('image-modal--visible')
        .hide()
        .fadeIn(200);
    });
    $('#imageModal').on('click', () => {
      $('#imageModal').fadeOut(200, () => {
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

    // split text
    const visible = full.slice(0, charLimit);
    const hidden  = full.slice(charLimit);

    // inject spans
    $p.html(
      visible +
      '<span class="ellipsis">…</span>' +
      `<span class="more-content" style="display:none;">${hidden}</span>` +
      '<a href="#" class="read-more">See More</a>'
    );
  });

  // — delegate toggle handler exactly once
  $('.project-container')
    .off('click', '.read-more')
    .on('click', '.read-more', function(e) {
      e.preventDefault();
      const $link     = $(this);
      const $ellipsis = $link.siblings('.ellipsis');
      const $more     = $link.siblings('.more-content');
      const showing   = $more.is(':visible');

      if (showing) {
        // hide extra, show ellipsis
        $more.slideUp(200);
        $ellipsis.fadeIn(200);
        $link.text('See More');
      } else {
        // show extra, hide ellipsis
        $ellipsis.fadeOut(200);
        $more.slideDown(200);
        $link.text('See Less');
      }
    });
}

// 3️⃣ Kickoff on DOM ready
$(function(){
  loadNavbar();
});
