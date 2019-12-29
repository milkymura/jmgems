
function updateNavCount(count) {

  const finalCount = count === 0 
    ? '' 
    : count > 1 
      ? count+' items ' 
      : count+' item '

  $('#nav_cart_count').text(finalCount)
  $('#nav_cart_count-mobile').text(count)
}

function updateNavTotal(total) {
  $('#nav_cart_total').text(convertToMoney((total/100)))
}

function loadCart() {
  const $container = $('#cartContainer-main > ul') 
  let cartItems = {}
  let cartData = {
    items: {}
  }
  let isChanged = false 

  function openCart() {
    if (!$('html').hasClass('open_cart_container')) {
      $('html').addClass('open_cart_container')
    }
  }


  function addToCartInsideContainer(productId, defVariantId, qty = 1) {
    // console.log('productId', productId)
    // console.log('defVariantId', defVariantId)
    // console.log('qty', qty)

    // console.log('cartData', cartData)
    // console.log('cartItems', cartItems)

    handleUpdateCart(() => {
      loadItems()
    })
    addToCart(productId, defVariantId)
  }

  function addToCart(productId, defVariantId, qty = 1) {
    // check if cartdata already exist
    // this happens when you add the 
    // same item all over again
    // console.log('cartItems' ,cartItems)
    if(cartData.items[defVariantId] 
      && cartData.items[defVariantId].quantity !== 0) {
      cartItems[defVariantId] += parseInt(qty)
      // console.log('naa nay sud')
      handleUpdateCart(() => {
        // $('html').addClass('processing_add_to_cart')
        // setTimeout(function(){
        //  $('html').removeClass('processing_add_to_cart')
        // }, 1000)
        openCart()
        loadItems()
      })
    } else {
      const data = {
        quantity: parseInt(qty),
        id: defVariantId
      }

      // console.log('data === ',data)

      $.ajax({
        url: "/cart/add.js",
        type: 'POST',
        dataType: 'json',
        data ,
        beforeSend: function() {
          $('html').addClass('processing_add_to_cart')
        },
        success: function(resp) {
          $.ajax({
            url: "/cart.js",
            type: 'GET',
            dataType: 'json',
            success: function(res) {
              const { item_count } = res
              // setTimeout(function(){
              //  $('html').removeClass('processing_add_to_cart')
              //  updateNavCount(item_count)
              //  openCart()
              //  loadItems()
              // }, 1000)

              $('html').removeClass('processing_add_to_cart')
              updateNavCount(item_count)
              openCart()
              loadItems()
            }
          })
        },
        error: function(err) {
          const {
            description
          } = JSON.parse(err.responseText)

          // setTimeout(function(){
          //  $('html').removeClass('processing_add_to_cart')
          //  popperNotif(description,'error')
          // }, 1000)
          // console.log('more than ',err)
          $('html').removeClass('processing_add_to_cart')
          popperNotif(description,'error')
        },
        async: false
      });
    }
  }

  function changeTotalAndCount(price,count) {
    const $count = $('#cartContainer-cart-count') ,
          $grand_total = $('#cartContainer-gTotal') 
    $count.text(`( ${count} )`)
    $grand_total.text(convertToMoney(price))
  }

  function loadItems() {
    $.ajax({
      url: "/cart.js",
      type: 'GET',
      dataType: 'json',
      success: function(res) {
        const {
          item_count
          , items
          , original_total_price : net_price
          , total_discount
          , total_price
        } = res

        let append_items = ''


        changeTotalAndCount((total_price/100), item_count)

        // iterate on items
        if(item_count > 0) {
          items.forEach((item) => {
            append_items += `
            <li
              class="cartItem" 
              data-variantid="${item.variant_id}">

              <div class="cartItem-img">
                ${
                  item.image ?
                  `
                    <img src="${item.image}" alt="">
                  ` : `
                    <img src="https://cdn.shopify.com/s/files/1/0057/4151/0745/t/2/assets/no_image_150x.jpg?16295841165783292328" alt="" class="">
                  `
                }
              </div>

              <div class="cartItem-content">
                <a href="${item.url}" class="item-title">
                  <span class="item-product-title">
                    ${item.product_title || 'Untitled'}
                  </span>
                  <span class="item-variant-title">
                    ${item.variant_title || ''}
                  </span>
                </a>

                <div class="item-content">
                  <span class="item-qty">
                    <span>Qty: </span>
                    <input 
                      data-variantid="${item.variant_id}"
                      class="item-qty-input"
                      type="number"
                      min="1"
                      value="${item.quantity}"/>
                  </span>

                  <span 
                    class="item-price"
                    data-origprice="${ (item.original_price/100).toFixed(2) }">
                    ${convertToMoney((item.quantity * (item.original_price/100)))}
                  </span>
                </div>

                <span class="cartItem-delete">
                  remove
                </span>
              </div>
            </li>
            `

            // for cart data
            cartData.items[item.variant_id] = {
              quantity: item.quantity ,
              price: (item.original_price/100).toFixed(2)
            }

            // for cart api update
            cartItems[item.variant_id] = item.quantity
          })
        } else {
          append_items = `
            <p class='cartContainer-main-empty'>
              Your cart is empty
            </p>
          `
        }

        $container.empty()
        $container.append(append_items)
      }
    })
  }

  function handleTotal() {
    let total = 0;
    let qty = 0;

    Object.keys(cartData.items).forEach((key) => {
      const { price , quantity } = cartData.items[key]
      total += (price * quantity)
      qty += quantity
    })

    changeTotalAndCount(total, qty)
  }

  function handleQty() {
    $('body').on('keyup click change', '.item-qty-input', function() {
      isChanged = true
      const priceElem = $(this).parents('.item-qty').next() ,
            price = parseInt(priceElem.data('origprice')),
            variant_id = $(this).data('variantid')


      // let incase the user 
      // inputs a non number value
      let qty =  isNaN(parseInt($(this).val())) ? 0 
        : parseInt($(this).val())

      priceElem.text(convertToMoney((price * qty)))
      handleTotal()

      cartItems[variant_id] = qty

      // for cart data
      cartData.items[variant_id].quantity = qty
    })
  }

  function handleDelete() {
    $('body').on('click', '.cartItem-delete', function() {
      isChanged = true
      const element = $(this).parents('.cartItem') ,
            variant_id = element.data('variantid')
      const animationEnded = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd'

      cartItems[variant_id] = 0
      cartData.items[variant_id].quantity = 0

      // console.log('after delete ',cartItems)

      element
        .addClass('remove')
        .one(animationEnded, function() {
          $(this).remove()
          handleTotal()
          // console.log('$container is ', $container.children().length)
          if( $container.children().length < 1 )  {
            $container.append(`<p class='cartContainer-main-empty'>Your cart is empty</p>`)
          }
        })
    })
  }

  function handleUpdateCart(cb = null) {

    // console.log('handleUpdateCart after',cartItems)

    $.ajax({
      url: '/cart/update.js',
      type: 'POST',
      async: false,
      data: {
        updates: cartItems
      },
      dataType: 'json',
      success: function(res) {
          const {
            item_count
            , original_total_price
          } = res


          updateNavCount(item_count)
          updateNavTotal(original_total_price)

          // if there is no call back the 
          // default behavior will update the count and 
          // close the cart
          if(!cb) {
            $('html').removeClass('open_cart_container')
          } else {
            cb()
          }
      },
      error: function(err) {
          // console.log('response err', err)
      }
    })
  }

  function initProductPurchase() {
    $('.tgs_product_template').each(function() {
      const $container = $(this),
            $price_el = $container.find('.product_price'),
            $qty_el = $container.find('.options-qty'),
            $form = $container.find('.product_order_form'),
            product_data = JSON.parse($container.find('.jsonStorage').val()),
            $optionmodifiers = $form.find('.options-modifier'),
            $optioncombo = $form.find('.options-combo'),
            $colorPicker = $form.find('.col-colorpicker_grp'),
            $colorModifier = $form.find('.options-modifier[data-optiontype^="Color"]')

      const {
        variants,
        id: prod_id 
      } = product_data

      let combo = $optioncombo.val().split(" / ")

      // remove json on page
      $container.find('.jsonStorage').remove()

      // initialize option modifiers
      $optionmodifiers.each(function() {
        const $el = $(this) ,
              combokey = parseInt($el.data('combokey'))

        $el.change(function() {
          let combo_qry = ''

          // change val to respective
          // key on array
          combo[combokey] = $el.val()

          // assign the combined combo string
          combo_qry = combo.join(' / ')

          // set value to combo string
          $optioncombo.val(combo_qry)

          // find combo string to get price
          const variantObj = variants.find((i) => ( 
            i.title === combo_qry
          )) || variants[0]

          // set new price to data and text

          const newPrice = (variantObj.price / 100)
          const dataPrice = newPrice

          $price_el.attr('data-origprice', variantObj.price)

          console.log('variantObj.price', variantObj.price)
          console.log('newPrice', newPrice)

          // get the data of count and multiply
          $price_el.find('.price').text(convertToMoney(newPrice * $qty_el.val(),false))
        })
      })

      // initialize count to change price
      $qty_el.on('keyup click change',function() {
        let count = parseInt($(this).val())

        let total = 0 

        const origprice = parseInt($price_el.data('origprice')) / 100
        console.log('origprice === ', origprice)


        if(isNaN(count)) {
          count = 0
        }

        total = (count * origprice)


        if( count == 0 ) {
          total = origprice
        }

        console.log('total', total)

        $price_el
          .find('.price')
          .text(convertToMoney(total,false))
      })

      // color functions
      $colorPicker
        .children()
        .each(function() {

          $(this).click(function() {
            const colordata = $(this).data('tooltip')

            $colorModifier.val(colordata)

            $colorPicker.find('.selected').removeClass('selected')
            $(this).addClass('selected')

          })

        })
      // if submit
      $form.submit(function(e) {
          e.preventDefault()

          // serializeArray of form
          const raw_formdata = $form.serializeArray()

          // init blank title
          let variantTitle = '',
              qty = 0

          // iterate serializeArray options
          raw_formdata.forEach(function({ name , value }, i){

            // console.log('test naem == ', name)
            if(name.includes('option')) {
              variantTitle += value
              if( i !== raw_formdata.length - 2 ) {
                variantTitle += ' / '
              }
            } else if (name.includes('quantity')) {
              qty = value
            }
          });

          const datatosubmit = variants.find((i) => ( 
            i.title === variantTitle
          )) || variants[0]


          // console.log('found', datatosubmit)
          // console.log('submitting prod_id=', prod_id)
          // console.log('submitting datatosubmit.id=', datatosubmit.id)
          // console.log('submitting qty=', qty)

          addToCart(prod_id, datatosubmit.id, qty)
      })
    })
  }



  loadItems()
  handleQty()
  handleDelete()
  handleUpdateCart()
  initProductPurchase()


  // BUTTON HANDLERS

  $('body').on('click','.btn-addtocart',function() {
    const btn = $(this) ,
          productId = btn.data('productid') ,
          defVariantId = btn.data('defaultvariantid')

    if ( !$('html').hasClass('open_cart_container')) {
      addToCart(productId, defVariantId)
    } else {
      addToCartInsideContainer(productId, defVariantId)
    }
  })

  $('#cartContainer-close').click(function() {
    $('html').removeClass('open_cart_container')

    if(isChanged) {
      handleUpdateCart(() => { loadItems() })
      isChanged = false
    }
  })

  $('#showCartContainer').click(function(){ 
    // console.log('#showCartContainer')
    openCart() 
  })

  $('.m_cart_toggler').click(function(){ openCart() })

  $('.cartContainer-header .title a').click(function() {
    handleUpdateCart(() => {
      window.location = '/cart'
    })
  })

  $('#cartContainer-checkout').click(function() {
    handleUpdateCart(() => {
      window.location = '/checkout'
    })
  })
}

