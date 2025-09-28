import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPolicy } from './company-policy';

describe('CompanyPolicy', () => {
  let component: CompanyPolicy;
  let fixture: ComponentFixture<CompanyPolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyPolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
