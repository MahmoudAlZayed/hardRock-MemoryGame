/* eslint-disable react/prop-types */
export default function PopUpPractice ({visible,playAgain,reset,dontReset}) {
   if(visible) {
    return<>
    <div className="popUpContainer">
        <div className="popUpcontent">
            <h1>You Win</h1>
            <button onClick={playAgain}>Play Again</button>
            </div>
        </div>
    </>
   }
   else if (reset){
    return<>
    <div className="popUpContainer">
        <div className="popUpcontent">
            <h3>are you sure you want to reset the game?</h3>
            <button onClick={playAgain}>Reset</button>
            <button className="cancel"onClick={dontReset}>Cancel</button>

            </div>
        </div>
        </>
   }
}