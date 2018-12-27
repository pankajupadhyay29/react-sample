import { expect } from 'chai';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import 'mocha';
import * as React from 'react';
import { Provider } from 'react-redux';
import { addBlankStudent, getSelectedStudents, initialState, setStoreStudents } from '../store/reducer';
import { store } from '../store/store';
import { State, Student } from '../store/types';
import { StudentGridComponent } from './StudentGrid';

describe('Student Grid', () => {
  let wrapper: ShallowWrapper;
  const studentData = [
    { id: 1, name: 'Std1', marks: 80 },
    { id: 2, name: 'Std2', marks: 60 },
  ];
  const newStudent = {
    id: -1000,
    marks: 66,
    name: 'New Student',
  };

  let mockState: State;

  const getStudents = () => {
    return mockState.students;
  };

  const getSelected = () => {
    return mockState.selected;
  };

  const fetchRows = () => {
    mockState = {...initialState};
  };

  const setUpdatedStudent = (students: Student[]) => {
    mockState.students = students;
  };

  const addStudentRow = () => {
    mockState.students.unshift(newStudent);
  };

  const setSelected = (selectedStudents: Student[]) => {
    mockState.selected = selectedStudents;
  };

  const initWrapper = (newState: State = initialState) => {
    mockState = { ...newState };
    return shallow((
      <StudentGridComponent
        rows = {getStudents()}
        selected = {getSelected()}
        fetchRows = {fetchRows}
        setUpdatedStudent = {setUpdatedStudent}
        addStudentRow = {addStudentRow}
        setSelected = {setSelected}
      />
    ));
  };

  describe('Grid', () => {
    let component: ReactWrapper;
    const initComponent = (newState: State = initialState) => {
      mockState = { ...newState };
      component = mount(
        <StudentGridComponent
          rows = {getStudents()}
          selected = {getSelected()}
          fetchRows = {fetchRows}
          setUpdatedStudent = {setUpdatedStudent}
          addStudentRow = {addStudentRow}
          setSelected = {setSelected}
        />
      );
    };
    beforeEach(() => {
      initComponent();
    });

    afterEach(() => {
      component.unmount();
    });

    it('should render grid', () => {
      expect(component.find('.react-grid-Grid')).to.have.length(1);
    });

    it('should render Checkbox column for selection', () => {
      expect(component.find('[name="select-all-checkbox"]').type()).to.be.eq('input');
    });

    it('should render Name column header', () => {
      expect(component.find('.widget-HeaderCell__value').first().text()).to.be.eq('Name');
    });

    it('should render Marks column header', () => {
      expect(component.find('.widget-HeaderCell__value').last().text()).to.be.eq('Marks');
    });

    it('should render Marks column header', () => {
      expect(component.find('.widget-HeaderCell__value').last().text()).to.be.eq('Marks');
    });

    it('should not render any data row initially', () => {
      expect(component.find('.react-grid-Row')).to.have.length(0);
    });

    it('should render data row if exist in store', () => {
      initComponent({students: studentData, selected: []});
      expect(component.find('.react-grid-Row')).to.have.length(2);
    });
  });

  describe("Header", () => {
    beforeEach(() => {
      wrapper = initWrapper();
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should render details header', () => {
      expect(wrapper.find('div.card-header span').text()).to.be.eq('Details');
    });

    describe('Add button', () => {
      it('should render', () => {
        expect(wrapper.find('.btn-primary').text()).to.be.eq('Add');
      });

      it('should add new student on click', () => {
        wrapper.find('.btn-primary').simulate('click');
        expect(mockState.students[0]).to.be.deep.eq(newStudent);
      });
    });

    describe('Delete button', () => {
      it('should not render initially', () => {
        expect(wrapper.find('.btn-danger')).to.have.length(0);
      });

      it('should render after row selection', () => {
        wrapper = initWrapper({students: studentData, selected: studentData});
        expect(wrapper.find('.btn-danger').text()).to.be.eq('Delete');
      });

      it('should Delete selected student on click', () => {
        wrapper = initWrapper({students: studentData, selected: studentData.slice(1)});
        wrapper.find('.btn-danger').simulate('click');
        expect(mockState.students).to.be.deep.eq(studentData.slice(0, 1));
      });

      it('should clear selection on click', () => {
        wrapper = initWrapper({students: studentData, selected: studentData.slice(1)});
        wrapper.find('.btn-danger').simulate('click');
        expect(mockState.selected).to.have.length(0);
      });
    });
  });
});
