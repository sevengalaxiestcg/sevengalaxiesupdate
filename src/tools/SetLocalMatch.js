function SetLocalMatch(match, restart) {
  const initialMatch = {
    rodada: { _id: 1, nivel: 1, energia: 1 },
    nivelMovel: 1,
    nivelConquista: 1,
    energiaMovel: 1,
    energiaConquista: 1,
    escolher: false,
    fortaleza: 30,
    compras:
      [
        { marco: 20, checked: false, on: false },
        { marco: 10, checked: false, on: false },
        { marco: 5, checked: false, on: false }
      ]
  }

  let localMatch = JSON.parse(sessionStorage.getItem("sevengalaxies@match"));

  if (!localMatch || restart) {
    localMatch = initialMatch;
  }
  if (Object.keys(match).length > 0 && !restart) {
    localMatch = match;
  }

  sessionStorage.setItem("sevengalaxies@match", JSON.stringify(localMatch));

  return ("");

}

export default SetLocalMatch;