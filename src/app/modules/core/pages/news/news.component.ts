import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { INews, IPagination } from 'src/app/modules/shared/models/models';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})//======================================================================


export class NewsComponent implements OnInit {
//======================================================================

  constructor(
    private CORE: CoreService,
    private _: TranslateService,
    private title: Title
  ) { 
    this.getNews();
    title.setTitle(`Idealizerr - ${_.instant('home.news')}`);
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  public news:INews[];
  public pagination:IPagination = {} as any;
  private getNews(page?:number):void {
    this.CORE.getNews().subscribe(
      RESPONSE => {
        if(!this.news){
          this.news = RESPONSE.body.data as INews[];
        }
        else{
          RESPONSE.body.data.forEach( news => {
            this.news.push(news);
          });
        }
        const pagination:IPagination = {
          current_page: RESPONSE.body.current_page,
          per_page:RESPONSE.body.per_page,
          total:RESPONSE.body.total
        } 
        this.pagination = pagination;
      },
      ERROR => {}
    );
  }

//======================================================================

  public loadMore():void {
    this.getNews(this.pagination.current_page + 1);
  }

//======================================================================

  public ifNextHave():boolean {
    if(this.pagination.total/this.pagination.per_page > this.pagination.current_page){
      return true;
    }
    return false;
  }

}//======================================================================
