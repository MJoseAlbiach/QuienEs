const allOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const firstPlayerAllOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const secondPlayerAllOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const yourSelectedCharacterContainer = document.getElementById('your-selected-character-container');
const userSelectedCharacterImg = document.getElementById('user-selected-character-image');
const userSelectedCharacterName = document.getElementById('selected-character-name');
const allOfQuestions = document.getElementById("questions-container");
let allOfCharactersOfFirstUser = [];
let allOfCharactersOfSecondUser = [];
const allOfCharacters = [];
let otherPlayerSelectedCharacterClasses = [];
let firstUserCharacterSelected, secondUserCharacterSelected;
let isFirstUserPlaying = true;
isGameOver=false;


function showWelcomeOfFirstPlayerPopup() {
  document.addEventListener("DOMContentLoaded", () => {
    changeColorsForEachPlayer();
      showPopup("first-player-popup", "close-first-player-popup");
  });
}
showWelcomeOfFirstPlayerPopup();
// Se activa el color del 2º jugador, cuando debería permanecer el 1º

function getNamesAndStateOfCharactersForEachPlayer() {
    allOfcontainersOfCharacters.forEach((container) => {
    const allOfClassesOfCharacter = container.classList;
    if (allOfClassesOfCharacter.length > 2) {
      const characterInfo = [allOfClassesOfCharacter[1], allOfClassesOfCharacter[2]];     
      allOfCharactersOfFirstUser.push(characterInfo);
      allOfCharactersOfSecondUser.push(characterInfo);    
    }
  });
  console.log("Personajes del primer usuario:", allOfCharactersOfFirstUser);
  console.log("Personajes del segundo usuario:", allOfCharactersOfSecondUser);
}


function showWelcomeOfSecondPlayerPopup() {    
  showPopup("second-player-popup", "close-second-player-popup");  
  const closeSecondPlayerPopupButton = document.getElementById("close-second-player-popup"); 
  closeSecondPlayerPopupButton.addEventListener("click", () => {
   changeColorsForEachPlayer();
  });

}


// Si descomento yourSelectedCharacterContainer Uncaught TypeError: yourSelectedCharacterContainer is null
function changeColorsForEachPlayer(){
  /* if (isFirstUserPlaying){
    yourSelectedCharacterContainer.remove("colorOfBackgroundsOfFirstPlayer"); 
    yourSelectedCharacterContainer.add("colorOfBackgroundsOfSecondPlayer");
  }
  if (!isFirstUserPlaying){
    yourSelectedCharacterContainer.remove("colorOfBackgroundsOfSecondPlayer"); 
    yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfFirstPlayer");
  }  */
  allOfcontainersOfCharacters.forEach((container) => {
    if (isFirstUserPlaying){
    container.classList.remove("colorOfBackgroundsOfSecondPlayer"); 
      container.classList.add("colorOfBackgroundsOfFirstPlayer");
    }
    if (!isFirstUserPlaying){
      container.classList.remove("colorOfBackgroundsOfFirstPlayer"); 
      container.classList.add("colorOfBackgroundsOfSecondPlayer");
      
    }
     
  });
}

function showGameOverPopup() {    
  showPopup("show-game-over-popup", "close-game-over-popup");  
  const secondPlayerWelcomePopup = document.getElementById("game-over-popup");
  changeColorsForEachPlayer();
}

function handleCharacterClick(event) {
  if (isGameOver) {
    return;
  }
  const clickedContainer = event.currentTarget;
  const allOfClassesOfCharacter = clickedContainer.classList;

  if (allOfClassesOfCharacter.length > 2) {
    if (isFirstUserPlaying) {
      firstUserCharacterSelected = allOfClassesOfCharacter[2];
      console.log("Personaje seleccionado por el primer usuario:", firstUserCharacterSelected);    
      updateSelectedCharacter();
      showWelcomeOfSecondPlayerPopup(); 
    } 

    if (!isFirstUserPlaying) {
      secondUserCharacterSelected = allOfClassesOfCharacter[2];
      console.log("Personaje seleccionado por el segundo usuario:", secondUserCharacterSelected);
      updateSelectedCharacter();
       showGameStartFirstPopup();           
    }       
    isFirstUserPlaying =false; 
  }
}

