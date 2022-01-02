import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/modules/shared/services/core.service";
import { ISponsor } from "src/app/modules/shared/models/models";
declare var $: any;
//======================================================================
@Component({
  selector: "core-about-sponsors-slider",
  templateUrl: "./core-about-sponsors-slider.component.html",
  styleUrls: ["./core-about-sponsors-slider.component.scss"],
}) //======================================================================
export class CoreAboutSponsorsSliderComponent implements OnInit {
  //======================================================================

  constructor(public CORE: CoreService) {
    this._getSponsors_API();
  }

  //======================================================================

  public sponsors: ISponsor[];

  //======================================================================

  ngOnInit() {}

  //======================================================================

  private _initSlider(): void {
    // $(".core-about-sponsors-slider").slick({
    //   infinite: true,
    //   slidesToShow: 4,
    //   slidesToScroll: 1,
    //   autoplay: true,
    //   arrows: false,
    //   dots: false,
    //   responsive: [
    //     {
    //       breakpoint: 991,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 3,
    //         infinite: true,
    //         dots: true,
    //       },
    //     },
    //   ],
    // });
  }

  //======================================================================

  private _getSponsors_API(): void {
    this.CORE.getSponsors().subscribe(
      (RESPONSE) => {
        this.sponsors = RESPONSE.body;
        setTimeout(() => {
          this._initSlider();
        }, 10);
      },
      (ERROR) => {}
    );
  }
} //======================================================================
