// navbar.js

// Load navbar.html, inject it, then initialize all behavior:
async function loadNavbar() {
  const resp = await fetch('navbar.html');
  const html = await resp.text();
  document.getElementById('navbar-placeholder').innerHTML = html;
  initNavbar();
}

function initNavbar() {
  // 1️⃣ Dark/Light toggle
  const $themeIcon = $('#themeIcon');

  function updateIcon(isLight) {
    $themeIcon.attr(
      'src',
      isLight ? 'images/lightmode.png' : 'images/darkmode.png'
    );
  }

  // On page load, apply saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'light') $('html').addClass('light-mode');
  updateIcon($('html').hasClass('light-mode'));

  // Bind click
  $('#modeToggle').on('click', () => {
    const nowLight = $('html').toggleClass('light-mode').hasClass('light-mode');
    updateIcon(nowLight);
    localStorage.setItem('theme', nowLight ? 'light' : 'dark');
  });

  // 2️⃣ Active‐link highlighting
  const current = window.location.pathname.split('/').pop() || 'index.html';
  $('.nav-link').each(function () {
    $(this).toggleClass('active', $(this).attr('href') === current);
  });

  // 3️⃣ Particles.js background
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 50 },
        size:   { value: 3 },
        color:  { value: '#ff4c60' },
        line_linked: {
          enable:  true,
          distance:150,
          color:   '#ff4c60',
          opacity: 0.4,
          width:   1
        }
      }
    });
  }

  // 4️⃣ Image-click modal
  if ($('#imageModal').length) {
    $('.card-img-top')
      .css('cursor','pointer')
      .on('click', function() {
        $('#modalImg').attr('src', this.src);
        $('#imageModal').fadeIn(200);
      });
    $('#imageModal').on('click', () => $('#imageModal').fadeOut(200));
  }

  // 5️⃣ “See More” truncation
  const charLimit = 100;
  $('.card-text').each(function () {
    const full = $(this).text().trim();
    if (full.length <= charLimit) return;
    const vis = full.slice(0,charLimit).trim(),
          hid = full.slice(charLimit).trim();
    $(this).html(`
      ${vis}<span class="ellipsis">…</span>
      <span class="more-content">${hid}</span>
      <a href="#" class="read-more">See More</a>
    `);
  });
  $('.project-container').on('click','.read-more',function(e){
    e.preventDefault();
    const $link = $(this),
          $ell  = $link.siblings('.ellipsis'),
          $more = $link.siblings('.more-content'),
          show  = !$more.is(':visible'),
          d     = 300;
    $ell .stop(true,true).fadeToggle(d);
    $more.stop(true,true).slideToggle(d);
    setTimeout(() => {
      $link.text(show ? 'See Less' : 'See More');
    }, d);
  });
}

// On DOM ready, load the navbar
$(function(){
  loadNavbar();
});
