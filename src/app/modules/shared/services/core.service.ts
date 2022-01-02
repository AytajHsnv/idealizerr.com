import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { UrlsService } from "./urls.service";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import {
  IEvent,
  ISingleElementCoverSlider,
  IJury,
  ISponsor,
  ITeamMember,
  IPlan,
  IStartup,
  ICountry,
  IStartupSector,
  ICoreSettings,
  INews,
  Competition,
  INewStartup,
} from "../models/models";
@Injectable({ providedIn: "root" })
//======================================================================
export class CoreService {
  //======================================================================

  constructor(private HTTP: HttpClient, private URLS: UrlsService) {}

  //======================================================================

  private _header = new HttpHeaders({
    "Content-Type": "application/json; charset=utf-8",
  });

  //======================================================================

  public settings = new BehaviorSubject<ICoreSettings>({} as any);
  public competition = new BehaviorSubject<Competition>({} as any);
  public countries = new BehaviorSubject<any>({} as any);
  public route = new BehaviorSubject<RouteLocation>("");
  public logo = new BehaviorSubject<any>("");
  public image = new BehaviorSubject<any>("");

  public _startup: INewStartup = {
    id: null,
    title: null,
    description: null,
    idea: null,
    color: null,
    video: null,
    website: null,
    image: null,
    logo: null,
    team: null,
    country: null,
    sector: null,
    draft: true,
  };
  public startup = new BehaviorSubject<INewStartup>(this._startup);
  public notifications = new BehaviorSubject<any>([]);

  //======================================================================

  public getMainSlider(): Observable<any> {
    return this.HTTP.get<ISingleElementCoverSlider[]>(
      this.URLS.getApiUrls().MainSlider,
      { observe: "response", headers: this._header }
    );
  }

