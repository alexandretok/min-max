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

  minMax(){
    if(this.jogadorDaVez == this.valorComputador){
      this.tabuleiro[0][0] = this.valorComputador;
      this.jogadorDaVez = this.valorJogador;
    }
  }
}
