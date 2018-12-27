import { store } from './store';
import { SetSelectedStudentsAction } from './types';
import {
  Action,
  FETCH_STUDENT,
  FetchStudentsAction,
  NEW_STUDENT_IN_STORE,
  NewStudentsInStoreAction,
  SET_SELECTED_STUDENTS,
  SET_STUDENT_IN_STORE,
  SET_STUDENTS,
  SetStudentsAction,
  SetStudentsInStoreAction,
  State,
  Student
} from './types';

export const setStudents = (students: Student[]): SetStudentsAction => ({
  payload: { students },
  type: SET_STUDENTS,
});

export const fetchStudents = (): FetchStudentsAction => ({
  type: FETCH_STUDENT,
});

export const addBlankStudent = (): NewStudentsInStoreAction => ({
  type: NEW_STUDENT_IN_STORE,
});

export const setStoreStudents = (students: Student[]): SetStudentsInStoreAction => ({
  payload: { students },
  type: SET_STUDENT_IN_STORE,
});

export const setSelectedStudents = (students: Student[]): SetSelectedStudentsAction => ({
  payload: { students },
  type: SET_SELECTED_STUDENTS,
});

export const getStudents = (state: State) => {
  return state.students;
};

export const getSelectedStudents = (state: State) => {
  return state.selected;
};

export const getSummary = (state: State) => {
  const students = state.students;
  const count = students.length;
  if (students.length === 0) {
    return {
      avg: 0,
      max: 0,
      min: 0,
    };
  }
  const marks = students.map((val) => val.marks).sort();
  const totalMarks = marks.reduce((a, b) => a + b);

  return {
    avg: Math.round(totalMarks / count),
    max: Math.max(...marks), // marks[marks.length - 1],
    min: Math.min(...marks),
  };
};

export const initialState: State = {
  selected: [],
  students: [],
};

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case NEW_STUDENT_IN_STORE: {
      const students = state.students;
      const ids = students.length > 0 ? students.map((val) => (val.id || 0)) : [0];
      const id = Math.max(...ids) + 1;
      const newStudent = {
        id,
        marks: 0,
        name: '',
      };

      return {
        ...state,
        students: [
          newStudent,
          ...students
        ]
      };
    }
    case SET_STUDENT_IN_STORE: {
      return {
        ...state,
        students: [
          ...action.payload.students
        ]
      };
    }
    case SET_SELECTED_STUDENTS: {
      return {
        ...state,
        selected: [
          ...action.payload.students
        ]
      };
    }
    default: {
      return state;
    }
  }
};
