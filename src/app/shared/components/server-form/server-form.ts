import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { filter, switchMap } from 'rxjs';
import { IRebootRequest } from '../../../core/interfaces/reboot-request.interface';
import { IServer } from '../../../core/interfaces/server.interface';
import { Server } from '../../../core/services/server';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-server-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './server-form.html',
  styleUrl: './server-form.scss',
  providers: [provideNativeDateAdapter()],
})
export class ServerForm implements OnInit {
  servers = inject(Server);
  dialog = inject(MatDialog);
  snackbar = inject(MatSnackBar);
  serverList: IServer[] = [];
  today = new Date();
  private formBuilder = inject(FormBuilder);

  serverRebootForm: FormGroup = this.formBuilder.group({
    server: ['', Validators.required],
    rebootStrategy: [null, Validators.required],
    rebootDate: [{ value: null, disabled: true }, Validators.required],
    rebootTime: [{ value: null, disabled: true }, Validators.required],
    comment: ['', [Validators.minLength(5), Validators.maxLength(100)]],
  });

  ngOnInit(): void {
    this.servers.getAll().subscribe((result) => {
      this.serverList = result;
    });

    this.serverRebootForm.markAllAsTouched();

    this.serverRebootForm.controls['rebootStrategy'].valueChanges.subscribe((value) => {
      if (value === 'Now') {
        this.serverRebootForm.controls['rebootDate'].reset();
        this.serverRebootForm.controls['rebootTime'].reset();
        this.serverRebootForm.controls['rebootDate'].disable();
        this.serverRebootForm.controls['rebootTime'].disable();
      } else {
        this.serverRebootForm.controls['rebootDate'].enable();
        this.serverRebootForm.controls['rebootTime'].enable();
        this.serverRebootForm.markAllAsTouched();
      }
    });
  }

  onReboot() {
    let dialogContent = 'Would you like to reboot Server?';
    let actualRebootTime = undefined;
    if (this.serverRebootForm.controls['rebootStrategy'].value === 'Later') {
      actualRebootTime = this.serverRebootForm.controls['rebootDate'].value;
      const time: Date = this.serverRebootForm.controls['rebootTime'].value;
      actualRebootTime.setHours(time.getHours());
      actualRebootTime.setMinutes(time.getMinutes());
    }
    const rebootNowFlag = actualRebootTime < new Date();

    const rebootRequestData: IRebootRequest = {
      Server: this.serverRebootForm.controls['server'].value as string,
      RebootNow: rebootNowFlag,
      Comment: this.serverRebootForm.controls['comment'].value as string,
    };

    if (rebootNowFlag) {
      dialogContent =
        'The designated reboot time has passed. Please confirm if you would like to reboot now?';
    } else {
      rebootRequestData.RebootTime = actualRebootTime;
    }

    this.dialog
      .open(ConfirmationDialog, { data: { Title: 'Reboot Server ?', Content: dialogContent } })
      .afterClosed()
      .pipe(
        filter((action) => action === 'Confirm'),
        switchMap(() => {
          return this.servers.reboot(rebootRequestData);
        }),
      )
      .subscribe((data) => {
        console.log('Server Reboot Requested', data);
        this.dialog.closeAll();
        this.snackbar.open('Server Reboot Requested', 'Dismiss', { duration: 5 * 1000 });
      });
  }
}
