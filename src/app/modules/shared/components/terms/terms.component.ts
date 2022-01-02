import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { ITerms } from 'src/app/modules/shared/models/models';
//======================================================================
@Component({
  selector: 'terms-modal',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})//======================================================================



export class TermsComponent implements OnInit {
//======================================================================

  constructor(
    private CORE: CoreService
  ) { 
    this.getTerms();
  }

//======================================================================

  @Output("accept") 
  public accept:EventEmitter<null> = new EventEmitter();
  @Output("close") 
  public close:EventEmitter<null> = new EventEmitter();

  @Input("class")
  public class:string = "modal";

//======================================================================

  ngOnInit() {}

//======================================================================

  public acceptEmitter():void{
    this.accept.next();
    this.close.next();
  }

//======================================================================

  public terms:ITerms;
  private getTerms():void {
    this.CORE.getTerms().subscribe(
      RESPONSE => {
        this.terms = RESPONSE.body as ITerms;
      },
      ERROR => {}
    );
  }

}//======================================================================