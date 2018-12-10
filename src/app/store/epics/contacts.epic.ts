import {Injectable} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';
import {ActionsObservable} from 'redux-observable';
import {AnyAction} from 'redux';
import {
  DELETE_CONTACT, deleteContactFailedAction,
  deleteContactSuccessAction,
  FETCH_CONTACTS,
  fetchContactsFailedAction,
  fetchContactsSuccessAction
} from '../actions/contacts.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {TransformService} from '../../utils/transform.service';
import {of} from 'rxjs';

@Injectable()
export class ContactsEpic {
  constructor(private contactsService: ContactsService) {
  }

  fetchContacts$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(FETCH_CONTACTS).pipe(
      switchMap(({payload}) => {
        return this.contactsService
          .getUserContacts(payload.userId)
          .pipe(
            map(contacts => fetchContactsSuccessAction(TransformService.transformToMap(contacts))),
            catchError(error => of(fetchContactsFailedAction(error.message)))
          );
      })
    );
  };

  deleteContact$ = (action$: ActionsObservable<AnyAction>) => {
    return action$.ofType(DELETE_CONTACT).pipe(
      switchMap(({payload}) => {
        return this.contactsService
          .deleteUserContact(payload.yourId, payload.otherId)
          .pipe(
            map(result => deleteContactSuccessAction(payload.yourId, payload.otherId)),
            catchError(error => of(deleteContactFailedAction(error.message)))
          );
      })
    );
  };
}
