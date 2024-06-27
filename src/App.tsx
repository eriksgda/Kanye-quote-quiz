import { useState } from 'react'
import './global.css'

export function App() {
  // hooks
  const [quote, setQuote] = useState<string>('quotes here!');
  const [author, setAuthor] = useState<string>('');
  const [scoreBoard, setScoreBoard] = useState<number[]>([0, 0]);
  const [quoteCliked, setQuoteClicked] = useState<boolean>(true);
  const [authorClassName, setAuthorClassName] = useState<string>('');

  // fetch api kanye
  const fetchYeQuote = () => {
    const urlApi: string = "https://api.kanye.rest"

    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      setQuote(data.quote);
      setAuthor("~ Kanye West");
      setQuoteClicked(false);
      setAuthorClassName("author-hidden");
    })
    .catch(error => console.log(error));
  };

  //fetch api random
  const fetchRandomQuote = () => {
    const urlApi: string = "https://type.fit/api/quotes"

    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      const randomIndex: number = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex].text);
      setAuthor("~ Random");
      setQuoteClicked(false);
      setAuthorClassName("author-hidden");

    })
    .catch(error => console.log(error));
  };

  // create quote
  const handleClickQuote = () => {
    const randomNum: number = Math.random();
    if (randomNum >= 0.5){
      fetchYeQuote();
    }else {
      fetchRandomQuote();
    }
  };

  // counter
  const handleClickAuthor = (chosenAuthor: string) => {
    setAuthorClassName("author-visible");
    if (chosenAuthor == author){
      setScoreBoard([scoreBoard[0] + 1, scoreBoard[1]]);
      setQuoteClicked(true);
    } else {
      setScoreBoard([scoreBoard[0], scoreBoard[1] + 1]);
      setQuoteClicked(true);
    }
  }

  return (
    <div className='x'>
      <header>
        <a className='title'href="">Is Ye's Quote?🐻🌊</a>
      </header>

      <div className="container">

        <button className='buttonCreateQuote' onClick={handleClickQuote}>click</button>
        <div className='quote'>
          <p>{quote}</p>
        </div>
        <div className='author'>
          <p className={authorClassName}>{author}</p>
        </div>

        <div className="buttonChoiceAuthor">
          <button onClick={() => handleClickAuthor("~ Kanye West")} disabled={quoteCliked}>Ye's quote</button>
          <button onClick={() => handleClickAuthor("~ Random")} disabled={quoteCliked}>Random author quote</button>
        </div>

        <div className="scoreboard">
          <p>Acertos: {scoreBoard[0]}</p>
          <p>Erros: {scoreBoard[1]}</p>
        </div>

        <div>
          <a href="https://github.com/eriksgda/Kanye-quote-quiz">github/eriksgda</a>
        </div>

      </div>
    </div>
  );
};
