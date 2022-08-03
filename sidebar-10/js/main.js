(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);


function replace(){
	document.getElementById("content").style.display="none";
	document.getElementById("charts").style.display="flex";
	document.getElementById("wrapper").style.height="100vh";
}

const button = document.getElementById('refresh')
button.onclick = () => {
  window.location.reload();
}