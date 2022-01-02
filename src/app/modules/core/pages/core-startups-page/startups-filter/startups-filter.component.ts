import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoreService} from 'src/app/modules/shared/services/core.service';
import {
    ICountry,
    IStartupSector,
    IOption,
} from 'src/app/modules/shared/models/models';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';

declare var $: any;

//======================================================================
@Component({
    selector: 'startups-filter',
    templateUrl: './startups-filter.component.html',
    styleUrls: ['./startups-filter.component.scss'],
}) //======================================================================
export class StartupsFilterComponent implements OnInit {
    //======================================================================

    constructor(private CORE: CoreService, private _: TranslateService, private ROUTE: ActivatedRoute, private ROUTER: Router) {
        // this._getCountries_Api();
        this._getSectors_Api();
    }

    //======================================================================

    public search_key: string;
    @Input()
    startups;
    @Output() filterChange = new EventEmitter<any>();


    category: any[] = [{title: 'A', id: 'A'}, {title: 'B', id: 'B'}, {title: 'C', id: 'C'}, {title: 'D', id: 'D'}, {title: 'E', id: 'E'}];

    public sort_options: IOption[] = [
        {name: this._.instant('home.latest'), value: 'recent'},
        {name: 'A-Z', value: 'abc'},
        {name: 'Z-A', value: 'cba'}
    ];

    filter: any = {
        trending: ''
    };
    filterSelected = {
        sortSelected: {}
    };

    //======================================================================

    ngOnInit() {
        this.ROUTE.queryParams.subscribe(data => {
            if (!data.trending) {
                this.filter.trending = 'recent';
            } else {
                this.filter.trending = data.trending;
                this.sort_options.forEach(op => {
                    if (op.value === this.filter.trending) {
                        this.filterSelected.sortSelected = op;
                    }
                });
                this.filterChange.emit(data);
            }
            if (data.key) {
                this.filter.key = data.key;
                this.search_key = data.key;
            }
            if (data.key) {
                this.filter.key = data.key;
                this.search_key = data.key;
            }
            if (data.sectors) {
                if (typeof data.sectors === 'string') {
                    this.filter.sectors = [data.sectors];
                } else {
                    this.filter.sectors = data.sectors;
                }
            }
            if (data.category) {
                if (typeof data.category === 'string') {
                    this.filter.category = [data.category];
                } else {
                    this.filter.category = data.category;
                }
            }
            this.navigate();
        });
    }

    navigate() {
        this.ROUTER.navigate(['/startups'], {
            queryParams: this.filter
        });
    }

    //======================================================================

    public searchByKey(): void {
        this.filter.key = this.search_key;
        this.navigate();
    }

    //======================================================================

    public sortSelectChange(option: IOption): void {
        this.filter.trending = option.value;
        this.navigate();
    }

    //======================================================================

    public filter_holder_showing: boolean = false;

    public toggleFilterBox(): void {
        this.filter_holder_showing = !this.filter_holder_showing;
    }

    //======================================================================

    public closeFilterBox(event: MouseEvent): void {
        if (
            $(event.target).hasClass('toggle-btn') ||
            $(event.target)[0].closest('.toggle-btn') ||
            $(event.target).hasClass('link')
        ) {
        } else {
            this.filter_holder_showing = false;
        }
    }

    public closeBox() {
        this.filter_holder_showing = false;
    }

    //======================================================================

    public countries: ICountry[];

    private _getCountries_Api(): void {
        this.CORE.getCountries().subscribe(
            (RESPONSE) => {
                this.countries = RESPONSE.body;
                this.countries = this.countries.slice(0, 20);
                this.clearAllSelectedCountyTags();
            },
            (ERROR) => {
            }
        );
    }

    //======================================================================

    public sectors: IStartupSector[];

    private _getSectors_Api(): void {
        this.CORE.getStartupSectors().subscribe(
            (RESPONSE) => {
                this.sectors = RESPONSE.body;
                this.sectors = this.sectors.slice(0, 20);

                for (let i = 0; i < this.sectors.length; i++) {
                    this.sectors[i].selected = false;
                    if (this.filter.sectors) {
                        if (~this.filter.sectors.toString().indexOf(this.sectors[i].id)) {
                            this.sectors[i].selected = true;
                        }
                    }
                }
                for (let i = 0; i < this.category.length; i++) {
                    this.category[i].selected = false;
                    if (this.filter.category) {
                        if (~this.filter.category.toString().indexOf(this.category[i].id)) {
                            this.category[i].selected = true;
                        }
                    }
                }
            },
            (ERROR) => {
            }
        );
    }

    //======================================================================

    public selectCountryTag(country: ICountry): void {
        for (let i = 0; i < this.countries.length; i++) {
            if (this.countries[i].id == country.id) {
                if (this.countries[i].selected === true) {
                    this.countries[i].selected = false;
                } else {
                    this.countries[i].selected = true;
                }
                return;
            }
        }
    }

    //======================================================================

    public selectSectorTag(field, sector: IStartupSector): void {
        for (let i = 0; i < this[field].length; i++) {
            if (this[field][i].id == sector.id) {
                if (this[field][i].selected === true) {
                    this[field][i].selected = false;
                } else {
                    this[field][i].selected = true;
                }
                break;
            }
        }
        this.filterOutSelection(field);
    }

    filterOutSelection(field) {
        this.filter[field] = [];
        this[field].forEach(sc => {
            if (sc.selected) {
                this.filter[field].push(sc.id);
            }
        });
        this.navigate();
    }

    //======================================================================

    public selectAllCountyTags(): void {
        for (let i = 0; i < this.countries.length; i++) {
            this.countries[i].selected = true;
        }
    }

    //======================================================================

    public selectAllSectorTags(field): void {
        for (let i = 0; i < this[field].length; i++) {
            this[field][i].selected = true;
        }
        this.filterOutSelection(field);
    }

    //======================================================================

    public ifCountyTagSelected(): boolean {
        let has_de_selected: boolean = false;
        for (let i = 0; i < this.countries.length; i++) {
            if (this.countries[i].selected == true) {
                has_de_selected = true;
            }
        }
        return has_de_selected;
    }

    //======================================================================

    public ifSectorTagSelected(field): boolean {
        let has_de_selected: boolean = false;
        for (let i = 0; i < this[field].length; i++) {
            if (this[field][i].selected == true) {
                has_de_selected = true;
            }
        }
        return has_de_selected;
    }

    //======================================================================

    public clearAllSelectedCountyTags(): void {
        for (let i = 0; i < this.countries.length; i++) {
            this.countries[i].selected = false;
        }
    }

    //======================================================================

    public clearAllSelectedSectorTags(field): void {
        for (let i = 0; i < this[field].length; i++) {
            this[field][i].selected = false;
        }
        this.filterOutSelection(field);
    }

    serachOnEnter($event) {
        if ($event.key === 'Enter' || $event.keyCode === 13) {
            this.searchByKey();
        }
    }
} //======================================================================
