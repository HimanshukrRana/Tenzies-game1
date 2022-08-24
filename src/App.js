import React from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
// import Confetti from "react-Confetti"

function App() {

  const [Dice, setDice] = React.useState(allnewDice());
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allheld = Dice.every(Dice => Dice.isHeld);
    const firstnum = Dice[0].value
    const allsamenum = Dice.every(die => die.value === firstnum)

    if (allheld && allsamenum) {
      setTenzies(true)
      alert("you won!")
    }

  }, [Dice])

  function getNewDie() {
    return ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    })
  }

  function allnewDice() {
    const newDice = [];

    for (let i = 0; i < 10; i++) {
      newDice.push(getNewDie())
    }

    return newDice;
  }

  const Dicemap = Dice.map(die =>
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holddice={() => holddice(die.id)}
    />)

  function Rolldice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die : getNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allnewDice())
    }
  }

  function holddice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } : die

    }
    ))
  }

  return (
    <main className="App">
      {/* {tenzies && <Confetti />} */}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dies-container">
        {Dicemap}
      </div>

      <button className="roll" onClick={Rolldice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;
