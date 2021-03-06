/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ViajatoTestModule } from '../../../test.module';
import { AeroportoDeleteDialogComponent } from 'app/entities/aeroporto/aeroporto-delete-dialog.component';
import { AeroportoService } from 'app/entities/aeroporto/aeroporto.service';

describe('Component Tests', () => {
    describe('Aeroporto Management Delete Component', () => {
        let comp: AeroportoDeleteDialogComponent;
        let fixture: ComponentFixture<AeroportoDeleteDialogComponent>;
        let service: AeroportoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ViajatoTestModule],
                declarations: [AeroportoDeleteDialogComponent]
            })
                .overrideTemplate(AeroportoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AeroportoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AeroportoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
