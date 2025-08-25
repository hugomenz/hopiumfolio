import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('dark');
  private readonly THEME_KEY = 'hopium-theme';

  constructor() {
    // Load theme from localStorage or default to dark
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
    if (savedTheme) {
      this.themeSubject.next(savedTheme);
    }
    this.applyTheme(this.themeSubject.value);
  }

  getTheme(): Observable<Theme> {
    return this.themeSubject.asObservable();
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    this.applyTheme(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    
    // Remove existing theme classes
    body.classList.remove('dark-theme', 'light-theme');
    
    // Add new theme class
    body.classList.add(`${theme}-theme`);
    
    // Update CSS custom properties for theme
    if (theme === 'light') {
      document.documentElement.style.setProperty('--primary-bg', '#ffffff');
      document.documentElement.style.setProperty('--secondary-bg', '#f5f5f5');
      document.documentElement.style.setProperty('--text-primary', '#000000');
      document.documentElement.style.setProperty('--text-secondary', '#666666');
      document.documentElement.style.setProperty('--border-color', '#e0e0e0');
      document.documentElement.style.setProperty('--card-bg', '#ffffff');
      document.documentElement.style.setProperty('--table-bg', '#fafafa');
    } else {
      document.documentElement.style.setProperty('--primary-bg', '#010a01');
      document.documentElement.style.setProperty('--secondary-bg', '#171816');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#737373');
      document.documentElement.style.setProperty('--border-color', 'rgba(157, 0, 255, 0.2)');
      document.documentElement.style.setProperty('--card-bg', '#171816');
      document.documentElement.style.setProperty('--table-bg', 'rgba(255, 255, 255, 0.02)');
    }
  }

  isDarkTheme(): boolean {
    return this.themeSubject.value === 'dark';
  }

  isLightTheme(): boolean {
    return this.themeSubject.value === 'light';
  }
}