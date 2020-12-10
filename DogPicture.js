const {useMemo, useCallback} = React

function DogPicture({breed}) {
  const [picture, setPicture] = useState(null)
  const [loading, setLoading] = useState(false)

  const {abortController, execute} = useAbortableFetch(`https://dog.ceo/api/breed/${breed}/images/random`)

  async function fetchRandomImageFromBreed() {
    const response = await execute()
    if(!response) return
    
    const imageElement = new Image()
    imageElement.src = response
    imageElement.onload = () => {
      setPicture(response)
      setLoading(false)
    }
  }

  useEffect(
    function onBreedChange() {
      setLoading(true)
      fetchRandomImageFromBreed()
      
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