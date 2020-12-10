function defaultCatch(error) {
  if(error.name === 'AbortError') {
    console.log('user aborted 🤷🏻‍♂️')
    return
  }
  throw(e)
}

function useAbortableFetch(url, options, useDefaultCache = true) {
  const abortController = new AbortController();

  return {
    abortController,
    execute: async () => {
      try {
        const response = await new Promise(solve => {
          setTimeout(() => {
            solve(fetch(url, { ...options, signal: abortController.signal }))
          }
          , 1000)
        })
        const responseJson = await response.json()
        return responseJson.message
      } catch(e) {
        if(useDefaultCache) return defaultCatch(e)
        throw(e)
      }
    }
  }
}
