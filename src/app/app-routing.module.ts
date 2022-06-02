import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalsComponent } from './animals/animals.component';
import { AnimalDetailComponent } from './animal-detail/animal-detail.component';
import { StoreImageComponent } from './store-image/store-image.component';

const routes: Routes = [ 
 
  { path: 'detail/:id', component: AnimalDetailComponent },
  { path: 'albums', component: StoreImageComponent },
  { path: '', component: AnimalsComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
