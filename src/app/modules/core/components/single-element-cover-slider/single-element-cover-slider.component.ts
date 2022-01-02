import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { ISingleElementCoverSlider } from "src/app/modules/shared/models/models";
declare var $: any;
//======================================================================
@Component({
  selector: "single-element-cover-slider",
  templateUrl: "./single-element-cover-slider.component.html",
  styleUrls: ["./single-element-cover-slider.component.scss"]
}) //======================================================================
export class SingleElementCoverSliderComponent implements OnInit {
  //======================================================================

  constructor() {}

  //======================================================================

  @Input() items: ISingleElementCoverSlider[];

  //======================================================================

  ngOnInit() {}

  //======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items) {
      setTimeout(() => {
        this.initSlider();
      }, 10);
    }
  }

  //======================================================================

  private initSlider(): void {
    const slider = $(".single-element-cover-slider").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: true
    });

    var durationList = $(".single-element-cover-slider .slider-item").map(
      function(index, item) {
        return item.getAttribute("data-time");
      }
    );

    let slideIndex = 0;
    const changeSlide = timing => {
      // setTimeout(() => {
      //   if (timing !== 0) slider.slick("slickNext");
      //   if (slideIndex >= durationList.length) slideIndex = 0; //Start from beginning?
      //   changeSlide(durationList[slideIndex++]); //Calls itself with duration for next slide
      // }, timing);
    };

    changeSlide(0);
  }
} //======================================================================
