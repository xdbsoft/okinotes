import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Page, PageProperties } from 'src/app/services/api.service';

@Component({
  selector: 'app-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.css']
})
export class PageEditorComponent implements OnInit {

  @Input()
  page: Page;
  
  @Output()
  submitPage: EventEmitter<Page> = new EventEmitter();
  @Output()
  cancel: EventEmitter<Page> = new EventEmitter();

  pageForm = this.fb.group({
    title: ['', Validators.required],
    policy: ['PRIVATE'],
    templateID: ['micro-blog']
  });


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.pageForm.setValue({
      title: this.page.title,
      policy: this.page.policy,
      templateID: this.page.templateID
    });
  }

  get title() { return this.pageForm.get('title'); }
  
  get createMode() { return this.page.id.length===0; }

  onSubmit() {
    this.page.title = this.pageForm.value.title;
    this.page.policy = this.pageForm.value.policy;
    this.page.templateID = this.pageForm.value.templateID;
    
    this.submitPage.emit(this.page);
  }
  onCancel() { 
    this.cancel.emit(this.page);
  }

}
