function initSliders() {

  function owlSliders() {
    $('.d_slider_carousel').each(function(){
      const carousel = $(this)
      const {
        slidenav : nav ,
        slidedots : dots ,
        slideloop : loop ,
        autoplay ,
        autoplaytimeout : autoplayTimeout ,
        animatein : animateIn ,
        animateout : animateOut ,
      } = carousel.data()

      const slide_options = {
          items: 1,
          loop ,
          nav ,
          dots ,
          autoplay , // testing
          autoplayTimeout ,
          animateIn: animateIn !== 'none' && animateIn ,
          animateOut: animateOut !== 'none' && animateOut ,
          autoplayHoverPause: true ,
          navText : ['<i class="wtfl wtf-chevron-left"></i>','<i class="wtfl wtf-chevron-right"></i>']
      }

      if( carousel.children().length > 1 ) {
        carousel.owlCarousel(slide_options)
      } else {
        carousel.removeClass('owl-carousel owl-theme')
      }
    })
  }

  function featuredProductSlides() {
    $('.strt_featuredProd_slideOwl').each(function() {
      const $slide = $(this)
      const $thumbslider = $slide
        .closest('.col-graphic')
        .find('.strt_featuredProd_slidePreview')

      const slide_options = {
          items: 1,
          loop: true ,
          nav: false ,
          dots: false ,
          autoplay : false , // testing
          animateIn: 'fadeIn' ,
          animateOut: 'fadeOut' ,
          autoplayHoverPause: true ,
      }

      $thumbslider
        .children()
        .each(function() {
          const $thumb = $(this)
          $thumb.click(function() {
            const indexToMove = parseInt($(this).data('slide')) - 1
            // console.log('indexToMove', indexToMove)
            $slide.trigger('to.owl.carousel',[indexToMove,1000])
          })
        })

      $slide.owlCarousel({
        ...slide_options ,
        onChanged: function(e) {
          const { index } = e.item
          const $activeOwlItem = $slide.find(".owl-item").eq(index)
          const $activeSlide = $activeOwlItem.find('.strt_featuredProd_slideOwl_item')
          const activeThumbKey = $activeSlide.data('thumbid')

          // console.log('activeOwlItem', $activeOwlItem)
          // console.log('activeThumbKey', activeThumbKey)

          if (activeThumbKey) {
            // remove previous active thumbnail
            $thumbslider
              .find(`.strt_featuredProd_slidePreview_item.active`)
              .removeClass('active')
            // assign active to thumbnail
            $thumbslider
              .find(`.strt_featuredProd_slidePreview_item[data-slide^=${activeThumbKey}]`)
              .addClass('active')
          }

        }
      })
    })
  }

  function gallerySliders() {

    $('.d_gallerySlider_carousel').each(function() {
      const $gallerySlider = $(this)
      const hasMorethan1 = $gallerySlider.children().length > 1
      const {
        slidenav : nav ,
        slidedots : dots ,
        slideloop : loop ,
        autoplay ,
        autoplaytimeout : autoplayTimeout ,
      } = $gallerySlider.data()

      if(hasMorethan1) {
        setTimeout(function() {
          $gallerySlider.lightSlider({
              item: 1,
              slideMove: 1, // slidemove will be 1 if loop is true
              slideMargin: 0,

              addClass: '',
              mode: 'slide',
              useCSS: true,
              cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
              easing: 'linear', //'for jquery animation',////

              // speed: 400, //ms'
              // auto: false,
              // pauseOnHover: true,
              loop: false,
              // slideEndAnimation: true,
              // pause: autoplayTimeout,

              // keyPress: false,
              controls: true,
              prevHtml: '<i class="wtfl wtf-chevron-left"></i>',
              nextHtml: '<i class="wtfl wtf-chevron-right"></i>',

              thumbItem:10,
              gallery: true,
              galleryMargin: 0,
              thumbMargin: 0,

              enableTouch:true,
              enableDrag:true,
              // freeMove:true,
              swipeThreshold: 40,

              responsive : [
                {
                  breakpoint: 1025,
                  settings: {
                    thumbItem:6,
                    controls: true
                  }
                },
                {
                  breakpoint: 769,
                  settings: {
                    thumbItem:4,
                    controls: false
                  }
                },
                {
                  breakpoint: 415,
                  settings: {
                    controls: false,
                    thumbItem:3
                  }
                }
              ]
          })
        },1000)
      }
    })
  }

  // intialize
  owlSliders()
  gallerySliders()
  featuredProductSlides()
  // console.log('sliders initialized')
}