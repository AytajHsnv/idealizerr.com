//======================================================================
export interface ILogin {
  email: string;
  password: string;
}
//======================================================================
export interface ISignup {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone_number: string;
  terms_accepted: boolean;
  // current_competition: string;
}
//======================================================================
export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  user_birthday: number;
  user_gender: string;
  user_file: string;
  user_info: string;
  email_verified_at: boolean;
  user_phone: string;
  user_role: string;
  user_status: number;
  user_check: string;
  created_at: string;
  updated_at: string;
}
//======================================================================
export interface ISingleElementCoverSlider {
  id: string;
  title: string;
  description: string;
  button_text: string;
  button_color: string;
  button_background_color: string;
  button_url: string;
  layout_image: string;
  front_circle_color: string;
  back_circle_color: string;
  status: number;
  slide_must: number;
  created_at: string;
  updated_at: string;
  duration: number;
}
//======================================================================
export interface IEvent {
  id: string;
  image: string;
  title: string;
  date: string;
  created_at: string;
  updated_at: string;
}
//======================================================================
export interface IPageNavigationSection {
  section_id: string;
  title: string;
}
//======================================================================
export interface IJury {
  id: string;
  name: string;
  email: string;
  user_birthday: string;
  user_gender: string;
  user_file: string;
  user_info: string;
}
//======================================================================
export interface ISponsor {
  id: string;
  title: string;
  file: string;
  description: string;
  created_at: string;
  updated_at: string;
}
//======================================================================
export interface ITeamMember {
  id: string;
  teams_title: string;
  teams_description: string;
  teams_logo: string;
  created_at: string;
  updated_at: string;
}
//======================================================================
export interface ICountry {
  id: string;
  name: string;
  selected?: boolean;
}
//======================================================================
export interface IStartupSector {
  id: string;
  title: string;
  selected?: boolean;
}
//======================================================================
export interface IAuthSettings {
  login: IAuthSetting;
  signup: IAuthSetting;
  recovery_email: IAuthSetting;
  recovery_password: IAuthSetting;
  recovery_success: IAuthSetting;
}
export interface IAuthSetting {
  id: string;
  image: string;
  title: string;
  description: string;
  category: string;
}
export interface ICoreSettings {
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    telegram: string;
    youtube: string;
  };
  contact: {
    email: string;
    address: string;
    phone: string;
  };
}
//======================================================================
export interface IStartup {
  id: string;
  title: string;
  image: string;
  cover_image: string;
  description: string;
  country: {
    code: string;
    name: string;
  };
  jury_vote: number;
  category?: any;
  startup_vote: number;
  rank: number;
  url?: string;
  sectors?: IStartupSector[];
  admin_check?: number;
  status?: string;
  followed?: boolean;
  mystartup?: boolean;
}
//======================================================================
export type TNotification = "success" | "danger" | "warning";
export interface INotify {
  id?: string;
  text: string;
  status: TNotification;
  hold?: boolean;
}
//======================================================================
export type TLanguage = "az" | "en" | "ru";
//======================================================================
export interface IAbout {
  about_us: IAboutMainUs[];
  about_content: IAboutMainSection[];
}
//======================================================================
export interface IAboutMainSection {
  id: string;
  title: string;
  description: string;
  image: string;
}
//======================================================================
export interface IAboutMainUs {
  id: string;
  title: string;
  description: string;
  image: string;
  Description: string;
  video: string;
  created_at: string;
  updated_at: string;
}
//======================================================================
export interface INews {
  id: string;
  title: string;
  image: string;
  description: string;
}
//======================================================================
export interface IPagination {
  current_page: number;
  per_page: number;
  total: number;
}
//======================================================================
export interface ITerms {
  id: string;
  title: string;
  description: string;
}
//======================================================================
export interface IHowItWorks {
  id: string;
  title: string;
  icon: string;
}
export interface IHowItWorksDetail {
  id: string;
  title: string;
  image: string;
  description: string;
}
//======================================================================
export interface IOption {
  name: string;
  value: string;
  selected?: boolean;
  inputName?: string;
}
//======================================================================
export interface Competition {
  konkurs: {
    id: string;
    konkurs_title: string;
    konkurs_prize: string;
    konkurs_description: string;
    konkurs_video: string;
    konkurs_image: string;
    konkurs_terms_of_participation: string;
    konkurs_status: string;
    konkurs_start_date: string;
    konkurs_end_date: string;
    created_at: string;
    updated_at: string;
  }[];
  action_plans: IPlan[];
  timer: {
    konkurs_id: string;
    start_date: number;
    end_date: number;
  };
  amount_of_prize: { amount_of_prize: string };
  amount_of_members: { amount_of_members: string };
}
//======================================================================
export interface IPlan {
  id: string;
  action_title: string;
  action_description: string;
  action_icon: string;
  action_start_day: number;
  action_end_day: number;
  konkurs_id: number;
  created_at: string;
  updated_at: string;
  status: string;
  status_front: string;
}
//======================================================================
export interface ISector {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}
//======================================================================

export interface INewStartup {
  id: string;
  title: string;
  description: string;
  idea: string;
  color: string;
  video: string;
  website: string;
  image: string;
  logo: string;
  team: string;
  country: string;
  sector: string;
  draft: true;
}
