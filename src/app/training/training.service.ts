import {Injectable} from '@angular/core';
import {Exercise} from './exercise.model';
import {Subject, Subscription} from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import {filter, map} from 'rxjs/operators';
import {UserIdService} from '../user-id.service';
import {UiService} from '../shared/ui.service';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  // tslint:disable-next-line:variable-name
  private _availableExercises: Exercise[] = [];
  // tslint:disable-next-line:variable-name
  private _runningExercise: Exercise = null;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSubs: Subscription[] = [];
  // tslint:disable-next-line:variable-name
  constructor(
    private db: AngularFirestore,
    private userIdService: UserIdService,
    private uiService: UiService
  ) { }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update()
    this._runningExercise = this._availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChanged.next({
      ...this._runningExercise
    });
  }
  completeExercise() {
    this.addDataToDatabase({
      ...this._runningExercise,
      date: new Date(),
      state: 'completed',
      owner: this.userIdService.userId
    });
    this.uiService.showSnackbar("Great Job!", "OK", 5000);
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this._runningExercise,
      date: new Date(),
      state: 'canceled',
      duration: this._runningExercise.duration * (progress / 100),
      calories: this._runningExercise.calories * (progress / 100),
      owner: this.userIdService.userId
    });
    this._runningExercise = null;
    this.exerciseChanged.next(null);
  }
  fetchAvailableExercises() {
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      ).subscribe((exercises: Exercise[]) => {
        this._availableExercises = exercises;
        this.exercisesChanged.next([...this._availableExercises]);
    }, error => {
        this.uiService.showSnackbar('Something happened. Please try again later', null, 3000);
      }));
  }

  getFinishedExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      exercises = exercises.filter(exercise => exercise.owner === this.userIdService.userId);
      exercises.map(exercise => ({
        ...exercise,
        date: exercise.date
      }))
      this.finishedExercisesChanged.next(exercises);
    }));
  }
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
  get runningExercise(): Exercise {
    return {...this._runningExercise};
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
