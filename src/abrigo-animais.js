class AbrigoAnimais {

  constructor() {
    this.animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
  }

  podeAdotar(brinquedosPessoa, animalParaAdotar, ordemAnimais) {
    const brinquedosFav = animalParaAdotar.brinquedos;

  if (animalParaAdotar.tipo === 'jabuti') {
    // A lista de animais para adoção tem mais de um item?
    const temCompanhia = ordemAnimais.length > 1;
    // A pessoa tem os brinquedos do Loco?
    const temBrinquedos = brinquedosPessoa.includes('SKATE') && brinquedosPessoa.includes('RATO');
    // A pessoa só pode adotar o Loco se TIVER companhia E os brinquedos
    return temCompanhia && temBrinquedos;
  }

    let ponteiroBrinquedoAnimal = 0;
    for (const brinquedoPessoa of brinquedosPessoa) {
      if (ponteiroBrinquedoAnimal < brinquedosFav.length && brinquedoPessoa === brinquedosFav[ponteiroBrinquedoAnimal]) {
        ponteiroBrinquedoAnimal++;
      }
    }

    return ponteiroBrinquedoAnimal === brinquedosFav.length;
  }

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisParaAdotar = ordemAnimais.split(',');
    const animaisUnicos = new Set();
    for (const nomeAnimal of animaisParaAdotar) {
      if (!this.animais[nomeAnimal] || animaisUnicos.has(nomeAnimal)) {
        return { erro: 'Animal inválido' };
      }
      animaisUnicos.add(nomeAnimal);
    }

    const brinquedosP1 = brinquedosPessoa1.split(',');
    const brinquedosP2 = brinquedosPessoa2.split(',');

    if (new Set(brinquedosP1).size !== brinquedosP1.length || new Set(brinquedosP2).size !== brinquedosP2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;
    const listaResultados = [];

    for (const nomeAnimal of animaisParaAdotar) {
      const animalAtual = this.animais[nomeAnimal];
      let podeP1 = false;
      let podeP2 = false;

      if (adocoesPessoa1 < 3) {
        podeP1 = this.podeAdotar(brinquedosP1, animalAtual, animaisParaAdotar);
      }
      if (adocoesPessoa2 < 3) {
        podeP2 = this.podeAdotar(brinquedosP2, animalAtual, animaisParaAdotar);
      }

      if (podeP1 && podeP2) {
        listaResultados.push(`${nomeAnimal} - abrigo`);
      } else if (podeP1) {
        listaResultados.push(`${nomeAnimal} - pessoa 1`);
        adocoesPessoa1++;
      } else if (podeP2) {
        listaResultados.push(`${nomeAnimal} - pessoa 2`);
        adocoesPessoa2++;
      } else {
        listaResultados.push(`${nomeAnimal} - abrigo`);
      }
    }

    listaResultados.sort();
    
    return { lista: listaResultados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };