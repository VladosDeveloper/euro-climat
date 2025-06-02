document.addEventListener('DOMContentLoaded', function () {
	new Swiper('.partners-swiper', {
		loop: true,
		slidesPerView: 'auto',
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
});

const dots = document.querySelectorAll('.main__info-dots__item');
const images = document.querySelectorAll('.main-image');
const carousel = document.querySelector('.main-images-container'); // Добавляем контейнер карусели

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;

function changeSlide(index) {
	images.forEach(img => img.classList.remove('active'));
	dots.forEach(dot => dot.classList.remove('selected'));
	
	images[index].classList.add('active');
	dots[index].classList.add('selected');
	currentIndex = index;
}

// Обработчики для точек
dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		changeSlide(index);
	});
});

// Добавляем обработчики свайпа
carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);
carousel.addEventListener('mouseup', dragEnd);
carousel.addEventListener('touchend', dragEnd);
carousel.addEventListener('mouseleave', dragEnd);
carousel.addEventListener('mousemove', drag);
carousel.addEventListener('touchmove', drag);

function dragStart(e) {
	if (e.type === 'touchstart') {
		startPosition = e.touches[0].clientX;
	} else {
		startPosition = e.clientX;
		e.preventDefault(); // Предотвращаем выделение текста
	}
	
	isDragging = true;
	carousel.style.cursor = 'grabbing';
	animationID = requestAnimationFrame(animation);
}

function drag(e) {
	if (!isDragging) return;
	const currentPosition = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
	const diff = currentPosition - startPosition;
	
	if (Math.abs(diff) > 50) { // Порог для смены слайда
		if (diff > 0 && currentIndex > 0) {
			// Свайп вправо
			changeSlide(currentIndex - 1);
			resetDrag();
		} else if (diff < 0 && currentIndex < images.length - 1) {
			// Свайп влево
			changeSlide(currentIndex + 1);
			resetDrag();
		}
	}
}

function dragEnd() {
	isDragging = false;
	cancelAnimationFrame(animationID);
	carousel.style.cursor = 'grab';
	resetDrag();
}

function resetDrag() {
	isDragging = false;
	startPosition = 0;
	currentTranslate = 0;
	prevTranslate = 0;
}

function animation() {
	if (isDragging) {
		requestAnimationFrame(animation);
	}
}

// let currentIndex = 0;
// setInterval(() => {
// 	currentIndex = (currentIndex + 1) % images.length;
// 	changeSlide(currentIndex);
// }, 5000);

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

const confirmForm = document.querySelector('.choose-conditioner__confirm-setting__block__button-confirm');
const resetForm = document.querySelector('.choose-conditioner__confirm-setting__block__button-reset');
const form = document.querySelector('.choose-conditioner__form')

confirmForm.addEventListener('click', (e) => {
	e.preventDefault();
	form.reset()
})
resetForm.addEventListener('click', (e) => {
	e.preventDefault();
	form.reset()
})

const openNavBar = document.querySelector('.header-mobile__open-modal')
const closeNavBar = document.querySelector('.header-mobile__close-modal')
const navBar = document.querySelector('.mobile-header__modal-navigation')


openNavBar.addEventListener('click', () => {
	navBar.classList.remove('hidden');
})

closeNavBar.addEventListener('click', () => {
	navBar.classList.add('hidden');
})

const likeBtn = document.querySelectorAll('.svg-heart')
let isColored = false;

likeBtn.forEach((btn) => {
	btn.addEventListener('click', function() {
		console.log('clicked');
		const path = this.querySelector('path');
		
		if (isColored) {
			btn.classList.add('active');
		} else {
			btn.classList.remove('active');
		}
		
		
		isColored = !isColored;
	});
})


