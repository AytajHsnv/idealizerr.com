import { Component, OnInit, Input } from '@angular/core';
import { IPageNavigationSection } from 'src/app/modules/shared/models/models';
declare var $: any;
//======================================================================
@Component({
  selector: 'page-inside-navigation',
  templateUrl: './page-inside-navigation.component.html',
  styleUrls: ['./page-inside-navigation.component.scss']
})//======================================================================


export class PageInsideNavigationComponent implements OnInit {
//======================================================================

  constructor() { }

//======================================================================

  @Input() sections:IPageNavigationSection[];

//======================================================================

  ngOnInit() {}

//======================================================================

  ngAfterViewInit(): void {
    this.scrollSpy();
    this.makeNavFixed();
  }

//======================================================================

  ngOnDestroy(): void {
    $(document).unbind('scroll');
  }

//======================================================================

  public makeNavFixed():void {
    $(document).scroll(() => {
        const elem = $(".page-inside-navigation");
        const elem_replace = $(".page-inside-navigation-replace");
        const elem_replace_off = $(".page-inside-navigation-replace")[0].offsetTop;
        const element_off = $(".page-inside-navigation")[0].offsetTop;
        const window_off = window.pageYOffset;
        if(window_off > element_off && element_off != 0){
          elem.addClass("active");
          elem_replace.addClass("active");
        }
        else if(window_off < elem_replace_off){
          elem.removeClass("active");
          elem_replace.removeClass("active");
        }
    });
  }

//======================================================================

  public scrollSpy():void {
    $( document).scroll(() => {
      for (let i = 0; i < this.sections.length; i++) {
        try {
          if(this._elementInViewport($(`[scroll-id=${this.sections[i].section_id}]`))){
            $(`[scroll-target]`).removeClass("active");
            $(`[scroll-target=${this.sections[i].section_id}]`).addClass("active");
            return;
          }
        } catch (error) {
            
        }
        
      }
    });
  }

//======================================================================

  public scrollToSection(section_id:string):void {
    $("html, body").animate({ scrollTop: $(`[scroll-id=${section_id}]`).offset().top - 100 +"px" }, 300);
    $(`[scroll-target]`).removeClass("active");
    $(`[scroll-target=${section_id}]`).addClass("active");
  }

//======================================================================

  private _elementInViewport(el):boolean {
    if(!el){
      return
    }
    el = el[0];
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
  
    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
  
    return (
      top >= window.pageYOffset &&
      left >= window.pageXOffset &&
      (top + height) <= (window.pageYOffset + window.innerHeight) &&
      (left + width) <= (window.pageXOffset + window.innerWidth)
    );
  }

}//======================================================================
