import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  interval;
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
          handler: () => {
            this.jogadorDaVez = this.valorComputador;
            console.log(this.jogadorDaVez);
          }
        },
        {
          text: 'Eu',
          handler: () => {
            this.jogadorDaVez = this.valorJogador;
            console.log(this.jogadorDaVez);
          }
        }
      ]
    });
    confirm.present();

    this.interval = setInterval(() => {
      this.minMax();
    }, 1000);
  }

  click(i, j) {
    if(this.jogadorDaVez == this.valorJogador) {
      this.tabuleiro[i][j] = this.valorJogador;
      this.jogadorDaVez = this.valorComputador;
    }
  }

  minMax() {
    if(this.jogadorDaVez == this.valorComputador){
      console.log(this.podeGanhar());
      this.jogadorDaVez = this.valorJogador;
    }
  }

  podeGanhar(){
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

    // Verificar

    if(somaDiagonalPrincipal == 2)
      for(let i=0; i < this.tabuleiro.length; i++){
        for(let j=0; j < this.tabuleiro[i].length; j++) {
          if(i == j && this.tabuleiro[i][j] == 0) return [i, j];
        }
      }

    if(somaDiagonalSecundaria == 2)
      for(let i=0; i < this.tabuleiro.length; i++){
        for(let j=0; j < this.tabuleiro[i].length; j++) {
          if(i+j == 2 && this.tabuleiro[i][j] == 0) return [i, j];
        }
      }

    for(let linha=0; linha < somaLinhas.length; linha++)
      if(somaLinhas[linha] == 2)
        for(let i=0; i < this.tabuleiro.length; i++){
          for(let j=0; j < this.tabuleiro[i].length; j++) {
            if(i == linha && this.tabuleiro[i][j] == 0) return [i, j];
          }
        }

    for(let coluna=0; coluna < somaColunas.length; coluna++)
      if(somaColunas[coluna] == 2)
        for(let i=0; i < this.tabuleiro.length; i++){
          for(let j=0; j < this.tabuleiro[i].length; j++) {
            if(j == coluna && this.tabuleiro[i][j] == 0) return [i, j];
          }
        }
  }
}
