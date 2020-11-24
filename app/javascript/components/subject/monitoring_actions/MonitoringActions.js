import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Col } from 'react-bootstrap';

// import AssignedUser from './AssignedUser';
// import CaseStatus from './CaseStatus';
// import ExposureRiskAssessment from './ExposureRiskAssessment';
// import Jurisdiction from './Jurisdiction';
// import MonitoringPlan from './MonitoringPlan';
// import MonitoringStatus from './MonitoringStatus';
import PublicHealthAction from './PublicHealthAction';

class MonitoringActions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Form className="mb-3 mt-3 px-4">
          <Form.Row className="align-items-end">
            <Form.Group as={Col} md="12" lg="8" className="pt-2">
              <PublicHealthAction patient={this.props.patient} authenticity_token={this.props.authenticity_token} has_dependents={this.props.has_dependents} />
            </Form.Group>
          </Form.Row>
        </Form>
      </React.Fragment>
    );
  }
}

MonitoringActions.propTypes = {
  current_user: PropTypes.object,
  user_can_transfer: PropTypes.bool,
  patient: PropTypes.object,
  authenticity_token: PropTypes.string,
  jurisdiction_paths: PropTypes.object,
  assigned_users: PropTypes.array,
  has_dependents: PropTypes.bool,
  in_household_with_member_with_ce_in_exposure: PropTypes.bool,
};

export default MonitoringActions;
