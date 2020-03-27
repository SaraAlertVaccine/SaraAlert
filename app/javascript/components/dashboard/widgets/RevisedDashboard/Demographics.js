import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Switch from 'react-switch';
import _ from 'lodash';

const SEXES = ['Male', 'Female', 'Unknown'];
let COUNTRIES_OF_INTEREST = []; // If certain countries are desired, they can be specified here
const RISKLEVELS = ['High', 'Medium', 'Low', 'No Identified Risk', 'Missing']; // null will be mapped to `missing` later
const NUMBER_OF_COUNTRIES_TO_SHOW = 5;
class AgeStratificationActive extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checked: false, viewTotal: this.props.viewTotal };
    this.handleChange = this.handleChange.bind(this);
    this.toggleBetweenActiveAndTotal = this.toggleBetweenActiveAndTotal.bind(this);
    this.obtainValueFromMonitoreeCounts = this.obtainValueFromMonitoreeCounts.bind(this);
    this.ERRORS = !Object.prototype.hasOwnProperty.call(this.props.stats, 'monitoree_counts');
    this.ERRORSTRING = this.ERRORS ? 'Incorrect Object Schema' : null;
    COUNTRIES_OF_INTEREST = _.uniq(this.props.stats.monitoree_counts.filter(x => x.category_type === 'Exposure Country').map(x => x.category)).sort();
    COUNTRIES_OF_INTEREST = COUNTRIES_OF_INTEREST.filter(country => country !== 'Total');
    if (!this.ERRORS) {
      this.sexData = this.obtainValueFromMonitoreeCounts(SEXES, 'Sex', this.state.viewTotal);
      this.coiData = this.obtainValueFromMonitoreeCounts(COUNTRIES_OF_INTEREST, 'Exposure Country', this.state.viewTotal);
      // obtainValueFromMonitoreeCounts returns the data in a format that recharts can read
      // but is not the easiest to parse. The gross lodash functions here just sum the total count of each category
      // for each country, then sort them, then take the top NUMBER_OF_COUNTRIES_TO_SHOW.
      this.coiData = this.coiData
        .sort((v1, v2) => _.sumBy(_.valuesIn(v2), a => (isNaN(a) ? 0 : a)) - _.sumBy(_.valuesIn(v1), a => (isNaN(a) ? 0 : a)))
        .slice(0, NUMBER_OF_COUNTRIES_TO_SHOW);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.viewTotal !== prevProps.viewTotal) {
      this.toggleBetweenActiveAndTotal(this.props.viewTotal);
    }
  }

  obtainValueFromMonitoreeCounts(enumerations, category_type, onlyActive) {
    let activeMonitorees = this.props.stats.monitoree_counts.filter(x => x.active_monitoring === onlyActive);
    let categoryGroups = activeMonitorees.filter(x => x.category_type === category_type);
    return enumerations.map(x => {
      let thisGroup = categoryGroups.filter(group => group.category === x);
      let retVal = { name: x, total: 0 };
      RISKLEVELS.forEach(val => {
        retVal[String(val)] = _.sum(thisGroup.filter(z => z.risk_level === val).map(z => z.total));
        retVal.total += _.sum(thisGroup.filter(z => z.risk_level === val).map(z => z.total));
      });
      return retVal;
    });
  }

  handleChange = checked => this.setState({ checked });

  toggleBetweenActiveAndTotal = viewTotal => {
    this.sexData = this.obtainValueFromMonitoreeCounts(SEXES, 'Sex', viewTotal);
    this.coiData = this.obtainValueFromMonitoreeCounts(COUNTRIES_OF_INTEREST, 'Exposure Country', viewTotal);
    this.coiData = this.coiData
      .sort((v1, v2) => _.sumBy(_.valuesIn(v2), a => (isNaN(a) ? 0 : a)) - _.sumBy(_.valuesIn(v1), a => (isNaN(a) ? 0 : a)))
      .slice(0, 5);
    this.setState({ viewTotal });
  };
  renderBarGraph() {
    return (
      <div className="mx-3 mt-2">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={this.sexData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="High" stackId="a" fill="#FA897B" />
            <Bar dataKey="Medium" stackId="a" fill="#FFDD94" />
            <Bar dataKey="Low" stackId="a" fill="#D0E6A5" />
            <Bar dataKey="No Identified Risk" stackId="a" fill="#333" />
            <Bar dataKey="Missing" stackId="a" fill="#BABEC4" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={this.coiData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="High" stackId="a" fill="#FA897B" />
            <Bar dataKey="Medium" stackId="a" fill="#FFDD94" />
            <Bar dataKey="Low" stackId="a" fill="#D0E6A5" />
            <Bar dataKey="No Identified Risk" stackId="a" fill="#333" />
            <Bar dataKey="Missing" stackId="a" fill="#BABEC4" />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-secondary text-right">
          <i className="fas fa-exclamation-circle mr-1"></i>
          Showing top {NUMBER_OF_COUNTRIES_TO_SHOW} countries with highest total number of monitorees
        </div>
      </div>
    );
  }

  renderTable() {
    return (
      <div>
        <Table striped hover className="border mt-2">
          <thead>
            <tr>
              <th></th>
              {RISKLEVELS.map(risklevel => (
                <th key={risklevel.toString()}>{risklevel}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {SEXES.map(sexgroup => (
              <tr key={sexgroup.toString() + '1'}>
                <td key={sexgroup.toString() + '2'} className="font-weight-bold">
                  {sexgroup}
                </td>
                {RISKLEVELS.map((risklevel, risklevelIndex) => (
                  <td key={sexgroup.toString() + risklevelIndex.toString()}>{this.sexData.find(x => x.name === sexgroup)[String(risklevel)]}</td>
                ))}
                <td>{this.sexData.find(x => x.name === sexgroup)['total']}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Table striped hover className="border mt-2">
          <thead>
            <tr>
              <th></th>
              {RISKLEVELS.map(risklevel => (
                <th key={risklevel.toString()}>{risklevel}</th>
              ))}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {this.coiData
              .map(x => x.name)
              .map(coiGroup => (
                <tr key={coiGroup.toString() + '1'}>
                  <td key={coiGroup.toString() + '2'} className="font-weight-bold">
                    {coiGroup}
                  </td>
                  {RISKLEVELS.map((risklevel, risklevelIndex) => (
                    <td key={coiGroup.toString() + risklevelIndex.toString()}>{this.coiData.find(x => x.name === coiGroup)[String(risklevel)]}</td>
                  ))}
                  <td>{this.coiData.find(x => x.name === coiGroup)['total']}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }

  renderErrors() {
    return <div className="text-danger display-6"> ERROR: {this.ERRORSTRING}. </div>;
  }

  renderCard() {
    return (
      <span>
        <div className="text-right">
          <span className="mr-2 display-6"> View Data as Graph </span>
          <Switch onChange={this.handleChange} onColor="#82A0E4" height={18} width={40} uncheckedIcon={false} checked={this.state.checked} />
        </div>
        {this.state.checked ? this.renderBarGraph() : this.renderTable()}
      </span>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Card className="card-square text-center">
          <Card.Header as="h5" className="text-left">
            Among Those {this.state.viewTotal ? 'Ever Monitored (includes current)' : 'Currently Under Active Monitoring'}
          </Card.Header>
          <Card.Body>{this.ERRORS ? this.renderErrors() : this.renderCard()}</Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

AgeStratificationActive.propTypes = {
  stats: PropTypes.object,
  viewTotal: PropTypes.bool,
};

export default AgeStratificationActive;
