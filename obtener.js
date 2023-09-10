function getClasesOfCharacters() {
    // Selecciona el div con el id "characters"
    var charactersDiv = document.getElementById('characters');
  
    // Obtiene todos los elementos con la clase "color-container" dentro de #characters
    var colorContainers = charactersDiv.getElementsByClassName('color-container');
  
    // Inicializa un array para almacenar las clases de cada color-container
    var allOfCharactersOfFirstUser = [];
  
    // Recorre todos los color-containers y obtén sus clases
    for (var i = 0; i < colorContainers.length; i++) {
      var colorContainer = colorContainers[i];
  
      // Obtén las clases del elemento y sepáralas en un array
      var clasesElemento = colorContainer.className.split(' ');
  
      // Agrega las clases del color-container actual al array de clases
      allOfCharactersOfFirstUser = clases.concat(clasesElemento);
    }
    console.log(allOfCharactersOfFirstUser);
    // Elimina duplicados si es necesario
    /* clases = [...new Set(clases)]; */
  
    return allOfCharactersOfFirstUser;
  }
  
  // Llama a la función para obtener las clases
 /*  var clasesObtenidas = obtenerClasesDeColorContainers(); */
  
  // Ahora, clasesObtenidas contiene todas las clases únicas de los color-containers
 /*  console.log(clasesObtenidas); */
  