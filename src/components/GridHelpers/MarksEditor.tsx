import * as React from 'react';
import * as ReactDataGrid from 'react-data-grid';
import * as ReactDOM from 'react-dom';

interface EditorProps {
  column: ReactDataGrid.Column;
  value?: number;
}

export class MarksEditor extends React.Component<EditorProps, {}> {
  render() {
    return (
      <input type="number" min= {0} max={100} defaultValue= {`${this.props.value}`}/>
    );
  }

  getStyle(): {width: string} {
    return {
      width: '100%'
    };
  }

  getValue() {
    const nodeValue = Number(this.getInputNode().value);
    const finalValue = Math.min(Math.max(0, nodeValue), 100);
    const updated: any = {};
    updated[this.props.column.key] = finalValue;
    return updated;
  }

  getInputNode() {
    const domNode = ReactDOM.findDOMNode(this) as any;
    if (domNode.tagName === 'INPUT') {
      return domNode;
    }

    return domNode.querySelector('input:not([type=hidden])');
  }

  inheritContainerStyles(): boolean {
    return true;
  }
}
