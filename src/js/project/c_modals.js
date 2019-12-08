function initModals() {
	function moveGalleryModalsToTop() {
		const $body = $('body')
		$('.d_gallerySlider_modal').each(function() {
			const modalEl = $(this).detach()
			$body.append(modalEl)
		})
	}

	// initialize
	moveGalleryModalsToTop()
}