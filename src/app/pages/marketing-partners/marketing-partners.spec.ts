import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingPartners } from './marketing-partners';

describe('MarketingPartners', () => {
  let component: MarketingPartners;
  let fixture: ComponentFixture<MarketingPartners>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketingPartners]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingPartners);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
