// dev/src/platforms/web/runtime/modules/events.js line 105
function updateDOMListeners (oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {  // ON is the sign of the event instruction
    return
  }
  / / Different event binding of new old nodes
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  / / Real DOM node that needs to add events
  target = vnode.elm
  // NormalizeEvents is a process of compatibility with event compatibility
  normalizeEvents(on)
  // Call the UpdateListeners method and pass the ON as a parameter
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context)
  target = undefined
}

// dev/src/core/vdom/helpers/update-listeners.js line line 53
export function updateListeners (
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  createOnceHandler: Function,
  vm: Component
) {
  let name, def, cur, old, event
  for (name in on) { // Traverse event
    def = cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
    /* istanbul ignore if */
    if (__WEEX__ && isPlainObject(def)) {
      cur = def.handler
      event.params = def.params
    }
    if (isUndef(cur)) { // Event name illegal error processing
      process.env.NODE_ENV !== 'production' && warn(
        `Invalid handler for event "${event.name}": got ` + String(cur),
        vm
      )
    } else if (isUndef(old)) { // Old node does not exist
      if (isUndef(cur.fns)) { // CreateFunInvoker returns the callback function of the event ultimately executed
        cur = on[name] = createFnInvoker(cur, vm)
      }
      if (isTrue(event.once)) {  // only trigger an event
        cur = on[name] = createOnceHandler(event.name, cur, event.capture)
      }
      / / Perform the execution function of the real registration event
      add(event.name, cur, event.capture, event.passive, event.params)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) { // Old node exists, unlock the binding event on the old node
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      // Remove event monitoring
      remove(event.name, oldOn[name], event.capture)
    }
  }
}

// dev/src/platforms/web/runtime/modules/events.js line 32
// Remove the event binding after execution
function createOnceHandler (event, handler, capture) {
  const _target = target // save current target element in closure
  return function onceHandler () {
    const res = handler.apply(null, arguments)
    if (res !== null) {
      remove(event, onceHandler, capture, _target)
    }
  }
}