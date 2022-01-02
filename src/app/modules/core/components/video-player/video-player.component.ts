import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
//======================================================================
@Component({
  selector: 'video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})//======================================================================


export class VideoPlayerComponent implements OnInit {
//======================================================================

  constructor() { }
//======================================================================

  @Input() video_id:string = "6c7_TpPUpL0";

//======================================================================

  public video_url:string;
    
//======================================================================

  ngOnInit() {}

//======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if(this.video_id){
      this.video_url = "https://www.youtube.com/embed/" + this.video_id ;
      // + "?autoplay=1&controls=0&rel=0";
    }
  }

}//======================================================================