function eventClicForAllOfCcharacters(){
  allOfcontainersOfCharacters.forEach((container) => {
    container.addEventListener("click", handleCharacterClick);
  });
}


// falla porque no hay imágenes todavía
function updateSelectedCharacter() { 
  const selectedCharacterImg = document.getElementById('user-selected-character-image');
  const selectedCharacterName = document.getElementById('selected-character-name'); 

  if (isFirstUserPlaying && firstUserCharacterSelected) {
      selectedCharacterImg.src = `public/images/${firstUserCharacterSelected}.png`;
      selectedCharacterName.textContent = firstUserCharacterSelected;
  }  
  if (!isFirstUserPlaying && secondUserCharacterSelected) {
      selectedCharacterImg.src = `public/images/${secondUserCharacterSelected}.png`;
      selectedCharacterName.textContent = secondUserCharacterSelected;
  }
}

function updateHiddenCharacter() {
  const hiddenCharacterImg = document.getElementById('user-hidden-character-image');
  const hiddenCharacterName = document.getElementById('hidden-character-name'); 

  if (isFirstUserPlaying) {
    hiddenCharacterImg.src = `public/images/${secondUserCharacterSelected}.png`;
    hiddenCharacterName.textContent = secondUserCharacterSelected;
  } else {
    hiddenCharacterImg.src = `public/images/${firstUserCharacterSelected}.png`;
    hiddenCharacterName.textContent = firstUserCharacterSelected;
  }
}

function handleSolutionButton(){  
  const solutionBtn = document.getElementById("solution-btn");
  const hiddenCharacterContainer = document.getElementById("hidden-character-container");

  solutionBtn.addEventListener("click", () => {
    hiddenCharacterContainer.style.display = "flex"; 
    solutionBtn.style.display = "none";
  });

}



function showPopup(popupId, closePopupButton) {
    const popup = document.getElementById(popupId);
    const closePopupButon = document.getElementById(closePopupButton);
    popup.style.display = "flex";

    closePopupButon.onclick = function () {
    popup.style.display = "none";
    };     
}

function youAreTheWinner(){
  console.log("Has ganado");
}

function changeToCharacterDiscard(container) {
  container.classList.remove("active");
  container.classList.remove("colorOfBackgroundsOfFirstPlayer");
  container.classList.add("character-discarded");
}

/* function comparisonOfClassesToDiscardCharactersAccordingEachQuestion() {
  const questionButtons = document.querySelectorAll(".individual-question-btn");
  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonFirstClass = button.classList[0];
      console.log("Estoy en el evento de la pregunta de comparisonOfClassesToDiscardCharactersAccordingEachQuestion");

      let targetCharacterList;
      let otherCharacterList;

      if (isFirstUserPlaying) {
        targetCharacterList = allOfCharactersOfFirstUser;
        otherCharacterList = allOfCharactersOfSecondUser;
      } 
      if (!isFirstUserPlaying) {
        targetCharacterList = allOfCharactersOfSecondUser;
        otherCharacterList = allOfCharactersOfFirstUser;
      }
      const otherPlayerSelectedCharacter = isFirstUserPlaying ? secondUserCharacterSelected : firstUserCharacterSelected;

      targetCharacterList.forEach(characterInfo => {
        const characterName = characterInfo[1];
        const characterContainer = document.querySelector(`.color-container.${characterName}`);
        const characterClasses = characterContainer.classList;

        if (characterName == otherPlayerSelectedCharacter) {
          youAreTheWinner();
        }

    // NO FUNCIONA: no deselecciona los que no coinciden, deselecciona los que coinciden
        if (otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)){

            if (!characterClasses.contains(buttonFirstClass)) {
              changeToCharacterDiscard(characterContainer);
              console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero si con el personaje seleccionado por el otro jugador.`);
              console.log(characterContainer);
            }
        }
    // FUNCIONA pero también deselecciona el personaje oculto. Puede que sea que tampoco funciona 
        if (!otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)){
          if (characterClasses.contains(buttonFirstClass)) {
            changeToCharacterDiscard(characterContainer);
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero si con el personaje seleccionado por el otro jugador.`);
            console.log(characterContainer);
          }
      }
      });
      hideQuestionsAndShowNextPlayerButton();
      console.log(`Esta es la lista de personajes del jugador actual: ${targetCharacterList}`);
    });
  });  
} */

