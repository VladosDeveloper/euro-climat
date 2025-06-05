const filterElement = document.querySelectorAll('.product-catalog__filters-element');
const openCloseElements = document.querySelectorAll('.product-catalog__filters-element__toggle');
const resetAllFilters = document.querySelectorAll('.product-catalog__filters__reset');
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

resetAllFilters.forEach(btn => {
	btn.addEventListener('click', (e) => {
		filters.forEach((filterElement) => {
			filterElement.checked = false;
		})
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
	const prevPage = document.querySelector('.product-catalog__products__pagination-button__prev');
	const nextPage = document.querySelector('.product-catalog__products__pagination-button__next');
	const totalPages = 21;
	let currentPage = 1;
	
	if (currentPage >= 1) {
		prevPage.addEventListener('click', (e) => {
			if (currentPage === 1) return
			currentPage--
			onPageClick(currentPage)
		})
	}
	if (currentPage < totalPages) {
		nextPage.addEventListener('click', (e) => {
			if (currentPage === totalPages) return
			currentPage++
			onPageClick(currentPage)
		})
	}
	
	function onPageClick(page) {
		currentPage = page;
		renderPagination();
	}
	
	function renderPagination() {
		const pagination = document.querySelector('.product-catalog__products__pagination-numbers__list');
		pagination.innerHTML = '';
		
		const isMobile = window.innerWidth < 960;
		
		const createButton = (page) => {
			const btn = document.createElement('button');
			btn.classList.add('product-catalog__products__pagination-numbers__list-item');
			btn.innerText = page;
			if (page === currentPage) {
				btn.classList.add('active');
			}
			btn.onclick = () => onPageClick(page);
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
		
		const showRange = (start, end) => {
			for (let i = start; i <= end; i++) {
				showPage(i);
			}
		};
		
		if (isMobile) {
			if (currentPage < 3) {
				showRange(1, 3);
				addDots();
			} else {
				if (window.innerWidth > 450) {
					showPage(1)
					addDots();
				}
				// Центр текущей страницы
				const start = Math.max(currentPage -1,1);
				const end = Math.min(currentPage+1, totalPages - 3);
				showRange(start, end);
				if (currentPage < 17) {
					addDots();
				}
			}
		} else {
			if (currentPage <= 3) {
				showRange(1, 4);
				addDots();
			} else {
				showPage(1)
				addDots();
				const start = Math.max(currentPage - 1, 3);
				const end = Math.min(currentPage + 1, totalPages - 3);
				showRange(start, end);
				if (currentPage < 17) {
					addDots();
				}
				
			}
		}
		
		showRange(totalPages - 2, totalPages);
	}
	
	window.addEventListener('resize', renderPagination);
	renderPagination();
}
