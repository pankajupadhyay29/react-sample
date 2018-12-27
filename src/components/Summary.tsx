import * as React from 'react';
import { connect } from 'react-redux';
import { getSummary } from '../store/reducer';
import { State, Summary } from '../store/types';

interface MappedProps {
  summary: Summary;
}

type Props = MappedProps;

export class SummaryComponent extends React.Component<Props, State> {

  render() {
    const { summary } = this.props;
    return (
      <div className= "card my-2">
        <div className="card-header">Summary</div>
        <div className="card-body d-flex flex-row justify-content-around text-center">
          <div className="flex-column d-flex">
            <div className="card-title">Maximum</div>
            <div className="card-text">{summary.max}</div>
          </div>
          <div className="flex-column d-flex">
            <div className="card-title">Minimum</div>
            <div className="card-text">{summary.min}</div>
          </div>
          <div className="flex-column d-flex">
            <div className="card-title">Average</div>
            <div className="card-text">{summary.avg}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State): MappedProps => {
  return {
    summary: getSummary(state),
  };
};

const Summary = connect(mapStateToProps)(SummaryComponent);

export default Summary;
