import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private _: TranslateService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('global.terms')}`);
  }

}
