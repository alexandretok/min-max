webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 149;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.NIVEL = { FACIL: 1, DIFICIL: 2 };
        this.nivelDificuldade = this.NIVEL.DIFICIL;
        this.valorJogador = 1;
        this.valorComputador = -1;
        this.jogadorDaVez = 0;
        this.tabuleiro = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        // Escolher quem inicia
        var confirm = this.alertCtrl.create({
            title: 'Quem vai iniciar?',
            message: 'Escolha abaixo quem irá ter a primeira jogada?',
            buttons: [
                {
                    text: 'O computador',
                    handler: function (data) {
                        _this.nivelDificuldade = +data;
                        var jogada = _this.minMax();
                        if (jogada)
                            _this.tabuleiro[jogada.i][jogada.j] = _this.valorComputador;
                        _this.jogadorDaVez = _this.valorJogador;
                    }
                },
                {
                    text: 'Eu',
                    handler: function (data) {
                        _this.nivelDificuldade = +data;
                        _this.jogadorDaVez = _this.valorJogador;
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
    HomePage.prototype.finalizar = function () {
        var vencedor = this.jogoFinalizado();
        var msg;
        if (vencedor === this.valorComputador)
            msg = 'O computador venceu!';
        if (vencedor === this.valorJogador)
            msg = 'Você venceu! Parabéns!';
        if (vencedor === true)
            msg = 'Empate!';
        var alert = this.alertCtrl.create({
            title: 'Jogo finalizado!',
            subTitle: msg,
            buttons: [{
                    text: 'OK',
                    handler: function () {
                        // Atualiza a página
                        window.document.location = '.';
                    }
                }]
        });
        alert.present();
    };
    HomePage.prototype.click = function (i, j) {
        if (this.jogadorDaVez != this.valorJogador)
            return;
        if (this.tabuleiro[i][j] != 0)
            return;
        // Marca no tabuleiro
        this.tabuleiro[i][j] = this.valorJogador;
        // Alterna a jogada
        this.jogadorDaVez = this.valorComputador;
        // Verifica se o jogo acabou
        if (this.jogoFinalizado()) {
            return this.finalizar();
        }
        var executarMinMax = true;
        if (this.nivelDificuldade == this.NIVEL.DIFICIL) {
            // Verifica se o computador pode ganhar e faz a jogada vencedora
            var coordenadasVencedoras = this.podeGanhar(this.valorComputador);
            if (coordenadasVencedoras) {
                this.tabuleiro[coordenadasVencedoras[0]][coordenadasVencedoras[1]] = this.valorComputador;
                executarMinMax = false;
            }
            else {
                // Verifica se o jogador pode ganhar e faz a jogada para impedir
                coordenadasVencedoras = this.podeGanhar(this.valorJogador);
                if (coordenadasVencedoras) {
                    this.tabuleiro[coordenadasVencedoras[0]][coordenadasVencedoras[1]] = this.valorComputador;
                    executarMinMax = false;
                }
            }
        }
        // Faz jogada do computador
        if (executarMinMax) {
            var jogada = this.minMax();
            if (jogada)
                this.tabuleiro[jogada.i][jogada.j] = this.valorComputador;
        }
        if (this.jogoFinalizado()) {
            return this.finalizar();
        }
        this.jogadorDaVez = this.valorJogador;
    };
    HomePage.prototype.minMax = function (tabuleiro) {
        var jogadas = [];
        var _tabuleiro;
        if (!tabuleiro)
            tabuleiro = this.tabuleiro;
        // Cria cópias do tabuleiro
        tabuleiro = JSON.parse(JSON.stringify(tabuleiro));
        _tabuleiro = JSON.parse(JSON.stringify(tabuleiro));
        for (var i = 0; i < tabuleiro.length; i++)
            for (var j = 0; j < tabuleiro[i].length; j++) {
                if (tabuleiro[i][j] == 0) {
                    // Reseta tabuleiro
                    _tabuleiro = JSON.parse(JSON.stringify(tabuleiro));
                    // Preenche espaço com o valor do computador
                    _tabuleiro[i][j] = this.valorComputador;
                    // Preenche os outros vazios com o valor do jogador
                    for (var _i = 0; _i < _tabuleiro.length; _i++)
                        for (var _j = 0; _j < _tabuleiro[i].length; _j++) {
                            if (_tabuleiro[_i][_j] == 0)
                                _tabuleiro[_i][_j] = this.valorJogador;
                        }
                    var jogada = { i: i, j: j, possibilidadesPerder: this.quantidadeJogadasVencedoras(this.valorJogador, _tabuleiro) };
                    jogadas.push(jogada);
                }
            }
        var minPossibilidadesPerder = 999;
        var jogadaSelecionada;
        jogadas.forEach(function (jogada) {
            if (jogada.possibilidadesPerder < minPossibilidadesPerder) {
                jogadaSelecionada = jogada;
                minPossibilidadesPerder = jogada.possibilidadesPerder;
            }
        });
        return jogadaSelecionada;
    };
    HomePage.prototype.quantidadeJogadasVencedoras = function (valor, tabuleiro) {
        var qtd = 0;
        var somaLinhas = new Array(tabuleiro.length + 1).join('0').split('').map(parseFloat);
        var somaColunas = new Array(tabuleiro[0].length + 1).join('0').split('').map(parseFloat);
        var somaDiagonalPrincipal = 0;
        var somaDiagonalSecundaria = 0;
        // Calcular
        for (var i = 0; i < tabuleiro.length; i++)
            for (var j = 0; j < tabuleiro[i].length; j++) {
                somaLinhas[i] += tabuleiro[i][j];
                somaColunas[j] += tabuleiro[i][j];
                if (i == j)
                    somaDiagonalPrincipal += tabuleiro[i][j];
                if (i + j == 2)
                    somaDiagonalSecundaria += tabuleiro[i][j];
            }
        // Verifica quantas possibilidades de vitória há
        if (somaDiagonalPrincipal == valor * 3)
            qtd++;
        if (somaDiagonalSecundaria == valor * 3)
            qtd++;
        for (var linha = 0; linha < somaLinhas.length; linha++)
            if (somaLinhas[linha] == valor * 3)
                qtd++;
        for (var coluna = 0; coluna < somaColunas.length; coluna++)
            if (somaColunas[coluna] == valor * 3)
                qtd++;
        return qtd;
    };
    /**
     * Verifica se o jogo acabou e retorna o vencedor
     * Caso não haja vencedor, retorna false
     */
    HomePage.prototype.jogoFinalizado = function () {
        var somaLinhas = new Array(this.tabuleiro.length + 1).join('0').split('').map(parseFloat);
        var somaColunas = new Array(this.tabuleiro[0].length + 1).join('0').split('').map(parseFloat);
        var somaDiagonalPrincipal = 0;
        var somaDiagonalSecundaria = 0;
        var qtdVazia = 0;
        // Calcular
        for (var i = 0; i < this.tabuleiro.length; i++) {
            for (var j = 0; j < this.tabuleiro[i].length; j++) {
                somaLinhas[i] += this.tabuleiro[i][j];
                somaColunas[j] += this.tabuleiro[i][j];
                if (i == j)
                    somaDiagonalPrincipal += this.tabuleiro[i][j];
                if (i + j == 2)
                    somaDiagonalSecundaria += this.tabuleiro[i][j];
                if (this.tabuleiro[i][j] == 0)
                    qtdVazia++;
            }
        }
        if (somaColunas.indexOf(this.valorJogador * 3) > -1 || somaLinhas.indexOf(this.valorJogador * 3) > -1 ||
            somaDiagonalSecundaria == this.valorJogador * 3 || somaDiagonalPrincipal == this.valorJogador * 3)
            return this.valorJogador;
        if (somaColunas.indexOf(this.valorComputador * 3) > -1 || somaLinhas.indexOf(this.valorComputador * 3) > -1 ||
            somaDiagonalSecundaria == this.valorComputador * 3 || somaDiagonalPrincipal == this.valorComputador * 3)
            return this.valorComputador;
        // Se não há mais espaços vazios, retorna empate
        if (qtdVazia === 0)
            return true;
        return false;
    };
    HomePage.prototype.podeGanhar = function (valor) {
        var somaLinhas = new Array(this.tabuleiro.length + 1).join('0').split('').map(parseFloat);
        var somaColunas = new Array(this.tabuleiro[0].length + 1).join('0').split('').map(parseFloat);
        var somaDiagonalPrincipal = 0;
        var somaDiagonalSecundaria = 0;
        // Calcular
        for (var i = 0; i < this.tabuleiro.length; i++)
            for (var j = 0; j < this.tabuleiro[i].length; j++) {
                somaLinhas[i] += this.tabuleiro[i][j];
                somaColunas[j] += this.tabuleiro[i][j];
                if (i == j)
                    somaDiagonalPrincipal += this.tabuleiro[i][j];
                if (i + j == 2)
                    somaDiagonalSecundaria += this.tabuleiro[i][j];
            }
        // Se é possível ganhar, retorna as coordenadas da jogada vencedora
        if (somaDiagonalPrincipal == valor * 2)
            for (var i = 0; i < this.tabuleiro.length; i++)
                for (var j = 0; j < this.tabuleiro[i].length; j++)
                    if (i == j && this.tabuleiro[i][j] == 0)
                        return [i, j];
        if (somaDiagonalSecundaria == valor * 2)
            for (var i = 0; i < this.tabuleiro.length; i++)
                for (var j = 0; j < this.tabuleiro[i].length; j++)
                    if (i + j == 2 && this.tabuleiro[i][j] == 0)
                        return [i, j];
        for (var linha = 0; linha < somaLinhas.length; linha++)
            if (somaLinhas[linha] == valor * 2)
                for (var i = 0; i < this.tabuleiro.length; i++)
                    for (var j = 0; j < this.tabuleiro[i].length; j++)
                        if (i == linha && this.tabuleiro[i][j] == 0)
                            return [i, j];
        for (var coluna = 0; coluna < somaColunas.length; coluna++)
            if (somaColunas[coluna] == valor * 2)
                for (var i = 0; i < this.tabuleiro.length; i++)
                    for (var j = 0; j < this.tabuleiro[i].length; j++)
                        if (j == coluna && this.tabuleiro[i][j] == 0)
                            return [i, j];
        return false;
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/alexandre/projects/min-max/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Jogador da vez: {{ jogadorDaVez == valorJogador ? \'você\' : jogadorDaVez == valorComputador ? \'computador\' : \'iniciando...\'}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row *ngFor="let linha of tabuleiro; let i = index;">\n      <ion-col *ngFor="let celula of linha; let j = index;" (click)="click(i, j)" text-center>\n        <ion-icon *ngIf="celula == 1" name="close"></ion-icon>\n        <ion-icon *ngIf="celula == -1" name="radio-button-off"></ion-icon>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/alexandre/projects/min-max/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object])
    ], HomePage);
    return HomePage;
    var _a, _b;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(217);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/alexandre/projects/min-max/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/alexandre/projects/min-max/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[194]);
//# sourceMappingURL=main.js.map