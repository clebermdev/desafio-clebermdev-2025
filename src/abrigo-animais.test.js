import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
});

describe('Cenários Adicionais', () => {

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'LASER,CAIXA', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado na lista de uma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,RATO', 'LASER,CAIXA', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Ambas as pessoas podem adotar e o animal fica no abrigo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,LASER,BOLA', 'Zero');
    expect(resultado.lista[0]).toBe('Zero - abrigo');
    expect(resultado.lista.length).toBe(1);
  });

  test('Uma pessoa atinge o limite de 3 animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,LASER,BOLA', 'CAIXA,NOVELO,LASER,RATO,BOLA', 'Fofo,Bebe,Rex,Mimi,Zero');
    expect(resultado.lista[0]).toBe('Bebe - pessoa 2'); // 1ª adoção p2
    expect(resultado.lista[1]).toBe('Fofo - pessoa 1'); // 1ª adoção p1
    expect(resultado.lista[2]).toBe('Mimi - pessoa 1'); // 2ª adoção p1
    expect(resultado.lista[3]).toBe('Rex - pessoa 1'); // 3ª adoção p1
    expect(resultado.lista[4]).toBe('Zero - abrigo'); // p1 já atingiu o limite, p2 não atende a ordem
    expect(resultado.lista.length).toBe(5);
  });
  
  test('Loco só pode ser adotado com outro animal na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,SKATE', 'Loco,Rex');
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.lista[1]).toBe('Rex - abrigo');
    expect(resultado.lista.length).toBe(2);
  });

  test('Loco não pode ser adotado se for o único animal na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'RATO,SKATE', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - abrigo');
    expect(resultado.lista.length).toBe(1);
  });

});