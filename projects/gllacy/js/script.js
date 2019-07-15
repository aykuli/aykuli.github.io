var sliderItemRuond1 = document.querySelector(".item1-round");
var sliderItem1 = document.querySelector(".item1");

var sliderItem2 = document.querySelector(".item2");
var sliderItemRuond2 = document.querySelector(".item2-round");

var sliderItem3 = document.querySelector(".item3");
var sliderItemRuond3 = document.querySelector(".item3-round");

let bg = document.querySelector(".bg");
let bgLight = document.querySelector(".bg-light");

let catalogMenu = document.querySelector(".catalog-menu");
let menuFallOut = document.querySelector(".menu-fall-out");

/*отлов ошибок браузера*/
try {
	storage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}
/*END OF отлов ошибок браузера*/

/*FUNCTIONS*/


catalogMenu.addEventListener("mouseenter", function (evt) {
		console.log("Открытие выпадающего меню Каталог");
		menuFallOut.classList.remove("display-none");	
});

catalogMenu.addEventListener("mouseleave", function (evt) {
		console.log("Закрытие выпадающего меню Каталог");
		menuFallOut.classList.add("display-none");	
});




sliderItemRuond1.addEventListener("click", function (evt) {
	sliderItemRuond1.classList.add("item-round-after");
	sliderItem2.classList.add("visually-hidden");
	sliderItem3.classList.add("visually-hidden");
	bg.classList.add("bg1");
	bgLight.classList.add("bg1-light");

	sliderItem1.classList.remove("visually-hidden");
	sliderItemRuond2.classList.remove("item-round-after");
	sliderItemRuond3.classList.remove("item-round-after");
	bg.classList.remove("bg2");
	bgLight.classList.remove("bg2-light");
	bg.classList.remove("bg3");
	bgLight.classList.remove("bg3-light");
});

sliderItemRuond2.addEventListener("click", function (evt) {
	sliderItemRuond2.classList.add("item-round-after");
	sliderItem1.classList.add("visually-hidden");
	sliderItem3.classList.add("visually-hidden");
	bg.classList.add("bg2");
	bgLight.classList.add("bg2-light");

	sliderItem2.classList.remove("visually-hidden");
	sliderItemRuond1.classList.remove("item-round-after");
	sliderItemRuond3.classList.remove("item-round-after");
	bg.classList.remove("bg1");
	bgLight.classList.remove("bg1-light");
	bg.classList.remove("bg3");
	bgLight.classList.remove("bg3-light");
});

sliderItemRuond3.addEventListener("click", function (evt) {
	sliderItemRuond3.classList.add("item-round-after");
	sliderItem1.classList.add("visually-hidden");
	sliderItem2.classList.add("visually-hidden");
	bg.classList.add("bg3");
	bgLight.classList.add("bg3-light");

	sliderItem3.classList.remove("visually-hidden");
	sliderItemRuond1.classList.remove("item-round-after");
	sliderItemRuond2.classList.remove("item-round-after");
	bg.classList.remove("bg1");
	bgLight.classList.remove("bg1-light");
	bg.classList.add("bg2");
	bgLight.classList.add("bg2-light");
});

/*END OF FUNCTIONS*/