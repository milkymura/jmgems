let prodstorage = []

// function testReq() {
//  console.log("TEST REQ")
//  $.ajax({
//    url:'/pages/queries?page=1',
//    type: 'GET',
//    success: function( res ) {
//      const responseVal = $(res).find('#qry_fromall_prods').html()
//      console.log('responseVal', JSON.parse(responseVal))
//    }
//  })
// }


function checkTotalProducts(data) {
  console.log('total of, ', data)
}

function applyRellax() {
  let rellax = new Rellax('.rellax');
}

function smoothScrollToSection() {
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
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            let $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
}



function globalScript(isSmoothScroll, isBgchange) {

  initdnacomponent(isSmoothScroll, isBgchange)
  cartFunctions()
  initTabularDesc()

  // strut scripts
  // strutShufflingSections()
  // strutShufflingSectionsv2()
  // strutShufflingSectionsv3()
  // strutTwoColSection()
  // strutTwoColSectionSimple()
  // strutFeaturedProduct()
  // strutCarSection()
  // strutElephantSection()



  // newsletter()
  // smoothScrollToSection()
  // initSvnComponents()
  // tabularDescriptions
  // initStickyCards()
  // applyEllipsis('.s_content-desc',2)
  // applyEllipsis('.step-item-desc',2)
  // applyEllipsis('.menubar_shopby-item .desc',2)

  // testReq()
}

function homeScript() {
  applyRellax()
}


