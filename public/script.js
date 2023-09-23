let visibilitYOfCharactersOfFirstPlayer = document.getElementById("characters1");
let visibilitYOfCharactersOfSecondPlayer = document.getElementById("characters2");
let CharactersForFirstUser = document.querySelectorAll("#characters1 .color-container");
let CharactersForSecondUser = document.querySelectorAll("#characters2 .color-container");
let firstUserClassesCharacterSelected, secondUserClassesCharacterSelected, playerCharacterSelected, characterSelected ,firstUserCharacterSelected, secondUserCharacterSelected, IBetThisIsTheHiddenCharacter;
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

function showResultsOfTheOtherPlayer() { 
  const otherPlayerBoard = document.getElementById('other-player-board');

  if (isFirstUserPlaying){
    const characters2 = document.getElementById('characters2');
    if (characters2 && otherPlayerBoard) {  
        clonedCharacters = characters2.cloneNode(true);
        const characterNames = clonedCharacters.querySelectorAll('.highlighted-name');

        characterNames.forEach(name => {
          name.remove();
        });
      } 
    }
    if (!isFirstUserPlaying){
      const characters1 = document.getElementById('characters1');

      if (characters1 && otherPlayerBoard) {       
          clonedCharacters = characters1.cloneNode(true);   
          const characterNames = clonedCharacters.querySelectorAll('.highlighted-name');

          characterNames.forEach(name => {
              name.remove();
          });
        } 
      }    
      otherPlayerBoard.innerHTML = clonedCharacters.innerHTML;
      otherPlayerBoard.style.display = 'grid';
  }

 function animationToShowCharacters() {
  CharactersForFirstUser.forEach((container, index) => {
   
    container.style.animationDelay = `${0.05 * index}s`; 
    container.classList.add("fade-in"); 
  });

  CharactersForSecondUser.forEach((container, index) => {
 
    container.style.animationDelay = `${0.05 * index}s`; 
    container.classList.add("fade-in"); 
  });
 } 

function showCharactersAccordingToPlayer() {
  if (isFirstUserPlaying) {
    visibilitYOfCharactersOfSecondPlayer.classList.add("hidden");
    visibilitYOfCharactersOfFirstPlayer.classList.remove("hidden");
    visibilitYOfCharactersOfFirstPlayer.classList.add("show");
    animationToShowCharacters();
  }
  if (!isFirstUserPlaying) {
    visibilitYOfCharactersOfFirstPlayer.classList.add("hidden");
    visibilitYOfCharactersOfSecondPlayer.classList.remove("hidden");
    visibilitYOfCharactersOfSecondPlayer.classList.add("show");
    animationToShowCharacters();
  }
  
  yourSelectedCharacterContainer.style.display = "none";
}

function compareTheBetOnTheHiddenCharacter(playerCharacterSelected, IBetThisIsTheHiddenCharacter) {
  if (IBetThisIsTheHiddenCharacter === playerCharacterSelected) showWinnerPopup();  
  if (IBetThisIsTheHiddenCharacter !== playerCharacterSelected) showGameOverPopup(); 
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
      if (firstUserCharacterSelected === secondUserCharacterSelected) {
        showWinnerPopup();
      } else {
         updateSelectedCharacter();
      showGameStartFirstPopup();
      }
     
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
     
      if (isFirstUserPlaying) playerCharacterSelected = secondUserCharacterSelected;
      if (!isFirstUserPlaying) playerCharacterSelected = firstUserCharacterSelected;
   
      compareTheBetOnTheHiddenCharacter(playerCharacterSelected, IBetThisIsTheHiddenCharacter);
  }
}

function updateSelectedCharacter() {
  characterSelected = isFirstUserPlaying ? firstUserCharacterSelected : secondUserCharacterSelected;

  if (!characterSelected) {
    selectedCharacterImg.src = `public/images/girl.png`;
    selectedCharacterName.textContent = "¿...?";
  }

  if (characterSelected) { 
    const characterNameElement = document.querySelector(`.color-container.active.${characterSelected} h4.highlighted-name`);
    
    if (characterNameElement) selectedCharacterName.textContent = characterNameElement.textContent;    
    if (!characterNameElement) selectedCharacterName.textContent = characterSelected;
   
    selectedCharacterImg.src = `public/images/${characterSelected}.png`;
  }

  if (isFirstUserPlaying) { 
    yourSelectedCharacterContainer.classList.remove("colorOfBackgroundsOfSecondPlayer");
    yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfFirstPlayer");
  }

    if (!isFirstUserPlaying) { 
      yourSelectedCharacterContainer.classList.remove("colorOfBackgroundsOfFirstPlayer");
      yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfSecondPlayer");
    } 
  }

function eventClicForAllOfCcharacters(){
  if (isFirstUserPlaying) {
    CharactersForFirstUser.forEach((container) => {
      container.addEventListener("click", handleCharacterClick);
    });
  }

  if (!isFirstUserPlaying) {
    CharactersForSecondUser.forEach((container) => {
      container.addEventListener("click", handleCharacterClick);
    });
  }
}

