const {useState, useEffect} = React

function BreedsList({handleBreedClick}) {
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)
  const {abortController, execute} = useAbortableFetch('https://dog.ceo/api/breeds/list/all')

  async function fetchBreeds() {
    if(!loading) return
    const response = await execute()
    if(!response) return
    setBreeds(Object.keys(response))
    setLoading(false)
  }

  useEffect(
    function onLoadingChange() {
      fetchBreeds()
      
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