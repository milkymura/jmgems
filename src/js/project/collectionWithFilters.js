const collectionPage = {}


// ===============================================
// SCENARIO TWO 1: THE PRODUCTS ARE BEING DISPLAYED
// IN A PAGE WHERE THERE ARE FILTERS
// ===============================================
function storeObjectsToCollectionPage(products) {
  // console.log('pushing product', products)

  const arrs = products.sort((a,b) => (a.title > b.title) ? 1 : -1)

  collectionPage.all = arrs
  collectionPage.backup = arrs
  collectionPage.filtered = arrs

  // console.log('products', products)
  // for testing
  // $('#testdata').text(JSON.stringify(products))
}

// ===============================================
// SCENARIO TWO 2: THE PRODUCTS ARE BEING DISPLAYED
// IN A PAGE WHERE THERE ARE FILTERS
// ===============================================
function displayCollectionToPage(
  section_key_id
  , limit_per_load ) {

  const $parent = $(section_key_id) ,
        $container = $parent.find('.productcard-parent') ,
        itemsPerLoad = parseInt($container.data('itemsperload')) ,
        $sortHandler = $parent.find('.collectionMainFilter-select'),
        $filterForm = $parent.find('.collectionCategoryFilter-form'),
        $slider = $parent.find('.price_slider'),
        $loadmore = $parent.find('.productcard-parent-loadmore'),
        $processor = $parent.find('.collection_processor')


  $processor.remove()

  let currentMinMax = []


  function sortFilteredItems() {
    const sortBy = $sortHandler.val()

    // console.log('sortFilteredItems()', sortBy)
    collectionPage.filtered.sort((a,b) => {
      if(sortBy === 'name_asc') {
        return (a.title > b.title) ? 1 : -1
      } else if (sortBy === 'name_desc') {
        return (a.title > b.title) ? -1 : 1
      } else if (sortBy === 'price_asc') {
        return (a.price > b.price) ? 1 : -1
      } else {
        return (a.price > b.price) ? -1 : 1
      }
    })
  }

  function sortByPrice() {
    const [min, max] = currentMinMax ,
          backup = [...collectionPage.backup]

    const pricemin = parseInt(min) * 100,
          pricemax = parseInt(max) * 100

    const arr = backup.filter((p) => {
      return p.price >= pricemin && p.price <= pricemax
    })

    collectionPage.filtered = arr

    // console.log('collectionPage.filtered', collectionPage.backup)
    // console.log('collectionPage.filtered', collectionPage.filtered)
  }

  function applyItems() {
    clearProductItemsOnContainer($container)
    if(collectionPage.filtered.length < 1) {
      // console.log('is empty')
      $container.addClass('empty')
    } else {
      // console.log('not empty')
      $container.removeClass('empty')

      displayProductItemsToContainer(
          collectionPage.filtered
          , $container
          , 0
          , isNaN(itemsPerLoad) ? 10 : itemsPerLoad
        )
    }
  }

  function filterByCategory(arrOfConditions, hasFilters = true ) {
    const arr = [...collectionPage.all]
    let res = []


    if(hasFilters) {
      // first find if there is a vendor
      const hasVendor = arrOfConditions.find((a) => a.name === 'vendor')

      if(hasVendor) {
        res = arr.filter((i) => {
          return arrOfConditions.find((a) => {
            if(a.name === 'vendor') {
              return a.value === i.vendor
            }
            return false
          })
        })
      }

      // seccond if there is filter them by type
      const hasType = arrOfConditions.find((a) => a.name === 'type')
      if(hasType) {

        const tofilter = res.length > 0 ? [ ...res ] : arr

        res = tofilter.filter((i) => {
          return arrOfConditions.find((a) => {
            if(a.name === 'type') {
              return a.value === i.type
            }
            return false
          })
        })
      }
    } else {
      res = [...arr]
    }


    // console.log('after filtering vendors', res)

    collectionPage.filtered = res
    collectionPage.backup = res
  }


  // HANDLERS
  // ==============================================
  $sortHandler.change(function(){
    // console.log('sorting items')
    sortFilteredItems()
    clearProductItemsOnContainer($container)
    displayProductItemsToContainer(
        collectionPage.filtered
        , $container
        , 0
        , 10
      )
  })

  initPriceSlider($slider, (slidervals) => {
    debouncer(()=> {
      currentMinMax = slidervals
      sortByPrice()
      sortFilteredItems()
      applyItems()
    }, 1000)
  })

  $filterForm.submit(function(e){
    e.preventDefault()
    const raw_formdata = $(this).serializeArray()

    // console.log('raw_formdata', raw_formdata)

    const hasFilters = (raw_formdata.length > 0 )
    filterByCategory(raw_formdata , hasFilters)

    sortByPrice()
    sortFilteredItems()
    applyItems()
  })

  // FOR LAZY LOAD
  // ==============================================
  let loadedOnContainer = 0
  const controller = new ScrollMagic.Controller()
  const scenes = new ScrollMagic.Scene({
    triggerElement: $loadmore[0],
    triggerHook: .8,
    tweenChanges: true
  })
  // .addIndicators({name: "trigger lazy load"})
  .on('enter',function() {


    // console.log('itemsPerLoad ====', itemsPerLoad)
    let recent_count = $container.children().length ,
        load_more_count = isNaN(itemsPerLoad) ? 10 : itemsPerLoad


    // console.log('load_more_count ====', load_more_count)
    // console.log('$container is ',$container)

    console.log('checking', collectionPage)
    // console.log('checking condition')
    // console.log('if(collectionPage.filtered.length > recent_count)')
    // console.log(collectionPage.filtered.length > recent_count)
    // console.log(collectionPage.filtered.length)
    // console.log(recent_count)
 

    if(collectionPage.filtered.length > loadedOnContainer) {
      $loadmore.addClass('loading')

      setTimeout(function() {
        displayProductItemsToContainer(
            collectionPage.filtered
            , $container
            , loadedOnContainer
            , loadedOnContainer + load_more_count
          )
        $loadmore.removeClass('loading')
      },2000)
      loadedOnContainer += load_more_count
    }



  })
  .addTo(controller)

  // sortFilteredItems()
  // applyItems()
}