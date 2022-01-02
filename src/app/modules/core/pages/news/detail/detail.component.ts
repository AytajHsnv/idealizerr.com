import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { INews } from 'src/app/modules/shared/models/models';
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
//======================================================================


export class DetailComponent implements OnInit {
//======================================================================

  constructor(
    private ACTIVATED_ROUTE: ActivatedRoute,
    private CORE: CoreService,
    private title: Title
  ) { 
    this.getNewsDetail(this.ACTIVATED_ROUTE.snapshot.params.id);
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  public news:INews;
  private getNewsDetail(id:string):void {
    this.CORE.getNewsDetail(id).subscribe(
      RESPONSE => {
        this.news = RESPONSE.body as INews;
        this.title.setTitle(`Idealizerr - ${this.news.title}`);
      },
      ERROR => {}
    );
  }

}//======================================================================
