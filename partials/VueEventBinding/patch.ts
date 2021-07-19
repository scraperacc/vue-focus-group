// dev/src/core/vdom/patch.js line 33
const hooks = ['create', 'activate', 'update', 'remove', 'destroy']

// dev/src/core/vdom/patch.js line 125
function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
  // ...
  if (isDef(data)) {
    invokeCreateHooks(vnode, insertedVnodeQueue)
  }
  // ...
}

// dev/src/core/vdom/patch.js line 303
/ / Before the CBS is processed 
// Here Cbs.create contains the following callbacks:
// updateAttrs、updateClass、updateDOMListeners、updateDOMProps、updateStyle、update、updateDirectives
function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (let i = 0; i < cbs.create.length; ++i) {
      cbs.create[i](emptyNode, vnode)
    }
    i = vnode.data.hook // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) i.create(emptyNode, vnode)
      if (isDef(i.insert)) insertedVnodeQueue.push(vnode)
    }
}