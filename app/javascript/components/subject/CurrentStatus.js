import React from 'react';
import { PropTypes } from 'prop-types';

import InfoTooltip from '../util/InfoTooltip';
import EligibilityTooltip from '../util/EligibilityTooltip';

class CurrentStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  generateStatus(status) {
    if (status === 'exposure_symptomatic') {
      return <span className="text-danger">symptomatic</span>;
    } else if (status === 'exposure_follow_up') {
      return <span className="text-danger">needs follow up</span>;
    } else if (status === 'exposure_reviewed') {
      return <span className="text-success">reviewed</span>;
    } else if (status === 'exposure_non_reporting') {
      return <span className="text-warning">non-reporting</span>;
    } else if (status === 'exposure_under_investigation') {
      return <span className="text-dark">PUI</span>;
    } else if (status === 'purged') {
      return <span className="text-muted">purged</span>;
    } else if (status === 'closed') {
      return <span className="text-secondary">not currently being monitored</span>;
    } else if (status === 'isolation_requiring_review') {
      return <span className="text-danger">requires review</span>;
    } else if (status === 'isolation_symp_non_test_based') {
      return <span className="text-danger">requires review (symptomatic non test based)</span>;
    } else if (status === 'isolation_asymp_non_test_based') {
      return <span className="text-danger">requires review (asymptomatic non test based)</span>;
    } else if (status === 'isolation_test_based') {
      return <span className="text-danger">requires review (test based)</span>;
    } else if (status === 'isolation_non_reporting') {
      return <span className="text-warning">non-reporting</span>;
    } else if (status === 'isolation_reporting') {
      return <span className="text-success">reporting</span>;
    } else {
      return <span>unknown</span>;
    }
  }

  generateInfoHover(status) {
    if (status === 'isolation_symp_non_test_based') {
      return <InfoTooltip tooltipTextKey="symptomaticNonTestBased" location="right"></InfoTooltip>;
    } else if (status === 'isolation_asymp_non_test_based') {
      return <InfoTooltip tooltipTextKey="asymptomaticNonTestBased" location="right"></InfoTooltip>;
    } else if (status === 'isolation_test_based') {
      return <InfoTooltip tooltipTextKey="testBased" location="right"></InfoTooltip>;
    } else {
      return null;
    }
  }

  generateReportEligibility() {
    return (
      <React.Fragment>
        <span>. This {this.props.isolation ? "case's" : "recipient's"} notification status is&nbsp;</span>
        <EligibilityTooltip report_eligibility={this.props.report_eligibility} id={`eltt`} inline={true} />.
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="display-6 pb-3">
          This recipient is in the <u>{this.props.isolation ? 'isolation' : 'vaccine'}</u> workflow, and their current status is{' '}
          <b>{this.generateStatus(this.props.status)}</b>
          {this.generateInfoHover(this.props.status)}
          {this.generateReportEligibility()}
        </h1>
      </React.Fragment>
    );
  }
}

CurrentStatus.propTypes = {
  report_eligibility: PropTypes.object,
  status: PropTypes.string,
  isolation: PropTypes.bool,
};

export default CurrentStatus;
