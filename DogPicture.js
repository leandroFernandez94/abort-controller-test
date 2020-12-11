function DogPicture({breed}) {
  const [picture, setPicture] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchRandomImageFromBreed() {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`
    const response = await new Promise(solve => {
      setTimeout(() => {
        solve(fetch(url))
      }, 1000)
    })
    const jsonResponse =  await response.json()
    
    const imageElement = new Image()
    imageElement.src = jsonResponse.message
    imageElement.onload = () => {
      setPicture(jsonResponse.message)
      setLoading(false)
    }
  }

  useEffect(
    function onBreedChange() {
      setLoading(true)
      fetchRandomImageFromBreed()

      return function cleanUp() {
        console.log('unmounts dog picture')
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