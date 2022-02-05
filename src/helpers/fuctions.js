//is valid email
const isValidEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

//es gmail domain
const isUTM = (email) => {
  const domain = email.split("@")[1];
  return domain === "utm.edu.ec";
};

const llenarInfo = async (api, id) => {
  let libroActual = 1;
  let totalLibro = 2;
  const response = await fetch(`${api}user_progress/${id}`, {
    method: "POST",
    /* headers: {
      token: API_KEY,
    }, */
  });
  let userInfo = await response.json();
  if (
    userInfo.name === "JsonWebTokenError" ||
    userInfo.name === "TokenExpiredError"
  ) {
    window.location.href = "./";
  }

  for (let i = 0; i < userInfo.length - 1; i++) {
    for (let j = 0; j < userInfo.length - i - 1; j++) {
      if (
        parseInt(
          "" + userInfo[j].book_info.module + userInfo[j].book_info.unit
        ) >
        parseInt(
          "" +
          userInfo[j + 1].book_info.module +
          userInfo[j + 1].book_info.unit
        )
      ) {
        let aux = userInfo[j];
        userInfo[j] = userInfo[j + 1];
        userInfo[j + 1] = aux;
      }
    }
  }

  let mergeBooks = { libros: [] };
  while (libroActual <= totalLibro) {
    let librox = userInfo.filter(
      (book) => book.book_info.book === libroActual
    );
    let contador = 1;
    //total de modulos
    let startedmodulo = librox[0].book_info.module;
    let contador2 = startedmodulo;
    let modulos = [];
    let progresototal = 0;
    let totalprogress = 0;
    while (contador <= 2) {
      let modulo = librox.filter(
        (book) => book.book_info.module === contador2
      );
      contador2++;
      contador++;
      modulos.push(modulo);
    }
    mergeBooks.libros.push(modulos);
    libroActual++;
  }

  let contadormodulos = 0;
  mergeBooks.libros.forEach((libro, index) => {
    let totaluserprogress = 0;
    let totaltask = 0;
    let totalmoduleprogress = 0;
    libro.forEach((modulo) => {
      modulo.forEach((unit) => {
        totaluserprogress =
          totaluserprogress +
          (unit.grammar.user_progress +
            unit.reading.user_progress +
            unit.vocabulary.user_progress +
            unit.writing.user_progress);
        totaltask =
          totaltask +
          (unit.grammar.total_task +
            unit.reading.total_task +
            unit.vocabulary.total_task +
            unit.writing.total_task);
      });
    });
    mergeBooks.libros[index] = {
      userprogress: totaluserprogress,
      totaltask: totaltask,
      modulos: mergeBooks.libros[index],
    };
  });
  /* mergeBooks */
  return await mergeBooks;
}
module.exports = this; 
