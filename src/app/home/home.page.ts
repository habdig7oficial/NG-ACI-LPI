/*
    Copyright © 2023 Mateus Felipe da Silveira Vieira

    Este programa é um software livre; você pode redistribuí-lo e/ou
    modificá-lo sob os termos da Licença Pública Geral GNU como publicada
    pela Free Software Foundation; na versão 3 da Licença, ou
    (a seu critério) qualquer versão posterior.

    Este programa é distribuído na esperança de que possa ser útil,
    mas SEM NENHUMA GARANTIA; sem uma garantia implícita de ADEQUAÇÃO
    a qualquer MERCADO ou APLICAÇÃO EM PARTICULAR. Veja a
    Licença Pública Geral GNU para mais detalhes.

    Você deve ter recebido uma cópia da Licença Pública Geral GNU junto
    com este programa. Se não, veja <http://www.gnu.org/licenses/>.
*/

import { Component } from "@angular/core";

import { AlertController } from "@ionic/angular";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage {
    altura: string = "";
    sexo: string = "";
    result: number = 0;

    constructor(private alertController: AlertController) {}

    async CalcPeso() {
        if (this.sexo == "masculino") {
            this.result = 72.7 * parseFloat(this.altura) - 58;
        } else if (this.sexo == "feminino") {
            this.result = 62.1 * parseFloat(this.altura) - 44.7;
        }

        const alerta = await this.alertController.create({
            header: `Peso ideal ${this.sexo}`,
            subHeader: `Seu peso ideal é:`,
            message: `${this.result} kg`,
        });
        await alerta.present();
    }
}
