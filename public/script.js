const allOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
let firstPlayerAllOfcontainersOfCharacters;
let secondPlayerAllOfcontainersOfCharacters;
const questionsBtn = document.getElementById("questions-btn");
const selectedCharacterName = document.getElementById('selected-character-name');

let firstUserCharacterSelected, secondUserCharacterSelected;
let isFirstUserPlaying = true;
let IBetThisIsTheHiddenCharacter;
let firstPlayerBetThatThisIsTheHiddenCharacter;
let secondPlayerBetThatThisIsTheHiddenCharacter;
isGameOver=false;
let charactersSelected = 0; 
MAXIM_OF_CHARACTERS_SELECTEDS = 2;

function assignStartingCharactersToEachUser(){
  firstPlayerAllOfcontainersOfCharacters = allOfcontainersOfCharacters;
  secondPlayerAllOfcontainersOfCharacters = allOfcontainersOfCharacters;
}
assignStartingCharactersToEachUser()

function showPopup(popupId, closePopupButtonId) {
  const popup = document.getElementById(popupId);
  const closePopupButton = document.getElementById(closePopupButtonId);

  if (popup && closePopupButton) {
    popup.style.display = "flex";
    
    closePopupButton.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
}



function handleCharacterClick(event) {
  if (charactersSelected < MAXIM_OF_CHARACTERS_SELECTEDS) {
    const clickedContainer = event.currentTarget;
    const allOfClassesOfCharacter = clickedContainer.classList;

    if (isFirstUserPlaying) {
      firstUserCharacterSelected = allOfClassesOfCharacter[2];
      console.log("Personaje seleccionado por el primer usuario:", firstUserCharacterSelected);
      updateSelectedCharacter();
      showWelcomeOfSecondPlayerPopup();
    } else {
      secondUserCharacterSelected = allOfClassesOfCharacter[2];
      console.log("Personaje seleccionado por el segundo usuario:", secondUserCharacterSelected);
      updateSelectedCharacter();
      showGameStartFirstPopup();
    }

    isFirstUserPlaying = !isFirstUserPlaying;
    charactersSelected++;

    if (charactersSelected >= MAXIM_OF_CHARACTERS_SELECTEDS) {
      console.log("Ambos jugadores han seleccionado sus personajes.");     
    }
  } else {
    const clickedContainer = event.currentTarget;
    const allOfClassesOfCharacter = clickedContainer.classList;
    const IBetThisIsTheHiddenCharacter = allOfClassesOfCharacter[2];
    console.log("Apuesta seleccionada:", IBetThisIsTheHiddenCharacter);
    compareTheBetOnTheHiddenCharacter(firstUserCharacterSelected, secondUserCharacterSelected, IBetThisIsTheHiddenCharacter);
  }
}

function compareTheBetOnTheHiddenCharacter(firstUserCharacterSelected, secondUserCharacterSelected, IBetThisIsTheHiddenCharacter) {
 if (isFirstUserPlaying){
  if (IBetThisIsTheHiddenCharacter === secondUserCharacterSelected) {
    console.log("HAS GANADO");
    showWinnerPopup();
  }
  else {
    console.log("HAS PERDIDO");
    showGameOverPopup();
  }
 }
}

function updateSelectedCharacter() {
  const selectedCharacterImg = document.getElementById('user-selected-character-image');
  const characterSelected = isFirstUserPlaying ? firstUserCharacterSelected : secondUserCharacterSelected;

    if (!characterSelected) {
      selectedCharacterImg.src = `public/images/girl.png`;
        selectedCharacterName.textContent = "¿...?";   
    }
    if (characterSelected) {
    selectedCharacterImg.src = `public/images/${characterSelected}.png`;
    selectedCharacterName.textContent = characterSelected;
  }
}

function eventClicForAllOfCcharacters(){
  allOfcontainersOfCharacters.forEach((container) => {
    container.addEventListener("click", handleCharacterClick);
  });
}

function changeColorsForEachPlayer() {
  const yourSelectedCharacterContainer = document.getElementById('your-selected-character-container');

  if (isFirstUserPlaying) {
    yourSelectedCharacterContainer.classList.remove("colorOfBackgroundsOfSecondPlayer"); 
    yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfFirstPlayer");
  }
  if (!isFirstUserPlaying) {
    yourSelectedCharacterContainer.classList.remove("colorOfBackgroundsOfFirstPlayer"); 
    yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfSecondPlayer");
  } 

  allOfcontainersOfCharacters.forEach((container) => {
    if (isFirstUserPlaying) {
      container.classList.remove("colorOfBackgroundsOfSecondPlayer"); 
      container.classList.add("colorOfBackgroundsOfFirstPlayer");
    }
    if (!isFirstUserPlaying) {
      container.classList.remove("colorOfBackgroundsOfFirstPlayer"); 
      container.classList.add("colorOfBackgroundsOfSecondPlayer");
    }
  });
}

// No se actualizan, quedan las clases del anteriores
function updateCharactersClassesForEachPlayer(classesOfCurrentPlayer) {
  
  const allOfCharactersOfScreen = document.querySelectorAll("#character .color-container");

  allOfCharactersOfScreen.forEach((elementOfScreen, index) => {
    const classesOfCurrentContainer = [...classesOfCurrentPlayer[index].classList];

    elementOfScreen.classList = [];

    classesOfCurrentContainer.forEach((classToAdd) => {
      elementOfScreen.classList.add(classToAdd);
    });
    console.log(`Estas son las clases  de classesOfCurrentContainer: ${classesOfCurrentContainer}`);
    console.log(`Estas son las clases que deberían reemplazar las anteriores: ${elementOfScreen}`);
  });
}
 
function showAndHideQuestions() {
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

function showWelcomeOfFirstPlayerPopup() {
  document.addEventListener("DOMContentLoaded", () => {
    changeColorsForEachPlayer();
      showPopup("first-player-popup", "close-first-player-popup");
  });
}

function showWelcomeOfSecondPlayerPopup() {
  showPopup("second-player-popup", "close-second-player-popup");

  const secondPlayerWelcomePopup = document.getElementById("second-player-popup");
  const closeSecondPlayerPopupButton = document.getElementById("close-second-player-popup");

  closeSecondPlayerPopupButton.addEventListener("click", () => {
    changeColorsForEachPlayer();   
    const yourSelectedCharacterContainer = document.getElementById('your-selected-character-container');
    yourSelectedCharacterContainer.classList.remove("colorOfBackgroundsOfFirstPlayer");
    yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfSecondPlayer");

    const selectedCharacterImg = document.getElementById('user-selected-character-image');
    selectedCharacterImg.src = '/public/images/girl.png';
    selectedCharacterName.textContent = '¿...?'; 
  });
}

function showGameOverPopup() {    
  showPopup("show-game-over-popup");  
  const gameOverPopup = document.getElementById("show-game-over-popup");
  setTimeout(() => {
    gameOverPopup.style.display = "block";
  }, 2000);
}

function showWinnerPopup(){
  showPopup("show-winner-popup");  
  const WinnerPopup = document.getElementById("show-winner-popup");
  setTimeout(() => {
    WinnerPopup.style.display = "block";
  }, 1000);
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

function handleSolutionButton() {
  const solutionBtn = document.getElementById("solution-btn");
  const hiddenCharacterContainer = document.getElementById("hidden-character-container");
  
  const closeGameOverPopupBtn = document.getElementById("close-game-over-popup");

  solutionBtn.addEventListener("click", () => {
    hiddenCharacterContainer.style.display = "flex";
    solutionBtn.style.display = "none";
    showGameOverPopup();
  });
}

function youAreTheWinner(){
  console.log("Has ganado");
}

function changeToCharacterDiscard(container) {
  container.classList.remove("active");
  container.classList.remove("colorOfBackgroundsOfFirstPlayer");
  container.classList.add("character-discarded");
}

// Aquí es donde compara solamente cuando está activo el primer jugador
function comparisonOfClassesToDiscardCharactersAccordingEachQuestion() {
  const questionButtons = document.querySelectorAll(".individual-question-btn");
  let otherPlayerSelectedCharacterClasses = [];
 
  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonFirstClass = button.classList[0];
      let targetCharacterList = isFirstUserPlaying ? firstPlayerAllOfcontainersOfCharacters : secondPlayerAllOfcontainersOfCharacters;
      let otherCharacterList = isFirstUserPlaying ? secondPlayerAllOfcontainersOfCharacters : firstPlayerAllOfcontainersOfCharacters;

      
      if (isFirstUserPlaying) {
       
        otherCharacterList = Array.from(secondPlayerAllOfcontainersOfCharacters);
        console.error("isFirstUserPlaying - esto es targetCharacterList:", targetCharacterList);  
        firstPlayerAllOfcontainersOfCharacters = targetCharacterList; 
        console.error("isFirstUserPlaying - esto es firstPlayerAllOfcontainersOfCharacters:", firstPlayerAllOfcontainersOfCharacters);  

      } 
      if (!isFirstUserPlaying) {      
       
        otherCharacterList = Array.from(firstPlayerAllOfcontainersOfCharacters);
        console.error("!isFirstUserPlaying - esto es targetCharacterList:", targetCharacterList);
        secondPlayerAllOfcontainersOfCharacters = targetCharacterList; 
      }

      const otherPlayerSelectedCharacter = isFirstUserPlaying ? secondPlayerAllOfcontainersOfCharacters : firstPlayerAllOfcontainersOfCharacters;
    
       otherPlayerSelectedCharacterClasses = []; 
       for (let i = 0; i < otherCharacterList.length; i++) {
        const characterInfo = otherCharacterList[i];
        const highlightedName = characterInfo.querySelector(".highlighted-name");
      
        if (highlightedName && highlightedName.textContent === otherPlayerSelectedCharacter) {
          otherPlayerSelectedCharacterClasses = Array.from(characterInfo.classList);
          break;
        }
      }
      if (IBetThisIsTheHiddenCharacter === otherPlayerSelectedCharacter) {
        youAreTheWinner();
        console.error("!!! HAS GANADO");
       
      }
      targetCharacterList.forEach(characterInfo => {
        const characterClasses = Array.from(characterInfo.classList);  
        const characterName = characterInfo.querySelector(".highlighted-name").textContent; 
        const characterImage = characterInfo.querySelector(".character");
       
        if (otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)) {
          if (!characterClasses.includes(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);
            characterInfo.classList.add('character-discarded');         
            characterImage.classList.add('grey-image');
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero sí con el personaje seleccionado por el otro jugador.`);
            console.log(characterInfo);
          }
          
        }

        if (!otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)) {
          if (characterClasses.includes(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);
            characterInfo.classList.add('character-discarded');
            characterImage.classList.add('grey-image');
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero sí con el personaje seleccionado por el otro jugador.`);
            console.log(characterInfo);
          }
        }
      });

      hideQuestionsAndShowNextPlayerButton();
      console.log(`Esta es la lista de personajes del jugador actual: ${targetCharacterList}`);
      console.log(`Esta es la lista de personajes del primer jugador: ${firstPlayerAllOfcontainersOfCharacters}`);
      console.log(`Esta es la lista de personajes del segundo jugador: ${secondPlayerAllOfcontainersOfCharacters}`);
      
    });
  });  
}

