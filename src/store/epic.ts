import { AnyAction, MiddlewareAPI } from 'redux';
import { combineEpics, Epic } from 'redux-observable';
import { Observable } from 'rxjs';
import { StudentSvcT } from '../Services/StudentSvc';
import { fetchStudents, setStoreStudents } from './reducer';
import { Action, FETCH_STUDENT, FetchStudentsAction, SET_STUDENTS, SetStudentsAction, State } from './types';

export const getStudentEpic: Epic<Action, MiddlewareAPI<State>, { studentSvc: StudentSvcT }> = (
  action$,
  store,
  {studentSvc}
) => {
  return action$
  .ofType(FETCH_STUDENT)
  .mergeMap((action: FetchStudentsAction) => {
    return studentSvc.getStudents()
    .map( (students) => setStoreStudents(students));
  });
};

export const setStudentsEpic: Epic<Action, MiddlewareAPI<State>, { studentSvc: StudentSvcT }> = (
  action$,
  store,
  {studentSvc}
) => {
  return action$
  .ofType(SET_STUDENTS)
  .mergeMap((action: SetStudentsAction) => {
    return studentSvc.setStudents(action.payload.students)
    .map( (students) => setStoreStudents(students));
  });
};

export const epic = combineEpics(getStudentEpic, setStudentsEpic);
