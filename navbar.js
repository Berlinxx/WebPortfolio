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
}

// 3️⃣ Kickoff on DOM ready
$(function(){
  loadNavbar();
});

$(document).ready(function () {
  const charLimit = 100;
  $('.card-text').each(function () {
    const fullText = $(this).text().trim();
    if (fullText.length <= charLimit) return; // no need to truncate

    // split into visible + hidden chunks
    const visibleText = fullText.slice(0, charLimit).trim(); // Trim to ensure no trailing spaces
    const hiddenText  = fullText.slice(charLimit).trim();   // Trim to ensure no leading spaces

    // overwrite with truncated + hidden + toggle link
    $(this).html(`
      ${visibleText}<span class="ellipsis">…</span><span class="more-content">${hiddenText}</span>
      <a href="#" class="read-more">See More</a>
    `);
  });

  // delegated click handler (works even if you add more cards later)
  $('.project-container').on('click', '.read-more', function (e) {
    e.preventDefault();
    const $link     = $(this);
    const $ellipsis = $link.siblings('.ellipsis');
    const $more     = $link.siblings('.more-content');

    if ($more.is(':visible')) {
      // collapse
      $more.slideUp(200);
      $ellipsis.fadeIn(400);
      $link.text('See More');
    } else {
      // expand
      $ellipsis.fadeOut(400);
      $more.slideDown(400);
      $link.text('See Less');
    }
  });

    new Typed("#typed-output", {
      strings: ["Undergraduate Student", "Beginner in IT Field"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true
    });
});


