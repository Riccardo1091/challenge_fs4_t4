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


// function replace(){
// 	document.getElementById("content").style.display="none";
// 	document.getElementById("charts").style.display="flex";
// 	document.getElementById("wrapper").style.height="100vh";
// }

// const button = document.getElementById('refresh')
// button.onclick = () => {
//   window.location.reload();
// }

const nav = document.querySelectorAll('.list-group a')
const sezioni = document.querySelectorAll('#content .container .row:not(.row:first-of-type)')

for (n of nav) {
	console.log(n.id)
	n.addEventListener('click', () => {
		if (n.id == 'link_cal') {
			console.log(n.id)
			console.log('primo link/sezione')
			for (s of sezioni) {s.classList.add('hidden')}
			sezioni[0].classList.remove('hidden')
		}
		if (n.id == 'link_lista') {
			console.log(n.id)
			console.log('secondo link/sezione')
			for (s of sezioni) {s.classList.add('hidden')}
			sezioni[1].classList.remove('hidden')
		} if (n.id == 'link_chart') {
			console.log('terzo link/sezione')
			console.log(n.id)
			for (s of sezioni) {s.classList.add('hidden')}
			sezioni[2].classList.remove('hidden')
			console.log(sezioni[2])
		}
	})
}