function showButtonForNextPlayer() {
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.style.display = "block";
}

function hideQuestionsAndShowNextPlayerButton() {
  const questionsContainer = document.getElementById("questions-container");
  questionsBtn.style.display = "none"; 
  questionsContainer.style.display = "none";
  showButtonForNextPlayer();
}

function showGameStartFirstPopup() {    
  showPopup("start-first-player-popup", "close-game-first-player-popup");  
  const startGameFirstPlayerPopup = document.getElementById("start-first-player-popup");
    isFirstUserPlaying=true;
    allOfcontainersOfCharacters.forEach((container) => {  
  });
  const closeGameFirstPlayerPopupBtn = document.getElementById("close-game-first-player-popup");
  closeGameFirstPlayerPopupBtn.addEventListener("click", () => {
    changeToNextPlayer();
  });
  
  comparisonOfClassesToDiscardCharactersAccordingEachQuestion();

  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.addEventListener("click", () => {
    changeToNextPlayer();
    questionsBtn.style.display = "block"; 
  });
  
  updateHiddenCharacter();
  handleSolutionButton(); 
}

function changeToNextPlayer() {
  isFirstUserPlaying = !isFirstUserPlaying;
          
   if (isFirstUserPlaying) updateCharactersClassesForEachPlayer(firstPlayerAllOfcontainersOfCharacters);
  if (!isFirstUserPlaying) updateCharactersClassesForEachPlayer(secondPlayerAllOfcontainersOfCharacters);
  console.log(`changeToNextPlayer - Esta es la lista de personajes del primer jugador: ${firstPlayerAllOfcontainersOfCharacters}`);
  console.log(`changeToNextPlayer - Esta es la lista de personajes del segundo jugador: ${secondPlayerAllOfcontainersOfCharacters}`);

  updateSelectedCharacter();
  updateHiddenCharacter();
  changeColorsForEachPlayer();
  eventClicForAllOfCcharacters();
  comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.style.display = "none";
} 

showWelcomeOfFirstPlayerPopup();
updateSelectedCharacter();
eventClicForAllOfCcharacters();
showAndHideQuestions();


