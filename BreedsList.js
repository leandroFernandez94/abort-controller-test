const {useState, useEffect} = React

function BreedsList({handleBreedClick}) {
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchBreeds(abortController) {
    if(!loading) return
    try {
      const response = await new Promise(solve => {
        setTimeout(() => {
          solve(fetch('https://dog.ceo/api/breeds/list/all', {signal: abortController.signal}))
        }, 1000)
      })
      const responseJson = await response.json()
      setBreeds(Object.keys(responseJson.message))
      setLoading(false)
    } catch (e) {
      if(abortController.signal.aborted) {
        console.log('aborted by user')
        return
      }
      throw(e)
    }
  }
  

  useEffect(
    function onLoadingChange() {
      const abortController = new AbortController()
      fetchBreeds(abortController)
      
      return function cleanup() {
        console.log('unmounts')
        abortController.abort();
      };
    }
  , [])

  return (
    <div id="breeds-container">
      {
        loading ?
        <h3>Loading...</h3>
        : breeds.map(breed => (
            <div 
              className="breed-item"
              key={breed}
              onClick={() => handleBreedClick(breed)}>
              {breed}
            </div>
          ))
      }
    </div>
  )
}