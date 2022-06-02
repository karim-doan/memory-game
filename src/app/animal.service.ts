import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Animal } from './animal';
import { Picture } from './picture';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private animalUrl = 'http://localhost:3003/animals'; // URL to web api -- JSON server

  animals: Animal[] = [];
  animal: Animal | undefined;
  pictures: Picture[] = [];
  selectedArr: number[] = [];
  score: number = 0;
  bestScore: number = 0;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET heroes from the server */
  getAnimals(): Observable<Animal[]> {
    console.log('api animal');

    return this.http.get<Animal[]>(this.animalUrl);
  }

  /** POST: add a new animal to the server */
  addAnimal(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.animalUrl, animal, this.httpOptions);
  }

  getAnimal(id: number): Observable<Animal> {
    const url = `${this.animalUrl}/${id}`;
    console.log('get animal');

    return this.http.get<Animal>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Animal>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateAnimal(animal: Animal): Observable<any> {
    const url = `${this.animalUrl}/${animal.id}`;
    return this.http.put(url, animal, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${animal.id}`)),
      catchError(this.handleError<any>('updateAnimal'))
    );
  }

  /** DELETE: delete the animal from the server */
  deleteAnimal(id: number): Observable<Animal> {
    const url = `${this.animalUrl}/${id}`;

    return this.http.delete<Animal>(url, this.httpOptions);
  }

  //  ------------------------------------------------------------------------------------
  //  -------------------------------------- Method ---------------------------------------
  //  ------------------------------------------------------------------------------------
  // extended function : mixin all of pictures
  public handleMixinAnimals(obj: Animal[]) {
    const randomIndex = function (length: number): number {
      return Math.floor(Math.random() * length);
    };

    let x = 0;
    let mixIndexArray: number[] = [];
    let arrRS: Animal[] = [];

    while (x < obj.length) {
      const y = randomIndex(obj.length);
      if (!mixIndexArray.includes(y)) {
        let item = obj[y];
        mixIndexArray.push(y);
        x++;
      }
    }

    mixIndexArray.map((index) => arrRS.push(obj[index]));

    return [...arrRS];
  }

  /**
   * set up rule for a memory game.
   * @param animal: get animal info,
   * @returns
   */
  handleRules(animal: Animal): void {
    let bestPoint = Math.max(this.bestScore, this.score);

    //game over
    if (this.selectedArr.includes(animal.id)) {
      //reset point
      this.selectedArr = [];
      this.score = 0;
      this.messageService.add('Notify: Game Over');

      // check your new best point
      this.bestScore < bestPoint
        ? (this.bestScore = bestPoint)
        : this.bestScore;
      this.messageService.add('Notify: Your have a new best score' + bestPoint);

      return;
    }

    // win  game
    if (this.score == 12) {
      this.selectedArr = [];
      this.score = 0;
      console.log('you win!!');
      this.messageService.add('Notify: You Win!!');
    }
    // good point
    this.score++;
    this.selectedArr.push(animal.id);
  }
}
