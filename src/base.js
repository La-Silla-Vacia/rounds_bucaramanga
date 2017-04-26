import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './base.css';
import p from './Components/PersonRow.css';
const data = require('../data/data.json');

import PersonRow from './Components/PersonRow';
import Select from './Components/Select/Select';

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      openRow: {},
      ganodorCases: [],
      ganadorCaseOption: "Todos"
    };

    this.handleRowClick = this.handleRowClick.bind(this);
    this.switchOption = this.switchOption.bind(this);
  }

  componentWillMount() {
    this.setData();
  }

  setData() {
    let dataExists = true;
    let interactiveData;
    let dataUri;
    try {
      if (rounds_bucaramanga_data) {
        dataExists = true;
        interactiveData = rounds_bucaramanga_data;
      }
    } catch (e) {
      dataExists = false;
    }

    if (!dataExists) {
      this.setState({data: data});
    } else {
      if (interactiveData.dataUri) {
        dataUri = interactiveData.dataUri;
        this.fetchData(dataUri);
      }
    }
  }

  fetchData(uri) {
    fetch(uri)
      .then((response) => {
        return response.json()
    }).then((json) => {
      this.setState({ data: json });
      console.log(json);
      const ganadors = ['Todos'];
      json.map((item) => {
        if (ganadors.indexOf(item.ganador) === -1)
        ganadors.push(item.ganador);
      });
      this.setState({ganodorCases: ganadors});
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  handleRowClick(id, type) {
    console.log(id, type);
    let setTo = {id, type};
    if (this.state.openRow.id === id) setTo = {};
    this.setState({openRow: setTo});
  }

  getRows() {
    const { data } = this.state;
    return data.map((row, index) => {
      let open = false;

      if (this.state.openRow) {
        if (this.state.openRow.id === index + 1) {
          open = this.state.openRow;
        }
      }

      if (this.state.ganadorCaseOption !== 'Todos') {
        if (this.state.ganadorCaseOption !== row.ganador) return;
      }

      return (
        <PersonRow
          {...row}
          key={index}
          open={open}
          id={index + 1}
          callback={this.handleRowClick}
        />
      )
    });
  }

  switchOption(result) {
    this.setState({ganadorCases: result, ganadorCaseOption: result});
  }

  render(props, state) {
    const rows = this.getRows();

    return(
      <div className={s.container}>
        <div className={s.select}>
          <small>Filtre por caso concreto</small>
          <Select
            className='Select'
            value="Todos"
            callback={this.switchOption}
            options={state.ganodorCases}
            switchTo={state.ganadorCaseOption}
          />
        </div>
        <div className={cx(
          p.container,
          p.heading
        )}>
          <div className={p.columns}>
            <div className={p.column}>
              <h2>Round</h2>
            </div>
            <div className={p.column}>
              <h2>Ganador</h2>
            </div>
          </div>
        </div>

        {rows}
      </div>
    )
  }
}