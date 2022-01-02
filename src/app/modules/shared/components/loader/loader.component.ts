import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';
//======================================================================
@Component({
  selector: 'ui-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})//======================================================================


export class LoaderComponent implements OnInit {
//======================================================================

  constructor(private LOADER: LoaderService) { this.subsLoader();}
  
//======================================================================

  ngOnInit() {}

//======================================================================

  ngOnDestroy(): void {
    this.subs_loader.unsubscribe();
  }

//======================================================================

  private subs_loader:Subscription;
  public loader:boolean;
  private subsLoader():void {
    this.subs_loader = this.LOADER.status.subscribe(status => {
      this.loader = status;
    })
  }

}//======================================================================
