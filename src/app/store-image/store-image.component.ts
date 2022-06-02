import { AnimalService } from './../animal.service';
import { Animal } from './../animal';
import { Component, OnInit } from '@angular/core';
import { Picture, PictureImport } from '../picture'; 


@Component({
  selector: 'app-store-image',
  templateUrl: './store-image.component.html',
  styleUrls: ['./store-image.component.scss']
})
export class StoreImageComponent implements OnInit {

  pictures: Picture[] =[]
  picture: PictureImport = {
    name: '',
    image: '',
  } 
  stateAddOptions: boolean = true;

  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
    this.getAnimals()
  }


  
  getAnimals(): void {
    
    this.animalService.getAnimals()
      .subscribe(pictures => this.pictures = pictures)
  }
  
  add(picture: Picture): void { 

    // assign the picture id 
    picture.id = picture.id + 1
    
    if (!picture) { return; }
    this.animalService.addAnimal( <Picture>picture )
      .subscribe(picture => {
        this.pictures.push(picture);
      })  

    this.toggleAnimalForm()
  }

  delete(picture: Animal): void {
    this.pictures = this.pictures.filter(p => p !== picture);
    this.animalService.deleteAnimal(picture.id).subscribe();
  }

  public toggleAnimalForm() {
     
    if(this.stateAddOptions == true) {

      return this.stateAddOptions = false;
    } else {
      return this.stateAddOptions = true;
    } 
  }
}
