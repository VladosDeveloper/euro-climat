const openNavBar = document.querySelector('.header-mobile__open-modal')
const closeNavBar = document.querySelector('.header-mobile__close-modal')
const navBar = document.querySelector('.mobile-header__modal-navigation')
const headerSearch = document.querySelector('.mobile-header__nav-search')
const imageSearch = document.querySelector('.mobile-header__search-icon')
const confirmForm = document.querySelector('.choose-conditioner__confirm-setting__block__button-confirm');
const resetForm = document.querySelector('.choose-conditioner__confirm-setting__block__button-reset');
const form = document.querySelector('.choose-conditioner__form')
const likeBtn = document.querySelectorAll('.svg-heart')

const breadCrumbsList = document.querySelector('#product-breadcrumbs__list')
const lastBreadItem = breadCrumbsList?.lastElementChild

document.addEventListener('DOMContentLoaded', () => {
	new Swiper('.partners-swiper', {
		loop: true,
		slidesPerView: 4,
		centeredSlides: true,
		spaceBetween: 30,
		navigation: {
			nextEl: '.partner-list__next-item',
			prevEl: '.partner-list__prev-item',
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 20
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30
			},
			1024: {
				slidesPerView: 4,
				spaceBetween: 40
			}
		}
	});
})


const startWidth = window.innerWidth;
const title = document.getElementById('popular-supplies__title')

window.addEventListener('resize', (e) => {
	const currentWidth = e.currentTarget.innerWidth
	checkSize(currentWidth)
})
checkSize(startWidth)


function checkSize(size) {
	if (title) {
		if (size <= 560) {
			title.innerText = 'Популярное'
		} else {
			title.innerText = 'Популярные товары'
		}
	}
	if (size < 811) {
		lastBreadItem?.remove()
	} else {
		breadCrumbsList?.append(lastBreadItem)
	}
}

document.addEventListener('DOMContentLoaded', function () {
	// Инициализация текстового слайдера
	const textSwiper = new Swiper('.text-swiper', {
		allowTouchMove: true, // Отключаем свайп
		autoHeight: true,     // Автоматическая высота
		simulateTouch: false,  // Отключаем имитацию касания
		slidesPerView: 1,
		centeredSlides: true,
	});
	
	// Обработчики для точек пагинации
	document.querySelectorAll('.main__info-dots__item').forEach(dot => {
		dot.addEventListener('click', function () {
			const slideIndex = parseInt(this.getAttribute('data-slide'));
			
			// Убираем класс selected у всех точек
			document.querySelectorAll('.main__info-dots__item').forEach(item => {
				item.classList.remove('selected');
			});
			
			// Добавляем класс selected текущей точке
			this.classList.add('selected');
			
			// Переключаем слайд
			if (textSwiper.el !== '.text-swiper') {
				textSwiper.slideTo(slideIndex);
			}
			
		});
	});
});

const counter = () => {
	// Находим все блоки счетчиков на странице
	const allCounters = document.querySelectorAll('.sales__element__user-actions');
	
	allCounters.forEach(counterBlock => {
		// Элементы текущего счетчика
		const decrementBtn = counterBlock.querySelector('.decrement-btn');
		const incrementBtn = counterBlock.querySelector('.increment-btn');
		const counter = counterBlock.querySelector('.counter');
		const addToCartBtn = counterBlock.querySelector('.sales__element__user-actions__add-to-bucket');
		
		let count = 1; // Начальное значение
		
		// Обновление отображаемого значения
		function updateCounter() {
			counter.textContent = count;
			// Можно добавить логику для кнопки "В корзину"
			// addToCartBtn.textContent = count > 0 ? `В корзину (${count})` : 'В корзину';
		}
		
		// Уменьшение
		decrementBtn.addEventListener('click', () => {
			if (count > 1) { // Минимальное значение 1
				count--;
				updateCounter();
			}
		});
		
		// Увеличение
		incrementBtn.addEventListener('click', () => {
			count++;
			updateCounter();
		});
		
		// Инициализация
		updateCounter();
	});
}

confirmForm?.addEventListener('click', (e) => {
	e.preventDefault();
	form.reset()
})
resetForm?.addEventListener('click', (e) => {
	e.preventDefault();
	form.reset()
})

const toggleVisibilityModal = () => {
	
	openNavBar.addEventListener('click', () => {
		navBar.classList.toggle('hidden');
	})
	
	closeNavBar.addEventListener('click', () => {
		if (closeNavBar.classList.contains('mobile-header__search-modal')) {
			headerSearch.classList.remove('hide');
			closeNavBar.classList.remove('mobile-header__search-modal');
			imageSearch.style.display = 'none';
		} else {
			headerSearch.classList.add('hide');
			closeNavBar.classList.add('mobile-header__search-modal');
			imageSearch.style.display = 'block';
		}
	})
	
}

const setSvgButtonColor = () => {
	likeBtn.forEach((btn,index) => {
		console.log(btn)
		btn.addEventListener('click', function () {
			const outline = document.querySelectorAll('.heart-outline')
			// debugger
			btn.classList.toggle('active');
			if (btn.classList.contains('active')) {
				outline[index]?.setAttribute('stroke', '1px');
			} else {
				outline[index]?.removeAttribute('stroke');
			}

		});
	})
}


setSvgButtonColor();
toggleVisibilityModal();
counter();



