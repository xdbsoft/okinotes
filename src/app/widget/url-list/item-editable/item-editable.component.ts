import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'tr[app-url-item-editable]',
  templateUrl: './item-editable.component.html',
  styleUrls: ['./item-editable.component.css']
})
export class ItemEditableComponent implements OnInit {

  @Input()
  item: Item
  @Input()
  editable: boolean

  @Output()
  save: EventEmitter<Item> = new EventEmitter();

  @Output()
  delete: EventEmitter<Item> = new EventEmitter();

  editItemForm = this.fb.group({
    url: ['', Validators.required],
    title: ['']
  });
  edited : boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.editItemForm.setValue({
      url: this.item.url,
      title: this.item.title,
    });
  }
  
  get url() { return this.editItemForm.get('url'); }

  saveEditedItem() {

    this.item.url = this.editItemForm.get('url').value;
    this.item.title = this.editItemForm.get('title').value;

    this.edited = false;
        
    this.save.emit(this.item);
  }

  deleteItem() {
    this.delete.emit(this.item);
  }

}
