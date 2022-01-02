import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
//======================================================================
@Component({
  selector: 'app-core-layout',
  templateUrl: './core-layout.component.html',
  styleUrls: ['./core-layout.component.scss']
})//======================================================================


export class CoreLayoutComponent implements OnInit {
//======================================================================

  constructor(private CORE: CoreService) { 
    this.CORE.route.next("");
  }

//======================================================================

  ngOnInit() {}

}//======================================================================
