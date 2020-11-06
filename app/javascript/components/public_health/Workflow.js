import React from 'react';
import { PropTypes } from 'prop-types';

import PublicHealthHeader from './PublicHealthHeader';
import PatientsTable from './PatientsTable';

class Workflow extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      query: {},
      filtered_monitorees_count: 0,
    };
  }

  render() {
    return (
      <React.Fragment>
        <PublicHealthHeader
          authenticity_token={this.props.authenticity_token}
          workflow={this.props.workflow}
          abilities={this.props.abilities}
          query={this.state.query}
          filtered_monitorees_count={this.state.filtered_monitorees_count}
          custom_export_options={this.props.custom_export_options}
        />
        <PatientsTable
          authenticity_token={this.props.authenticity_token}
          workflow={this.props.workflow}
          jurisdiction={this.props.jurisdiction}
          tabs={this.props.tabs}
          setQuery={query => this.setState({ query })}
          setFilteredMonitoreesCount={filtered_monitorees_count => this.setState({ filtered_monitorees_count })}
        />
      </React.Fragment>
    );
  }
}

Workflow.propTypes = {
  authenticity_token: PropTypes.string,
  abilities: PropTypes.object,
  jurisdiction: PropTypes.object,
  workflow: PropTypes.string,
  tabs: PropTypes.object,
  custom_export_options: PropTypes.object,
};

export default Workflow;
