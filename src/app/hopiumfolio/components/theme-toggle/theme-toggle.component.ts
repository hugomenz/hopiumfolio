import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService, Theme } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit, OnDestroy {
  currentTheme: Theme = 'dark';
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.getTheme()
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  get isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  get themeIcon(): string {
    return this.isDarkTheme ? 'light_mode' : 'dark_mode';
  }

  get themeLabel(): string {
    return this.isDarkTheme ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
}
