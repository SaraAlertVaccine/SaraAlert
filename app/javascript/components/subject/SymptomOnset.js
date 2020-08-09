import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import confirmDialog from '../util/ConfirmDialog';
import DateInput from '../util/DateInput';
import InfoTooltip from '../util/InfoTooltip';
import reportError from '../util/ReportError';

class SymptomOnset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom_onset: this.props.patient.symptom_onset,
      loading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit = async confirmText => {
    if (await confirmDialog(confirmText)) {
      this.submit();
    }
  };

  submit() {
    this.setState({ loading: true }, () => {
      axios.defaults.headers.common['X-CSRF-Token'] = this.props.authenticity_token;
      axios
        .post(window.BASE_PATH + '/patients/' + this.props.patient.id + '/status', {
          symptom_onset: this.state.symptom_onset,
          user_defined_symptom_onset: true,
          diffState: ['symptom_onset', 'user_defined_symptom_onset'],
        })
        .then(() => {
          location.reload(true);
        })
        .catch(error => {
          reportError(error);
        });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Form.Group as={Col} md="6">
            <Form.Label className="nav-input-label">
              SYMPTOM ONSET
              <InfoTooltip tooltipTextKey="symptomOnset" location="right"></InfoTooltip>
            </Form.Label>
            <DateInput
              id="symptom_onset"
              date={this.state.symptom_onset}
              onChange={date => this.setState({ symptom_onset: date })}
              placement="bottom"
              isClearable
            />
          </Form.Group>
          <Form.Group as={Col} md="18" className="align-self-end pl-0">
            <Button className="btn-lg" onClick={() => this.handleSubmit('Are you sure you want to modify the symptom onset date?')}>
              <i className="fas fa-temperature-high"></i> Update
              {this.state.loading && (
                <React.Fragment>
                  &nbsp;<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </React.Fragment>
              )}
            </Button>
          </Form.Group>
        </Row>
      </React.Fragment>
    );
  }
}

SymptomOnset.propTypes = {
  authenticity_token: PropTypes.string,
  patient: PropTypes.object,
};

export default SymptomOnset;
