const {useCallback} = React

function DogPicture({breed}) {
  const [picture, setPicture] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchRandomImageFromBreed = useCallback(
    async (executeFetch) => {
      const url = `https://dog.ceo/api/breed/${breed}/images/random`
      const response = await executeFetch(url)
      if(!response) return
      
      const imageElement = new Image()
      console.log('response', response)
      imageElement.src = response
      imageElement.onload = () => {
        setPicture(response)
        setLoading(false)
      }
    }
  , [breed])

  useEffect(
    function onBreedChange() {
      setLoading(true)
      const {abortController, execute} = getAbortableFetch()

      fetchRandomImageFromBreed(execute)

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