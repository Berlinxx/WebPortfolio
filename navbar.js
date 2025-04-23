$(document).ready(function () {
  const currentPage = window.location.pathname.split("/").pop();

  $(".nav-link").each(function () {
    const linkPage = $(this).attr("href");
    if (linkPage === currentPage) {
      $(this).addClass("active");
    } else {
      $(this).removeClass("active");
    }
  });

  const $themeIcon = $("#themeIcon");

  function updateIcon(isLight) {
    $themeIcon.attr("src", isLight ? "images/lightmode.png" : "images/darkmode.png");
  }

  // Update icon after toggle
  const isLight = $("html").hasClass("light-mode");
  updateIcon(isLight);

  $("#modeToggle").click(function () {
    $("html").toggleClass("light-mode");
    const nowLight = $("html").hasClass("light-mode");
    updateIcon(nowLight);
    localStorage.setItem("theme", nowLight ? "light" : "dark");
  });

  particlesJS("particles-js", {
    particles: {
      number: { value: 50 },
      size: { value: 3 },
      color: { value: "#ff4c60" },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ff4c60",
        opacity: 0.4,
        width: 1
      }
    }
  });

  // Ensure modal-related elements exist before attaching event listeners
  if ($('.card-img-top').length > 0 && $('#imageModal').length > 0) {
    $('.card-img-top').css('cursor', 'pointer').on('click', function () {
      $('#imageModal').css('display', 'block');
      $('#modalImg').attr('src', this.src);
    });
  }

  // Modal closing function
  function closeModal() {
    $('#imageModal').css('display', 'none');
  }

  // Close the modal if clicking on the modal itself
  $('#imageModal').on('click', closeModal);
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
});
