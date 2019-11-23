import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ItemProperties } from 'src/app/services/api.service';

@Component({
  selector: '[app-url-item-creator]',
  templateUrl: './item-creator.component.html',
  styleUrls: ['./item-creator.component.css']
})
export class ItemCreatorComponent implements OnInit {

  newItemForm = this.fb.group({
    url: ['', Validators.required],
    title: ['']
  });

  @Output()
  submitItem: EventEmitter<ItemProperties> = new EventEmitter();


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmitNewItem() {
    this.submitItem.emit({
      title: this.newItemForm.get('title').value,
      content: '',
      url: this.newItemForm.get('url').value
    });

    this.newItemForm.reset();
  }
  
  get url() { return this.newItemForm.get('url'); }

}
