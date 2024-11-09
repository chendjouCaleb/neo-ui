import {AfterContentInit, Component, ContentChildren, Input, QueryList, ViewEncapsulation} from '@angular/core';
import {TabRowItem} from './tabRowItem';

@Component({
  templateUrl: 'tabRow.html',
  selector: 'TabRow',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['tabRow.scss'],
  host: {
    class: 'tab-row'
  }
})
export class TabRow implements AfterContentInit {
  private _initialized: boolean = false;

  ngAfterContentInit(): void {
      Promise.resolve().then(() => {
        this.selectIndex(this.selectedIndex, false)
      })
  }

  @ContentChildren(TabRowItem)
  tabRowItems: QueryList<TabRowItem> | undefined


  currentTabRowItem: TabRowItem | undefined
  innerBox: DOMRect | undefined
  outerBox: DOMRect | undefined
  isHover: boolean = false

  thumbLeft: number = 0;
  thumbWidth: number = 0;

  @Input()
  set selectedIndex(value: number) {
    if(this._initialized) {
      this._selectedIndex = value;
      this.selectIndex(value, false)
    }else {
      this._selectedIndex = value
    }
  }
  get selectedIndex(): number { return this._selectedIndex}
  _selectedIndex: number = 0

  getThumbLeft(): number {
    if(this.isHover) {
      return this.currentTabRowItem?.host.offsetLeft!
    }
    return this.currentTabRowItem?.innerBoxHost.offsetLeft!
  }

  getThumbWidth(): number {
    if(this.isHover) {
      return this.currentTabRowItem?.host.offsetWidth!
    }
    return this.currentTabRowItem?.innerBoxHost.offsetWidth!
  }

  activateHover(index: number) {
    if(this._selectedIndex == index) {
      this.isHover = true
      this.setThumbRect()
    }
  }

  deactivateHover() {
    this.isHover = false
    this.setThumbRect()
  }

  selectIndex(index: number, isHover: boolean = false) {
    this.isHover = isHover
    this._selectedIndex = index
    this.currentTabRowItem = this.tabRowItems?.get(index);
    this.innerBox = this.currentTabRowItem?.innerBoxHost.getBoundingClientRect()
    this.outerBox = this.currentTabRowItem?.host.getBoundingClientRect()
    this.setThumbRect()
  }

  setThumbRect() {
    this.thumbLeft = this.getThumbLeft()
    this.thumbWidth = this.getThumbWidth()
  }
}
