export function debounce(func, wait, immediate = false) {
  var timeout
  return function() {
    var context = this,
      args = arguments
    var later = function() {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

export function callWithDelay(fn, delay) {
  let timeout = null

  return (...params) => {
    clearTimeout(timeout)
    return new Promise(resolve => {
      timeout = setTimeout(() => resolve(fn(...params)), delay)
    })
  }
}
