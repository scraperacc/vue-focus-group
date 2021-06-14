function patch (oldVnode, vnode) {
  if (sameVnode(oldVnode, vnode)) { // It's necessary to do patch when both key and sel are the same.
      patchVnode(oldVnode, vnode)
  } else {  // There's no need to patch, the whole replacement
      const oEl = oldVnode.el
      let parentEle = api.parentNode(oEl)
      createEle(vnode) // Vnode creates its real dom, so vnode.el = real DOM
      if (parentEle !== null) {
          api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)) // Insert the entire new node tree
          api.removeChild(parentEle, oldVnode.el) // Remove the entire old virtual DOM
          oldVnode = null
      }
  }
  return vnode
}
