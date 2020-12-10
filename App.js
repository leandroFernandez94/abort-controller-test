const {useState} = React

function App() {
  const [showBreeds, setShowBreeds] = useState(false)
  const [breedPicked, setBreedPicked] = useState(null)

  function toggleShowBreeds() {
    setShowBreeds(showing => !showing)
    setBreedPicked(null)
  }

  return (
    <div id="app">
      <div id="list-container">
        <button onClick={toggleShowBreeds}>
          Toggle List
        </button>
      {showBreeds && <BreedsList handleBreedClick={(breed) => setBreedPicked(breed)}/> }
      </div>
      {showBreeds && breedPicked && <DogPicture breed={breedPicked} />}
    </div>

  )
}

ReactDOM.render(<App />, document.getElementById('root'))