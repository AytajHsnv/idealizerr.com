import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { ISingleElementCoverSlider } from 'src/app/modules/shared/models/models';
import { LoaderService } from 'src/app/modules/shared/services/loader.service';
import {Title} from '@angular/platform-browser';
//======================================================================
@Component({
  selector: 'app-core-main-page',
  templateUrl: './core-main-page.component.html',
  styleUrls: ['./core-main-page.component.scss']
})//======================================================================



export class CoreMainPageComponent implements OnInit {
//======================================================================

  constructor(
    private CORE: CoreService,
    private LOADER: LoaderService,
    private title: Title
  ) {
    this.LOADER.show()
    this.getMainSlider();
    title.setTitle("Idealizerr");
  }

//======================================================================

  public slider_items:ISingleElementCoverSlider[];

//======================================================================

  ngOnInit() {}

//======================================================================

  private getMainSlider():void {
    this.CORE.getMainSlider().subscribe(
      RESPONSE => {
        this.slider_items = RESPONSE.body;
        this.LOADER.hide(400);
      },
      ERROR => {}
    );
  }


}//======================================================================
