const PuntosExperienciaONotaMedia = (notaMedia, mesesProf, tipoNotaOMeses, creditos, notaMediaExp) => {
  let puntos;
  if (tipoNotaOMeses === "notaMed") {
    puntos = calcularPuntosNotaMediaAsignaturas(notaMedia);
  } else {
    puntos = calcularPuntosExperiencia(mesesProf);
  }
  const totalPuntos = calcularPuntos(creditos, puntos, notaMediaExp);
  return totalPuntos;
};

export default PuntosExperienciaONotaMedia;

function calcularPuntos(creditos, puntosExperienciaONotaMedia, notamedia) {
  const puntosCreditos = calcularPuntosCreditos(creditos);
  const puntosNotamedia = calcularPuntosNotamedia(notamedia);

  return puntosCreditos + puntosExperienciaONotaMedia + puntosNotamedia;
}

function calcularPuntosCreditos(creditos) {
  if (creditos >= 1 && creditos <= 18) {
    return 4;
  } else if (creditos >= 18 && creditos <= 30) {
    return 3;
  } else if (creditos >= 31 && creditos <= 45) {
    return 2;
  } else if (creditos >= 46 && creditos <= 60) {
    return 1;
  } else {
    return 0;
  }
}

function calcularPuntosExperiencia(experiencia) {
  if (experiencia > 24) {
    return 4;
  } else if (experiencia >= 18 && experiencia <= 24) {
    return 3;
  } else if (experiencia >= 12 && experiencia <= 18) {
    return 2;
  } else if (experiencia >= 6 && experiencia < 12) {
    return 1;
  } else {
    return 0;
  }
}

function calcularPuntosNotamedia(notamedia) {
  let notaMediaString;

  if (notamedia >= 9) {
    notaMediaString = "sobresaliente";
  } else if (notamedia >= 7 && notamedia <= 8.9) {
    notaMediaString = "notable";
  } else if (notamedia >= 5 && notamedia <= 6.9) {
    notaMediaString = "aprobado";
  } else {
    notaMediaString = "suspenso";
  }

  switch (notaMediaString) {
    case "sobresaliente":
      return 2;
    case "notable":
      return 1;
    default:
      return 0;
  }
}

function calcularPuntosNotaMediaAsignaturas(notamediaasign) {
  if (notamediaasign >= 9) {
    return 4;
  } else if (notamediaasign >= 8 && notamediaasign <= 8.9) {
    return 3;
  } else if (notamediaasign >= 7 && notamediaasign <= 7.9) {
    return 2;
  } else if (notamediaasign >= 5 && notamediaasign <= 6.9) {
    return 1;
  } else {
    return 0;
  }
}
