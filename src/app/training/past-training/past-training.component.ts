import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Exercise} from '../exercise.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TrainingService} from '../training.service';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  finSub: Subscription;

  constructor(
    private trainingService: TrainingService
  ) {
  }

  ngOnInit() {
    this.finSub = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      // console.log(exercises.)
      this.dataSource.data = exercises;
    });
    this.trainingService.getFinishedExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.finSub.unsubscribe();
  }
}
