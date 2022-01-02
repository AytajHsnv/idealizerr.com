import { Injectable }       from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { variables } from 'src/environments/variables';
import { TLanguage } from '../models/models';
@Injectable({ providedIn: 'root' })
//======================================================================


export class LanguageService {
//======================================================================

  constructor(
    private TRANSLATE: TranslateService,
    private TITLE: Title,
    ) {
    //SET INITIAL LANGUAGE 
    this._setDefaultLang(this.current_lang);
  }

//======================================================================

  //INITIAL LANGUAGE
  public current_lang:TLanguage = 'en';
  
//======================================================================

  private _setDefaultLang(lang: TLanguage) {
    if(localStorage.getItem(variables.local_storage.language)){
      lang = localStorage.getItem(variables.local_storage.language) as TLanguage;
      this.current_lang = lang;
    }
    else{
      lang = lang;
    }
    localStorage.setItem(variables.local_storage.language,lang);
    this.TRANSLATE.setDefaultLang(lang);
    this.TRANSLATE.use(lang);
  }

//======================================================================

  public switchLang(language: string) :void {
    this.TRANSLATE.use(language);
    localStorage.setItem(variables.local_storage.language, language);
    window.location.reload();
  }

//======================================================================

  public setPageTitle(translate_key:string) :void {
    let text:string = this.TRANSLATE.instant(translate_key);
    if(!text.includes("title")){
      this.TITLE.setTitle(text);
    }
    else{
      setTimeout(() => {
        text = this.TRANSLATE.instant(translate_key);
        this.TITLE.setTitle(text);
      }, 400);
    }
  }

}//======================================================================
