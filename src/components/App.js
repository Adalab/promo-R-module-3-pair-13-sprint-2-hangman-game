// components
import Header from "./Header";
import Dummy from "./Dummy";
import SolutionLetters from "./SolutionLetters";
import ErrorLetters from "./ErrorLetters";
import Form from "./Form";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";
import Loading from "./Loading";
//states
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// api
import getWordFromApi from "../services/api";
// styles
import "../styles/App.scss";
import "../styles/Dummy.scss";
import "../styles/Letters.scss";
import "../styles/Form.scss";
import "../styles/Header.scss";

function App() {
  const [word, setWord] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getWordFromApi().then((word) => {
      setIsLoading(false);
      setWord(word);
    });
  }, []);

  // events

  const handleKeyDown = (ev) => {
    // Sabrías decir para qué es esta línea
    ev.target.setSelectionRange(0, 1);
  };

  const handleChange = (ev) => {
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/; //add regular pattern
    if (re.test(ev.target.value) || ev.target.value === "") {
      handleLastLetter(ev.target.value);
    }
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className="page">
      <Header/>
      <Loading loading='loading' isLoading={isLoading} />
      <main className="main">
        <section>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SolutionLetters
                    word={word}
                    userLetters={userLetters}
                  ></SolutionLetters>
                  <ErrorLetters
                    word={word}
                    userLetters={userLetters}
                  ></ErrorLetters>
                  <Form
                    value={lastLetter}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                  ></Form>
                </>
              }
            />
            <Route path="/instructions" element={<Instructions/>}/>
            <Route path="/options" element={<Options/>}/>
          </Routes>
        </section>
        <Dummy numberOfErrors={getNumberOfErrors()}/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
