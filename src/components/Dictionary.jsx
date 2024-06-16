import { useState, useEffect } from 'react';
import axios from 'axios';

const Dictionary = () => {
    // From ChatGPT!

  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/light');
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {result ? (
        result.map((entry, index) => (
          <div key={index}>
            <h2>{entry.word}</h2>
            {entry.meanings.map((meaning, mIndex) => (
              <div key={mIndex}>
                <h3>Part of Speech: {meaning.partOfSpeech}</h3>
                {meaning.definitions.map((definition, dIndex) => (
                  <div key={dIndex}>
                    <p>Definition: {definition.definition}</p>
                    {definition.example && <p>Example: {definition.example}</p>}
                    {definition.synonyms && definition.synonyms.length > 0 && (
                      <p>Synonyms: {definition.synonyms.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dictionary;
