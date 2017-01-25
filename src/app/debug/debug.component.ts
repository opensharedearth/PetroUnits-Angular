import { Component } from '@angular/core';
@Component({
  templateUrl: './debug.component.html'
})
export class DebugComponent { 
  parse(event: KeyboardEvent) {
    if ( /[0-9a-z\s]/.test(event.key) && event.key.length === 1) {
      console.log(event.key);
    } else {
      console.log('Fuck that key' + ' - ' + event.key);
    }
    doIgnoreKey(event.key);
    function doIgnoreKey(key) { // ignore arrow keys
      if (key.substr(0, 5) === 'Arrow') {
        console.log('key ignored');
      }
    }
  }
}