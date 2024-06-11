import { useState } from 'react'
import './global.css'

export function App() {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [acertoErro, serAcertoErro] = useState<number[]>([0, 0]);
  const [quoteCliked, setQuoteClicked] = useState<boolean>(false);
  const [authorClassName, setAuthorClassName] = useState<string>("author-hidden");

  const fetchYeQuote = () => {
    const urlApi: string = "https://api.kanye.rest"

    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      setQuote(data.quote);
      setAuthor("Kanye West");
      setQuoteClicked(false);
      setAuthorClassName("author-hidden");
    })
    .catch(error => console.log(error));
  };

  const fetchRandomQuote = () => {
    const urlApi: string = "https://type.fit/api/quotes"

    fetch(urlApi)
    .then(response => response.json())
    .then(data => {
      const randomIndex: number = Math.floor(Math.random() * data.length);
      setQuote(data[randomIndex].text);
      setAuthor("Random Author");
      setQuoteClicked(false);
      setAuthorClassName("author-hidden");

    })
    .catch(error => console.log(error));
  };

  
  const handleClickQuote = () => {
    const randomNum: number = Math.random();
    if (randomNum >= 0.5){
      fetchYeQuote();
    }else {
      fetchRandomQuote();
    }
  };

  const handleClickAuthor = (chosenAuthor: string) => {
    setAuthorClassName("author-visible");
    if (chosenAuthor == author){
      serAcertoErro([acertoErro[0] + 1, acertoErro[1]]);
      setQuoteClicked(true);
    } else {
      serAcertoErro([acertoErro[0], acertoErro[1] + 1]);
      setQuoteClicked(true);
    }
  }

  return (
    <div>
      <button onClick={handleClickQuote}>click</button>
      <p>{quote}</p>
      <button onClick={() => handleClickAuthor("Kanye West")} disabled={quoteCliked}>Ye's quote</button>
      <button onClick={() => handleClickAuthor("Random Author")} disabled={quoteCliked}>Random author quote</button>
      <p className={authorClassName}>{author}</p>
      <p>Acertos: {acertoErro[0]}</p>
      <p>Erros: {acertoErro[1]}</p>
    </div>
  );
};
