// dev/src/compiler/codegen/index.js line 42
export function generate (
  ast: ASTElement | void,
  options: CompilerOptions
): CodegenResult {
  const state = new CodegenState(options)
  const code = ast ? genElement(ast, state) : '_c("div")'
  return {
    render: `with(this){return ${code}}`, // Render string
    staticRenderFns: state.staticRenderFns
  }
}

// dev/src/compiler/codegen/index.js line 55
export function genElement (el: ASTElement, state: CodegenState): string {
    // ...
    let code
    if (el.component) {
      code = genComponent(el.component, el, state)
    } else {
      let data
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData(el, state)
      }

      const children = el.inlineTemplate ? null : genChildren(el, state, true)
      code = `_c('${el.tag}'${
        data ? `,${data}` : '' // data
      }${
        children ? `,${children}` : '' // children
      })`
    }
    // ...
}

// dev/src/compiler/codegen/index.js line 219
export function genData (el: ASTElement, state: CodegenState): string {
  let data = '{'
  // ...
  // event handlers
  if (el.events) {
    data += `${genHandlers(el.events, false)},`
  }
  if (el.nativeEvents) {
    data += `${genHandlers(el.nativeEvents, true)},`
  }
  // ...
  data = data.replace(/,$/, '') + '}'
  // ...
  return data
}

// dev/src/compiler/to-function.js line 12 
function createFunction (code, errors) {
  try {
    return new Function(code) // Transform the Render string to the render function
  } catch (err) {
    errors.push({ err, code })
    return noop
  }
}