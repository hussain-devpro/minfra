import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerForm } from './server-form';

describe('ServerForm', () => {
  let component: ServerForm;
  let fixture: ComponentFixture<ServerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
