import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCartDialogComponent } from './confirm-cart-dialog.component';

describe('ConfirmCartDialogComponent', () => {
  let component: ConfirmCartDialogComponent;
  let fixture: ComponentFixture<ConfirmCartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmCartDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
