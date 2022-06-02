import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AnimalService } from '../animal.service';
import { Animal } from '../animal';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {

  animals: Animal[] = []
  selectedArr: number[] = []
  score: number = 0
  bestScore: number = 0

  constructor(private animalService: AnimalService, private messageService: MessageService) { }
  @HostListener('dblclick', ['$event']) 


  ngOnInit(): void {
    this.getAnimals()
    this.messageService.messages = [];
    this.messageService.add('Notify: Welcome comeback!');
    

  }

  getAnimals(): void {
     
    const handleMixin = this.animalService.handleMixinAnimals

    

    this.animalService.getAnimals()
      .subscribe(animals => this.animals = handleMixin(animals))

  }
  
  animalClick(animal: Animal) {

 

    this.getAnimals()

    this.animalService.handleRules(animal) 
    
    this.score = this.animalService.score
    this.bestScore = this.animalService.bestScore 

  }


  
}
