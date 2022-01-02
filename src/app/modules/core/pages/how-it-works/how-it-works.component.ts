import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { IHowItWorks } from 'src/app/modules/shared/models/models';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
//======================================================================



export class HowItWorksComponent implements OnInit {
//======================================================================

  constructor(
    private CORE: CoreService,
    private _: TranslateService,
    private title: Title
  ) { 
    this.getHowItWorks();
  }

//======================================================================

  ngOnInit() {
    this.title.setTitle(`Idealizerr - ${this._.instant('global.howitworks')}`);
  }

//======================================================================

  public items:IHowItWorks[];
  private getHowItWorks():void {
    this.CORE.getHowItWorks().subscribe(
      RESPONSE => {
        this.items = RESPONSE.body;
      },
      ERROR => {}
    );
  }

}//======================================================================
