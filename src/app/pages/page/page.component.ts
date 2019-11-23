import { Component, OnInit } from '@angular/core';
import { Page, ApiService, User, Item, ItemProperties } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  user: User;
  page: Page;
  items: any[];
  editable: boolean;
  editedItem: Item;

  get submitText() : string {
    if (this.editedItem) {
      return "Update";
    }
    return 'Add';
  }

  
  newItemForm = this.fb.group({
    title: ['', Validators.required],
    content: ['']
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private titleService: TitleService) { }

  ngOnInit() {
    this.route.data.subscribe( (data : {user: User, page: Page, items: any[]}) => {
      this.user = data.user;
      this.page = data.page;
      this.items = data.items;
      this.editable = this.user && (this.user.id === this.page.userId);
      this.titleService.setTitle(this.page.title)
    });
  }

  get title() { return this.newItemForm.get('title'); }
  get content() { return this.newItemForm.get('content'); }

  onSubmit() {
    const newItemProperties = {
      title: this.newItemForm.get('title').value,
      content: this.newItemForm.get('content').value,
      url: ''
    };
    this.newItemForm.reset();
    if (this.editedItem) {
      const editedItem = this.editedItem;
      this.editedItem = undefined;
      editedItem.title = newItemProperties.title;
      editedItem.content = newItemProperties.content;
      this.apiService.saveItem(editedItem.userId, editedItem.pageId, editedItem.id, newItemProperties);
    } else {
      this.createItem(newItemProperties);
    }
  }

  createItem(newItemProperties: ItemProperties) {
    this.apiService.addItem(this.page.userId, this.page.id, newItemProperties).subscribe(
      v => { this.items.splice(0,0,v);}
    );
  }

  editItem(item: Item) {
    this.editedItem = item;
    this.newItemForm.reset({
      title: item.title,
      content: item.content
    });
  }
  
  saveItem(item: Item) {
    this.apiService.saveItem(item.userId, item.pageId, item.id, item);
  }

  deleteItem(item: Item) {    
    const foundIndex = this.items.findIndex( i => i.id === item.id);
    this.items.splice(foundIndex ,1);

    this.apiService.deleteItem(item.userId, item.pageId, item.id).subscribe(
      undefined,
      err => {this.items.splice(foundIndex, 0, item);}
    );
  }

}
