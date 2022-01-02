import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { JuryVoicesLocalStorageService } from '../../../services/jury-voices-local-storage.service';

// ======================================================================
@Component({
  selector: 'app-dashboard-jury-voice-giving',
  templateUrl: './dashboard-jury-voice-giving.component.html',
  styleUrls: ['./dashboard-jury-voice-giving.component.scss'],
}) // ======================================================================
export class DashboardJuryVoiceGivingComponent implements OnInit {
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
    private JLS: JuryVoicesLocalStorageService
  ) {}
  ngOnInit() {
  }

  giveVoice($event: any) {
    this.JLS.saveVoice($event);

    this.emitGiveVoice.emit($event);
  }

  finishVoice() {
    this.emitFinishVoice.emit();
  }

  nextPage() {
    this.emitNextPage.emit();
  }
} // ======================================================================
