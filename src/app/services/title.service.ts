import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private title : Title) { }

  setTitle(title: string) {
    let fullTitle = 'Okinotes - Take notes and share in seconds'
    if (title.length > 0) {
      fullTitle = title + ' - ' + fullTitle;
    }
    this.title.setTitle(fullTitle);
  }

}
