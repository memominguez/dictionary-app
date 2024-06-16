/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import iconPlay from "../assets/images/icon-play.svg";
import iconNewWindow from "../assets/images/icon-new-window.svg";

export default function DisplayResult({ result }) {
  //console.log(result);

  let source = result[0].sourceUrls[0];

  let phoneticsLength = result[0].phonetics.length;

  let audioLink = "";
  for (let i = 0; i < phoneticsLength; i++) {
    if (
      result[0]?.phonetics[i].audio.length > 0 &&
      result[0]?.phonetics[i].audio.includes("-us")
    ) {
      audioLink = result[0].phonetics[i].audio;
    }
  } 

  function playAudio() {
    try {
      let audio = new Audio(audioLink);
      audio.play();
    } catch (e) {
      console.log({ e });
    }
  }

  return (
    <article>
      {result.map((entry, index) => (
        <div key={index}>
          {index == 0 && (
            <div className="list-header">
              <div className="left">
                <h1>{entry.word}</h1>
                <p>{entry.phonetic}</p>
              </div>

              {audioLink && (
                <button className="play-button" onClick={playAudio}>
                  <img src={iconPlay} alt="Play audio" />
                </button>
              )}
            </div>
          )}

          {entry.meanings.map((meaning, mIndex) => (
            <div key={mIndex}>
              <div className="divider">
                <p>{meaning.partOfSpeech}</p>
                <div className="divider-line"></div>
              </div>

              <p className="meaning-title">Meaning</p>

              <div className="list-area">
                <ul>
                  {meaning.definitions.map((definition, dIndex) => (
                    <div key={dIndex}>
                      <li>{definition.definition}</li>
                    </div>
                  ))}
                </ul>

                {meaning.synonyms[0] && <p className="synonyms-title">Synonyms</p>}

                <div className="synonyms">
                  {meaning.synonyms.map((synonym, sIndex) => (
                    <p key={sIndex}>
                      {synonym}
                      {", "} &nbsp;
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="source-paragraph">
        <p className="source-title">Source</p>

        <div className="source-link">
          <p>{source}</p>
          <a href={source} target="_blank">
            <img src={iconNewWindow} alt="new window" />
          </a>
        </div>
      </div>
    </article>
  );
}