function showAndHideMyCharacter() {
  const myCharacterShowButton = document.getElementById("my-character-selected-btn");
  const myCharacterSelectedContainer = document.getElementById("your-selected-character-container");

  myCharacterShowButton.addEventListener("click", () =>{
    if(myCharacterSelectedContainer.style.display === "flex") {
      myCharacterShowButton.style.animationDelay = ""; 
      myCharacterShowButton.style.animationPlayState = "reverse"; 

      setTimeout(() => {
        myCharacterSelectedContainer.style.display = "none";
    }, 100); 
    }
    myCharacterSelectedContainer.style.display = "flex";
  });
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

function showWelcomeOfFirstPlayerPopup() {
  document.addEventListener("DOMContentLoaded", () => {  
    showPopup("first-player-popup", "close-first-player-popup");
    showResultsOfTheOtherPlayer();
  });
}

function showWelcomeOfSecondPlayerPopup() {
  showPopup("second-player-popup", "close-second-player-popup");
  const secondPlayerWelcomePopup = document.getElementById("second-player-popup");
  const closeSecondPlayerPopupButton = document.getElementById("close-second-player-popup");
  
  closeSecondPlayerPopupButton.addEventListener("click", () => {
    showResultsOfTheOtherPlayer();
    showCharactersAccordingToPlayer();   
    eventClicForAllOfCcharacters();
    yourSelectedCharacterContainer.classList.remove("colorOfBackgroundsOfFirstPlayer");
    yourSelectedCharacterContainer.classList.add("colorOfBackgroundsOfSecondPlayer");
    selectedCharacterImg.src = '/public/images/girl.png';
    selectedCharacterName.textContent = '¿...?'; 
  });
}

function showGameOverPopup() {    
  showPopup("show-game-over-popup", "close-game-over-popup");  
  const gameOverPopup = document.getElementById("show-game-over-popup");
  const closeGameOverPopupButton = document.getElementById("close-game-over-popup");  
  closeGameOverPopupButton.addEventListener("click", () => {
    setTimeout(function() {
      location.reload();
    }, 500);
  });

  setTimeout(() => {
    gameOverPopup.style.display = "block";
  }, 1000);
}

function showWinnerPopup(){
  showPopup("show-winner-popup", "close-winner-popup");  
  const WinnerPopup = document.getElementById("show-winner-popup");
  const closeWinnerPopupButton = document.getElementById("close-winner-popup");

  closeWinnerPopupButton.addEventListener("click", () => {
    setTimeout(function() {
      location.reload();
    }, 500);
  });

  setTimeout(() => {
    WinnerPopup.style.display = "block";
  }, 1000);
}

function updateHiddenCharacter() {
  let hiddenCharacterImg = document.getElementById('user-hidden-character-image');
  let hiddenCharacterName = document.getElementById('hidden-character-name');

  if (isFirstUserPlaying) {
    characterNameElement = document.querySelector(`.color-container.active.${secondUserCharacterSelected} h4.highlighted-name`);

    if (characterNameElement) hiddenCharacterName.textContent = characterNameElement.textContent;    
    if (!characterNameElement) hiddenCharacterName.textContent = secondUserCharacterSelected;
    
    hiddenCharacterImg.src = `public/images/${secondUserCharacterSelected}.png`;
  } 

  if (!isFirstUserPlaying) {
    characterNameElement = document.querySelector(`.color-container.active.${firstUserCharacterSelected} h4.highlighted-name`);

    if (characterNameElement) hiddenCharacterName.textContent = characterNameElement.textContent; 
    if (!characterNameElement) hiddenCharacterName.textContent = firstUserCharacterSelected;
 
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

  if (isFirstUserPlaying) container.classList.remove("colorOfBackgroundsOfFirstPlayer");
  if (!isFirstUserPlaying) container.classList.remove("colorOfBackgroundsOfSecondPlayer");
}

function comparisonOfClassesToDiscardCharactersAccordingEachQuestion() {
  const questionButtons = document.querySelectorAll(".individual-question-btn");

  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
      const buttonFirstClass = button.classList[0];
      const otherPlayerHiddenCharacter = isFirstUserPlaying ? Array.from(secondUserClassesCharacterSelected) : Array.from(firstUserClassesCharacterSelected);       
      const targetCharactersList = isFirstUserPlaying ? Array.from(CharactersForFirstUser) : Array.from(CharactersForSecondUser);
      const otherCharactersList = isFirstUserPlaying ? Array.from(CharactersForSecondUser) : Array.from(CharactersForFirstUser);

      for (let i = 0; i < otherCharactersList.length; i++) {
        const characterInfo = otherCharactersList[i];
        const highlightedName = characterInfo.querySelector(".highlighted-name");
        
        if (highlightedName.textContent === otherPlayerHiddenCharacter) {
          showWinnerPopup();
        }      
      }

      targetCharactersList.forEach(characterInfo => {
          const characterClasses = Array.from(characterInfo.classList);

          if (otherPlayerHiddenCharacter.includes(buttonFirstClass)) {
            if (!characterClasses.includes(buttonFirstClass)) {
              changeToCharacterDiscard(characterInfo);
            }
          }

          if (!otherPlayerHiddenCharacter.includes(buttonFirstClass)) {
            if (characterClasses.includes(buttonFirstClass)) {
              changeToCharacterDiscard(characterInfo);
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
    showCharactersAccordingToPlayer();
    updateSelectedCharacter();
    updateHiddenCharacter();
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
  isFirstUserPlaying = !isFirstUserPlaying;
  showResultsOfTheOtherPlayer();
  showCharactersAccordingToPlayer();  
  updateSelectedCharacter();
  updateHiddenCharacter();
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
        rulesContainer.style.display = "none";       
    }
    isShown = !isShown;
  });
}

showWelcomeOfFirstPlayerPopup();
updateSelectedCharacter();
eventClicForAllOfCcharacters();
showAndHideQuestions();
showAndHideGameRules();
showAndHideMyCharacter();