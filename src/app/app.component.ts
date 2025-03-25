import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TextFieldPage} from './textField/textField.page';
import {DropdownPage} from './dropdown/dropdown.page';
import {ContactPage} from './contact/contact.page';
import {SelectPage} from './select/select.page';
import {MySwitch} from '../NeoUI/switch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TextFieldPage, DropdownPage, ContactPage, SelectPage, RouterLink, RouterLinkActive, MySwitch],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    '[class.fluent-light-theme]': "themeMode === 'light'",
    '[class.fluent-dark-theme]': "themeMode === 'dark'",
  }
})
export class AppComponent {
  title = 'NeoUI';
  themeMode = this.getThemeMode();

  toggleThemeMode(isDark: boolean) {
    const theme = isDark ? 'dark' : 'light';
    this.themeMode = theme
    localStorage.setItem('theme', theme)
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
