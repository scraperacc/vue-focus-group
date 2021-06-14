function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  /*If two VNode nodes are the same, they return directly*/
  if (oldVnode === vnode) {
    return
  }
  // reuse element for static trees.
  // note we only do this if the vnode is cloned -
  // if the new node is not cloned it means the render functions have been
  // reset by the hot-reload-api and we need to do a proper re-render.
  /*
    If both old and new VNode s are static and their key s are the same (representing the same node),
    And the new VNode is clone or once (marking the v-once attribute, rendering only once).
    All you need to do is replace elm and component Instance.
  */
  if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
    vnode.elm = oldVnode.elm
    vnode.componentInstance = oldVnode.componentInstance
    return
  }
  let i
  const data = vnode.data
  if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
    /*i = data.hook.prepatch，If it exists, see ". / create-component component component VNodeHooks".*/
    i(oldVnode, vnode)
  }
  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const ch = vnode.children
  if (isDef(data) && isPatchable(vnode)) {
    /*Call the update callback and update hook*/
    for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode)
    if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode)
  }
  /*If the VNode node does not have text text*/
  if (isUndef(vnode.text)) {
    if (isDef(oldCh) && isDef(ch)) {
      /*If both old and new nodes have child child subnodes, the child node is diff operated and updateChildren is called.*/
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    } else if (isDef(ch)) {
      /*If the old node has no sub-nodes and the new node has sub-nodes, first empty the text content of elm, and then add sub-nodes to the current node.*/
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    } else if (isDef(oldCh)) {
      /*When the new node has no children and the old node has children, all ele's children are removed.*/
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (isDef(oldVnode.text)) {
      /*When the old and new nodes have no sub-nodes, they just replace the text, because the new node text does not exist in this logic, so the text of ele is removed directly.*/
      nodeOps.setTextContent(elm, '')
    }
  } else if (oldVnode.text !== vnode.text) {
    /*When the old and new node texts are different, replace the text directly*/
    nodeOps.setTextContent(elm, vnode.text)
  }
  /*Call the postpatch hook*/
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode)
  }
}