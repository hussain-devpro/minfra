import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ServerForm } from '../../shared/components/server-form/server-form';

@Component({
  selector: 'app-schedule-assignment',
  imports: [MatButtonModule, MatExpansionModule, MatCardModule],
  templateUrl: './schedule-assignment.html',
  styleUrl: './schedule-assignment.scss',
})
export class ScheduleAssignment {
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    this.dialog.open(ServerForm);
  }
}
