import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/modules/shared/models/models';
import { CoreService } from 'src/app/modules/shared/services/core.service';
//======================================================================
@Component({
  selector: 'core-main-events-section',
  templateUrl: './core-main-events-section.component.html',
  styleUrls: ['./core-main-events-section.component.scss']
})//======================================================================



export class CoreMainEventsSectionComponent implements OnInit {
//======================================================================

  constructor(
    public CORE:CoreService
  ) { 
    this.getEvents();
  }
//======================================================================

  public events:IEvent[];

//======================================================================

  ngOnInit() {}

//======================================================================

  private getEvents():void {
    this.CORE.getEvents().subscribe(
      RESPONSE => {
        this.events = RESPONSE.body;
      },
      ERROR => {}
    );
  }

}//======================================================================
