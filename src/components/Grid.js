import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import {Toolbar, Data} from 'react-data-grid/addons';
import update from 'react-addons-update';
import '/home/vitor/projects/react-material-admin-template-master/node_modules/react-data-grid/dist/react-data-grid.css';
import ReactIntl from 'react-intl';
import {IntlMixin, IntlProvider, FormattedMessage, FormattedNumber, FormattedDate} from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import {grey400} from 'material-ui/styles/colors';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import ContentAdd from 'material-ui/svg-icons/content/add';


const styles = {
  floatingActionButton: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  toggleDiv: {
    maxWidth: 300,
    marginTop: 40,
    marginBottom: 5
  },
  toggleLabel: {
    color: grey400,
    fontWeight: 100
  },
  buttons: {
    marginTop: 30,
    float: 'right'
  },
  saveButton: {
    marginLeft: 5
  }
};
//helper to generate a random date

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

//helper to create a fixed number of rows
function createRows(numberOfRows) {
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      data_emissao: i,
      classificacao: 'Task ' + i,
      fornecedor: Math.min(100, Math.round(Math.random() * 110)),
      condicao: ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType: ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      valor: 5.91,
      data_vencimento: '06-12-1991',
      data_baixa: '05-12-1991'
    });
  }
  return _rows;
}

var PercentCompleteFormatter = React.createClass({
  mixins: [IntlMixin],
  render: function () {
    if (!this.props.value) return (<div></div>);
    var percentComplete = this.props.value;

    return (

      <FormattedNumber value={percentComplete} style="currency" currency="BRL"/>            );
  }
});

var DateFormatter = React.createClass({
  mixins: [IntlMixin],
  render: function () {
    if (!this.props.value) return (<div></div>);
    var percentComplete = this.props.value;
    console.log(percentComplete);
    return (

      <FormattedDate
        value={new Date(percentComplete)}
      /> )
  }
});

//Columns definition
var columns = [
  {
    key: 'id',
    name: 'ID',
    width: 40,
    filterable: true

  },
  {
    key: 'data_emissao',
    name: 'Data Emissão',
    editable: true,
    filterable: true

  },
  {
    key: 'classificacao',
    name: 'Classificação',
    editable: true,
    filterable: true
  },
  {
    key: 'fornecedor',
    name: 'Fornecedor',
    editable: true,
    filterable: true
  },
  {
    key: 'condicao',
    name: 'Condição',
    editable: true,
    filterable: true

  },
  {
    key: 'doc',
    name: 'Doc',
    editable: true,
    filterable: true

  },
  {
    key: 'cheque',
    name: 'Cheque',
    editable: true,
    filterable: true

  },
  {
    key: 'parcela',
    name: 'Parcela',
    editable: true,
    filterable: true

  },
  {
    key: 'valor',
    name: 'Valor',
    editable: true,
    formatter: PercentCompleteFormatter,
    filterable: true


  },
  {
    key: 'data_vencimento',
    name: 'Data Vencimento',
    editable: true,
    formatter: DateFormatter,
    filterable: true


  },
  {
    key: 'data_baixa',
    name: 'Data Baixa',
    editable: true,
    formatter: DateFormatter,
    filterable: true

  },
  {
    key: 'conta',
    name: 'Conta',
    editable: true,
    filterable: true

  }
];


var Example = React.createClass({

  getInitialState: function () {
    return {rows: createRows(5), filters: {}}
  },

  rowGetter: function (rowIdx) {
    return this.state.rows[rowIdx]
  },

  handleRowUpdated: function (e) {
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows: rows});
    console.log(e);
  },
  handleFilterChange: function (filter) {
    var newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({filters: newFilters});
  },
  handleAddRow: function (e) {
    var newRow = {
      id: this.state.rows.length + 1,
      data_emissao: '',
      classificacao: '',
      fornecedor: '',
      condicao: '',
      issueType: '',
      startDate: '',
      completeDate: ''
    };
    var rows = update(this.state.rows, {$push: [newRow]});
    this.setState({rows: rows});
  },
  onClearFilters: function () {
    //all filters removed
    this.setState({filters: {}});
  },

  render: function () {
    return (
      <IntlProvider locale="en">
        <div>
          <ReactDataGrid
            enableCellSelect={true}
            columns={columns}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
            onAddFilter={this.handleFilterChange}
            onClearFilters={this.onClearFilters}

            minHeight={650}
            onRowUpdated={this.handleRowUpdated}/>

          <FloatingActionButton style={styles.floatingActionButton}  onTouchTap={this.handleAddRow} >
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </IntlProvider>
    )
  }

});

export default Example;
