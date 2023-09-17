const allOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const CharactersForFirstUser = document.querySelectorAll("#characters .color-container");
const CharactersForSecondUser = document.querySelectorAll("#characters .color-container");
let firstPlayerAllOfcontainersOfCharacters = [];
let secondPlayerAllOfcontainersOfCharacters = [];
let firstUserClassesCharacterSelected, secondUserClassesCharacterSelected ,firstUserCharacterSelected, secondUserCharacterSelected, IBetThisIsTheHiddenCharacter;
const questionsBtn = document.getElementById("questions-btn");
const selectedCharacterImg = document.getElementById('user-selected-character-image');
const selectedCharacterName = document.getElementById('selected-character-name');
const solutionBtn = document.getElementById("solution-btn");
const hiddenCharacterContainer = document.getElementById("hidden-character-container");  
const yourSelectedCharacterContainer = document.getElementById('your-selected-character-container');
let isFirstUserPlaying = true;
isGameOver=false;
let numberOfCharactersSelected = 0; 
MAXIM_OF_CHARACTERS_SELECTEDS = 2;

/* He probado a cogerlas independientemente CharactersForFirstUser, pero estas listas no son independientes, cuando se actualizan lo hacen a la vez */
function assignStartingCharactersToEachUser() {
  firstPlayerAllOfcontainersOfCharacters = [...CharactersForFirstUser];
  secondPlayerAllOfcontainersOfCharacters = [...CharactersForSecondUser];

  console.log(`assignStartingCharactersToEachUser() - Contenido de firstPlayerAllOfcontainersOfCharacters:`, Array.from(firstPlayerAllOfcontainersOfCharacters));
  console.log(`assignStartingCharactersToEachUser() - Contenido de secondPlayerAllOfcontainersOfCharacters:`, Array.from(secondPlayerAllOfcontainersOfCharacters));
}

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
  if (numberOfCharactersSelected < MAXIM_OF_CHARACTERS_SELECTEDS) {
    const clickedContainer = event.currentTarget;
    const allOfClassesOfCharacter = clickedContainer.classList;

    if (isFirstUserPlaying) {
      firstUserClassesCharacterSelected = allOfClassesOfCharacter;
      firstUserCharacterSelected = allOfClassesOfCharacter[2];
      updateSelectedCharacter();
      showWelcomeOfSecondPlayerPopup();
    } 
    if (!isFirstUserPlaying)  {
      secondUserClassesCharacterSelected = allOfClassesOfCharacter;
      secondUserCharacterSelected = allOfClassesOfCharacter[2];
      updateSelectedCharacter();
      showGameStartFirstPopup();
    }

    isFirstUserPlaying = !isFirstUserPlaying;
    numberOfCharactersSelected++;

    if (numberOfCharactersSelected >= MAXIM_OF_CHARACTERS_SELECTEDS) {
      console.log("Ya se han seleccionado los 2 personajes.");     
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
  const characterSelected = isFirstUserPlaying ? firstUserCharacterSelected : secondUserCharacterSelected;

  if (!characterSelected) {
    selectedCharacterImg.src = `public/images/girl.png`;
    selectedCharacterName.textContent = "¿...?";
  }

  if (characterSelected) {
  
    const characterNameElement = document.querySelector(`.color-container.active.${characterSelected} h4.highlighted-name`);
    
    if (characterNameElement) {
      selectedCharacterName.textContent = characterNameElement.textContent;
    } 
    if (!characterNameElement) {
      selectedCharacterName.textContent = characterSelected;
    }
    selectedCharacterImg.src = `public/images/${characterSelected}.png`;
  }
}


function eventClicForAllOfCcharacters(){
  allOfcontainersOfCharacters.forEach((container) => {
    container.addEventListener("click", handleCharacterClick);
  });
}

function changeColorsForTheListsOfEachPlayer(){
  if(isFirstUserPlaying){
    firstPlayerAllOfcontainersOfCharacters.forEach((container) => {     
      container.classList.remove("colorOfBackgroundsOfSecondPlayer"); 
      container.classList.add("colorOfBackgroundsOfFirstPlayer");     
    });
  }

  if(!isFirstUserPlaying){
    secondPlayerAllOfcontainersOfCharacters.forEach((container) => {  
      container.classList.remove("colorOfBackgroundsOfFirstPlayer");
      container.classList.add("colorOfBackgroundsOfSecondPlayer");     
    });
  } 
}

function changeColorsCharactersScreenForEachPlayer() {

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

function updateCharactersClassesForEachPlayer(classesOfCurrentPlayer) { 
  const allOfCharactersOfScreen = document.querySelectorAll("#character .color-container");

  allOfCharactersOfScreen.forEach((elementOfScreen, index) => {
    const classesOfCurrentContainer = Array.from(classesOfCurrentPlayer);
    elementOfScreen.classList = [];
    classesOfCurrentContainer.forEach(( classesToAd) => {
      elementOfScreen.classList.add( classesToAd);
    });
    console.log(`updateCharactersClassesForEachPlayer() - Estas son las clases para añadir: ${ classesToAd}`);

    const container = elementOfScreen.parentElement;

    if (!container.classList.contains("character-discarded")) {
      const characterImage = container.querySelector(".character");
      characterImage.classList.remove("grey-image");
    }

    console.log(`updateCharactersClassesForEachPlayer() - Estas son las clases de classesOfCurrentContainer: ${classesOfCurrentContainer}`);
    console.log(`updateCharactersClassesForEachPlayer() - Estas son las clases que deberían reemplazar las anteriores: ${elementOfScreen}`);
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
          }, 300); 
      }
      setTimeout(() => {
      allOfQuestions.style.display = "flex";  
    }, 300);        
  });
}

