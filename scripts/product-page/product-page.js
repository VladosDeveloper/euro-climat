const selectProductDescriptionItem = document.querySelectorAll('.product-description__heading__button')
const descriptionHeadingTitle = document.querySelector('.product-description__heading-mobile__preview-title')
const selectDescriptionText = document.querySelectorAll('.custom-product-dots li')
const hideMenuItems = document.querySelector('.product-description__heading-mobile__preview-toggle')
const menuItems = document.querySelector('.product-description__heading-mobile__buttons')
const customDots = document.querySelectorAll(`.main__info-dots__item-product`)
const mainText = document.querySelector('.product-description__main-text')
const buttons = document.querySelectorAll('.product-description__heading__button')

const productDescription = [
	{
		title: 'descr',
		text: `Description: (немного текста про модель)Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
		Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
		of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
		leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
		release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
		like Aldus PageMaker including versions of Lorem Ipsum`
	},
	{
		title: 'characteristics',
		text: `Characteristics: (немного текста про модель)Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`
	},
	{
		title: 'montage',
		text: `Montage: It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
	},
	{
		title: 'payment',
		text: `Payment: (немного текста про модель)Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
	}
]

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
			mainText.innerText = productDescription[index].text
			descriptionHeadingTitle.innerText = item.innerText
			menuItems.classList.remove('opened')
			rotateHideMenuItems()
		}
	})
})

buttons.forEach((btn, index) => {
	btn.addEventListener('click', (e) => {
		// debugger
		if (btn.classList.contains('active-button')) {
			// debugger
			btn.classList.add('active-button')
			mainText.innerText = productDescription[index].text
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

document.addEventListener('DOMContentLoaded', function () {
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
			slideChange: function () {
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