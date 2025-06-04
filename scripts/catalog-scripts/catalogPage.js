const filterElement = document.querySelectorAll('.product-catalog__filters-element');
const openCloseElements = document.querySelectorAll('.product-catalog__filters-element__toggle');
const resetAllFilters = document.querySelector('.product-catalog__filters__reset');
const filters = document.querySelectorAll('.custom-checkbox input');
const paginationItems = document.querySelectorAll('.product-catalog__products__pagination-numbers__list-item');
const openFilterBtn = document.querySelector('.product-catalog__navigation-for-mobile__open-filters')
const closeCatalogModal = document.querySelector('.product-catalog__navigation-for-mobile__filters-title__wrapper');
const filterModal = document.querySelector('.product-catalog__navigation-for-mobile__filters-wrapper');

openCloseElements.forEach((openCloseElement, index) => {
	openCloseElement.addEventListener('click', (e) => {
		filterElement[index].classList.toggle('active');
	})
})

resetAllFilters.addEventListener('click', (e) => {
	console.log('cls')
	filters.forEach((filterElement) => {
		filterElement.checked = false;
	})
})

paginationItems.forEach((item) => {
	item.addEventListener('click', (e) => {
		clearItemClassList(paginationItems)
		item.classList.add('active');
	})
})

function clearItemClassList(itemsList) {
	itemsList.forEach(item => {
		item.classList.remove('active');
	})
}

openFilterBtn.addEventListener('click', (e) => {
	document.querySelector('.modal-overlay').classList.add('active');
	document.querySelector('body').classList.add('modal-open');
	filterModal.classList.remove('hidden-modal');
})

closeCatalogModal.addEventListener('click', (e) => {
	document.querySelector('.modal-overlay').classList.remove('active');
	document.querySelector('body').classList.remove('modal-open');
	filterModal.classList.add('hidden-modal');
})

