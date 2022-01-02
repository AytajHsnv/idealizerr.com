import { Component, OnInit, Input, Output, EventEmitter, HostListener } from "@angular/core";
import { IStartup } from "../../models/models";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { CoreService } from "../../services/core.service";

declare var $;
//======================================================================
@Component({
  selector: "startup-card-voice",
  templateUrl: "./startup-card-voice.component.html",
  styleUrls: ["./startup-card-voice.component.scss"]
}) //======================================================================
export class StartupCardVoiceComponent implements OnInit {
  //======================================================================

  //======================================================================


  @Input("startup")
  public startup: IStartup;
  @Input()
  public index;
  @Input()
  public rate = true;
  @Input()
  public jury;

  @Output()
  public followed: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public voiceGive: EventEmitter<any> = new EventEmitter<any>();

  redirection;
  juryVoiceModal = false;
  scoreValues = [{name: '1', value: '1'}, {name: '2', value: '2'},{name: '3', value: '3'},{name: '4', value: '4'},{name: '5', value: '5'}];
  selectedValues: any = {};
  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:any) {
    if (ev.keyCode == 27) {
      if (this.juryVoiceModal) this.juryVoiceModal = false;
      this.selectedValues = {};
    }
  }
  closeModal($event) {
    if (!$($event.target).closest('.rate.display-flex.align-items-center').length) {
      this.juryVoiceModal = false;
    }
  }
  giveVoice(offVoice) {
    if (this.jury) {
      // this.voiceGive.emit({id: this.startup.id, selectedValues: {criteria1: "5", criteria2: "5", criteria3: "5", criteria4: "5", criteria5: "5"}, index: this.index, offVoice: !offVoice});
      // return;
      if (!offVoice) {
        this.cancelVoice();
      } else {
        this.juryVoiceModal = true;
      }
    } else {
      this.modalAccepted({
        index: this.index,
        id: this.startup.id,
        offVoice: !offVoice
      });
    }
  }
  submitVoiceJury($event) {
    this.modalAccepted({
      id: this.startup.id,
      selectedValues: this.selectedValues,
      index: this.index,
      offVoice: false
    });
    this.onKeyUp({keyCode: 27});
  }
  cancelVoice() {
    this.modalAccepted({
      index: this.index,
      id: this.startup.id,
      offVoice: true
    });
    this.onKeyUp({keyCode: 27});
  }
  modalAccepted(data) {
    this.voiceGive.emit(data);
  }
  scoreSelected($event) {
    this.selectedValues[$event.inputName] = $event.value;
  }

  //======================================================================

  ngOnInit() {

    this.redirection = ["/startup", this.startup.id];
  }

  constructor(
    private AUTH: AuthService,
    private ROUTER: Router,
    private CORE: CoreService
  ) {}

  public subscribe(id): void {
    const isLoggedIn = this.AUTH.getUser();

    if (isLoggedIn) {
      this.CORE.followStartUp(id).subscribe(data => {
        this.startup.followed = data.body.follow;
        this.followed.emit(data);
      });
    } else {
      this.ROUTER.navigate(["/auth/login"]);
    }
  }
} //======================================================================
