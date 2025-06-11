const selectProductDescriptionItem = document.querySelectorAll('.product-description__heading__button')
const descriptionHeadingTitle = document.querySelector('.product-description__heading-mobile__preview-title')
const selectDescriptionText = document.querySelectorAll('.custom-product-dots li')
const hideMenuItems = document.querySelector('.product-description__heading-mobile__preview-toggle')
const menuItems = document.querySelector('.product-description__heading-mobile__buttons')
const customDots = document.querySelectorAll(`.main__info-dots__item-product`)

function selectProductDescription(element, className) {
	element[0].classList.add(className)
	element.forEach((item) => {
		item.addEventListener('click', (e) => {
			element.forEach((item) => {
				item.classList.remove(className);
			})
			item.classList.add(className)
		})
	})
}

selectProductDescription(selectProductDescriptionItem, 'active-button')
selectProductDescription(selectDescriptionText, 'selected-button')

selectDescriptionText.forEach((item, index) => {
	item.addEventListener('click', (e) => {
		customDots.forEach(customDot => {
			customDot.classList.remove('selected-dot')
		})
		if (item.classList.contains('selected-button')) {
			customDots[index].classList.add('selected-dot')
			descriptionHeadingTitle.innerText = item.innerText
			menuItems.classList.remove('opened')
			rotateHideMenuItems()
		}
	})
})

function rotateHideMenuItems() {
	if (menuItems.classList.contains('opened')) {
		hideMenuItems.style.rotate = '45deg'
	} else {
		hideMenuItems.style.rotate = '90deg'
	}
}

hideMenuItems.addEventListener('click', (e) => {
	menuItems.classList.toggle('opened')
	rotateHideMenuItems()
})

document.addEventListener('DOMContentLoaded', function() {
	const swiper = new Swiper('.product-image__img-wrapper', {
		loop: true,
		allowTouchMove: true, // Можно ли листать пальцем
		resistanceRatio: 0, // Отключаем "упругость" при прокрутке
		slidesPerView: 1,
		
		// Отключаем стандартные элементы
		navigation: false,
		pagination: false,
		scrollbar: false,
		
		on: {
			// Синхронизация с вашими точками
			slideChange: function() {
				const dots = document.querySelectorAll('.product-dot');
				dots.forEach((dot, index) => {
					dot.classList.remove('selected');
					if (index === this.realIndex) {
						dot.classList.add('selected');
					}
				});
			}
		}
	});
	
	// Обработчики для точек пагинации
	document.querySelectorAll('.product-dot').forEach(dot => {
		dot.addEventListener('click', function () {
			const slideIndex = parseInt(this.getAttribute('data-slide'));
			// Убираем класс selected у всех точек
			document.querySelectorAll('.product-dot').forEach(item => {
				item.classList.remove('selected');
			});
			
			// Добавляем класс selected текущей точке
			this.classList.add('selected');
			
			swiper.slideTo(slideIndex);
		});
	});
});