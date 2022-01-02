import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { IHowItWorksDetail } from 'src/app/modules/shared/models/models';
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: 'app-how-it-works-detail',
  templateUrl: './how-it-works-detail.component.html',
  styleUrls: ['./how-it-works-detail.component.scss']
})
//======================================================================



export class HowItWorksDetailComponent implements OnInit {
//======================================================================

  constructor(
    private ACTIVATED_ROUTE: ActivatedRoute,
    private CORE: CoreService,
    private title: Title
  ) { 
    this.getHowItWorksDetail(this.ACTIVATED_ROUTE.snapshot.params.id);
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  public item:IHowItWorksDetail;
  private getHowItWorksDetail(id:string):void {
    this.CORE.getNewsDetail(id).subscribe(
      RESPONSE => {
        this.item = RESPONSE.body as IHowItWorksDetail;
        this.title.setTitle(`Idealizerr - ${this.item.title}`);
      },
      ERROR => {}
    );
  }

}//======================================================================
