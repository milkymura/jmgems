const BrowserDetect = {
  init: function () {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
  },
  searchString: function (data) {
    for (let i = 0; i < data.length; i++) {
      let dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
    }
  },
  searchVersion: function (dataString) {
    let index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }

    let rv = dataString.indexOf("rv:");
    if (this.versionSearchString === "Trident" && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    } else {
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    }
  },

  dataBrowser: [
    {string: navigator.userAgent, subString: "Edge", identity: "msedge"},
    {string: navigator.userAgent, subString: "MSIE", identity: "msie"},
    {string: navigator.userAgent, subString: "Trident", identity: "explorer"},
    {string: navigator.userAgent, subString: "Firefox", identity: "firefox"},
    {string: navigator.userAgent, subString: "Opera", identity: "opera"},  
    {string: navigator.userAgent, subString: "OPR", identity: "opera"},  

    {string: navigator.userAgent, subString: "Chrome", identity: "chrome"}, 
    {string: navigator.userAgent, subString: "Safari", identity: "safari"}
  ]
}

function applySmoothScroll(browser) {
  // For more easing functions see 
  // https://api.greensock.com/js/com/greensock/easing/package-detail.html
  //Window object
  let $window = $(window)
  //Scroll time
  let scrollTime = 0.9
  //Distance. Use smaller value for shorter scroll and greater value for longer scroll
  let scrollDistance = 200

  let scrollEvent = browser === 'firefox' ? 'DOMMouseScroll' : 'mousewheel' 

  $window.on(scrollEvent, function(event){
    event.preventDefault()
    let delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3
    let scrollTop = $window.scrollTop()
    let finalScroll = scrollTop - parseInt(delta*scrollDistance)
    
    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
        ease: Power1.easeOut,
        autoKill: true,
        overwrite: 5
      })
  })
}

function applyBgChange() {
  const $c_section  = $('.c_section') ,
        scroll_controller = new ScrollMagic.Controller()


  $c_section.each(function() {
    const backgroundColor = $(this).css('backgroundColor')

    $(this).css({backgroundColor: 'transparent'})

    // change color tween
    const changeColor = TweenMax.to(
      '.main-content > .index-sections'
      , 2 
      , { 
        backgroundColor,
        ease: Power3.easeOut 
      }
    )

    // animation scrollmagic
    const scenes = new ScrollMagic.Scene({
      triggerElement: this,
      duration: 500,
      reverse: true
    })
    .setTween(changeColor)
    // .addIndicators({name: "change color"})
    .addTo(scroll_controller)
  })
}

function detectNewsletter() {
  const isposted = getParameterByName('customer_posted')
  if(isposted) {
    $('html').addClass('showNewsletterMessage')
  }
  $('#newslettermsg_modal-close').click(function(){
    $('html').removeClass('showNewsletterMessage')
  })
}

function popperNotif(message, popup_state) {
  const $popper = $('#popper_notif') ,
        $popper_container = $popper.find('.popper_notif-contents') ,
        $popper_msg = $popper.find('.popper_notif-msg') ,
        $close = $popper.find('.popper_notif-close') ,
        position = $popper.data('position') ,
        timeout = $popper.data('timeout') ,
        popTween = new TimelineMax()


  let popTween_from = {} ,
      popTween_to = {}

  $popper.addClass(`popper--${popup_state}`)

  if( position == 'top' ) {
    popTween_from = {
      y: -100,
      scale: .5,
      opacity: 0 
    }

    popTween_to = {
      y: 50,
      scale: 1,
      opacity: 1,
      ease: Power3.easeOut
    }
  } else if (position == 'left') {
    popTween_from = {
      x: -100,
      opacity: 0 
    }

    popTween_to = {
      x: 50,
      opacity: 1,
      ease: Power3.easeOut
    }
  } else if (position == 'right') {
    popTween_from = {
      x: 100,
      opacity: 0 
    }

    popTween_to = {
      x: -50,
      opacity: 1,
      ease: Power3.easeOut
    }
  } else {
    popTween_from = {
      y: 100,
      scale: .5,
      opacity: 0
    }

    popTween_to = {
      y: -50,
      scale: 1,
      opacity: 1,
      ease: Power3.easeOut
    }
  }

  // console.log('message == ', message)
  // console.log('messagepoper elem == ', $popper_msg)
  $popper_msg.text(message)

  function closeThis() {
    popTween
      .call(function() {
        $('html').removeClass('popper_notif_opened')
        $('html').addClass('popper_notif_closed')
      })
      .add(TweenMax.to(
        $popper_container , .5 ,
        { opacity: 1 }
      ))
  }

  function openThis() {
    popTween
      .call(function() {
        $('html').removeClass('popper_notif_closed')
        $('html').addClass('popper_notif_opened')
      })
      .add(TweenMax.fromTo(
        $popper_container , .5 ,
        popTween_from , popTween_to
      ))
  }

  openThis()

  setTimeout(function() {
    closeThis()
  }, ( timeout * 1000 ))

  $close.click(function(){
    closeThis()
  })
}

function imageZoom() {
  $('.imagezoom').each(function(){
    const $el = $(this),
          url = $el.data('zoom') ,
          magnify = parseInt($el.data('magnify'))

    $el
      .wrap('<span class="imagezoom-container"></span>')
      .parent()
      .zoom({ 
        url ,
        on: 'mouseover',
        magnify: isNaN(magnify) ? 4 : magnify
      });
  })
}

function adjustMain() {
  const $nav = $('#shopify-section-dna-navigation') ,
        $mainContainer = $('main.main-content')

  $mainContainer.css({
    marginTop:$nav.height() 
  })

  $(window).resize(function() {
    console.log('test')
    $mainContainer.css({
      marginTop:$nav.height() 
    })
  })
}

function initEllipsisOnStrings() {
  const $el = $('.applyEllipOnString')
  $el.each(function() {
    let lines = parseInt($(this).data('ellip-line'))
    if(!isNaN(lines)) applyEllipsis($(this),lines)
  })
}

function detectIfMobile() {
  const mobileScreenSize = 769
  const $html = $('html')

  const applyDetection = () => {
    if ($(window).width() <= mobileScreenSize) {
      $html.addClass('page-is-mobile')
    } else {
      $html.removeClass('page-is-mobile')
    }
  }

  applyDetection()

  $(window).resize(function() {
    applyDetection()
  })
}


function smoothScrollToSection() {
  const diff = $('nav.nav').innerHeight()

  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: (target.offset().top - diff) + 10
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            // var $target = $(target);
            // $target.focus();
            // if ($target.is(":focus")) { // Checking if the target was focused
            //   return false;
            // } else {
            //   $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            //   $target.focus(); // Set focus again
            // };
          });
        }
      }
    });
}

function initdnacomponent(isSmoothScroll, isBgchange) {
  // globals
  const $html = $('html')

  BrowserDetect.init()
  $html.addClass('browser-' + BrowserDetect.browser)

  // if(isSmoothScroll) {
  //   applySmoothScroll(BrowserDetect.browser)
  // }

  if(isBgchange) {
    applyBgChange()
  }

  adjustMain()
  imageZoom()

  smoothScrollToSection()
  // applySmoothScroll(BrowserDetect.browser)


  initNav()
  initSliders()
  initModals()
  initTestimonialSlider()
  initEllipsisOnStrings()

  detectIfMobile()
  detectNewsletter()
}
