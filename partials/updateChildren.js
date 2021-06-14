function updateChildren (parentElm, oldCh, newCh) {
  let oldStartIdx = 0, newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx
  let idxInOld
  let elmToMove
  let before
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (oldStartVnode == null) {   // For vnode.key comparison, oldVnode = null
          oldStartVnode = oldCh[++oldStartIdx] 
      }else if (oldEndVnode == null) {
          oldEndVnode = oldCh[--oldEndIdx]
      }else if (newStartVnode == null) {
          newStartVnode = newCh[++newStartIdx]
      }else if (newEndVnode == null) {
          newEndVnode = newCh[--newEndIdx]
      }else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode)
          oldStartVnode = oldCh[++oldStartIdx]
          newStartVnode = newCh[++newStartIdx]
      }else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode)
          oldEndVnode = oldCh[--oldEndIdx]
          newEndVnode = newCh[--newEndIdx]
      }else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode)
          api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
          oldStartVnode = oldCh[++oldStartIdx]
          newEndVnode = newCh[--newEndIdx]
      }else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode)
          api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
          oldEndVnode = oldCh[--oldEndIdx]
          newStartVnode = newCh[++newStartIdx]
      }else {
         // A comparison of key s
          if (oldKeyToIdx === undefined) {
              oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // Generate index table with key
          }
          idxInOld = oldKeyToIdx[newStartVnode.key]
          if (!idxInOld) {
              api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
              newStartVnode = newCh[++newStartIdx]
          }
          else {
              elmToMove = oldCh[idxInOld]
              if (elmToMove.sel !== newStartVnode.sel) {
                  api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
              }else {
                  patchVnode(elmToMove, newStartVnode)
                  oldCh[idxInOld] = null
                  api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
              }
              newStartVnode = newCh[++newStartIdx]
          }
      }
  }
  if (oldStartIdx > oldEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
  }else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
