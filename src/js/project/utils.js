function pathPrepare ($el) {
  let lineDash = $el.attr('stroke-dasharray');
  let lineOffset = $el.attr('stroke-dashoffset');
  $el.css("stroke-dasharray", lineDash);
  $el.css("stroke-dashoffset", lineOffset);
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function findFirstAvailableVariant(arrOfVariants) {
  const varElem = arrOfVariants.find((variant) => variant.available )
  return varElem.id
}

function applyEllipsis(
  $elem ,
  lines ,
  responsive = true) {

  let el = typeof $elem == 'string' ? $($elem) : $elem

  el.ellipsis({
    lines ,
    ellipClass: 'ellip',
    responsive
  })
}

function convertToMoney(
  money
  , withCurrency = true 
  , currency = 'USD') {


  let money_currency = ''
  let money_decimal = money.toFixed(2)
  let money_value = money_decimal.replace(/\d(?=(\d{3})+\.)/g, '$&,')
  let money_after = ''

  if (currency === 'USD') {
    money_currency = '$'
  }

  if (withCurrency) {
    money_after = `${money_currency}${money_value}`
  } else {
    money_after = money_value
  }

  return money_after
}

function clickElseWhere(qry, cb) {
  $(document).on('click', function(e) {
    const $target = $(e.target)
    if ($target.parents(qry).length === 0) {
      cb()
    }
  })
}

function scrollToElement($el, speed = 1000, additional = 0 ,cb = null) {
  console.log('$el', $el)

  $('html, body').animate({
    scrollTop: $el.offset().top + additional
  }, speed, () => { cb && cb() })
}

// ===========================
// DEBOUNCE
// ===========================
let debounce_timer = 0
function debouncer (callback, ms) {
  clearTimeout(debounce_timer);
  debounce_timer = setTimeout(callback, ms);
}


function serializeToObject(arrs) {
  const object = {}

  arrs.forEach(({ name , value }) => {
    object[name] = value
  })

  return object
}



// ==========================================================
// COOKIE FUNCTIONS
// ==========================================================
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
