import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { LanguageService } from '../../services/language.service';
declare var $: any;
//======================================================================
@Component({
  selector: 'ui-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})//======================================================================


export class DatepickerComponent implements OnInit {
//======================================================================

  constructor(private LANGUAGE: LanguageService) { 
    this.language = this.LANGUAGE.current_lang;
  }

//======================================================================

  @Input("label")
  public label:string;

  @Input("start")
  public start:Date;

  @Input("end")
  public end:Date;

  @Input("name")
  public name:string;

  @Input("placeholder")
  public placeholder:string;
  
  @Input("value")
  public value:Date;

  @Output("value") 
  public valueEmitter:EventEmitter<Date> = new EventEmitter();

//======================================================================

  ngOnInit() {}

//======================================================================

  ngAfterViewInit():void {
    setTimeout(() => {
      this.datepickerSetLans();
      this.datepickerInit(this.name);
    }, 2000);
  }

//======================================================================

  ngOnChanges(changes: SimpleChanges): void {}

//======================================================================


  private language:string;
  private datepickerSetLans(){
    $.fn.datepicker.language['az'] ={
      days: ['Bazar','Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə'],
      daysShort: ['Baz', 'Bae', 'Çəa', 'Çər', 'Cüa', 'Cüm', 'Şən'],
      daysMin: ['Ba', 'Be', 'Ça', 'Çə', 'Ca', 'Cü', 'Şə'],
      months: ['Yanvar','Fevral','Mart','Aprel','May','İyun', 'İyul','Avgust','Sentyabr','Oktyabr','Noyabr','Dekabr'],
      monthsShort: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yyyy',
      timeFormat: 'hh:ii aa',
      firstDay: 1,
    };
    $.fn.datepicker.language['en'] = {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yyyy',
      timeFormat: 'hh:ii aa',
      firstDay: 0
    };
  }

//======================================================================

  private datepicker:any;
  private datepickerInit(classname:string):void {
    this.datepicker = $("."+classname).datepicker({
      onSelect: (formattedDate, date:Date, inst) =>{
        this.valueEmitter.next(date)
      },
      // onHide:(inst, animationCompleted) =>{},
      // onShow:(inst, animationCompleted) =>{},
      position: "top right",
      minDate: this.start ? this.start : null,
      maxDate: this.end ? this.end : null,
      autoClose: true,
      language: this.language,
      classes:"singlepicker",
    });
    if(this.value){
      this.datepicker.datepicker().data('datepicker').selectDate(this.value);
    }
  }

}//======================================================================
