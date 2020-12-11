const {useState, useEffect} = React

function BreedsList({handleBreedClick}) {
  const [breeds, setBreeds] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchBreeds() {
    if(!loading) return
    const response = await new Promise(solve => {
      setTimeout(() => {
        solve(fetch('https://dog.ceo/api/breeds/list/all'))
      }, 1000)
    })
    const responseJson = await response.json()
    setBreeds(Object.keys(responseJson.message))
    setLoading(false)
  }
  

  useEffect(
    function onLoadingChange() {
      fetchBreeds()
      
      return function cleanup() {
        console.log('unmounts')
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