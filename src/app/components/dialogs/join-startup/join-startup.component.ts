import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {DialogResult} from '../../../model/dialog-result';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StartupDialogData} from '../../../model/dialog-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AppState} from '../../../store';
import {fetchMyResumesAction} from '../../../store/actions/resume.actions';
import {isLoading, selectResumes} from '../../../store/selectors/resume.selector';
import {Observable} from 'rxjs';
import {skipWhile, take} from 'rxjs/internal/operators';
import {Resume} from '../../../model/Resume';
import {updateRouterState} from '../../../store/actions/router.actions';
import {sendResumeToStartupAction} from '../../../store/actions/startup-state.actions';

@Component({
  selector: 'app-join-startup',
  templateUrl: './join-startup.component.html',
  styleUrls: ['./join-startup.component.css']
})
export class JoinStartupComponent implements OnInit {

  resumeChooseForm: FormGroup;
  startupId: String;

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  myResumeList: Observable<Resume[]>;

  myResumeListNotInStartup: Resume[];

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<JoinStartupComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: StartupDialogData) {
  }

  ngOnInit() {
    this.startupId = this.data.startupId;

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchMyResumesAction(this.ngRedux.getState().currentUserState.currentUser.account.id)));

    this.myResumeList.subscribe(value => this.myResumeListNotInStartup = value.filter(r =>
      !this.ngRedux.getState().startupPageState.startupModel.startupResumes.find(sr => sr.resume.id === r.id)));

    this.initializeForm();
  }

  private initializeForm() {
    this.resumeChooseForm = this.fb.group({
      resume: ['', Validators.required]
    });
  }


  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

  sendResume() {
    this.dialogRef.close(DialogResult.CLOSE);
    this.dialogRef.afterClosed().subscribe(() => {
      this.ngRedux.dispatch(sendResumeToStartupAction(this.resumeChooseForm.controls['resume'].value));
    });
  }

  createNewResume() {
    this.dialogRef.close(DialogResult.CLOSE);
    this.dialogRef.afterClosed().subscribe(() => {
      this.ngRedux.dispatch(updateRouterState('/resume-edit'));
    });
  }

  goToResume(id: string) {
    this.dialogRef.close(DialogResult.CLOSE);
    this.dialogRef.afterClosed().subscribe(() => {
      this.ngRedux.dispatch(updateRouterState('/resume/' + id));
    });
  }


}