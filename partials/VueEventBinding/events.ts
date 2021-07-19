// dev/src/compiler/codegen/events.js line 3
const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/
  const fnInvokeRE = /\([^)]*?\);*$/
  const simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/
  
  // dev/src/compiler/codegen/events.js line 7
  // KeyboardEvent.keyCode aliases
  const keyCodes: { [key: string]: number | Array<number> } = {
    esc: 27,
    tab: 9,
    enter: 13,
    space: 32,
    up: 38,
    left: 37,
    right: 39,
    down: 40,
    'delete': [8, 46]
  }
  // KeyboardEvent.key aliases
  const keyNames: { [key: string]: string | Array<string> } = {
    // #7880: IE11 and Edge use `Esc` for Escape key name.
    esc: ['Esc', 'Escape'],
    tab: 'Tab',
    enter: 'Enter',
    // #9112: IE11 uses `Spacebar` for Space key name.
    space: [' ', 'Spacebar'],
    // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
    up: ['Up', 'ArrowUp'],
    left: ['Left', 'ArrowLeft'],
    right: ['Right', 'ArrowRight'],
    down: ['Down', 'ArrowDown'],
    // #9112: IE11 uses `Del` for Delete key name.
    'delete': ['Backspace', 'Delete', 'Del']
  }
  }
  
  // dev/src/compiler/codegen/events.js line 37
  // #4868: modifiers that prevent the execution of the listener
  // need to explicitly return null so that we can determine whether to remove
  // the listener for .once
  const genGuard = condition => `if(${condition})return null;`
  const modifierCode: { [key: string]: string } = {
    stop: '$event.stopPropagation();',
    prevent: '$event.preventDefault();',
    self: genGuard(`$event.target !== $event.currentTarget`),
    ctrl: genGuard(`!$event.ctrlKey`),
    shift: genGuard(`!$event.shiftKey`),
    alt: genGuard(`!$event.altKey`),
    meta: genGuard(`!$event.metaKey`),
    left: genGuard(`'button' in $event && $event.button !== 0`),
    middle: genGuard(`'button' in $event && $event.button !== 1`),
    right: genGuard(`'button' in $event && $event.button !== 2`)
  }
  
  // dev/src/compiler/codegen/events.js line 55
  export function genHandlers (
    events: ASTElementHandlers,
    isNative: boolean
  ): string {
    const prefix = isNative ? 'nativeOn:' : 'on:'
    let staticHandlers = ``
    let dynamicHandlers = ``
    for (const name in events) { // Traverse the event attribute after AST analysis
      const handlerCode = genHandler(events[name]) // convert the event object into a spliced ​​string
      if (events[name] && events[name].dynamic) {
        dynamicHandlers += `${name},${handlerCode},`
      } else {
        staticHandlers += `"${name}":${handlerCode},`
      }
    }
    staticHandlers = `{${staticHandlers.slice(0, -1)}}`
    if (dynamicHandlers) {
      return prefix + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`
    } else {
      return prefix + staticHandlers
    }
  }
  
  // dev/src/compiler/codegen/events.js line 96
  function genHandler (handler: ASTElementHandler | Array<ASTElementHandler>): string {
    if (!handler) {
      return 'function(){}'
    }
  
    // Event binding can be multiple, and multiple in the form of an array when parsing the AST tree, if there is a plurality of recursions, the GetHandler method returns an array.
    if (Array.isArray(handler)) {
      return `[${handler.map(handler => genHandler(handler)).join(',')}]`
    }
  
    const isMethodPath = simplePathRE.test(handler.value) // Call method is Dothis type
    const isFunctionExpression = fnExpRE.test(handler.value) // Call method is () => {} or function () {} type
    const isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, '')) // Call method is Dothis ($ Event) type
  
    if (!handler.modifiers) { // No modifier
      if (isMethodPath || isFunctionExpression) { // Return directly to these two conditions
        return handler.value
      }
      /* istanbul ignore if */
      if (__WEEX__ && handler.params) {
        return genWeexHandler(handler.params, handler.value)
      }
      return `function($event){${ / / Return the string of the anonymous function of the splicing
        isFunctionInvocation ? `return ${handler.value}` : handler.value
      }}` // inline statement
       } Else {// Treatment with modifier
      let code = ''
      let genModifierCode = ''
      const keys = []
           For (const key in handler.modifiers) {// traversed the modifier recorded on Modifier
        if (modifierCode[key]) {
                   GenmodifierCode + = modifiercode [key] / / Add corresponding JS according to the modifier
          // left/right
          if (keyCodes[key]) {
            keys.push(key)
          }
               } else if (key === 'exact') {// Treatment for Exact
          const modifiers: ASTModifiers = (handler.modifiers: any)
          genModifierCode += genGuard(
            ['ctrl', 'shift', 'alt', 'meta']
              .filter(keyModifier => !modifiers[keyModifier])
              .map(keyModifier => `$event.${keyModifier}Key`)
              .join('||')
          )
        } else {
                   Keys.push // If the modifier is not the above modifier, it will be added to the keys array.
        }
      }
      if (keys.length) {
               Code + = GenkeyFilter (KEYS) // Handling other modifiers, the modifier defined in KeycoDes
      }
      // Make sure modifiers like prevent and stop get executed after key filtering
      if (genModifierCode) {
        code += genModifierCode
      }
           / / Return different strings according to three different writing templates
      const handlerCode = isMethodPath
        ? `return ${handler.value}($event)`
        : isFunctionExpression
          ? `return (${handler.value})($event)`
          : isFunctionInvocation
            ? `return ${handler.value}`
            : handler.value
      /* istanbul ignore if */
      if (__WEEX__ && handler.params) {
        return genWeexHandler(handler.params, code + handlerCode)
      }
      return `function($event){${code}${handlerCode}}`
    }
  }
  
  // dev/src/compiler/codegen/events.js line 175
  function genFilterCode (key: string): string {
    const keyVal = parseInt(key, 10)
       if (keyval) {// If key is a number, return to $ Event.KeyCode! ==${keyVal}
      return `$event.keyCode!==${keyVal}`
    }
    const keyCode = keyCodes[key]
    const keyName = keyNames[key]
       // Return the _k function, its first parameter is $ Event.Keycode,
       // The second parameter is the value of Key,
       // The third parameter is the corresponding number in KeyCodes.
    return (
      `_k($event.keyCode,` +
      `${JSON.stringify(key)},` +
      `${JSON.stringify(keyCode)},` +
      `$event.key,` +
      `${JSON.stringify(keyName)}` +
      `)`
    )
  }