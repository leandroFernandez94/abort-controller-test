function DogPicture({breed}) {
  const [picture, setPicture] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchRandomImageFromBreed(signal) {
    try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`
    const response = await new Promise(solve => {
      setTimeout(() => {
        solve(fetch(url, {signal: signal}))
      }, 1000)
    })
    const jsonResponse =  await response.json()
    
    const imageElement = new Image()
    imageElement.src = jsonResponse.message
    imageElement.onload = () => {
      setPicture(jsonResponse.message)
      setLoading(false)
    }
    
  } catch (e) {
      if(signal.aborted) {
        console.log('fue abortado 🤷🏻‍♂️')
        return
      }
      throw(e)
    }
  }

  useEffect(
    function onBreedChange() {
      setLoading(true)
      const abortController = new AbortController()
      fetchRandomImageFromBreed(abortController.signal)

      return function cleanUp() {
        abortController.abort()
      }
    }
  , [breed])

  return (
    <div className="pic-container">
      {
        loading ? (
          <div className="loading-pic">Loading...</div>
          ): (
            <img src={picture}></img>
        )
      }
    </div>
  )
}