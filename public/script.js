const allOfcontainersOfCharacters = document.querySelectorAll("#characters .color-container");
let firstPlayerAllOfcontainersOfCharacters, secondPlayerAllOfcontainersOfCharacters, firstUserCharacterSelected, secondUserCharacterSelected, IBetThisIsTheHiddenCharacter;
const questionsBtn = document.getElementById("questions-btn");
const selectedCharacterName = document.getElementById('selected-character-name');
let isFirstUserPlaying = true;
isGameOver=false;
let numberOfCharactersSelected = 0; 
MAXIM_OF_CHARACTERS_SELECTEDS = 2;

function assignStartingCharactersToEachUser(){
  firstPlayerAllOfcontainersOfCharacters = allOfcontainersOfCharacters;
  secondPlayerAllOfcontainersOfCharacters = allOfcontainersOfCharacters;
  console.log(`assignStartingCharactersToEachUser() - Contenido de firstPlayerAllOfcontainersOfCharacters: ${firstPlayerAllOfcontainersOfCharacters}`);
}
assignStartingCharactersToEachUser();

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
      firstUserCharacterSelected = allOfClassesOfCharacter[2];
      updateSelectedCharacter();
      showWelcomeOfSecondPlayerPopup();
    } 
    if (!isFirstUserPlaying)  {
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

/*NO ACTUALIZA BIEN: Después de mostrar los descartes del primer jugador, al cambiar al segundo, que deberían 
salir todos de colores porque todavía no ha preguntado ni se han descartado ninguno, los que se habian descartado en el primer jugador ahora
también tienen la clase "character-discarded" en la lista de clases del segundo jugador. En la función que se aplican los descartes: changeToCharacterDiscard(container) solo debería 
aplicar los cambios a "container" que se define cuando se llama  changeToCharacterDiscard(characterInfo) correspondiente a según qué jugador está activo.
Además, en esta función quita el background del jugador, que en este caso es el del primer jugador, para este parece que funciona bien, se guarda la clase, se quita active
cambia el background y la imagen se hace gris. Pero el segundo, tiene la clase character-discarded pero mantiene su backgroundOfSecondPlayer
y tambien mantiene clase active, por eso se ven con su color azul y no rojo. Al mirar en el inspector del navegador
 he podido ver las clases que tienen y lo raro que es.*/
function updateCharactersClassesForEachPlayer(classesOfCurrentPlayer) {
  const allOfCharactersOfScreen = document.querySelectorAll("#character .color-container");

  allOfCharactersOfScreen.forEach((elementOfScreen, index) => {
    const classesOfCurrentContainer = [...classesOfCurrentPlayer[index].classList];
    elementOfScreen.classList = [];

    classesOfCurrentContainer.forEach((classToAdd) => {
      elementOfScreen.classList.add(classToAdd);
    });

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
  } 
  if (!isFirstUserPlaying) {
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

function changeToCharacterDiscard(container) {
  container.classList.remove("active");
  container.classList.remove("colorOfBackgroundsOfFirstPlayer");
  container.classList.add("character-discarded");
  const characterImage = container.querySelector(".character");
  characterImage.classList.add('grey-image');
}

/* AQUÍ creo que estan los dos problemas: todas las listas son iguales, del primer jugador si esta activo
y del segundo si es el activo y se van acumulando las clases descartadas.
OTRO PROBLEMA: solo compara con la característica del botón pero no con el personaje oculto */
function comparisonOfClassesToDiscardCharactersAccordingEachQuestion() {
  const questionButtons = document.querySelectorAll(".individual-question-btn");

  questionButtons.forEach(button => {
    button.addEventListener("click", () => {
    const buttonFirstClass = button.classList[0];
    const otherPlayerHiddenCharacter = isFirstUserPlaying ? secondUserCharacterSelected : firstUserCharacterSelected;       
    const targetCharactersList = isFirstUserPlaying ? Array.from(firstPlayerAllOfcontainersOfCharacters) : Array.from(secondPlayerAllOfcontainersOfCharacters);
    const otherCharactersList = isFirstUserPlaying ? Array.from(secondPlayerAllOfcontainersOfCharacters) : Array.from(firstPlayerAllOfcontainersOfCharacters);
    const otherPlayerSelectedCharacterClasses = [];

/* En estos console.error se ve que todas las listas son iguales, del primer jugador si esta activo
o del segundo si es el activo, y se van acumulando los personajes descartados. 
Para ver si la lista es del primero o del segundo, se distinguen por la última clase 
que es colorOfBackgroundOfFirstPlayer o colorOfBackgroundOfSecondPlayer*/       
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

        if (otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)) {
          if (!characterClasses.includes(buttonFirstClass)) {
            changeToCharacterDiscard(characterInfo);

  /* Estos son los únicos console.log que muestra de los dos if. No pasa de aquí por lo que parece, 
  no tiene en cuenta el personaje elegido, si eliges con gafas quita todos los de gafas y  siempre muestra 
  este mensaje */ 
            console.log(`El botón con clase "${buttonFirstClass}" no coincide con el personaje "${characterName}" pero sí con el personaje oculto`);

  // Aquí si que ha cambiado bien las clases de los personajes descartados    
            console.log(characterInfo);          
          }
        }

  // Por aquí nunca pasa, no hay console.log
        if (!otherPlayerSelectedCharacterClasses.includes(buttonFirstClass)) {
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
    comparisonOfClassesToDiscardCharactersAccordingEachQuestion();
    questionsBtn.style.display = "block"; 
  });
  
  updateHiddenCharacter();
  handleSolutionButton(); 
}

/* Aquí deberían actualizarse los personajes con la lista de cada participante, puede que el fallo esté aquí, pero no
consigo ver el contenido de los vectores en los console.log porque salen como [object NodeList]*/
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


