function defaultCatch(error) {
  if(error.name === 'AbortError') {
    console.log('user aborted 🤷🏻‍♂️')
    return
  }
  throw(e)
}

function getAbortableFetch() {
  const abortController = new AbortController();

  return {
    abortController,
    execute: async (url, options, catchCallback) => {
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
        if(!catchCallback) return defaultCatch(e)
        catchCallback(e)
      }
    }
  }
}
