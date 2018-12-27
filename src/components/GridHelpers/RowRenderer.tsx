import * as React from 'react';
import { Row } from 'react-data-grid';
import * as ReactDataGrid from 'react-data-grid';
import { Student } from '../../store/types';
interface Props {
  idx: number;
  row: Student;
}

export class RowRenderer extends React.Component<Props, {}> {
  getRowClass = () => {
    const className = this.props.idx % 2 ? 'even' : 'odd';
    return this.props.row.marks < 65 ?  `highlight ${className}` : className ;
  }

  render() {
    return (
      <div className={this.getRowClass()}>
        <Row {...this.props}/>
      </div>
    );
  }
}
