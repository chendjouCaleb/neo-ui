import {Component, DOCUMENT, Inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MySwitch} from '../NeoUI';


@Component({
    selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MySwitch],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    host: {}
})
export class AppComponent {
  title = 'NeoUI';
  themeMode = this.getThemeMode();

  constructor(@Inject(DOCUMENT) protected document: Document) {
    this.toggleThemeMode(this.getThemeMode() == 'dark')
  }

  toggleThemeMode(isDark: boolean) {
    const theme = isDark ? 'dark' : 'light';
    this.themeMode = theme
    localStorage.setItem('theme', theme)

    this.document.body.classList.remove('fluent-light-theme', 'fluent-dark-theme');

    if(this.themeMode === 'dark') {
      this.document.body.classList.add('fluent-dark-theme');
    }else {
      this.document.body.classList.add('fluent-light-theme');
    }
  }

  getThemeMode(): 'dark' | 'light' {
    const darkModeItem = localStorage.getItem('theme');
    if(!darkModeItem) {
      return 'light'
    }
    if(darkModeItem.toLowerCase() === 'light') {
      return 'light'
    }
    if(darkModeItem.toLowerCase() === 'dark') {
      return 'dark'
    }
    return 'light'
  }
}
