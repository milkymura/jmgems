function checkCustomerData(id) {
	const url = `/admin/customers/${id}.json`

	$.ajax({
		url,
		type: 'GET',
		success: function(resp) {
			// console.log('customer data of ', id)
			// console.log('customer data on' ,resp)
		},
		error: function(err) {
			// console.log('ERROR')
			// console.log(JSON.parse(err))
		},
		async: false
	});
}