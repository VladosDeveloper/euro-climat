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

pagination()

function pagination() {
	const totalPages = 21;
	let currentPage = 1;
	
	function renderPagination() {
		const pagination = document.querySelector('.product-catalog__products__pagination-numbers__list');
		pagination.innerHTML = '';
		
		const createButton = (page) => {
			const btn = document.createElement('button');
			btn.classList.add('product-catalog__products__pagination-numbers__list-item');
			if (page === currentPage) {
				btn.classList.add('active');
			}
			btn.innerText = page;
			btn.disabled = page === currentPage;
			btn.onclick = (e) => {
				currentPage = page;
				renderPagination();
			};
			return btn;
		};
		
		const addDots = () => {
			const dots = document.createElement('li');
			dots.classList.add('product-catalog__products__pagination-numbers__list-item');
			dots.innerText = '...';
			pagination.appendChild(dots);
		};
		
		const showPage = (page) => {
			pagination.appendChild(createButton(page));
		};
		
		// Показываем первую страницу всегда
		showPage(1);
		
		// Левая часть
		if (currentPage > 3) {
			addDots();
			for (let i = currentPage - 1; i <= currentPage + 1 && i < totalPages - 3; i++) {
				if (i > 1) showPage(i);
			}
		} else {
			for (let i = 2; i <= 4; i++) {
				showPage(i);
			}
		}
		
		// Правые точки
		if (currentPage < totalPages - 4) {
			addDots();
		}
		
		// Последние 4 страницы
		for (let i = totalPages - 3; i <= totalPages; i++) {
			showPage(i);
		}
	}
	
	renderPagination();
}
