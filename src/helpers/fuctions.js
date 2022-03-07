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
  }
}

//es gmail domain
export const isUTM = (email) => {
  const domain = email.split("@")[1];
  return domain === "utm.edu.ec";
};

export const llenarInfo = async (api, id) => {
  let libroActual = 1;
  const response_lib = await fetch(`${api}books`, {
    method: "GET",
    /* headers: {
      token: API_KEY,
    }, */
  });
  let bookinfo = await response_lib.json();
  let totalLibro = bookinfo.res.length / 4;
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
  return mergeBooks;
}

export const agregarLibro = async (api) => {
  const response_lib = await fetch(`${api}books/new`, {
    method: "GET",
    /* headers: {
      token: API_KEY,
    }, */
  });
  return response_lib.json();

}
export var numeroALetras = (function () {

  // Código basado en https://gist.github.com/alfchee/e563340276f89b22042a
  function Unidades(num) {

    switch (num) {
      case 1: return 'UN';
      case 2: return 'DOS';
      case 3: return 'TRES';
      case 4: return 'CUATRO';
      case 5: return 'CINCO';
      case 6: return 'SEIS';
      case 7: return 'SIETE';
      case 8: return 'OCHO';
      case 9: return 'NUEVE';
    }

    return '';
  }//Unidades()

  function Decenas(num) {

    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);

    switch (decena) {
      case 1:
        switch (unidad) {
          case 0: return 'DIEZ';
          case 1: return 'ONCE';
          case 2: return 'DOCE';
          case 3: return 'TRECE';
          case 4: return 'CATORCE';
          case 5: return 'QUINCE';
          default: return 'DIECI' + Unidades(unidad);
        }
      case 2:
        switch (unidad) {
          case 0: return 'VEINTE';
          default: return 'VEINTI' + Unidades(unidad);
        }
      case 3: return DecenasY('TREINTA', unidad);
      case 4: return DecenasY('CUARENTA', unidad);
      case 5: return DecenasY('CINCUENTA', unidad);
      case 6: return DecenasY('SESENTA', unidad);
      case 7: return DecenasY('SETENTA', unidad);
      case 8: return DecenasY('OCHENTA', unidad);
      case 9: return DecenasY('NOVENTA', unidad);
      case 0: return Unidades(unidad);
    }
  }//Unidades()

  function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
      return strSin + ' Y ' + Unidades(numUnidades)

    return strSin;
  }//DecenasY()

  function Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);

    switch (centenas) {
      case 1:
        if (decenas > 0)
          return 'CIENTO ' + Decenas(decenas);
        return 'CIEN';
      case 2: return 'DOSCIENTOS ' + Decenas(decenas);
      case 3: return 'TRESCIENTOS ' + Decenas(decenas);
      case 4: return 'CUATROCIENTOS ' + Decenas(decenas);
      case 5: return 'QUINIENTOS ' + Decenas(decenas);
      case 6: return 'SEISCIENTOS ' + Decenas(decenas);
      case 7: return 'SETECIENTOS ' + Decenas(decenas);
      case 8: return 'OCHOCIENTOS ' + Decenas(decenas);
      case 9: return 'NOVECIENTOS ' + Decenas(decenas);
    }

    return Decenas(decenas);
  }//Centenas()

  function Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let letras = '';

    if (cientos > 0)
      if (cientos > 1)
        letras = Centenas(cientos) + ' ' + strPlural;
      else
        letras = strSingular;

    if (resto > 0)
      letras += '';

    return letras;
  }//Seccion()

  function Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMiles = Seccion(num, divisor, 'UN MIL', 'MIL');
    let strCentenas = Centenas(resto);

    if (strMiles == '')
      return strCentenas;

    return strMiles + ' ' + strCentenas;
  }//Miles()

  function Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)

    let strMillones = Seccion(num, divisor, 'UN MILLON DE', 'MILLONES DE');
    let strMiles = Miles(resto);

    if (strMillones == '')
      return strMiles;

    return strMillones + ' ' + strMiles;
  }//Millones()

  return function NumeroALetras(num, currency) {
    currency = currency || {};
    let data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
      letrasCentavos: '',
      /* letrasMonedaPlural: currency.plural || 'PESOS CHILENOS',//'PESOS', 'Dólares', 'Bolívares', 'etcs'
       letrasMonedaSingular: currency.singular || 'PESO CHILENO', //'PESO', 'Dólar', 'Bolivar', 'etc'
       letrasMonedaCentavoPlural: currency.centPlural || 'CHIQUI PESOS CHILENOS',
       letrasMonedaCentavoSingular: currency.centSingular || 'CHIQUI PESO CHILENO' */
    };

    if (data.centavos > 0) {
      data.letrasCentavos = 'CON ' + (function () {
        if (data.centavos == 1)
          return Millones(data.centavos);
        else
          return Millones(data.centavos);
      })();
    };

    if (data.enteros == 0)
      return 'CERO';
    if (data.enteros == 1)
      return Millones(data.enteros);
    else
      return Millones(data.enteros);
  };

})();