import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  NIVEL = {FACIL:1, DIFICIL: 2};
  nivelDificuldade = this.NIVEL.DIFICIL;
  valorJogador = 1;
  valorComputador = -1;
  jogadorDaVez = 0;
  tabuleiro = [[0,0,0],[0,0,0],[0,0,0]];

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
    // Escolher quem inicia
    let confirm = this.alertCtrl.create({
      title: 'Quem vai iniciar?',
      message: 'Escolha abaixo quem irá ter a primeira jogada?',
      buttons: [
        {
          text: 'O computador',
          handler: data => {
            this.nivelDificuldade = +data;
            let jogada = this.minMax();
            if(jogada)
              this.tabuleiro[jogada.i][jogada.j] = this.valorComputador;
            this.jogadorDaVez = this.valorJogador;
          }
        },
        {
          text: 'Eu',
          handler: data => {
            this.nivelDificuldade = +data;
            this.jogadorDaVez = this.valorJogador;
          }
        }
      ]
    });
    confirm.addInput({
      type: 'radio',
      label: 'Fácil',
      value: this.NIVEL.FACIL + "",
      checked: true
    });
    confirm.addInput({
      type: 'radio',
      label: 'Difícil',
      value: this.NIVEL.DIFICIL + ""
    });
    confirm.present();
  }

  click(i, j) {
    if(this.jogadorDaVez != this.valorJogador) return;
    if(this.tabuleiro[i][j] != 0) return;

    // Marca no tabuleiro
    this.tabuleiro[i][j] = this.valorJogador;

    // Alterna a jogada
    this.jogadorDaVez = this.valorComputador;

    // Verifica se o jogo acabou
    if(this.jogoFinalizado()) {
      console.log("Jogo finalizado!!!");
      return;
    }

    let executarMinMax = true;
    if(this.nivelDificuldade == this.NIVEL.DIFICIL) {
      // Verifica se o computador pode ganhar e faz a jogada vencedora
      let coordenadasVencedoras = this.podeGanhar(this.valorComputador);
      if (coordenadasVencedoras) {
        this.tabuleiro[coordenadasVencedoras[0]][coordenadasVencedoras[1]] = this.valorComputador;
        executarMinMax = false;
      } else {
        // Verifica se o jogador pode ganhar e faz a jogada para impedir
        coordenadasVencedoras = this.podeGanhar(this.valorJogador);
        if (coordenadasVencedoras) {
          this.tabuleiro[coordenadasVencedoras[0]][coordenadasVencedoras[1]] = this.valorComputador;
          executarMinMax = false;
        }
      }
    }

    // Faz jogada do computador
    if(executarMinMax) {
      let jogada = this.minMax();
      if(jogada)
        this.tabuleiro[jogada.i][jogada.j] = this.valorComputador;
    }

    if(this.jogoFinalizado()) {
      console.log("Jogo finalizado!!!");
      return;
    }

    this.jogadorDaVez = this.valorJogador;
  }

  minMax(tabuleiro?) {
    let jogadas = [];
    let _tabuleiro;
    if(!tabuleiro) tabuleiro = this.tabuleiro;

    // Cria cópias do tabuleiro
    tabuleiro = JSON.parse(JSON.stringify(tabuleiro));
    _tabuleiro = JSON.parse(JSON.stringify(tabuleiro));

    for(let i = 0; i < tabuleiro.length; i++)
      for(let j = 0; j < tabuleiro[i].length; j++){
        if(tabuleiro[i][j] == 0){
          // Reseta tabuleiro
          _tabuleiro = JSON.parse(JSON.stringify(tabuleiro));
          // Preenche espaço com o valor do computador
          _tabuleiro[i][j] = this.valorComputador;

          // Preenche os outros vazios com o valor do jogador
          for(let _i = 0; _i < _tabuleiro.length; _i++)
            for(let _j = 0; _j < _tabuleiro[i].length; _j++){
              if(_tabuleiro[_i][_j] == 0)
                _tabuleiro[_i][_j] = this.valorJogador;
            }

          let jogada = {i: i, j: j, possibilidadesPerder: this.quantidadeJogadasVencedoras(this.valorJogador, _tabuleiro)};

          jogadas.push(jogada);
        }
      }

    let minPossibilidadesPerder = 999;
    let jogadaSelecionada;
    jogadas.forEach(jogada => {
      if(jogada.possibilidadesPerder < minPossibilidadesPerder){
        jogadaSelecionada = jogada;
        minPossibilidadesPerder = jogada.possibilidadesPerder;
      }
    });

    return jogadaSelecionada;
  }

  quantidadeJogadasVencedoras(valor, tabuleiro){
    let qtd = 0;
    let somaLinhas = new Array(tabuleiro.length+1).join('0').split('').map(parseFloat);
    let somaColunas = new Array(tabuleiro[0].length+1).join('0').split('').map(parseFloat);
    let somaDiagonalPrincipal = 0;
    let somaDiagonalSecundaria = 0;

    // Calcular
    for(let i=0; i < tabuleiro.length; i++)
      for(let j=0; j < tabuleiro[i].length; j++) {
        somaLinhas[i] += tabuleiro[i][j];
        somaColunas[j] += tabuleiro[i][j];
        if(i == j) somaDiagonalPrincipal += tabuleiro[i][j];
        if(i+j == 2) somaDiagonalSecundaria += tabuleiro[i][j];
      }

    // Verifica quantas possibilidades de vitória há
    if(somaDiagonalPrincipal == valor * 3) qtd++;

    if(somaDiagonalSecundaria == valor * 3) qtd++;

    for(let linha = 0; linha < somaLinhas.length; linha++)
      if(somaLinhas[linha] == valor * 3) qtd++;

    for(let coluna=0; coluna < somaColunas.length; coluna++)
      if(somaColunas[coluna] == valor * 3) qtd++;

    return qtd;
  }

  /**
   * Verifica se o jogo acabou e retorna o vencedor
   * Caso não haja vencedor, retorna false
   */
  jogoFinalizado(){
    let somaLinhas = new Array(this.tabuleiro.length+1).join('0').split('').map(parseFloat);
    let somaColunas = new Array(this.tabuleiro[0].length+1).join('0').split('').map(parseFloat);
    let somaDiagonalPrincipal = 0;
    let somaDiagonalSecundaria = 0;

    // Calcular
    for(let i=0; i < this.tabuleiro.length; i++){
      for(let j=0; j < this.tabuleiro[i].length; j++) {
        somaLinhas[i] += this.tabuleiro[i][j];
        somaColunas[j] += this.tabuleiro[i][j];
        if(i == j) somaDiagonalPrincipal += this.tabuleiro[i][j];
        if(i+j == 2) somaDiagonalSecundaria += this.tabuleiro[i][j];
      }
    }

    if(somaColunas.indexOf(this.valorJogador * 3) > -1 || somaLinhas.indexOf(this.valorJogador * 3) > -1 ||
      somaDiagonalSecundaria == this.valorJogador * 3 || somaDiagonalPrincipal == this.valorJogador * 3)
      return this.valorJogador;

    if(somaColunas.indexOf(this.valorComputador * 3) > -1 || somaLinhas.indexOf(this.valorComputador * 3) > -1 ||
      somaDiagonalSecundaria == this.valorComputador * 3 || somaDiagonalPrincipal == this.valorComputador * 3)
      return this.valorComputador;

    return false;
  }

  podeGanhar(valor) {
    let somaLinhas = new Array(this.tabuleiro.length+1).join('0').split('').map(parseFloat);
    let somaColunas = new Array(this.tabuleiro[0].length+1).join('0').split('').map(parseFloat);
    let somaDiagonalPrincipal = 0;
    let somaDiagonalSecundaria = 0;

    // Calcular
    for(let i=0; i < this.tabuleiro.length; i++)
      for(let j=0; j < this.tabuleiro[i].length; j++) {
        somaLinhas[i] += this.tabuleiro[i][j];
        somaColunas[j] += this.tabuleiro[i][j];
        if(i == j) somaDiagonalPrincipal += this.tabuleiro[i][j];
        if(i+j == 2) somaDiagonalSecundaria += this.tabuleiro[i][j];
      }

    // Se é possível ganhar, retorna as coordenadas da jogada vencedora
    if(somaDiagonalPrincipal == valor * 2)
      for(let i=0; i < this.tabuleiro.length; i++)
        for(let j=0; j < this.tabuleiro[i].length; j++)
          if(i == j && this.tabuleiro[i][j] == 0) return [i, j];

    if(somaDiagonalSecundaria == valor * 2)
      for(let i=0; i < this.tabuleiro.length; i++)
        for(let j=0; j < this.tabuleiro[i].length; j++)
          if(i+j == 2 && this.tabuleiro[i][j] == 0) return [i, j];

    for(let linha=0; linha < somaLinhas.length; linha++)
      if(somaLinhas[linha] == valor * 2)
        for(let i=0; i < this.tabuleiro.length; i++)
          for(let j=0; j < this.tabuleiro[i].length; j++)
            if(i == linha && this.tabuleiro[i][j] == 0) return [i, j];

    for(let coluna=0; coluna < somaColunas.length; coluna++)
      if(somaColunas[coluna] == valor * 2)
        for(let i=0; i < this.tabuleiro.length; i++)
          for(let j=0; j < this.tabuleiro[i].length; j++)
            if(j == coluna && this.tabuleiro[i][j] == 0) return [i, j];

    return false;
  }
}