function initTestimonialSlider() {
	$('.testimonial_slider').each(function() {
		const $carousel = $(this),
					items = $carousel.data('items') ,
					nav = $carousel.data('slidenav') ,
					dots = $carousel.data('slidedots') ,
					loop = $carousel.data('slideloop') ,
					autoplay = $carousel.data('autoplay'),
					autoplayTimeout = $carousel.data('autoplaytimeout'),
					slide_on_screen_size  = parseInt($carousel.data('initin')),
					lines = $carousel.data('ellipline')

		const slide_options = {
			items ,
			loop ,
			nav ,
			dots ,
			autoplay,
			autoplayTimeout ,
			autoplayHoverPause: true ,
			onResize: () => { 
				// console.log('onResize')
				updateDescriptions() } ,
			onInitialized: () => { 
				// console.log('onInitialized')
				updateDescriptions() },
			onChange: () => { 
				// console.log('onChange')
				updateDescriptions() },
			responsive: {
				0: {
					items: 1
				},
				769: {
					items: 2
				},
				1024: {
					items
				}
			}
		}

		let isDestroyed = false 
		const owl = $carousel.owlCarousel(slide_options)


		function updateDescriptions() {
			$carousel
				.find('.slide-desc')
				.each(function() { applyEllipsis($(this), lines, false) })
		}

		function updateOwl() {
			if(slide_on_screen_size >= $(window).width()) {
				// REINITIALIZE OWL CAROUSEL
				$carousel.addClass('owl-carousel owl-theme')
				owl.owlCarousel(slide_options)
				isDestroyed = false
			} else {
				// DESTROY OWL CAROUSEL
				owl.owlCarousel('destroy')
				updateDescriptions()
				$carousel.removeClass('owl-carousel owl-theme')
				isDestroyed = true
			}
		}

		updateOwl()

		$(window).on('resize',() => updateOwl() )
	})
}