
function getCustomerCookie(id) {
	// const c_string = (id == 'anonymous') ? `anonymous` : `customer_${id}`
	const customer_data = getCookie(`customer_${id}`)


	if(!customer_data) {

		// console.log(' no data in cookie')
		const c_data = {
			recently_viewed : []
		}

		setCustomerCookie(id, c_data)
		return c_data

	} else {

		// console.log(' this the data retrieved from cookie ')
		// console.log(customer_data)

		return JSON.parse(customer_data)
	}
}

function setCustomerCookie(id, data) {
	setCookie(`customer_${id}`, JSON.stringify(data),1)
}


// THIS IS TRIGGERED EVERYTIME THE USER GETS TO THE 
// PRODUCT TEMPLATE
function viewProduct(product_object, customer_id) {
	const {
		title
		, vendor
		, price
		, compare_at_price_max
		, featured_image
		, handle
		, compare_at_price
		, id
		, variants
		, available
	} = product_object


	const newobj = {
		title
		, vendor
		, price
		, compare_at_price_max
		, featured_image
		, handle
		, compare_at_price
		, id
		, variants
		, available
	}

	const customer_data = getCustomerCookie(customer_id)
	

	// check if id existed in customer data
	const is_duplicate = customer_data.recently_viewed.find( prod => prod.id === id ) ? true : false

	// console.log('does this have a duplicate?', is_duplicate)

	// if no duplicates 
	if(!is_duplicate) {

		if( customer_data.recently_viewed.length >= 5 ) {
			customer_data.recently_viewed.pop()
			// console.log('after pop', customer_data)
		}
		customer_data.recently_viewed.unshift(newobj)
		setCustomerCookie(customer_id, customer_data)
	}

	$('body').find('#viewProductInitializer').remove()
}


function getRecentlyViewed(customer_id, $section,items) {
	const customer_data = getCustomerCookie(customer_id)


	// console.log('customer_data', customer_data)
	// console.log('customer_id', customer_id)

	const $container = $section.find('.recently_viewed_container')

	// display if there are viewed items
	if(customer_data.recently_viewed.length > 1) {
		displayProductItemsToContainer(
			customer_data.recently_viewed
			, $container
			, 0
			, items )
	} else {
		$section.remove()
	}
}


function assignRecentlyViewed(id) {
	const customer_cdata = getCookie(`customer_${id}`)
	const anonymous_cdata = getCookie('customer_anonymous')

	let customer_data = customer_cdata && JSON.parse(customer_cdata)
	let anonymous_data = anonymous_cdata && JSON.parse(anonymous_cdata)


	// console.log('anonymous_data',anonymous_data)

	if(anonymous_data) {
		anonymous_data.recently_viewed.forEach((a_data)=> {
			if( customer_data.recently_viewed.length >= 5 ) {
				customer_data.recently_viewed.pop()
				// console.log('after pop', customer_data)
			}
			customer_data.recently_viewed.unshift(a_data)
		})
	}

	setCustomerCookie(id, customer_data)
	delete_cookie('customer_anonymous')
}