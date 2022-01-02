import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

// ======================================================================
@Component({
  selector: 'app-dashboard-voice-giving',
  templateUrl: './dashboard-voice-giving.component.html',
  styleUrls: ['./dashboard-voice-giving.component.scss'],
}) // ======================================================================
export class DashboardVoiceGivingComponent implements OnInit {
  // ======================================================================
  @Input()
    jury;
  @Input()
    pageProps;
  @Input()
    admin;
  @Input()
    limit;
  @Input()
    interval;
  @Input()
    juryOrAdmin;
  @Input()
    members;
  @Input()
    voices;

  @Output() emitFinishVoice = new EventEmitter<any>();
  @Output() emitGiveVoice = new EventEmitter<any>();
  @Output() emitNextPage = new EventEmitter<any>();
  constructor(
  ) {}
  ngOnInit() {
  }

  giveVoice($event: any) {
    this.emitGiveVoice.emit($event);
  }

  finishVoice() {
    this.emitFinishVoice.emit();
  }

  nextPage() {
    this.emitNextPage.emit();
  }
} // ======================================================================
