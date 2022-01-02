import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IOption } from '../../models/models';

@Component({
  selector: 'ui-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
//======================================================================

constructor() { }

//======================================================================

  public show_options:boolean = false;

//======================================================================

  @Input("label")
  public label:string;

  @Input("icon")
  public icon:string = "mdi mdi-menu-down";

  @Input("class")
  public class:string;

  @Input("selecteds")
  public default_selecteds:IOption[];

  @Input("placeholder")
  public placeholder:string;

  @Input("options")
  public options:IOption[];

  @Output("value") 
  public valueEmitter:EventEmitter<IOption[]> = new EventEmitter();

//======================================================================

  ngOnInit() {}
  
//======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if(this.default_selecteds){
      for (let i = 0; i < this.default_selecteds.length; i++) {
        this.select(this.default_selecteds[i]);
      }
    }
  }

//======================================================================

  public toggleDropdown():void {
    this.show_options = !this.show_options;
  }

//======================================================================

  public closeDropdown(e):void {
    this.show_options = false;
  }

//======================================================================

  public selecteds:IOption[];
  public select(option:IOption):void {
    this.toggleSelected(option);
    this.sortOnlySelecteds();
  }

//======================================================================

  private toggleSelected(option:IOption):void {
    for (let i = 0; i < this.options.length; i++) {
      if(this.options[i].value == option.value){
        if(this.options[i].selected){
          this.options[i].selected = false;
        }
        else{
          this.options[i].selected = true;
        }
        return;
      }
    }
  }

//======================================================================

  private sortOnlySelecteds():void {
    let selecteds:IOption[] = []
    for (let i = 0; i < this.options.length; i++) {
      if(this.options[i].selected === true){
        selecteds.push(this.options[i]);
      }
    }
    this.selecteds = selecteds;
    this.valueEmitter.emit(this.selecteds);
  }

}//======================================================================