function showWelcomeOfFirstPlayerPopup() {
  document.addEventListener("DOMContentLoaded", () => {
    assignStartingCharactersToEachUser();
    changeColorsForTheListsOfEachPlayer(); 
    changeColorsCharactersScreenForEachPlayer();
    showPopup("first-player-popup", "close-first-player-popup");
  });
}

function showWelcomeOfSecondPlayerPopup() {
  showPopup("second-player-popup", "close-second-player-popup");
  const secondPlayerWelcomePopup = document.getElementById("second-player-popup");
  const closeSecondPlayerPopupButton = document.getElementById("close-second-player-popup");

  closeSecondPlayerPopupButton.addEventListener("click", () => {
    changeColorsForTheListsOfEachPlayer();
    changeColorsCharactersScreenForEachPlayer();   
    
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
  }, 1000);
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
    // Encuentra el elemento <h4> correspondiente al personaje oculto seleccionado por el segundo usuario
    const characterNameElement = document.querySelector(`.color-container.active.${secondUserCharacterSelected} h4.highlighted-name`);

    if (characterNameElement) {
      // Obtiene el texto del elemento <h4> y lo asigna al nombre del personaje oculto
      hiddenCharacterName.textContent = characterNameElement.textContent;
    } else {
      // Si no se encuentra el elemento, simplemente usa el valor de secondUserCharacterSelected
      hiddenCharacterName.textContent = secondUserCharacterSelected;
    }

    // Actualiza la imagen del personaje oculto
    hiddenCharacterImg.src = `public/images/${secondUserCharacterSelected}.png`;
  } else {
    // Lo mismo para el caso en que el segundo usuario está jugando
    const characterNameElement = document.querySelector(`.color-container.active.${firstUserCharacterSelected} h4.highlighted-name`);

    if (characterNameElement) {
      hiddenCharacterName.textContent = characterNameElement.textContent;
    } else {
      hiddenCharacterName.textContent = firstUserCharacterSelected;
    }

    hiddenCharacterImg.src = `public/images/${firstUserCharacterSelected}.png`;
  }
}

function handleSolutionButton() {
  const closeGameOverPopupBtn = document.getElementById("close-game-over-popup");

  solutionBtn.addEventListener("click", () => {
    hiddenCharacterContainer.style.display = "flex";
    solutionBtn.style.display = "none";
    showGameOverPopup();
  });
}

function changeToCharacterDiscard(container) {
  container.classList.remove("active");

  container.classList.add("character-discarded");
  const characterImage = container.querySelector(".character");
  characterImage.classList.add('grey-image');
  if (isFirstUserPlaying)  container.classList.remove("colorOfBackgroundsOfFirstPlayer");
  if (!isFirstUserPlaying)  container.classList.remove("colorOfBackgroundsOfSecondPlayer");
}

