function initTabularDesc() {
	$('.tabularDesc').each(function(){
		const $tabContainer = $(this)

		let $container = null ,
				$tabs = null

		// wrap all children first
		$tabContainer
			.children()
			.wrapAll(`
				<div class='tabularDesc-containers'></div>
			`)

		// prepend menu container
		$tabContainer
			.prepend(`
				<div class='tabularDesc-tabs'></div>
			`)


		// assign nav and container to
		// respective vars
		$container = $tabContainer.find('.tabularDesc-containers')
		$tabs = $tabContainer.find('.tabularDesc-tabs')

		// add class and make first child active
		// and also initialize tab menu items
		$container
			.children()
			.each(function(i) {
				const self = $(this) ,
							classKey = self[0].className

				let isActive = false ,
						tabName = ''

				// add tab desc container class
				self
					.addClass('tabularDesc-container')
					.addClass(`tab-${classKey}`)

				// if first index set to active
				if(i === 0 ) {
					self.addClass('active')
					isActive = true
				}

				// identify tab name
				if(self.hasClass('product_description')) {
					tabName = 'Description'
				} 
				else if (self.hasClass('product_inclusions')) {
					tabName = 'Inclusions'
				}
				else if (self.hasClass('product_specs')) {
					tabName = 'Specs'
				}
				else {
					tabName = 'Others'
				}

				// prepent menu item to tabs
				$tabs.append(`
					<div class=" tabularDesc-tabs-item ${isActive ? 'active':''}" data-tabContainer="${classKey}">
						<h1 class="title">${tabName}</h1>
					</div>
				`)
			})

		// bring tabs to life
		$tabs
		.children()
		.each(function(i){
			$(this).click(function(){
				const self = $(this)

				// console.log('do I have active?? ', self.hasClass('active'))
				if(!self.hasClass('active')) {

					$tabs
						.find('.active')
						.removeClass('active')

					self
						.addClass('active')

					// remove active on old active
					// container
					$container
						.find('.active')
						.removeClass('active')

					// find the data key
					// and set it to active
					$container
						.find(`.tab-${self.data('tabcontainer')}`)
						.addClass('active')
				}
			})
		})

		// once done set it to activated
		$tabContainer.addClass('activated')
	})
}