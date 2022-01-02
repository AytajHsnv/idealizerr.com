import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/shared/services/dashboard.service';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'src/app/modules/shared/services/core.service';
import { NotifyService } from 'src/app/modules/shared/services/notify.service';
import {Title, DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../../shared/services/auth.service';
import { JuryVoicesLocalStorageService } from '../../services/jury-voices-local-storage.service';
import { objectIsNull } from 'src/app/modules/shared/services/utils.service';
import { Router } from '@angular/router';

declare var window;
// ======================================================================
@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
}) // ======================================================================
export class DashboardMainComponent implements OnInit {
  // ======================================================================

  constructor(
    private DASHBOARD: DashboardService,
    private _: TranslateService,
    private CORE: CoreService,
    private NOTIFY: NotifyService,
    private title: Title,
    private auth: AuthService,
    private JLS: JuryVoicesLocalStorageService,
    private SANITIZER: DomSanitizer,
    private ROUTER: Router
  ) {
  }

  members: any;
  limit;
  interval = 0;
  loading = false;
  pageProps;
  jury;
  admin;
  juryOrAdmin;

  throttle;
  voices = [];
  juryVoices = {};

  // ======================================================================

  limitType() {
    return typeof this.limit;
  }
  subs_competition
  activePlan: any;
  ngOnDestroy() {
    if (this.subs_competition)
      this.subs_competition.unsubscribe();
  }
  registration;
  validation;
  voiceGiving;
  juryVoiceGiving;
  finalStage;
  voteStarted;
  safeYoutube;
  ngOnInit() {


    this.auth.user.subscribe(user => {
      if (user) {
      this.jury = user.user_role === 'juri';
      this.admin = user.user_role === 'admin';
      this.juryOrAdmin = this.jury || this.admin;
      // this.jury = false;
      }
    });
    this.subs_competition = this.CORE.competition.subscribe(competition => {
      if (!objectIsNull(competition)) {
        var last_en_index: number;
        for (let i = 0; i < competition.action_plans.length; i++) {
          if (competition.action_plans[i].status == "1") {
            this.activePlan = competition.action_plans[i];
          }
        }


        if (this.activePlan.action_title === 'Qeydiyyat') {
          this.registration = true;
        } else if (this.activePlan.action_title === 'Yoxlama') {
          this.validation = true;
        } else if (this.activePlan.action_title === 'Səsvermə') {
          this.startVoting();
          this.voiceGiving = true;
        } else if (this.activePlan.action_title === 'Juri səsverməsi') {
          this.startVoting();
          this.juryVoiceGiving = true;
        } else if (this.activePlan.action_title === 'Final mərhələ') {
          this.finalStage = true;
        }


    if (this.activePlan.action_video) {
        const isYoutube = this.activePlan.action_video.match(
          /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
        );
        if (isYoutube) {
          const matches = this.activePlan.action_video.match(
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
    });
    this.DASHBOARD.title.next(this._.instant('dashboard.maininfo'));
    this.title.setTitle(`Idealizerr - ${this._.instant('dashboard.maininfo')}`);
  }

  startVoting() {
    this.limit = null;
    this.CORE.getVoiceProps().subscribe((data) => {
      this.pageProps = data.body;
      this.CORE.getRateLimit().subscribe((data) => {
        this.limit = parseInt(data.body.voice_limit);
      });
    });
  }

  conditionalVoiceGiving(pageProps) {
    if (pageProps.voice_giving) {
      if (!pageProps.voice_gived) {
        this.voteStarted = true;
        this.getPageData();
      } else {
        this.voteStarted = true;
        this.getPageDataVoices();
      }
    }
    if (pageProps.juri_voice_giving && (this.juryOrAdmin)) {
      if (!pageProps.juri_voice_gived) {
        this.voteStarted = true;
        this.getPageDataForJury();
      } else {
        this.voteStarted = true;
        this.getPageDataVoices();
      }
    }
  }

  getPageDataVoices() {
    this.loading = true;
    this.CORE.getGivedVoices().subscribe((data) => {
      this.members = data.body;
      this.loading = false;
    });
  }

  getPageData() {
    this.loading = true;
    this.CORE.getMembers().subscribe((data) => {
      this.members = data.body;
      this.loading = false;
      this.interval = 0;
    });
  }

  getPageDataForJury() {
    this.loading = true;
    this.CORE.getJuryMembers().subscribe((data) => {
      this.members = data.body;
      this.loading = false;
      this.interval = 0;


      const savedVoices = Object.values(this.JLS.storage);
      savedVoices.forEach(sv => {
        this.giveVoice(sv);
      });
    });
  }
  giveVoice($event) {
    if ($event.offVoice) {
      this.members[$event.index].voiceGiven = false;
      this.limit++;
      this.interval--;
      if ($event.selectedValues) {
        this.members[$event.index].selectedValues = null;
        delete this.juryVoices[this.members[$event.index].id];
      }
      this.voices.splice(this.voices.indexOf(this.members[$event.index].id), 1);
    } else {
      if ((this.pageProps.juri_voice_giving && (this.juryOrAdmin)) || this.interval !== 2) {
        this.limit--;
        this.interval++;
        this.members[$event.index].voiceGiven = true;
        if ($event.selectedValues) {
          this.members[$event.index].selectedValues = $event.selectedValues;
          this.juryVoices[this.members[$event.index].id] =
            $event.selectedValues;
        }
        this.voices.push(this.members[$event.index].id);
        if (this.interval === 2) {
          setTimeout(() => {
            if (this.pageProps.voice_giving) {
              window.scrollTo(0, document.body.scrollHeight);
            }
          }, 500);
        }
      } else {
        if (this.pageProps.voice_giving) {
        window.scrollTo(0, document.body.scrollHeight);
        }
      }
    }
  }

  nextPage() {
    if (this.jury) {
    }
    this.members = null;
    this.conditionalVoiceGiving(this.pageProps);
  }
  navigate() {
    this.ROUTER.navigate(['/dashboard/new/startup'])
  }
  finishVoice() {
    if (this.pageProps.juri_voice_giving && (this.juryOrAdmin)) {
      const formData = new FormData();
      for (const item of this.voices) {
        if (this.juryVoices[item]) {
          formData.append('startup_id[]', item);
          formData.append('criteria1[]', this.juryVoices[item].criteria1);
          formData.append('criteria2[]', this.juryVoices[item].criteria2);
          formData.append('criteria3[]', this.juryVoices[item].criteria3);
          formData.append('criteria4[]', this.juryVoices[item].criteria4);
          formData.append('criteria5[]', this.juryVoices[item].criteria5);
        }
      }
      this.CORE.giveVoiceForJury(formData).subscribe((data) => {
        this.JLS.clearVoices();
        if (data.body.errors) {
          this.NOTIFY.setNotification({
            status: 'danger',
            text: data.body.errors,
          });
        } else {
          this.NOTIFY.setNotification({
            status: 'success',
            text: 'Ses verme bitdi',
          });
          this.startVoting();
          window.scrollTo(0, 0);
        }
      });
    } else {
      this.CORE.finishVoting(this.voices).subscribe((data) => {
        this.JLS.clearVoices();
        if (data.body.errors) {
          this.NOTIFY.setNotification({
            status: 'danger',
            text: data.body.errors,
          });
        } else {
          this.NOTIFY.setNotification({
            status: 'success',
            text: 'Ses verme bitdi',
          });
          this.startVoting();
          window.scrollTo(0, 0);
        }
      });
    }
  }
} // ======================================================================