function comparisonOfClassesToDiscardCharactersAccordingEachQuestion() {
  const questionButtons = document.querySelectorAll(".individual-question-btn");

  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
    const buttonFirstClass = button.classList[0];
    const otherPlayerHiddenCharacter = isFirstUserPlaying ? Array.from(secondUserClassesCharacterSelected) : Array.from(firstUserClassesCharacterSelected);       
    const targetCharactersList = isFirstUserPlaying ? Array.from(firstPlayerAllOfcontainersOfCharacters) : Array.from(secondPlayerAllOfcontainersOfCharacters);
    const otherCharactersList = isFirstUserPlaying ? Array.from(secondPlayerAllOfcontainersOfCharacters) : Array.from(firstPlayerAllOfcontainersOfCharacters);

    console.error("comparisonOfClassesToDiscardCharactersAccordingEachQuestion-isFirstUserPlaying - esto es otherPlayerHiddenCharacter:", otherPlayerHiddenCharacter); 
    console.error("comparisonOfClassesToDiscardCharactersAccordingEachQuestion-isFirstUserPlaying - esto es targetCharactersList:", targetCharactersList); 
    console.error("comparisonOfClassesToDiscardCharactersAccordingEachQuestion-isFirstUserPlaying - esto es otherCharactersList:", otherCharactersList);  
    console.error("comparisonOfClassesToDiscardCharactersAccordingEachQuestion-isFirstUserPlaying - esto es firstPlayerAllOfcontainersOfCharacters:", firstPlayerAllOfcontainersOfCharacters);  

    for (let i = 0; i < otherCharactersList.length; i++) {
      const characterInfo = otherCharactersList[i];
      const highlightedName = characterInfo.querySelector(".highlighted-name");
      
      if (highlightedName.textContent === otherPlayerHiddenCharacter) {
        showWinnerPopup();
      }      
    }

    targetCharactersList.forEach(characterInfo => {
        const characterClasses = Array.from(characterInfo.classList);
        const characterName = characterInfo.querySelector(".highlighted-name").textContent;

        if (otherPlayerHiddenCharacter.includes(buttonFirstClass)) {
          if (!characterClasses.includes(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero sí con el personaje oculto`);   
            console.log(characterInfo);          
          }
        }

        if (!otherPlayerHiddenCharacter.includes(buttonFirstClass)) {
          if (characterClasses.includes(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);
            console.log(`El botón con clase "${buttonFirstClass}" coincide con el personaje "${characterName}" pero no con el personaje oculto`);
          }
        }
      });

      hideQuestionsAndShowNextPlayerButton();
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
  const closeGameFirstPlayerPopupBtn = document.getElementById("close-game-first-player-popup");

  isFirstUserPlaying=true;

    closeGameFirstPlayerPopupBtn.addEventListener("click", () => {
    changeToNextPlayer();
  });
  
  comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
  const nextParticipantBtn = document.getElementById("next-participant-btn");

  nextParticipantBtn.addEventListener("click", () => {
    changeToNextPlayer();
    comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
    questionsBtn.style.display = "block"; 
  });
  
  updateHiddenCharacter();
  handleSolutionButton(); 
}

function changeToNextPlayer() {
  if (isFirstUserPlaying) updateCharactersClassesForEachPlayer(firstPlayerAllOfcontainersOfCharacters);
  if (!isFirstUserPlaying) updateCharactersClassesForEachPlayer(secondPlayerAllOfcontainersOfCharacters);

  isFirstUserPlaying = !isFirstUserPlaying;
          
  updateSelectedCharacter();
  updateHiddenCharacter();
  console.log("changeToNextPlayer - Esta es la lista de personajes del primer jugador:", Array.from(firstPlayerAllOfcontainersOfCharacters));
  console.log("changeToNextPlayer - Esta es la lista de personajes del segundo jugador:", Array.from(secondPlayerAllOfcontainersOfCharacters));

  changeColorsForTheListsOfEachPlayer();
  changeColorsCharactersScreenForEachPlayer(); 
  eventClicForAllOfCcharacters();
  comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
  
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.style.display = "none";
} 

function showAndHideGameRules(){
  const rulesContainer = document.getElementById("game-rules-container");
  const rulesButton = document.getElementById("game-rules-btn");
  let isShown = false;

  rulesButton.addEventListener("click", () => {
    if (!isShown) {
        rulesContainer.style.display = "block";
        solutionBtn.style.display = "none";
        yourSelectedCharacterContainer.display = "none";
        setTimeout(() => {
            rulesContainer.classList.add("show-like-slide");
        }, 900);
    } else {
        rulesContainer.classList.remove("show-like-slide");
        solutionBtn.style.display = "block";
        yourSelectedCharacterContainer.display = "block";
        setTimeout(() => {
            rulesContainer.style.display = "none";
        }, 900);
    }
    isShown = !isShown;
  });
}

showWelcomeOfFirstPlayerPopup();
updateSelectedCharacter();
eventClicForAllOfCcharacters();
showAndHideQuestions();
showAndHideGameRules()


