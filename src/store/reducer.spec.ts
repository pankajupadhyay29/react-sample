import { expect } from 'chai';
import 'mocha';
import {
  addBlankStudent,
  getSelectedStudents,
  getStudents,
  initialState,
  reducer,
  setSelectedStudents,
  setStoreStudents
} from './reducer';
import { State } from './types';

describe('reducer', () => {
  const students = [
    { id: 1, name: 'Std1', marks: 80 },
    { id: 2, name: 'Std2', marks: 60 },
  ];

  describe('SET_STUDENT_IN_STORE', () => {
    it('should set passed values to state', () => {
      const state = reducer(initialState, setStoreStudents(students));
      expect(state.students).to.be.deep.eq(students);
    });
  });

  describe('getStudents', () => {
    it('should set return correct students list', () => {
      const state = reducer(initialState, setStoreStudents(students));
      expect(getStudents(state)).to.be.deep.eq(students);
    });
  });

  describe('SET_SELECTED_STUDENTS', () => {
    it('should set passed values to state', () => {
      const state = reducer(initialState, setSelectedStudents(students));
      expect(state.selected).to.be.deep.eq(students);
    });
  });

  describe('getStudents', () => {
    it('should set return correct students list', () => {
      const state = reducer(initialState, setSelectedStudents(students));
      expect(getSelectedStudents(state)).to.be.deep.eq(students);
    });
  });

  describe('NEW_STUDENT_IN_STORE', () => {
    it('should set add new student to state', () => {
      const state = reducer(initialState, setStoreStudents(students));
      const newState = reducer(state, addBlankStudent());
      expect(newState.students[0]).to.be.deep.eq({id: 3, marks: 0, name: ''});
    });
  });
});
