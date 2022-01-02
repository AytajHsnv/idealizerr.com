import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  ICountryDialCode,
  countries_dial_code_list,
} from "./countries-dial-code-list";
//======================================================================
@Component({
  selector: "ngx-ea-intl-tel-input",
  templateUrl: "./ngx-ea-intl-tel-input.component.html",
  styleUrls: ["./ngx-ea-intl-tel-input.component.scss"],
}) //======================================================================
export class NgxEaIntlTelInputComponent implements OnInit {
  //======================================================================

  constructor() {
    this.countries_dial_code_list = countries_dial_code_list;
    this.search_result_list = this.countries_dial_code_list;
  }

  //======================================================================

  @Input("hideCountriesDialCodeList")
  public hide_countries_dial_code_list: string[];
  @Input()
  public disabled;

  @Input("placeholder")
  public placeholder: string;

  @Input()
  public signUpVersion;

  @Input("searchPlaceholder")
  public search_placeholder: string;

  @Input("label")
  public label: string;

  @Input("countries")
  countries;

  @Input("formVersion")
  formVersion;

  @Input("choose")
  choose: string;

  @Input("value")
  public value: string;

  @Output("value")
  public valueEmitter: EventEmitter<any> = new EventEmitter();

  //======================================================================

  public countries_dial_code_list: ICountryDialCode[];
  public search_result_list: ICountryDialCode[];
  public selected: ICountryDialCode;
  public phone_number: string;
  public search_key: string;
  public show_options: boolean = false;

  //======================================================================

  ngOnInit() {
    if (this.formVersion) {
      this.countries_dial_code_list = this.countries;
      this.search_result_list = this.countries_dial_code_list;
      if (this.value) {
        for (let i = 0; i < this.countries_dial_code_list.length; i++) {
          if (
            this.value.toLowerCase() ===
            this.countries_dial_code_list[i].country_code.toLowerCase()
          ) {
            this.selected = this.countries_dial_code_list[i];
          }
        }
      }
    } else {
      this.countries_dial_code_list = countries_dial_code_list;
      this.search_result_list = this.countries_dial_code_list;
    }
  }

  //======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formVersion) {
      return;
    }
    if (this.hide_countries_dial_code_list && this.countries_dial_code_list) {
      this.removeDialCodeFromList(this.hide_countries_dial_code_list);
    }
    if (this.countries_dial_code_list && this.value) {
      this.findDialCodeInNumber("+" + this.value);
    } else {
      this.selected = this.countries_dial_code_list[14];
    }

    if (!this.selected) {
      this.selected = this.countries_dial_code_list[14];
    }
  }

  //======================================================================

  private findDialCodeInNumber(number: string): void {
    for (let i = 0; i < this.countries_dial_code_list.length; i++) {
      if (
        number.slice(0, 5).includes(this.countries_dial_code_list[i].dial_code)
      ) {
        this.selected = this.countries_dial_code_list[i];
        this.phone_number = number.replace(this.selected.dial_code, "");
      }
    }
  }

  //======================================================================

  public removeDialCodeFromList(list: string[]): void {
    for (let i = 0; i < this.countries_dial_code_list.length; i++) {
      for (let a = 0; a < list.length; a++) {
        if (this.countries_dial_code_list[i].code == list[a]) {
          this.countries_dial_code_list.splice(i, 1);
        }
      }
    }
  }

  //======================================================================

  public search(): void {
    this.search_result_list = [];
    for (let i = 0; i < this.countries_dial_code_list.length; i++) {
      if (this.formVersion) {
        if (
          this.countries_dial_code_list[i].country_name
            .toLocaleLowerCase()
            .includes(this.search_key.toLocaleLowerCase())
        ) {
          this.search_result_list.push(this.countries_dial_code_list[i]);
        }
      } else {
        if (
          this.countries_dial_code_list[i].name
            .toLocaleLowerCase()
            .includes(this.search_key.toLocaleLowerCase())
        ) {
          this.search_result_list.push(this.countries_dial_code_list[i]);
        }
      }
    }
  }

  //======================================================================

  public toggleDropdown(): void {
    this.show_options = !this.show_options;
  }

  //======================================================================

  public closeDropdown(e?): void {
    this.show_options = false;
  }

  //======================================================================

  public select(item: ICountryDialCode): void {
    this.search_key = null;
    this.search_result_list = this.countries_dial_code_list;
    this.closeDropdown();
    this.selected = item;
    this.emitValue();
  }

  //======================================================================

  public numberInputChange(): void {
    this.emitValue();
  }

  //======================================================================
  preventE(event) {
    if (event.which === 101) {
      event.preventDefault();
    }
  }
  public emitValue(): void {
    if (this.formVersion) {
      this.valueEmitter.emit(this.selected);
    } else if (this.signUpVersion) {
      if (this.phone_number === null) {
        this.valueEmitter.emit(null);
      } else {
        this.valueEmitter.emit(this.selected.dial_code + this.phone_number);
      }
    } else {
      this.valueEmitter.emit(this.selected.dial_code + this.phone_number);
    }
  }
} //======================================================================
