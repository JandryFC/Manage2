//is valid email
export const isValidEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
export const transformTypeQuestion = (type) => {
  switch (type) {
    case "true_false":
      return "Verdadero o falso"
    case "ordenar":
      return "Ordenar";
    case "opcion_correcta_1":
      return "Opción correcta ";
    case "completar_texto":
      return "Completar texto";
    case "emparejar":
      return "Emparejar";
    case "opcion_correcta_n":
      return "Opción correcta multiple";
    case "emparejar_img":
      return "Emparejar con imágenes";
    default:
    break 
  }
}

//es gmail domain
export const isUTM = (email) => {
  const domain = email.split("@")[1];
  return domain === "utm.edu.ec";
};

export const nFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}
export const llenarInfo = async (api, id) => {
  let libroActual = 1;
  const response_lib = await fetch(`${api}books`, {
    method: "GET",
    headers: {
      token: process.env.REACT_APP_SECRET_TOKEN,
    },
  });
  let bookinfo = await response_lib.json();
  let totalLibro = bookinfo.res.length / 4;
  const response = await fetch(`${api}user_progress/${id}`, {
    method: "POST",
    headers: {
      token: process.env.REACT_APP_SECRET_TOKEN,
    },
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

  mergeBooks.libros.forEach((libro, index) => {
    let totaluserprogress = 0;
    let totaltask = 0;
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
  return mergeBooks;
}

export const agregarLibro = async (api) => {
  const response_lib = await fetch(`${api}books/new`, {
    method: "GET",
    headers: {
      token: process.env.REACT_APP_SECRET_TOKEN,
    },
  });
  return response_lib.json();

}
