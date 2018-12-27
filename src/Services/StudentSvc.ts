import { Observable } from 'rxjs'; // using Observable just to simulate api call
import { Student } from '../store/types';

const storageKey = 'students';

export const getStudents = () => {
  const studentsJson = localStorage.getItem(storageKey);
  const students: Student[] = JSON.parse(studentsJson);

  return Observable.of(students);
};

export const setStudents = (students: Student[]) => {
  localStorage.setItem(storageKey, JSON.stringify(students));
  return Observable.of(students);
};

const StudentSvc = {
  getStudents,
  setStudents
};
export type StudentSvcT = typeof StudentSvc;

export default StudentSvc;
