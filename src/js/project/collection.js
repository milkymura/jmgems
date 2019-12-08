
const collection = {}
// ===============================================
// FIRST: STORE EVERYTHING ON A SECTION KEY 
// WITH ITEMS AND LOADED ITEMS LOOK UP OBJECT
// ===============================================
function storeCollection(collection_name, products, section_key_id ) {

	if(!collection[section_key_id]) {
		collection[section_key_id] = {
			items: {},
			items_loaded: {}
		}
	}

	collection[section_key_id].items[collection_name] = products
	collection[section_key_id].items_loaded[collection_name] = 0

	// console.log('check stock', products)
}
// ===============================================
// SECOND : THIS WILL BE EXECUTED ONCE 
// storeCollection() IS DONE ITERATING ON THE LIQUID
// COLLECTION OBJECT
// ===============================================
function displayCollectionItem(string_id, section_key_id, limit_per_load ) {

	// check the object
	// console.log('collection items', collection)


	const $container = $(string_id) ,
				$hidethis = $container.find('.collection_processor')

	// initialize collectiontab with items
	initItemsToTabs($container, section_key_id, limit_per_load)

	// initialize collectiontab
	collectionTab()
	// there is a liquid object being 
	// looped to store items here
	$hidethis.remove()
}

function initItemsToTabs($container, section_key_id, limit_per_load) {
	const $tabcontainer = $container.find('.collection_tab_container')
				collectionItems = collection[section_key_id].items

	// loop object keys and store them on 
	// respective tab containers via the
	// tab-*key* classes
	Object.keys(collectionItems).forEach(function(key) {

			const container = $tabcontainer.find(`.tab-${key}`)

			storeItems(
				container
				, section_key_id
				, collectionItems[key]
				, key
				, 0
				, limit_per_load)
	});
}

function storeItems(
	container
	, section_key_id
	, products
	, collection_key
	, start_index
	, limit_per_load ) {

	// console.log('constainer === ', container)
	// console.log('products === ', products)

	// initialize blank string
	// and last index
	let items = '',
			last_index = 0

	// the limit per load
	const limitperload = limit_per_load

	// check if products exceed the limit
	const isExceeding = products.length > (limitperload + start_index)

	// console.log(`isExceeding = ${products.length} > ( ${limitperload} + ${start_index} )`)

	// update last index
	last_index = isExceeding 
			? (start_index + limitperload) - 1
			: (products.length - 1)

	// console.log(' isExceeding =',isExceeding)
	// console.log(' limitperload is =' ,limitperload)
	// console.log(' start index is =' ,start_index)
	// console.log(' last index is =' ,last_index)

	// update loaded index
	collection[section_key_id].items_loaded[collection_key] = last_index

	if (products.length > 0 ) {
		displayProductItemsToContainer(
			products
			, container.find('.items-container')
			, start_index
			, last_index )
	} else {
		container
			.find('.items-container')
			.addClass('empty')
	}

	// console.log('== collection', collection)
	if(!isExceeding) {
			const removethis = container.find('.items-loadmore').find('.btn')
			// console.log('remove this ', removethis)
			removethis.remove()
	}
}

function collectionTab() {
	// console.log('collectionTab')

	$('.collection_tab').each(function(){
		const $collectiontab = $(this),
					$menu = $collectiontab.find('.collection_tab_menu'),
					$tabs = $collectiontab.find('.collection_tab_container'),
					$menu_item = $menu.find('.collection_tab_menu_item')


		$menu_item.click(function(){

			// console.log('click stuff')
			const btn = $(this),
						targetElem = btn.data('tabcontainerkey')


			// console.log('click stuff target', targetElem)

			if(!btn.hasClass('active')) {
				// find that active tab
				// and remove active
				$tabs
					.find('.collection_tab_container_item.active')
					.removeClass('active')

				// find the target tabs
				// and make it active
				// console.log(` finding  .tab-${targetElem} `)
				// console.log('test', $(`.tab-${targetElem}`))
				$tabs
					.find(`.tab-${targetElem}`)
					.addClass('active')

				// find active menu
				$menu
					.find('.collection_tab_menu_item.active')
					.removeClass('active')

				btn.addClass('active')
			}
		})
	})


	// $('.items-loadmore-btn').each(function() {
	// 	$(this).click(function(){
	// 		console.log('wtf')
	// 		console.log($('.items-loadmore-btn'))
	// 	})
	// })

	$('.items-loadmore-btn').unbind('click').click(function() {
			const collectionkey = $(this).data('collectionkey'),
						sectionkey = $(this).data('sectionkey'),
						limitperload = $(this).data('limitperload'),
						$container = $(this).parents(`.tab-${collectionkey}`),
						collectionItems = collection[sectionkey].items,
						start_index = collection[sectionkey].items_loaded[collectionkey]

			// console.log(`$('.items-loadmore-btn')`)

			storeItems(
				$container
				, sectionkey
				, collectionItems[collectionkey]
				, collectionkey
				, start_index + 1
				, limitperload)
	})
}





