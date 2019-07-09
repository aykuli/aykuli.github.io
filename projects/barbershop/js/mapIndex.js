/*MAP*/
/*ПЕРЕМЕННЫЕ*/
var mapLink = document.querySelector(".contacts-button-map");

/*END OF ПЕРЕМЕННЫЕ*/

/*FUNCTIONS*/
mapLink.addEventListener("click", function (evt) {
	evt.preventDefault();
	console.log('mapLink работает')
	mapPopup.classList.add("modal-show");
	overlay.classList.add("modal-overlay");
});
/*END OF FUNCTIONS*/
/*END OF MAP*/