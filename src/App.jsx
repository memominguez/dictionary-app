/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import iconSearch from "./assets/images/icon-search.svg";
import Header from "./components/Header";
import DisplayResult from "./components/DisplayResult";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [inputError, setInputError] = useState("");
  const [selectedFont, setSelectedFont] = useState("sanserif");
  const [coverMsg, setCoverMsg] = useState(true);

  const api = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const handleSearch = async () => {
    try {
      setResult(null);
      const response = await axios.get(`${api}/${word}`);
      setResult(response.data);
      setCoverMsg(false);
      setError(null); // Clear any previous error
    } catch (err) {
      setError("Word not found");
    }
  };

  const handleKeyPress = (event) => {
    //event.preventDefault()
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = /^[A-Za-z]{2,}$/;

    if (regex.test(word)) {
      setInputError("");
      handleSearch();
    } else {
      setInputError("Only letters and at least 2 characters, please.");
    }
  };

  const handleClear = () => {
    setWord("");
    setInputError("");
  };

  //console.log(result);

  return (
    <div className={`container ${selectedFont}`}>
      <Header selectedFont={selectedFont} setSelectedFont={setSelectedFont} />
      <main>
       

        <form className="input-field" onSubmit={handleSubmit}>
          <input
            type="text"
            autoFocus
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search for a word..."
            className={inputError ? "input error" : "input"}
          />

          <div className="button-box">
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
            >
              <ion-icon name="close" role="img" className="md hydrated"></ion-icon>
            </button>
            <span>&#x2758;</span>
            <button type="submit" className="submit-button">
              <ion-icon name="search" role="img" className="md hydrated"></ion-icon>
            </button>
          </div>

          {inputError && <p className="input-error">{inputError}</p>}
        </form>

        {error && <ErrorMessage />}

        {result && <DisplayResult result={result} />}

        {coverMsg && <h1 className="cover-message">ENGLISH DICTIONARY</h1>}
      </main>
    </div>
  );
}

export default App;
