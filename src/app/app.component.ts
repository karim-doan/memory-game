import { MessageService } from './message.service';
import { Component } from '@angular/core'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  messages: string[] = [];

  title = 'Memory game';

  constructor(public messageService: MessageService) {}

  clear() {
    this.messages = [];
  }

}
