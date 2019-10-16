import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule, MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatSortModule,
  ]
})
export class MaterialModule { }
