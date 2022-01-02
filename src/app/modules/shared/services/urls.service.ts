import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
@Injectable({ providedIn: "root" })
//======================================================================
export class UrlsService {
  //======================================================================

  constructor() {}

  //======================================================================

  private ROOT_URL: string = environment.api_base_url;
  private API_KEY: string = environment.api_key;

  //======================================================================

  public getApiUrls(param1: any = "", param2: any = "", param3: any = "") {
    if (param1.length && param1.includes(" ")) {
      param1 = encodeURIComponent(param1);
    }
    if (param2.length && param2.includes(" ")) {
      param2 = encodeURIComponent(param2);
    }
    if (param3.length && param3.includes(" ")) {
      param3 = encodeURIComponent(param3);
    }
    return {
      //AUTH ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      Login: "" + this.ROOT_URL + "auth/login",
      Logout: "" + this.ROOT_URL + "auth/logout",
      Signup: "" + this.ROOT_URL + "auth/signup",
      User: "" + this.ROOT_URL + "auth/me",
      RecoveryEmail: "" + this.ROOT_URL + "auth/password/reset?" + param1 + "",
      RecoveryPassword: "" + this.ROOT_URL + "auth/password/recovery",
      AuthSettings: "" + this.ROOT_URL + "auth/settings?" + this.API_KEY,

      //CORE ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      GetSponsors: "" + this.ROOT_URL + "core/partners?" + this.API_KEY,
      GetTeam: "" + this.ROOT_URL + "core/team?" + this.API_KEY,
      GetCoreSettings: "" + this.ROOT_URL + "core/settings?" + this.API_KEY,
      SubscribeNewsWithEmail:
        "" + this.ROOT_URL + "core/subscribe?email=" + param1 + "",
      GetAbout: "" + this.ROOT_URL + "core/about?" + this.API_KEY,
      News: "" + this.ROOT_URL + "core/news?" + param1 + "&" + this.API_KEY,
      NewsDetail:
        "" + this.ROOT_URL + "core/news/" + param1 + "?" + this.API_KEY,
      Terms: "" + this.ROOT_URL + "core/terms?" + this.API_KEY,
      HowItWorks: "" + this.ROOT_URL + "core/howitworks?" + this.API_KEY,
      HowItWorksDetail:
        "" + this.ROOT_URL + "core/howitworks/" + param1 + "?" + this.API_KEY,
      Jury: "" + this.ROOT_URL + "JuriApi?" + this.API_KEY,
      Events: "" + this.ROOT_URL + "TimelineApi?" + this.API_KEY,
      MainSlider: "" + this.ROOT_URL + "SliderApi?" + this.API_KEY,
      Competition: "" + this.ROOT_URL + "KonkursApi?" + this.API_KEY,
      Sectors: "" + this.ROOT_URL + "api/sectors/all?" + this.API_KEY,
      Countries: "" + this.ROOT_URL + "api/country/all?" + this.API_KEY,
      Questions:
        "" + this.ROOT_URL + "startup/application/questions?" + this.API_KEY,

      //USER ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      UserPhoto: "" + this.ROOT_URL + "core/userImage",
      UserInfo: "" + this.ROOT_URL + "core/userInfo?" + this.API_KEY,
      UserPassword: "" + this.ROOT_URL + "core/userPassword?" + this.API_KEY,
      UserMobileNumber: "" + this.ROOT_URL + "core/userMobile?number=" + param1,

      //USER ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
      NewStartup:
        "" + this.ROOT_URL + "startup/new/information?" + this.API_KEY,
      StartupQuestion: "" + this.ROOT_URL + "startup/new?" + this.API_KEY,
      StartupDetail:
        "" + this.ROOT_URL + "startup/all/" + param1 + "?" + this.API_KEY,
      DashboardstartupDetail:
        "" + this.ROOT_URL + "startup/" + param1 + "?" + this.API_KEY,
      NotificationList:
        "" + this.ROOT_URL + "core/notification?" + this.API_KEY,
      ReadNotifications:
        "" + this.ROOT_URL + "read/all/notifications?" + this.API_KEY,
      Programs: "" + this.ROOT_URL + "programs/all?" + this.API_KEY,

      // GetMainSlider:                      "" + this.ROOT_URL + "users/" + param1 + "",
      // GetEvents:                          "" + this.ROOT_URL + "users/" + param1 + "",
      // GetJury:                            "" + this.ROOT_URL + "users/" + param1 + "",
      // GetPlans:                           "" + this.ROOT_URL + "users/" + param1 + "",
      // GetStartups:                        "" + this.ROOT_URL + "users/" + param1 + "",
      // GetCountries:                       "" + this.ROOT_URL + "users/" + param1 + "",
      /*
      https://www.onsideball.com/InnoProject/startups/filter?countries=&trending=recent&sectors=15&key=axtaris

      Post : http://www.onsideball.com/InnoProject/api/startup/view?startup_id=270
      Get: http://www.onsideball.com/InnoProject/api/startup/view/count/270
      */
     ViewCountPost: '' + this.ROOT_URL + "api/startup/view?" + this.API_KEY,
     ViewCountGet: '' + this.ROOT_URL + "api/startup/view/count/" + param1 + '?' + this.API_KEY,
        FilterStartups: "" + this.ROOT_URL + "startups/filter?" + this.API_KEY,
     JuryVoiceGiving: "" + this.ROOT_URL + "competition/startup/juri/give/voice?" + this.API_KEY ,
      HomeMembers:
        "" + this.ROOT_URL + "competition/startup/list/all?" + this.API_KEY,
      VoiceGived:
        "" + this.ROOT_URL + "competition/voice/gived/list?" + this.API_KEY,
      VoiceProps:
        "" + this.ROOT_URL + "competition/voicegive/user/start?" + this.API_KEY,
      JuryTopMembers:
        "" + this.ROOT_URL + "competition/startup/list/forJuri?" + this.API_KEY,
      MembersCount:
        "" + this.ROOT_URL + "competition/members/count?" + this.API_KEY,
      Memberslist: "" + this.ROOT_URL + "competition/members?" + this.API_KEY,
      CompetitorsCount:
        "" + this.ROOT_URL + "startup/applicants/count?" + this.API_KEY,
      GiveVoice: "" + this.ROOT_URL + "competition/give/voice?" + this.API_KEY,
      RateLimit: "" + this.ROOT_URL + "konkurs/voice/limit?" + this.API_KEY,
      DeleteFile: "" + this.ROOT_URL + "startup/delete/files?" + this.API_KEY,
      JoinProgram:
        "" + this.ROOT_URL + "startup/apply/programs?" + this.API_KEY,
      FinishVoting:
        "" + this.ROOT_URL + "competition/give/voice?" + this.API_KEY,
      JoinCompetition:
        "" + this.ROOT_URL + "startup/apply/competition?" + this.API_KEY,
      CreateFile:
        "" + this.ROOT_URL + "startup/" + param1 + "/files?" + this.API_KEY,
      FollowedStartup:
        "" + this.ROOT_URL + "startup/follow/list?" + this.API_KEY,
      AllPrograms: "" + this.ROOT_URL + "programs/all?" + this.API_KEY,
      CreateVideo:
        "" +
        this.ROOT_URL +
        "startup/" +
        param1 +
        "/information?" +
        this.API_KEY,

      GetEvents: "/assets/json/events.json",
      StartupEdit: this.ROOT_URL + 'startup/'+ param1 +'/information?' + this.API_KEY,
      GetJury: "/assets/json/jury.json",
      // GetSponsors:                        "/assets/json/sponsors.json",
      // GetTeam:                            "/assets/json/team.json",
      GetPlans: "/assets/json/plans.json",
      GetStartups: "" + this.ROOT_URL + "Startups/StartupsApi?" + this.API_KEY,
      GetMyStartups: "" + this.ROOT_URL + "startup/mystartups?" + this.API_KEY,
      GetCountries: "" + this.ROOT_URL + "api/country_filter?" + this.API_KEY,
        GetStartupSectors: "" + this.ROOT_URL + "api/sectors/all?" + this.API_KEY,
      FollowStartup:
        "" + this.ROOT_URL + "startup/" + param1 + "/follow?" + this.API_KEY,
    };
  }
} //======================================================================
