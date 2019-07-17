let sliderItemRuond1 = document.querySelector(".item1-round");
let sliderItem1 = document.querySelector(".item1");

let sliderItem2 = document.querySelector(".item2");
let sliderItemRuond2 = document.querySelector(".item2-round");

let sliderItem3 = document.querySelector(".item3");
let sliderItemRuond3 = document.querySelector(".item3-round");

let bg = document.querySelector(".bg");
let bgLight = document.querySelector(".bg-light");

let catalogMenu = document.querySelector(".catalog-menu");
let menuFallOut = document.querySelector(".menu-fall-out");

let search = document.querySelector(".search");

let modalSearch = document.querySelector(".modal-search");
let modalLogin = document.querySelector(".modal-login");
let loginLink = document.querySelector(".login-link");
var login = modalLogin.querySelector("[name=email]");
var password = modalLogin.querySelector("[name=password]");
let modalBasket = document.querySelector(".modal-basket");
let basketNoEmpty = document.querySelector(".basket-no-empty");

let hitSectionLi1 = document.querySelector(".hit-section-li1");
let hitSectionLi2 = document.querySelector(".hit-section-li2");
let hitSectionLi3 = document.querySelector(".hit-section-li3");
let hitSectionLi4 = document.querySelector(".hit-section-li4");
let fast1 = document.querySelector(".fast1");
let fast2 = document.querySelector(".fast2");
let fast3 = document.querySelector(".fast3");
let fast4 = document.querySelector(".fast4");


//спрашиваем у браузера, есть ли у него в локальных записях логин пользователя
let storage = "";
let isStorageSupport = true;

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


search.addEventListener("mouseenter", function (evt) {
		console.log("Открытие формы для поиска по сайту");
		modalSearch.classList.remove("display-none");
});
search.addEventListener("mouseleave", function (evt) {
		console.log("Закрытие формы для поиска по сайту");
		modalSearch.classList.add("display-none");
});

loginLink.addEventListener("click", function (evt) {
	evt.preventDefault();
});
loginLink.addEventListener("mouseenter", function (evt) {
	evt.preventDefault();
	console.log("Открытие формы для авторизации");
	modalLogin.classList.remove("display-none");
	if (storage) {
		email.value = storage;
		password.focus();
	} else {
		login.focus();
	}
});
loginLink.addEventListener("mouseleave", function (evt) {
	evt.preventDefault();
	console.log("Открытие формы для авторизации");
	modalLogin.classList.add("display-none");
});


basketNoEmpty.addEventListener("mouseenter", function (evt) {
		evt.preventDefault();
		console.log("Открытие списка корзины");
		modalBasket.classList.remove("display-none");
});
basketNoEmpty.addEventListener("mouseleave", function (evt) {
		console.log("Закрытие списка корзины");
		modalBasket.classList.add("display-none");
});


hitSectionLi1.addEventListener("mouseover", function (evt) {
		console.log("Подсветка фона хита при наведении");
		fast1.classList.remove("display-none");
});
hitSectionLi1.addEventListener("mouseleave", function (evt) {
		console.log("Убрать подсветку фона хита при наведении");
		fast1.classList.add("display-none");
});

hitSectionLi2.addEventListener("mouseover", function (evt) {
		console.log("Подсветка фона хита при наведении");
		fast2.classList.remove("display-none");
});
hitSectionLi2.addEventListener("mouseleave", function (evt) {
		console.log("Убрать подсветку фона хита при наведении");
		fast2.classList.add("display-none");
});
hitSectionLi3.addEventListener("mouseover", function (evt) {
		console.log("Подсветка фона хита при наведении");
		fast3.classList.remove("display-none");
});
hitSectionLi3.addEventListener("mouseleave", function (evt) {
		console.log("Убрать подсветку фона хита при наведении");
		fast3.classList.add("display-none");
});
hitSectionLi4.addEventListener("mouseover", function (evt) {
		console.log("Подсветка фона хита при наведении");
		fast4.classList.remove("display-none");
});
hitSectionLi4.addEventListener("mouseleave", function (evt) {
		console.log("Убрать подсветку фона хита при наведении");
		fast4.classList.add("display-none");
});
 /*Убрать окошко по ESC*/
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		modalSearch.classList.add("display-none");
		modalLogin.classList.add("display-none");
		} 
});
/**/

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