function comparisonOfClassesToDiscardCharactersAccordingEachQuestion() {
  const questionButtons = document.querySelectorAll(".individual-question-btn");
  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonFirstClass = button.classList[0];
      console.log("Estoy en el evento de la pregunta de comparisonOfClassesToDiscardCharactersAccordingEachQuestion");

      let targetCharacterList;
      let otherCharacterList;

      if (isFirstUserPlaying) {
        targetCharacterList = allOfCharactersOfFirstUser;
        otherCharacterList = allOfCharactersOfSecondUser;
      } else {
        targetCharacterList = allOfCharactersOfSecondUser;
        otherCharacterList = allOfCharactersOfFirstUser;
      }
      const otherPlayerSelectedCharacter = isFirstUserPlaying ? secondUserCharacterSelected : firstUserCharacterSelected;

      targetCharacterList.forEach(characterInfo => {
        const characterName = characterInfo[1];
        const characterContainer = document.querySelector(`.color-container.${characterName}`);
        const characterClasses = characterContainer.classList;

        if (characterName == otherPlayerSelectedCharacter) {
          youAreTheWinner();
        }

        if (otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)){
          if (!characterClasses.contains(buttonFirstClass)) {
            changeToCharacterDiscard(characterContainer);
            // Actualiza la clase en el objeto de información del personaje
            characterInfo[2] = 'character-discarded';
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero si con el personaje seleccionado por el otro jugador.`);
            console.log(characterContainer);
          }
        }

        if (!otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)){
          if (characterClasses.contains(buttonFirstClass)) {
            changeToCharacterDiscard(characterContainer);
            // Actualiza la clase en el objeto de información del personaje
            characterInfo[2] = 'character-discarded';
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero si con el personaje seleccionado por el otro jugador.`);
            console.log(characterContainer);
          }
        }
      });

      if (isFirstUserPlaying) {
        allOfCharactersOfFirstUser = targetCharacterList;
      } 
      if (!isFirstUserPlaying)  {
        allOfCharactersOfSecondUser = targetCharacterList;
      }

      hideQuestionsAndShowNextPlayerButton();
      console.log(`Esta es la lista de personajes del jugador actual: ${targetCharacterList}`);
    });
  });  
}


function showButtonForNextPlayer() {
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.style.display = "block";
}

function hideQuestionsAndShowNextPlayerButton() {
  const questionsContainer = document.getElementById("questions-container");
  questionsContainer.style.display = "none";
  showButtonForNextPlayer();
}

function showGameStartFirstPopup() {    
  showPopup("start-first-player-popup", "close-game-first-player-popup");  
  const startGameFirstPlayerPopup = document.getElementById("start-first-player-popup");
    isFirstUserPlaying=true;
  allOfcontainersOfCharacters.forEach((container) => {
    
    changeColorsForEachPlayer();
  });

  comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.addEventListener("click", () => {
    changeToNextPlayer();
  });
  console.log("estoy en showGameStartFirstPopup, isGameOver: ", isGameOver, "isFirstUserPlaying: ", isFirstUserPlaying);  
  updateHiddenCharacter();
  handleSolutionButton(); 
}

function showAndHideQuestions() {
  const questionsBtn = document.getElementById("questions-btn");
  const allOfQuestions = document.getElementById("questions-container");
  const questionButtons = document.querySelectorAll(".individual-question-btn");

  questionsBtn.addEventListener("click", () => {
      if (allOfQuestions.style.display === "flex") {
          questionButtons.forEach((button, index) => {
              button.style.animationDelay = ""; 
              button.style.animationPlayState = "reverse"; 
          });
          setTimeout(() => {
              allOfQuestions.style.display = "none";
          }, 800); 
      }
          allOfQuestions.style.display = "flex";          
  });
}

function changeToNextPlayer() {
  isFirstUserPlaying = !isFirstUserPlaying;
  updateSelectedCharacter();
  changeColorsForEachPlayer();
  comparisonOfClassesToDiscardCharactersAccordingEachQuestion()
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.style.display = "none";
  const questionsContainer = document.getElementById("questions-container");
  questionsContainer.style.display = "flex";
}



updateSelectedCharacter();
eventClicForAllOfCcharacters()
getNamesAndStateOfCharactersForEachPlayer(); 
showAndHideQuestions();
/* handleSolutionButton() */

