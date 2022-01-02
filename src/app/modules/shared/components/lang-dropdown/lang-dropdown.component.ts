import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TLanguage, IOption } from '../../models/models';
//======================================================================
@Component({
  selector: 'lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.scss']
})//======================================================================



export class LangDropdownComponent implements OnInit {
//======================================================================

  constructor(
    private LANGUAGE: LanguageService
  ) {
    this.lang = this.LANGUAGE.current_lang;
    for (let i = 0; i < this.lang_options.length; i++) {
      if(this.lang_options[i].value == this.lang){
        this.selected_lang_option = this.lang_options[i];
      }
    }
  }

//======================================================================

  ngOnInit() {}

//======================================================================

  public selected_lang_option:IOption;
  public lang_options:IOption[] = [
    // {name:"AZ",value:"az"},
    {name:"EN",value:"en"}
  ]

//======================================================================

  public switchLang(lang:TLanguage):void {
    this.LANGUAGE.switchLang(lang)
  }

//======================================================================

  public lang:TLanguage;
  public langSelectChange(option:IOption):void {
    this.lang = option.value as TLanguage
    this.switchLang(this.lang);
  }

}//======================================================================
