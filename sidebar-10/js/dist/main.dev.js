"use strict";

(function ($) {
  "use strict";

  var fullHeight = function fullHeight() {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });
  };

  fullHeight();
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
})(jQuery);

function replace() {
  document.getElementById("content").style.display = "none";
  document.getElementById("charts").style.display = "flex";
  document.getElementById("wrapper").style.height = "100vh";
}

var button = document.getElementById('refresh');

button.onclick = function () {
  window.location.reload();
};