export interface Student {
  id?: number;
  name: string;
  marks: number;
}

export interface Summary {
  min: number;
  max: number;
  avg: number;
}

export interface State {
  students: Student[];
  selected: Student[];
}

export const SET_STUDENTS = 'SET_STUDENTS';
export interface SetStudentsAction {
  type: typeof SET_STUDENTS;
  payload: {
    students: Student[];
  };
}

export const FETCH_STUDENT = 'FETCH_STUDENT';
export interface FetchStudentsAction {
  type: typeof FETCH_STUDENT;
}

export const SET_STUDENT_IN_STORE = 'SET_STUDENT_IN_STORE';
export interface SetStudentsInStoreAction {
  type: typeof SET_STUDENT_IN_STORE;
  payload: {
    students: Student[];
  };
}

export const SET_SELECTED_STUDENTS = 'SET_SELECTED_STUDENTS';
export interface SetSelectedStudentsAction {
  type: typeof SET_SELECTED_STUDENTS;
  payload: {
    students: Student[];
  };
}

export const NEW_STUDENT_IN_STORE = 'NEW_STUDENT_IN_STORE';
export interface NewStudentsInStoreAction {
  type: typeof NEW_STUDENT_IN_STORE;
}

export type Action = SetStudentsAction
                      | FetchStudentsAction
                      | SetStudentsInStoreAction
                      | NewStudentsInStoreAction
                      | SetSelectedStudentsAction;
