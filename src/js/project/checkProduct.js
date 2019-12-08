function checkProduct(data) {
	const { tags } = data
	const $productpage = $('.strutPageProduct')


	const isCollection = tags.find((t) => {
		return t === "collection"
	})

	if (isCollection) {
		const pageToGo = tags.find((t) => {

			if (t === "blue-collection") {
				return t
			} else if (t === "white-collection") {
				return t
			} else if (t === "black-collection") {
				return t
			}

			return  
		})

		// window.location = '/pages/'+pageToGo
		$productpage.addClass('ready')
		// console.log('pageToGo == ', pageToGo)
	} else {
		$productpage.addClass('ready')
	}

}