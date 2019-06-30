export function classnames(o: { [key: string]: any }): string {
  return Object.keys(o)
    .map(key => evaluateKey(key, o[key]))
    .filter(notNull)
    .join(" ")
}

function evaluateKey(key, arg) {
  if (typeof arg === "function" && arg()) {
    return key
  } else if (arg != null) {
    return key
  } else {
    return null
  }
}

function notNull(val) {
  return val != null
}
