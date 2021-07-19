// dev/src/compiler/helpers.js line 69
export function addHandler (
  el: ASTElement,
  name: string,
  value: string,
  modifiers: ?ASTModifiers,
  important?: boolean,
  warn?: ?Function,
  range?: Range,
  dynamic?: boolean
) {
  modifiers = modifiers || emptyObject
  // Passive and prevent cannot be used at the same time, specifically determined by the nature of the Passive mode
  // You can refer to https://developer.mozilla.org/en-cn/docs/web/api/eventtarget/addeventlistener
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    )
  }
  // Standardize Click.right and Click.Middle because they do not actually trigger.
  // Technically, this is a browser, but at least, the browser is the only target environment with right-click / intermediate click.
  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) { // Right click on the right click to right click the default is the ContextMenu event
    if (dynamic) { // If it is a dynamic event
      name = `(${name})==='click'?'contextmenu':(${name})` // Dynamically determine the event name
    } else if (name === 'click') { // If it is not a dynamic event and right-click
      name = 'contextmenu' // direct replacement to contextMenu event
      delete modifiers.right / / Delete the Right property of Modifiers
    }
  } else if (modifiers.middle) { // Events in the same standardization to handle the mouse button click
    if (dynamic) { // If it is a dynamic event
      name = `(${name})==='click'?'mouseup':(${name})` // Dynamically determine the event name
    } else if (name === 'click') { // If it is not a dynamic event and is the mouse button click
      name = 'mouseup' // Processing as a MouseUp event
    }
  }
  // The following is the modifiers processing of capture, trigger, passive mode, mainly for events!, ~, & Tag
  // This part of the tag can be reviewed in the official documentation of VUE 
  // https://cn.vuejs.org/v2/guide/render-function.html#%E4%BA%8B%E4%BB%B6-amp-%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6
  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture
    name = prependModifierMarker('!', name, dynamic)
  }
  if (modifiers.once) {
    delete modifiers.once
    name = prependModifierMarker('~', name, dynamic)
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive
    name = prependModifierMarker('&', name, dynamic)
  }
  
  // Events used to record the binding event
  let events
  if (modifiers.native) { // If you want to trigger the root element native event, get NATIVENTS directly
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else { / / Otherwise get Events
    events = el.events || (el.events = {})
  }
    
  // Put the event handler as a Handler
  const newHandler: any = rangeSetItem({ value: value.trim(), dynamic }, range)
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers
  }

 // Binding events can be multiple, the callback can also be multiple, eventually merged into the array
  const handlers = events[name]
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}