import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
} from "@angular/core";
import { IOption } from "../../models/models";
//======================================================================
@Component({
  selector: "ui-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
}) //======================================================================
export class SelectComponent implements OnInit {
  //======================================================================

  constructor() {}

  //======================================================================

  public show_options: boolean = false;

  //======================================================================
  @Input()
  hideScroll: boolean;
  @Input("label")
  public label: string;

  @Input("icon")
  public icon: string = "mdi mdi-menu-down";

  @Input("class")
  public class: string;

  @Input()
  public name: string;

  @Input("selected")
  public default_selected: IOption;

  @Input("placeholder")
  public placeholder: string;

  @Input("options")
  public options: IOption[];

  @Output("value")
  public valueEmitter: EventEmitter<IOption> = new EventEmitter();

  //======================================================================

  ngOnInit() {}

  //======================================================================

  ngOnChanges(changes: SimpleChanges): void {
    if (this.default_selected) {
      this.selected = this.default_selected;
    }
  }

  //======================================================================

  public toggleDropdown(): void {
    this.show_options = !this.show_options;
  }

  //======================================================================

  public closeDropdown(e): void {
    this.show_options = false;
  }

  //======================================================================

  public selected: IOption;
  public select(option: IOption): void {
    this.toggleDropdown();
    this.selected = option;
    this.valueEmitter.emit({
      ...this.selected,
      inputName: this.name,
    });
  }
} //======================================================================
