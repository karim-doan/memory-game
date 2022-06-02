import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  isPlaySelected: boolean = false;
  isAlbumSelected: boolean = false;

  constructor(private animalService: AnimalService) {}

  ngOnInit(): void {}

  isCheckNav(type: string): void {
    if(type == "play") {
      this.isPlaySelected = true 
      this.isAlbumSelected = false
    }
    if(type == "album") {
      this.isPlaySelected = false 
      this.isAlbumSelected = true
    }
  }
}
