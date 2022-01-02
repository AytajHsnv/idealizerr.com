import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { JuryVoicesLocalStorageService } from '../../../services/jury-voices-local-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

// ======================================================================
@Component({
  selector: 'app-step-detail',
  templateUrl: './step-detail.component.html',
  styleUrls: ['./step-detail.component.scss'],
}) // ======================================================================
export class StepDetailComponent implements OnInit {
  // ======================================================================
  @Input()
  detail;


  safeYoutube;
  constructor(
    private SANITIZER: DomSanitizer
  ) {
  }
  ngOnInit() {

    if (this.detail.action_video) {

    const isYoutube = this.detail.action_video.match(
      /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    );
    if (isYoutube) {
      const matches = this.detail.action_video.match(
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      );
      if (matches) {
        this.safeYoutube = this.SANITIZER.bypassSecurityTrustResourceUrl(
          "https://www.youtube.com/embed/" + matches[2]
        );
      }
    }
    }

  }
} // ======================================================================
