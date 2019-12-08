function strutFeaturedProduct() {
  const $sections = $('.strt_featuredProd')
  const $html = $('html')
  const mobileScreenSize = 900
  let controller = null
  let productJSONData = null

  function introSection($section) {
    const $content = $section.find('.col-content') ,
          $graphicContainer = $section.find('.col-graphic-container')

    const $firstActiveCarousel = $section.find('.strt_featuredProd_slide.active'),
          $previewItems = $firstActiveCarousel.find('.slidePreview_item')

    const $bgSlide = $firstActiveCarousel.find('.slideContainer_slideBg')
    const $mainSlide = $firstActiveCarousel.find('.slideContainer_owl')
    const $thumbs = $firstActiveCarousel.find('.slidePreview')


    const animation = new TimelineMax()

    // bg enters in big form then shrinks
    animation
      .add(TweenMax.fromTo(
        $bgSlide, .5, {
          xPercent: -60,
        },{
          xPercent: 0,
          ease: Power3.easeOut
        }
      ),0)
      .add(TweenMax.fromTo(
        $bgSlide, 1, {
          scale: 1.4,
        },{
          scale: 1,
          ease: Power3.easeOut
        }
      ),.45)
    // main slider goes up
    animation
      .add(TweenMax.fromTo(
        $mainSlide, .5, {
          yPercent: 40,
          opacity: 0,
        },{
          yPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ),.6)
      .add(TweenMax.fromTo(
        $mainSlide, .5, {
          scale: .9,
        },{
          scale: 1,
          ease: Power3.easeOut
        }
      ),1)
    // thumbnail show in staggered manner
    animation
      .add(TweenMax.staggerFromTo(
        $thumbs.children(), .5, {
          xPercent: -10,
          opacity: 0,
        },{
          xPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        },.1
      ),.7)

    const animationScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: '60%',
      triggerHook: 0.4,
      tweenChanges: true
    })
    .setTween(animation)
    // .addIndicators({name: "featued carousel"})
    .addTo(controller)
  }

  function pinContainer($section) {
    const $pinContainer = $section.find('.pinContainer') ,
          colors = $section.find('.col_colorVariants .colors .color')

    const animationScene = new ScrollMagic.Scene({
      triggerElement: $section[0] ,
      duration: '450%',
      triggerHook: 0,
      tweenChanges: true
    })
    .setPin($pinContainer[0])
    // .addIndicators({name: "featued carousel"})
    .addTo(controller)
  }

  function animateSectionEntrance($section) {
    const $colorsSection = $section.find('.triggerPoints')
    const $graphicCol = $section.find('.col-graphic-container')
    const $colorsContainer = $section.find('.col_colorVariants .colors')

    $colorsSection
      .children()
      .each(function(index) {

        const $sectionItem = $(this) ,
              section_color = $sectionItem.data('color')

        const $activeSlide = $graphicCol.find(`.${section_color}`)

        const $bgSlide = $activeSlide.find('.slideContainer_slideBg')
        const $mainSlide = $activeSlide.find('.slideContainer_owl')
        const $thumbs = $activeSlide.find('.slidePreview')


        // apply animation to all but not
        // the first child
        if (index != 0) {
          const enterAnimation = new TimelineMax()
          enterAnimation
            .add(TweenMax.staggerFromTo(
              $thumbs.children(), .5, {
                xPercent: 100,
                opacity: 0
              },{
                xPercent: 0,
                opacity: 1,
                ease: Power3.easeOut
              },.25
            ),0)
            .add(TweenMax.staggerFromTo(
              $bgSlide, 1, {
                yPercent: 50,
                opacity: 0
              },{
                yPercent: 0,
                opacity: 1,
                ease: Power3.easeOut
              },.1
            ),0.5)
            .add(TweenMax.staggerFromTo(
              $mainSlide, 1, {
                yPercent: 50,
                opacity: 0
              },{
                yPercent: 0,
                opacity: 1,
                ease: Power3.easeOut
              },.1
            ),0.75)
          const enterScene = new ScrollMagic.Scene({
            triggerElement: $sectionItem[0] ,
            duration: 0,
            triggerHook: 0.5,
            tweenChanges: true
          })
          .setTween(enterAnimation)
          // .addIndicators({name: "animate active carousel"})
          .addTo(controller)
        }



        const animationScene = new ScrollMagic.Scene({
          triggerElement: $sectionItem[0] ,
          duration: '150%',
          triggerHook: 0.5,
          tweenChanges: true
        })
        .on('enter leave', (e) => {

          // update graphic container
          $graphicCol.find('.active').removeClass('active')
          $activeSlide.addClass('active')

          // update colors
          $colorsContainer.find('.active').removeClass('active')
          console.log(`.color[data-color^="${section_color}"]`)
          
          const modifiedColor = section_color[0].toUpperCase() + section_color.substring(1)

          $colorsContainer
            .find(`.color[data-color^="${modifiedColor}"]`)
            .addClass('active')

          // update button addtocart
          updateActiveColor($section, section_color)

        })
        // .addIndicators({name: "detect active carousel"})
        .addTo(controller)

      })
  }

  function animateExitSlide($slide) {
    const animation = new TimelineMax()

    const $slideBg = $slide.find('.slideContainer_slideBg') ,
          $slideOwl = $slide.find('.slideContainer_owl') ,
          $slidePreview = $slide.find('.slidePreview')
    const $slideContainerItems = [$slideBg , $slideOwl]


    animation
      .add(TweenMax.staggerFromTo(
        $slideContainerItems, .5, {
          yPercent: 0,
          opacity: 1,
        },{
          yPercent: -20,
          opacity: 0,
          ease: Power3.easeOut
        },.1
      ), 0)
      .add(TweenMax.fromTo(
        $slidePreview, 1, {
          xPercent: 0,
          opacity: 1,
        },{
          xPercent: -20,
          opacity: 0,
          ease: Power3.easeOut
        }
      ), 0)
  }

  function animateEnterSlide($slide) {
    const animation = new TimelineMax()

    const $slideBg = $slide.find('.slideContainer_slideBg') ,
          $slideOwl = $slide.find('.slideContainer_owl') ,
          $slidePreview = $slide.find('.slidePreview')
    const $slideContainerItems = [$slideBg , $slideOwl]

    animation
      .add(TweenMax.staggerFromTo(
        $slideContainerItems, .5, {
          yPercent: -20,
          opacity: 0,
        },{
          yPercent: 1,
          opacity: 1,
          ease: Power3.easeOut
        },.1
      ), 0)
      .add(TweenMax.fromTo(
        $slidePreview, 1, {
          xPercent: -20,
          opacity: 0,
        },{
          xPercent: 0,
          opacity: 1,
          ease: Power3.easeOut
        }
      ), 0)
  }

  function colorsClick($section, $colors) {
    const $colorsContainer = $section.find('.col_colorVariants .colors')
    const $graphicContainer = $section.find('.col-graphic-container')

    $colors.each(function() {
      const $color = $(this)
      const colorData = $color.data('color').toLowerCase()

      const $sectionToScroll  = $section.find(`.triggerPoints .${colorData}`)

      $color.click(function() {
        const $this = $(this)
        // console.log(colorData)
        setTimeout(function() {
          const isMobile = $html.hasClass('page-sm-strutFeaturedProduct-destroyed')

          $colorsContainer.find('.active').removeClass('active')
          $this.addClass('active')

          if (isMobile) {
            $graphicContainer
              .find('.active')
              .removeClass('active')
            $graphicContainer
              .find(`.strt_featuredProd_slide[data-color=${colorData}]`)
              .addClass('active')
          } else {
            scrollToElement($sectionToScroll,500,20)
          }

          updateActiveColor($section, colorData)


        }, 500)

      })
    })
  }

  function updateActiveColor($section, color) {
    const $btnAdd = $section.find('.btn-addtocart')
    const variantData = productJSONData.variants
      .find((variant) => {

        const vTitle = variant.title && variant.title.toLowerCase()
        const vOption1 = variant.option1 && variant.option1.toLowerCase()
        const vOption2 = variant.option2 && variant.option2.toLowerCase()
        const vOption3 = variant.option3 && variant.option3.toLowerCase()

        return color === vTitle || 
          color === vOption1 ||
          color === vOption2 ||
          color === vOption3
      })

    $btnAdd.attr('data-defaultvariantid', variantData.id)
    $btnAdd.data('defaultvariantid', variantData.id)
  }

  function initSliders($slides) {
    const $slide = $slides.find('.slideContainer_owlCarousel') ,
          $thumbnails = $slides.find('.slidePreview')

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

    $slide.owlCarousel({
      ...slide_options ,
      onChanged: function(e) {
        const { index } = e.item
        const $activeOwlItem = $slide.find(".owl-item").eq(index)
        const $activeSlide = $activeOwlItem.find('.slideContainer_owlCarousel_item')
        const activeThumbKey = $activeSlide.data('thumbid')

        // console.log('activeOwlItem', $activeOwlItem)
        // console.log('activeThumbKey', activeThumbKey)

        if (activeThumbKey) {
          // remove previous active thumbnail
          $thumbnails
            .find(`.slidePreview_item.active`)
            .removeClass('active')

          // assign active to thumbnail
          $thumbnails
            .find(`.slidePreview_item[data-slide^=${activeThumbKey}]`)
            .addClass('active')
        }

      }
    })

    $thumbnails.children().each(function() {
      const $thumb = $(this)
      $thumb.click(function() {
        const indexToMove = parseInt($(this).data('slide')) - 1
        // console.log('indexToMove', indexToMove)
        $slide.trigger('to.owl.carousel',[indexToMove,1000])
      })
    })
  }

  function detectScreen() {
    $(window).resize(function() {

      if ($(window).width() <= mobileScreenSize) {
        $html.addClass('page-sm-strutFeaturedProduct-destroyed')
        controller.destroy(true)
        controller = null

      } else {
        if ($html.hasClass('page-sm-strutFeaturedProduct-destroyed')) {
          $html.removeClass('page-sm-strutFeaturedProduct-destroyed')
          sectionEntrance()
        }
      }
    })
  }

  function sectionEntrance() {
    controller = new ScrollMagic.Controller()

    if ($(window).width() > mobileScreenSize ) {
      $sections.each(function() {
        const $section = $(this)
        introSection($section)
        pinContainer($section)
        animateSectionEntrance($section)
      })
    } else {
      $html.addClass('page-sm-strutFeaturedProduct-destroyed')
    }
  }

  function getProductData($section) {
    const data = JSON.parse($section.find('.col-content textarea').val())
    productJSONData = data
  }

  function initCarousel() {
    $sections.each(function() {
      const $section = $(this) ,
            $colors = $section.find('.colors .color') ,
            $columnGraphic = $section.find('.col-graphic') ,
            $slides = $section.find('.strt_featuredProd_slide')

      getProductData($section)
      colorsClick($section, $colors)
      initSliders($slides)
    })
  }


  sectionEntrance()
  initCarousel()


}