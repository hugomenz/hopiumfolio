import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiCoingeckoService } from '../../services/api-coingecko.service';
import { Subject, takeUntil, startWith, map } from 'rxjs';
import { CurrencySelectedService } from '../../services/currency-selected.service';
import { NewRowService } from '../../services/new-row.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
})
export class CurrencyComponent implements OnInit, OnDestroy {
  currencySelected = new FormControl('usd');
  currencyList: string[] = [];
  filteredCurrency!: Observable<string[]>;
  private destroy$ = new Subject<void>();

  constructor(
    private _coinGecko: ApiCoingeckoService,
    public _currencySelected: CurrencySelectedService,
    private _newRowService: NewRowService
  ) {}

  ngOnInit(): void {
    // Set initial value from service
    this.currencySelected.setValue(this._currencySelected.currencySelected);

    // Load currency list from API
    this._coinGecko.getCurrencyList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.currencyList = Array.isArray(data) ? data : Object.values(data);
        this.setupFilteredCurrency();
      });

    // Subscribe to currency selection changes
    this.currencySelected.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((selectedCurrency) => {
        if (selectedCurrency && selectedCurrency !== this._currencySelected.currencySelected) {
          this._currencySelected.updateCurrency(selectedCurrency);
          this.refreshPortfolioData();
        }
      });

    // Subscribe to currency service changes
    this._currencySelected.getCurrency()
      .pipe(takeUntil(this.destroy$))
      .subscribe((currency) => {
        if (this.currencySelected.value !== currency) {
          this.currencySelected.setValue(currency, { emitEvent: false });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFilteredCurrency(): void {
    this.filteredCurrency = this.currencySelected.valueChanges.pipe(
      startWith(''),
      map((curr) => curr ? this.filterCurrencyList(curr) : this.currencyList.slice())
    );
  }

  filterCurrencyList(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.currencyList.filter(curr => 
      curr.toLowerCase().includes(filterValue) ||
      this._currencySelected.getCurrencyName(curr).toLowerCase().includes(filterValue)
    );
  }

  displayWith(value: string): string {
    if (value !== undefined && value !== null) {
      return `${value.toUpperCase()} - ${this._currencySelected.getCurrencyName(value)}`;
    }
    return value;
  }

  getCurrencySymbol(currency: string): string {
    return this._currencySelected.getCurrencySymbol(currency);
  }

  refreshPortfolioData(): void {
    // Refresh portfolio data when currency changes
    if (!this._newRowService.isEmpty && 
        this._currencySelected.previousCurrency !== '' &&
        this._currencySelected.previousCurrency !== this._currencySelected.currencySelected) {
      
      // Update all portfolio items with new currency
      this._newRowService.refreshAllRowsWithNewCurrency();
    }
  }

  get currentCurrencySymbol(): string {
    return this.getCurrencySymbol(this._currencySelected.currencySelected);
  }

  get currentCurrencyName(): string {
    return this._currencySelected.getCurrencyName(this._currencySelected.currencySelected);
  }
}
