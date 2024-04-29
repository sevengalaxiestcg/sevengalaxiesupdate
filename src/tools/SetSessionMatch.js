function SetSessionMatch(rodada, fortaleza, restart) {
  const initialRodada = {
    rodada: { _id: 1, nivel: 1, energia: 1 },
    nivelMovel: 1,
    nivelConquista: 1,
    energiaMovel: 1,
    energiaConquista: 1,
    escolher: false,
  }
  const initialFortaleza = {
    fortaleza: 30,
    compras:
      [
        { marco: 20, checked: false, on: false },
        { marco: 10, checked: false, on: false },
        { marco: 5, checked: false, on: false }
      ]
  }

  let sessionRodada = JSON.parse(sessionStorage.getItem("sevengalaxies@rodada"));
  let sessionFortaleza = JSON.parse(sessionStorage.getItem("sevengalaxies@fortaleza"));
  
  if (restart) {
    sessionRodada = initialRodada;
    sessionFortaleza = initialFortaleza;
  } else {
    if (!sessionRodada) {
      sessionRodada = initialRodada;
    }
    if (!sessionFortaleza) {
      sessionFortaleza = initialFortaleza;
    }

    if (Object.keys(rodada).length > 0) {
      sessionRodada = rodada;
    }

    if (Object.keys(fortaleza).length > 0) {
      sessionFortaleza = fortaleza;
    }
  }
  sessionStorage.setItem("sevengalaxies@rodada", JSON.stringify(sessionRodada));
  sessionStorage.setItem("sevengalaxies@fortaleza", JSON.stringify(sessionFortaleza));

  // return ("");

}

export default SetSessionMatch;