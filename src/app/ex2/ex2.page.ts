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
import { ToastController } from "@ionic/angular";

/* Acertando problemas de tipo com TS */
interface IonSel extends Event {
    detail?: {
        value: string;
    };
}

@Component({
    selector: "app-ex2",
    templateUrl: "./ex2.page.html",
    styleUrls: ["./ex2.page.scss"],
})
export class Ex2Page {
    TransationValue: string = "";
    ParsedValue: number = 0;
    PayMethodTransfer?: IonSel;
    PayMethod?: string;
    Result: number = 0;
    FinalValue: number = 0;

    /* a sintaxe blabla? (nome do campo, campos ? são opicionais) : tipo (tipo permitido no campo) = valor */

    constructor(
        private toastController: ToastController /* Instanciando toastController como o imoportado */
    ) {}

    async AlteraValor() {
        this.ParsedValue = parseFloat(this.TransationValue);

        this.PayMethod =
            this.PayMethodTransfer?.detail != undefined
                ? this.PayMethodTransfer.detail.value
                : "err";
        /* if ternário - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator */

        console.log(this.PayMethod);

        if (this.PayMethod == "pix" || this.PayMethod == "credito") {
            this.Result = this.ParsedValue * 10;
        } else if (this.PayMethod == "debito") {
            console.log(this.PayMethod);
        } else {
            const err = await this.toastController.create({
                message: `error: \n Método de Pagamento: ${this.PayMethod}\n Message: ${this.Result}\n Transferidor${this.PayMethodTransfer}`,
                duration: 30000,
                position: "top",
            });
            return await err.present();
        }

        this.Result = this.Result / 100;

        if (this.PayMethod == "pix") {
            this.Result = -this.Result;
        } else if (this.PayMethod == "credito") {
            this.Result = +this.Result;
        } else if (this.PayMethod == "debito") {
            this.Result = 0;
        }

        this.FinalValue = this.ParsedValue + this.Result;

        const Show = await this.toastController.create({
            message: `Método de Pagamento: ${this.PayMethod},\n Valor Total: R$${this.FinalValue},\n Diferença: R$ ${this.Result}`,
            duration: 60000,
            position: "top",
        });

        await Show.present();

        this.FinalValue = 0;
        this.Result = 0;
    }
}
