import { Component, OnInit, Input } from '@angular/core';
import { Page, ApiService, PageProperties } from 'src/app/services/api.service';

class EditablePage extends Page {
  edited: boolean
}

@Component({
  selector: 'app-pages-list',
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.css']
})
export class PagesListComponent implements OnInit {

  @Input()
  pages : Page[];

  @Input()
  alias: string;

  @Input()
  userId: string;

  page: number = 1;
  pageSize: number = 12;

  editedPage: Page;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  onEdit(p: EditablePage) {
    p.edited = true;
  }
  onEditCancel(p: EditablePage) {
    p.edited = undefined;
  }
  onEditSave(p: EditablePage) {
    let props : PageProperties = {
      title : p.title,
      policy: p.policy,
      templateID: p.templateID
    };
    this.apiService.putPage(p.userId, p.id, props).subscribe(
      undefined,
      err => {
        p.edited = true;
      }
    )
    p.edited = undefined;
  }

  deletePage(pageId: string) {
    const foundIndex = this.pages.findIndex( p => p.id === pageId);
    const p = this.pages[foundIndex];
    this.pages.splice(foundIndex ,1);

    this.apiService.deletePage(this.userId, pageId).subscribe(
      undefined,
      err => {this.pages.splice(foundIndex, 0, p);}
    );
  }

}
