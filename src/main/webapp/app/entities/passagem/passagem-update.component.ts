import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPassagem } from 'app/shared/model/passagem.model';
import { PassagemService } from './passagem.service';
import { IVoo } from 'app/shared/model/voo.model';
import { VooService } from 'app/entities/voo';
import { ICompra } from 'app/shared/model/compra.model';
import { CompraService } from 'app/entities/compra';

@Component({
    selector: 'jhi-passagem-update',
    templateUrl: './passagem-update.component.html'
})
export class PassagemUpdateComponent implements OnInit {
    private _passagem: IPassagem;
    isSaving: boolean;

    voos: IVoo[];

    compras: ICompra[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private passagemService: PassagemService,
        private vooService: VooService,
        private compraService: CompraService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ passagem }) => {
            this.passagem = passagem;
        });
        this.vooService.query().subscribe(
            (res: HttpResponse<IVoo[]>) => {
                this.voos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.compraService.query().subscribe(
            (res: HttpResponse<ICompra[]>) => {
                this.compras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.passagem.id !== undefined) {
            this.subscribeToSaveResponse(this.passagemService.update(this.passagem));
        } else {
            this.subscribeToSaveResponse(this.passagemService.create(this.passagem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPassagem>>) {
        result.subscribe((res: HttpResponse<IPassagem>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackVooById(index: number, item: IVoo) {
        return item.id;
    }

    trackCompraById(index: number, item: ICompra) {
        return item.id;
    }
    get passagem() {
        return this._passagem;
    }

    set passagem(passagem: IPassagem) {
        this._passagem = passagem;
    }
}
