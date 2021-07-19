// dev/src/compiler/parser/index.js line 23
export const onRE = /^@|^v-on:/
export const dirRE = process.env.VBIND_PROP_SHORTHAND
  ? /^v-|^@|^:|^\.|^#/
  : /^v-|^@|^:|^#/
// ...
const dynamicArgRE = /^\[.*\]$/
// ...
export const bindRE = /^:|^\.|^v-bind:/
  
// dev/src/compiler/parser/index.js line 757
function processAttrs (el) {
  const list = el.attrsList
  let i, l, name, rawName, value, modifiers, syncGen, isDynamic
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name
    value = list[i].value
    if (dirRE.test(name)) { // Match the instruction properties
      // mark element as dynamic
      el.hasBindings = true
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, '')) // Analysis of the modifier
      // support .foo shorthand syntax for the .prop modifier
      if (process.env.VBIND_PROP_SHORTHAND && propBindRE.test(name)) {
        (modifiers || (modifiers = {})).prop = true
        name = `.` + name.slice(1).replace(modifierRE, '')
      } else if (modifiers) {
        name = name.replace(modifierRE, '')
      }
      if (bindRE.test(name)) { // v-bind // Situation of V-Bind
        // ...
      } else if (onRE.test(name)) { // v-on // handling event binding
        name = name.replace(onRE, '') // Match the event name
        isDynamic = dynamicArgRE.test(name) // Dynamic event binding
        if (isDynamic) { // If it is a dynamic event
          name = name.slice(1, -1) // remove the two ends []
        }
        addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic) // Handling event collection
      } else { // Normal Directives // Handling Other Directions
        // ...
      }
    } else {
      // Litral Attribute // Handling text properties
      // ...
    }
  }
}