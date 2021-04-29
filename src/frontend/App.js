import './App.css';
import axios from 'axios'

function App() {

  const onHandleChange = async (ev) => {
    const form = new FormData()
    form.append('files', ev.target.files[0])
    form.append('outputPath', 'translation-cee')

    const trans = await axios.post('http://localhost:5050/api/translate', form)
    console.log('trans', trans)

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
          accept='application/JSON'
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
