import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEditableComponent } from './item-editable.component';

describe('ItemEditableComponent', () => {
  let component: ItemEditableComponent;
  let fixture: ComponentFixture<ItemEditableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemEditableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemEditableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
