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

  // Método auxiliar para verificar se uma pessoa pode adotar um animal,
  // com base nas regras de brinquedos.
  podeAdotar(brinquedosPessoa, animalParaAdotar, animaisNaLista) {
    const brinquedosFav = animalParaAdotar.brinquedos;

    // Lógica para o jabuti Loco (Regra 6)
    if (animalParaAdotar.tipo === 'jabuti' && animaisNaLista.length > 1) {
      const temSkate = brinquedosPessoa.includes('SKATE');
      const temRato = brinquedosPessoa.includes('RATO');
      return temSkate && temRato;
    }

    // Lógica para gatos (Regra 3)
    if (animalParaAdotar.tipo === 'gato') {
      for (const brinquedo of brinquedosPessoa) {
        if (!brinquedosFav.includes(brinquedo)) {
          return false;
        }
      }
    }

    // Lógica para todos os animais, incluindo gatos, para a ordem dos brinquedos
    let ponteiroBrinquedoAnimal = 0;
    for (const brinquedoPessoa of brinquedosPessoa) {
      if (ponteiroBrinquedoAnimal < brinquedosFav.length && brinquedoPessoa === brinquedosFav[ponteiroBrinquedoAnimal]) {
        ponteiroBrinquedoAnimal++;
      }
    }

    return ponteiroBrinquedoAnimal === brinquedosFav.length;
  }

  // Método principal do desafio
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Passo 2: Validação das entradas
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

    // Passo 4: Loop e determinação do destino de cada animal
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

    // Passo 5: Finalizar o retorno
    listaResultados.sort();
    return { lista: listaResultados };
  }
}

export { AbrigoAnimais as AbrigoAnimais };