function productPageSlider() {

  function initSlider($slider) {
    const slide_options = {
        items: 1,
        loop: false ,
        nav: false ,
        dots: false ,
        autoplay : false , // testing
        animateIn: 'fadeIn' ,
        animateOut: 'fadeOut' ,
        touchDrag: false,
        mouseDrag: false,
        pullDrag: false,
        freeDrag: false,
        autoplayHoverPause: true
    }

    if($slider.children().length > 1) {

      console.log('this', this);
      console.log('$slider', $slider);

      $slider.owlCarousel(slide_options)
    } else {
      $slider.removeClass('owl-carousel owl-theme')
    }
  }

  function moveSlider($form,$slider) {
    setTimeout(function() {
      const formData = serializeToObject($form.serializeArray())

      let qry = '.mainSlider_owl_item'

      Object.keys(formData).map((key) => {
        if(key !== 'quantity') {
          qry+=`[data-${key}^="${formData[key]}"]`
        }
      })


      const $slideFound = $slider.find(qry)
      const toMoveSlideKey = $slideFound.data('slidekey')

      $slider.trigger('to.owl.carousel',[(toMoveSlideKey - 1),1000])

      console.log('moveslider', formData)
    },100)

  }

  $('.tgs_product_template').each(function() {
    const $section = $(this) ,
          $slider = $section.find('.mainSlider_owl') ,
          $form = $section.find('form.product_order_form'),
          $modifiers =$section.find('.options-modifier'),
          $colorpicker = $section.find('.col-colorpicker_grp_item')


    // initialize slider
    initSlider($slider)

    // formwatcher
    $modifiers.each(function() {
      $(this).change(function() {
        moveSlider($form,$slider)
      })
    })

    $colorpicker.each(function() {
      $(this).click(function() {
        moveSlider($form,$slider)
      })
    })
  })
}


function cartFunctions() {
  productPageSlider()
  loadCart()
}