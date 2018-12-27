import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  addBlankStudent,
  fetchStudents,
  getSelectedStudents,
  getStudents,
  setSelectedStudents,
  setStudents
} from '../store/reducer';
import { SetSelectedStudentsAction, State, Student } from '../store/types';
import { MarksEditor } from './GridHelpers/MarksEditor';
import { RowRenderer } from './GridHelpers/RowRenderer';

const gridColumns = [
  {
    editable: true,
    key: 'name',
    name: 'Name',
    resizable: true,
  },
  {
    editable: true,
    editor: MarksEditor,
    key: 'marks',
    name: 'Marks',
    resizable: true,
  },
];

interface MappedProps {
  rows: Student[];
  selected: Student[];
}

interface MappedDispatch {
  fetchRows(): void;
  setUpdatedStudent(students: Student[]): void;
  addStudentRow(): void;
  setSelected(students: Student[]): void;
}

type Props = MappedProps & MappedDispatch;

export class StudentGridComponent extends React.Component<Props, State> {
  componentDidMount() {
    this.props.fetchRows();
  }
  render() {
    const {addStudentRow, rows, selected} = this.props;

    return (
      <div className="card mt-3">
        <div className="card-header d-flex flex-row justify-content-between" >
          <span>Details</span>
          <div className="btn-group">
            <button className="btn-primary mx-1" type="button" onClick= {addStudentRow}>Add</button>
            { selected.length > 0
              && <button
                className="btn-danger mx-1"
                type="button"
                onClick={this.deleteRows.bind(this)}
              >Delete</button>}
          </div>
        </div>
        <div className="card-body p-0">
          <ReactDataGrid
            enableCellSelect={true}
            columns={gridColumns}
            rowGetter={this.rowGetter.bind(this)}
            rowsCount={rows.length}
            onGridRowsUpdated={this.updateRow.bind(this)}
            rowRenderer= {RowRenderer}
            rowSelection={{
              onRowsDeselected: this.onRowsDeselected,
              onRowsSelected: this.onRowsSelected,
              selectBy: {
                keys: this.getSelected()
              },
              showCheckbox: true,
            }}
          />
        </div>
      </div>
    );
  }

  deleteRows() {
    const {rows, selected, setUpdatedStudent, setSelected} = this.props;
    const finalRows = rows.filter((val) => selected.indexOf(val) === -1);
    setUpdatedStudent(finalRows);
    setSelected([]);
  }

  getSelected() {
    const selected = {rowKey: 'id', values: this.props.selected.map((val) => val.id)};
    return selected;
  }

  onRowsSelected = (rows: [{rowIdx: number, row: Student}]) => {
    const {setSelected, selected} = this.props;
    const newSelection = rows.map((val) => val.row);
    setSelected([...selected, ...newSelection]);
  }

  onRowsDeselected = (rows: [{rowIdx: number, row: Student}]) => {
    const {setSelected, selected} = this.props;
    const deselected = rows.map((val) => val.row);
    const selectedRows = selected.filter((val) => deselected.indexOf(val) === -1);
    setSelected(selectedRows);
  }

  rowGetter(index: number) {
    return this.props.rows[index];
  }

  updateRow({ fromRow, toRow, updated }: ReactDataGrid.GridRowsUpdatedEvent) {
    const rows = [...this.props.rows];

    for (let i = fromRow; i <= toRow; i++) {
      const rowToUpdate = rows[i];
      const updatedRow =  {
        ...rowToUpdate,
        ...updated
      };
      rows[i] = updatedRow;
    }

    this.props.setUpdatedStudent(rows);
  }
}

const mapStateToProps = (state: State): MappedProps => {
  return {
    rows: getStudents(state),
    selected: getSelectedStudents(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>, {}): MappedDispatch => ({
  addStudentRow: () => {
    dispatch(addBlankStudent());
  },
  fetchRows: () => {
    dispatch(fetchStudents());
  },
  setSelected: (students: Student[]) => {
    dispatch(setSelectedStudents(students));
  },
  setUpdatedStudent: (students: Student[]) => {
    dispatch(setStudents(students));
  },
});

const StudentGrid = connect(mapStateToProps, mapDispatchToProps)(StudentGridComponent);
export default StudentGrid;