  public readNotifications(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().ReadNotifications, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getStartupsSlider(): Observable<any> {
    return this.HTTP.get<ISingleElementCoverSlider[]>(
      this.URLS.getApiUrls().MainSlider,
      { observe: "response", headers: this._header }
    );
  }

  //======================================================================

  public getEvents(): Observable<any> {
    return this.HTTP.get<IEvent[]>(this.URLS.getApiUrls().Events, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getCompetition(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().Competition, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getJury(): Observable<any> {
    return this.HTTP.get<IJury[]>(this.URLS.getApiUrls().Jury, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getSponsors(): Observable<any> {
    return this.HTTP.get<ISponsor[]>(this.URLS.getApiUrls().GetSponsors, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getTeam(): Observable<any> {
    return this.HTTP.get<ITeamMember[]>(this.URLS.getApiUrls().GetTeam, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getPlans(): Observable<any> {
    return this.HTTP.get<IPlan[]>(this.URLS.getApiUrls().GetPlans, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getStartups(): Observable<any> {
    return this.HTTP.get<IStartup[]>(this.URLS.getApiUrls().GetStartups, {
      observe: "response",
      headers: this._header,
    });
  }
  public getHomeMembers(): Observable<any> {
    return this.HTTP.get<IStartup[]>(this.URLS.getApiUrls().HomeMembers, {
      observe: "response",
      headers: this._header,
    });
  }

  public getMyStartups(): Observable<any> {
    return this.HTTP.get<IStartup[]>(this.URLS.getApiUrls().GetMyStartups, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getCountries(): Observable<any> {
    return this.HTTP.get<ICountry[]>(this.URLS.getApiUrls().GetCountries, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getStartupSectors(): Observable<any> {
    return this.HTTP.get<IStartupSector[]>(
      this.URLS.getApiUrls().GetStartupSectors,
      { observe: "response", headers: this._header }
    );
  }

  //======================================================================

  public getCoreSettings(): Observable<any> {
    return this.HTTP.get<ICoreSettings>(
      this.URLS.getApiUrls().GetCoreSettings,
      { observe: "response", headers: this._header }
    );
  }

  //======================================================================

  public subscribeNewsWithEmail(email: string): Observable<any> {
    return this.HTTP.get<any>(
      this.URLS.getApiUrls(email).SubscribeNewsWithEmail,
      { observe: "response", headers: this._header }
    );
  }

  //======================================================================

  public getAbout(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().GetAbout, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getNews(page: number = 1): Observable<any> {
    return this.HTTP.get<INews[]>(this.URLS.getApiUrls(page).News, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getNewsDetail(id: string): Observable<any> {
    return this.HTTP.get<INews>(this.URLS.getApiUrls(id).NewsDetail, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getTerms(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().Terms, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getHowItWorks(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().HowItWorks, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getHowItWorksDetail(id: string): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls(id).HowItWorksDetail, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getAllSectors(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().Sectors, {
      observe: "response",
      headers: this._header,
    });
  }

  //======================================================================

  public getAllCountries(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().Countries, {
      observe: "response",
      headers: this._header,
    });
  }
  public getQuestions(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().Questions, {
      observe: "response",
      headers: this._header,
    }).pipe(map((data) => data.body));
  }

  //======================================================================

  public newStartup(BODY): Observable<any> {
    return this.HTTP.post<any>(this.URLS.getApiUrls().NewStartup, BODY, {
      observe: "response",
      headers: this._header,
    });
  }
  public startupQuestion(BODY): Observable<any> {
    return this.HTTP.post<any>(this.URLS.getApiUrls().StartupQuestion, BODY, {
      observe: "response",
    });
  }
  public startupQuestionEdit(BODY, startup_id): Observable<any> {
    return this.HTTP.post<any>(this.URLS.getApiUrls(startup_id).StartupEdit, BODY, {
      observe: "response",
    });
  }
  public getNotifications(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().NotificationList, {
      observe: "response",
      headers: this._header,
    });
  }
  public getStartupDetail(id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls(id).StartupDetail, {
      observe: "response",
      headers: this._header,
    });
  }
  public getDashboardStartupDetail(id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls(id).DashboardstartupDetail, {
      observe: "response",
      headers: this._header,
    });
  }

  public followStartUp(id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls(id).FollowStartup, {
      observe: "response",
      headers: this._header,
    });
  }
  public getPrograms(id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls(id).AllPrograms, {
      observe: "response",
      headers: this._header,
    });
  }
  public createVideoLink(id, video): Observable<any> {
    return this.HTTP.post<any>(this.URLS.getApiUrls(id).CreateVideo, null, {
      observe: "response",
      headers: this._header,
      params: {
        video,
      },
    });
  }
  public createFiles(id, body): Observable<any> {
    return this.HTTP.post<any>(this.URLS.getApiUrls(id).CreateFile, body, {
      observe: "response",
    });
  }
  public removeFile(id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().DeleteFile, {
      observe: "response",
      headers: this._header,
      params: {
        id,
      },
    });
  }
  public joinProgram(params): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().JoinProgram, {
      observe: "response",
      headers: this._header,
      params: {
        ...params,
      },
    });
  }
  public getLikedStartups(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().FollowedStartup, {
      observe: "response",
      headers: this._header,
    });
  }
  public getMembers(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().Memberslist, {
      observe: "response",
      headers: this._header,
    });
  }
  public getJuryMembers(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().JuryTopMembers, {
      observe: "response",
      headers: this._header,
    });
  }
  public getRateLimit(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().RateLimit, {
      observe: "response",
      headers: this._header,
    });
  }
  public giveVoice(startup_id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().GiveVoice, {
      observe: "response",
      headers: this._header,
      params: {
        startup_id,
      },
    });
  }

  public joinCompetition(startup_id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().JoinCompetition, {
      observe: "response",
      headers: this._header,
      params: {
        startup_id,
        program: "musabiqe",
      },
    });
  }

  public finishVoting(startup_id): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().FinishVoting, {
      observe: "response",
      headers: this._header,
      params: {
        startup_id: startup_id.toString(),
      },
    });
  }

  /* ?api_key=abcd&startup_id=190&criteria1=1&criteria2=2&criteria3=2&criteria4=2&criteria5=2 */

  public giveVoiceForJury(body) {
    return this.HTTP.post<any>(this.URLS.getApiUrls().JuryVoiceGiving, body, {
      observe: "response",
    });
  }
  public getVoiceProps(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().VoiceProps, {
      observe: "response",
      headers: this._header,
    });
  }
  public getGivedVoices(): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().VoiceGived, {
      observe: "response",
      headers: this._header,
    });
  }
  public filterStartups(filters): Observable<any> {
    return this.HTTP.get<any>(this.URLS.getApiUrls().FilterStartups, {
      observe: "response",
      headers: this._header,
      params: filters
    });
  }

  // ViewCountPost
  // ViewCountGet

  public getPageCount(id) {
    return this.HTTP.get<any>(this.URLS.getApiUrls(id).ViewCountGet, {
      observe: "response",
      headers: this._header
    });
  }

  public postPageCount(id) {
    return this.HTTP.post<any>(this.URLS.getApiUrls().ViewCountPost, null, {
      observe: "response",
      headers: this._header,

      params: {
        startup_id: id
      }
    });
  }
} //======================================================================

export type RouteLocation = "" | "dashboard";
