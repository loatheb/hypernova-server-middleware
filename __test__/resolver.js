const resolver = (vmOptions = {}) => {
  const resolvedComponents = 10

  return (urlWithComponentName) => {

    const renderInfo = {
      name,
      useSandbox,
      siteId,
      cache: false,
      url: fileUrl,
    }

    const __FETCH_TIME__ = start()
    return fetch(fileUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response loading js')
      }
      return response.text()
    }).then((code) => {
      renderInfo['fetch duration'] = end(__FETCH_TIME__)
      const wrappedCode = wrapCode(code)
      const m = {
        exports: {},
      }
      const r = (file) => {
        // when require some extra modules in vm global, it will return a {}
        if (extraModules.includes(file)) return {}
        return require(file)
      }
      const wrapper = nativeModule.wrap(wrappedCode)

      try {
        const __VM_RUN_TIME__ = start()
        const script = new vm.Script(wrapper, { filename: fileUrl, displayErrors: true })
        const compiledWrapper = useSandbox ? script.runInNewContext(sandbox) : script.runInThisContext()
        compiledWrapper.call(m.exports, m.exports, r, m)

        const vmExports = has(m.exports, 'default')
          ? m.exports['default']
          : m.exports
        renderInfo['vm.run duration'] = end(__VM_RUN_TIME__)

        resolvedComponents.set(cacheKey, vmExports[name])
        console.log(renderInfo)
        return vmExports[name]
      } catch (err) {
        console.error(err.stack)
      }
    })
    .catch((err) => {
      console.error('Something Error Here: ', err)
    })
  }
}