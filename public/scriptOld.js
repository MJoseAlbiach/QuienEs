const allOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const firstPlayerAllOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const secondPlayerAllOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
const allOfQuestions = document.getElementById("questions-container");
const selectedCharacterName = document.getElementById('selected-character-name');
let allOfCharactersOfFirstUser = [];
let allOfCharactersOfSecondUser = [];
let otherPlayerSelectedCharacterClasses = [];
let firstUserCharacterSelected, secondUserCharacterSelected;
let isFirstUserPlaying = true;
isGameOver=false;
let charactersSelected = 0; 

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

  if (charactersSelected >= 2) {
    allOfcontainersOfCharacters.forEach((container) => {
      container.removeEventListener("click", handleCharacterClick);
    });
  }
}

function updateSelectedCharacter() {
  const selectedCharacterImg = document.getElementById('user-selected-character-image');
  const selectedCharacterName = document.getElementById('selected-character-name');
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

function saveNamesAndStateOfCharactersForEachPlayer() {
  allOfcontainersOfCharacters.forEach((container) => {
    const allOfClassesOfCharacter = container.classList;
    if (allOfClassesOfCharacter.length > 2) {
      const characterInfo = [...allOfClassesOfCharacter];
      allOfCharactersOfFirstUser.push(characterInfo);
      allOfCharactersOfSecondUser.push(characterInfo);
    }
  });

  console.log("Personajes del primer usuario: allOfCharactersOfFirstUser", allOfCharactersOfFirstUser);
  console.log("Personajes del segundo usuario: allOfCharactersOfSecondUser", allOfCharactersOfSecondUser);
  console.log("Personajes del primer usuario firstPlayerAllOfcontainersOfCharacters:", firstPlayerAllOfcontainersOfCharacters);
  console.log("Personajes del segundo usuario secondPlayerAllOfcontainersOfCharacters:", secondPlayerAllOfcontainersOfCharacters);
}

function updateTheirOwnCharactersForEachPlayer() {
  const targetCharacterList = isFirstUserPlaying ? allOfCharactersOfFirstUser : allOfCharactersOfSecondUser;

  targetCharacterList.forEach((characterInfo) => {
    container.classList = targetCharacterList[containerIndex].join(' ');
  });
}

function showTheCharactersSavedByEachPlayer(playerCharacters) {
}

 const questionsBtn = document.getElementById("questions-btn");
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
  showPopup("show-game-over-popup", "close-game-over-popup");  
  const secondPlayerWelcomePopup = document.getElementById("game-over-popup");
  changeColorsForEachPlayer();
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
  const gameOverPopup = document.getElementById("show-game-over-popup");
  const closeGameOverPopupBtn = document.getElementById("close-game-over-popup");

  solutionBtn.addEventListener("click", () => {
    hiddenCharacterContainer.style.display = "flex";
    solutionBtn.style.display = "none";
    setTimeout(() => {
      gameOverPopup.style.display = "block";
    }, 2000);
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
  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonFirstClass = button.classList[0];
      console.log("Estoy en el evento de la pregunta de comparisonOfClassesToDiscardCharactersAccordingEachQuestion");

      let targetCharacterList;
      let otherCharacterList;

      if (isFirstUserPlaying) {
        targetCharacterList = Array.from(firstPlayerAllOfcontainersOfCharacters);
        otherCharacterList = Array.from(secondPlayerAllOfcontainersOfCharacters);
        console.error("esto es targetCharacterList:", targetCharacterList);       
      } 
      if (!isFirstUserPlaying) {      
        targetCharacterList = Array.from(secondPlayerAllOfcontainersOfCharacters);
        otherCharacterList = Array.from(firstPlayerAllOfcontainersOfCharacters);
        console.error("esto es targetCharacterList:", targetCharacterList);
      }

      const otherPlayerSelectedCharacter = isFirstUserPlaying ? secondUserCharacterSelected : firstUserCharacterSelected;
      
      otherPlayerSelectedCharacterClasses = [];
      otherCharacterList.forEach(characterInfo => {
        const characterClasses = characterInfo.classList; 
        const characterName = characterInfo.querySelector(".highlighted-name").textContent; 
        if (characterName === otherPlayerSelectedCharacter) {
          youAreTheWinner();
        }
      });

      targetCharacterList.forEach(characterInfo => {
        const characterClasses = characterInfo.classList; 
        const characterName = characterInfo.querySelector(".highlighted-name").textContent; 
// Aquí en lugar de comparar con el personaje oculto, no se porqué compara con el elegido por el jugador activo
        if (otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)) {
          if (!characterClasses.contains(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);
            characterInfo.classList.add('character-discarded');
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero sí con el personaje seleccionado por el otro jugador.`);
            console.log(characterInfo);
          }
          
        }

        if (!otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)) {
          if (characterClasses.contains(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);
            characterInfo.classList.add('character-discarded');
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero sí con el personaje seleccionado por el otro jugador.`);
            console.log(characterInfo);
          }
        }
      });

      if (isFirstUserPlaying) {
        allOfCharactersOfFirstUser = targetCharacterList;
      } 
      if (!isFirstUserPlaying) {
        allOfCharactersOfSecondUser = targetCharacterList;
      }

      hideQuestionsAndShowNextPlayerButton();
      console.log(`Esta es la lista de personajes del jugador actual:`);
      console.log(targetCharacterList);
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
  console.log("estoy en showGameStartFirstPopup, isGameOver: ", isGameOver, "isFirstUserPlaying: ", isFirstUserPlaying);  
  updateHiddenCharacter();
  handleSolutionButton(); 
}

function changeToNextPlayer() {
  isFirstUserPlaying = !isFirstUserPlaying;
  updateSelectedCharacter();
  updateHiddenCharacter();
  changeColorsForEachPlayer();
  comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
  updateTheirOwnCharactersForEachPlayer();
  const nextParticipantBtn = document.getElementById("next-participant-btn");
  nextParticipantBtn.style.display = "none";
} 
showWelcomeOfFirstPlayerPopup();
updateSelectedCharacter();
eventClicForAllOfCcharacters();
saveNamesAndStateOfCharactersForEachPlayer(); 
showAndHideQuestions();


