//Hooks
import { useEffect, useState } from "react";
//Components
import PopUp from "./PopUp";
//Axios Api
import Axios from "axios";
//Style
import "../Styles/magicMemory.css";
//Images
import cello from "../img/cello.png";
import clarinet from "../img/clarinet.png";
import drum from "../img/drum.png";
import guitar from "../img/guitar.png";
import banjo from "../img/banjo.png";
import saxophone from "../img/saxophone.png";
import violin from "../img/violin.png";
import ukulele from "../img/ukulele.png";

export default function MagicMemory() {
  //Sounds & API & KEY Variables
  const apiKey = "QU6wAMG5pPy7sb26plrrfuGuh0u4cBHk1MYzA8Ih";
  const BackgroundMusicId = 368690;
  const flippSoundId = 420668;
  const matchSoundId = 350875;
  const noMatchSoundId = 278164;

  //Sounds State
  const [BackgroundMusic, setBackGroundMusic] = useState({});
  const [flippingSound, setFlippingSound] = useState({});
  const [matchingSound, setMatchingSound] = useState({});
  const [noMatchSound, setNoMatchSound] = useState({});

  //BackGroundMusci isPlaying State
  const [isPlaying, setIsPlaying] = useState(false);

  //PopUp playAgain State

  const [popUpVisible, setPopUpVisible] = useState(false);

  //PopUp resetGame State

  const [reset, setReset] = useState(false);

  //disable Clicks State
  const [disable, setDisable] = useState("");
  //FirstClickIndex State
  const [firstClickIndex, setFirstClickIndex] = useState(-1);

  //Cards State

  const [cards, setCards] = useState(
    [
      {
        id: 1,
        image: <img src={cello} className="images " />,
        state: "",
      },
      {
        id: 1,
        image: <img src={cello} className="images " />,
        state: "",
      },
      {
        id: 2,
        image: <img src={clarinet} className="images" />,
        state: "",
      },
      {
        id: 2,
        image: <img src={clarinet} className="images" />,
        state: "",
      },
      {
        id: 3,
        image: <img src={drum} className="images" />,
        state: "",
      },
      {
        id: 3,
        image: <img src={drum} className="images" />,
        state: "",
      },
      {
        id: 4,
        image: <img src={guitar} className="images" />,
        state: "",
      },
      {
        id: 4,
        image: <img src={guitar} className="images" />,
        state: "",
      },
      {
        id: 5,
        image: <img src={banjo} className="images" />,
        state: "",
      },
      {
        id: 5,
        image: <img src={banjo} className="images" />,
        state: "",
      },
      {
        id: 6,
        image: <img src={saxophone} className="images" />,
        state: "",
      },
      {
        id: 6,
        image: <img src={saxophone} className="images" />,
        state: "",
      },
      {
        id: 7,
        image: <img src={violin} className="images" />,
        state: "",
      },
      {
        id: 7,
        image: <img src={violin} className="images" />,
        state: "",
      },
      {
        id: 8,
        image: <img src={ukulele} className="images" />,
        state: "",
      },
      {
        id: 8,
        image: <img src={ukulele} className="images" />,
        state: "",
      },
    ].sort(() => Math.random() - 0.5)
  );

  //Test

  // const cardsList = cards.map((card,index)=> (
  //   <div
  //   className={
  //     "cards" + (card.state ? " active " + card.state : disable)
  //   }
  //   key={index}
  //   onClick={() => cardsClick(index)}
  // >
  //   {card.image}
  // </div>
  // ))

  //SoundEffects

  useEffect(() => {
    //BackGroundMusic Sound Effect
    Axios.get(
      `https://freesound.org/apiv2/sounds/${BackgroundMusicId}/?token=${apiKey}`
    ).then((res) => {
      setBackGroundMusic(res.data.previews["preview-hq-mp3"]);
    });
    //FlippingCards SoundEffect
    Axios.get(
      `https://freesound.org/apiv2/sounds/${flippSoundId}/?token=${apiKey}`
    ).then((res) => {
      setFlippingSound(res.data.previews["preview-hq-mp3"]);
    });
    //Matching SoundEffect
    Axios.get(
      `https://freesound.org/apiv2/sounds/${matchSoundId}/?token=${apiKey}`
    ).then((res) => {
      setMatchingSound(res.data.previews["preview-hq-mp3"]);
    });
    //NoMatching SoundEffect
    Axios.get(
      `https://freesound.org/apiv2/sounds/${noMatchSoundId}/?token=${apiKey}`
    ).then((res) => {
      setNoMatchSound(res.data.previews["preview-hq-mp3"]);
    });
  }, []);

  //Play Background Music Effect

  useEffect(() => {
    if (isPlaying === true) {
      const music = new Audio(BackgroundMusic);
      music.play();
      music.loop = true;
    }
    setIsPlaying(true);
  }, [isPlaying, BackgroundMusic]);

  //Function game

  //Match Check Function

  function check(secondClickIndex) {
    if (cards[firstClickIndex].id === cards[secondClickIndex].id) {
      new Audio(matchingSound).play();
      cards[firstClickIndex].state = "match";
      cards[secondClickIndex].state = "match";
      setFirstClickIndex(-1);
    } else {
      new Audio(noMatchSound).play();

      cards[firstClickIndex].state = "noMatch";
      cards[secondClickIndex].state = "noMatch";
      setDisable(" disable ");
      setTimeout(() => {
        cards[firstClickIndex].state = "";
        cards[secondClickIndex].state = "";
        setFirstClickIndex(-1);
        setDisable("");
      }, 1000);
    }
    gameOver();
  }

  //CardsClick Function
  const cardsClick = (index) => {
    new Audio(flippingSound).play();
    if (firstClickIndex === -1) {
      setFirstClickIndex(index);
      cards[index].state = "active";
      setCards([...cards]);
    } else {
      setFirstClickIndex(index);
      cards[index].state = "active";
      check(index);
    }
  };
  //GameOver Function

  const gameOver = () => {
    if (cards.every((card) => card.state)) {
      setPopUpVisible(true);
    }
  };

  //playAgain Function
  const playAgain = () => {
    {
      cards.map((card) => {
        card.state = "";
      });
    }
    cards.sort(() => Math.random() - 0.5);
    setFirstClickIndex(-1);
    setPopUpVisible(false);
    setReset(false);
  };

  //ResetGame Function

  function resetGame() {
    setReset(true);
  }

  //Don'tResetGame Function
  function dontResetGame() {
    setReset(false);
  }

  return (
    <>
      <PopUp
        visible={popUpVisible}
        playAgain={playAgain}
        reset={reset}
        dontReset={dontResetGame}
      />
      <h1 className="title">Magic Memory</h1>
      <div className="cardsContainer">
        {cards.map((card, index) => (
          <div
            className={
              "cards" + (card.state ? " active " + card.state : disable)
            }
            key={index}
            onClick={() => cardsClick(index)}
          >
            {card.image}
          </div>
        ))}
        {/* {cardsList} */}
      </div>

      <button className="resetBtn"onClick={resetGame}>Reset Game</button>
    </>
  );
}
