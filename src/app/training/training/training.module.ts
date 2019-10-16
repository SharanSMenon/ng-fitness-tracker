import {NgModule} from '@angular/core';
import {StopTrainingComponent} from '../current-training/stop-training/stop-training.component';
import {TrainingComponent} from '../training.component';
import {CurrentTrainingComponent} from '../current-training/current-training.component';
import {NewTrainingComponent} from '../new-training/new-training.component';
import {PastTrainingComponent} from '../past-training/past-training.component';
import {SharedModule} from '../../shared/shared/shared.module';
import {RouterModule, Routes} from '@angular/router';


const trainingRoutes: Routes = [
  {
    path: '',
    component: TrainingComponent,
  }
];

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    StopTrainingComponent,
    PastTrainingComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(trainingRoutes),
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {
}
