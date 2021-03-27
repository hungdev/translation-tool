import './App.css';

function App() {

  const onHandleChange = (ev) => {
    // console.log('eee', ev.target.files[0].webkitRelativePath)
    console.log('eee', URL.createObjectURL(ev.target.files[0]))
  }
  return (
    <div className="App">
      <label
        className="btn-select-input-path"
        style={{ height: 'fit-content' }}
      >
        <div>Click to choose json file</div>
        <input
          type="file"
          disabled={false}
          name={'input-path'}
          id={'input-path'}
          accept={'application/JSON'}
          directory=""
          webkitdirectory=""
          multiple
          onChange={onHandleChange}
          className="hand"
          style={{ opacity: 0, display: 'none' }}
        />
      </label>
    </div>
  );
}

export default App;
