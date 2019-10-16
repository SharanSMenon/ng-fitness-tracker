import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSub: Subscription;
  selectedExercise = '';
  constructor(
    private trainingService: TrainingService
  ) {}

  ngOnInit() {
    // this.exercises = this.trainingService.availableExercises;
    this.exerciseSub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining() {
    this.trainingService.startExercise(this.selectedExercise);
  }
  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }

}
