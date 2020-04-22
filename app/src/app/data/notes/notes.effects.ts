import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, EMPTY, Observable } from 'rxjs';
import { map, mergeMap, flatMap, catchError, withLatestFrom } from 'rxjs/operators';
import { Router } from '@angular/router';

import { State } from '@app/app-reducer.ts';
import { getMergedRoute } from '@data/router/router.selectors';
import { NotesActions, NotesTypes } from './';
import { NotesService } from './notes.service';
import * as NotificationsActions from '../notifications/notifications.actions';
import {  AuthSelectors } from '../auth';
import { AssetSelectors } from '../asset';


@Injectable()
export class NotesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<State>,
    private readonly notesService: NotesService,
    private readonly router: Router
  ) {}

  @Effect()
  getNotesForSelectedAssetObserver$ = this.actions$.pipe(
    ofType(NotesActions.getNotesForSelectedAsset),
    mergeMap((action) => of(action).pipe(
      withLatestFrom(
        this.store$.select(AuthSelectors.getAuthToken),
        this.store$.select(getMergedRoute)
      ),
      mergeMap(([pipedAction, authToken, mergedRoute]: Array<any>) => {
        if(typeof mergedRoute.params !== 'undefined' && typeof mergedRoute.params.assetId !== 'undefined') {
          return this.notesService.getNotesFromAssetId(authToken, mergedRoute.params.assetId).pipe(
            map((response: any) => {
              return NotesActions.setNotes({
                notes: response.reduce((acc: { [id: string]: NotesTypes.Note }, note: NotesTypes.Note) => {
                  acc[note.id] = note;
                  return acc;
                }, {})
              });
            })
          );
        } else {
          return EMPTY;
        }
      })
    ))
  );

  @Effect()
  getSelectedNote$ = this.actions$.pipe(
    ofType(NotesActions.getSelectedNote),
    mergeMap((action) => of(action).pipe(
      withLatestFrom(
        this.store$.select(AuthSelectors.getAuthToken),
        this.store$.select(getMergedRoute)
      ),
      mergeMap(([pipedAction, authToken, mergedRoute]: Array<any>) => {
        if(typeof mergedRoute.params !== 'undefined' && typeof mergedRoute.params.noteId !== 'undefined') {
          return this.notesService.getNoteById(authToken, mergedRoute.params.noteId).pipe(
            map((note: any) => {
              return NotesActions.setNotes({
                notes: { [note.id]: note }
              });
            })
          );
        } else {
          return EMPTY;
        }
      })
    ))
  );

  @Effect()
  saveNote$ = this.actions$.pipe(
    ofType(NotesActions.saveNote),
    mergeMap((action) => of(action).pipe(
      withLatestFrom(
        this.store$.select(AuthSelectors.getAuthToken),
        this.store$.select(AssetSelectors.getSelectedAsset)
      ),
      mergeMap(([pipedAction, authToken, selectedAsset]: Array<any>) => {
        const isNew = pipedAction.note.id === undefined || pipedAction.note.id === null;
        let request: Observable<object>;
        console.warn(isNew);
        if(isNew) {
          if(typeof pipedAction.note.assetId === 'undefined' && typeof selectedAsset !== 'undefined') {
            request = this.notesService.createNote(authToken, { ...pipedAction.note, assetId: selectedAsset.id });
          } else {
            request = this.notesService.createNote(authToken, { ...pipedAction.note, assetId: pipedAction.note.assetId });
          }
        } else {
          request = this.notesService.updateNote(authToken, action.note);
        }
        return request.pipe(
          map((note: any) => {
            let notification = $localize`:@@ts-notes-updated:Notes updated successfully!`;
            if(pipedAction.redirect) {
              this.router.navigate(['/asset/' + note.assetId + '/notes']);
            }
            if(isNew) {
              notification = $localize`:@@ts-notes-created:Note created successfully!`;
            }
            return [NotesActions.setNotes({ notes: { [note.id]: note } }), NotificationsActions.addSuccess(notification)];
          })
        );
      }),
      flatMap((rAction, index) => rAction)
    ))
  );
}
