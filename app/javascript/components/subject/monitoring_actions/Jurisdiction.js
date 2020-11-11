import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Modal, Form } from 'react-bootstrap';
import _ from 'lodash';
import axios from 'axios';

import InfoTooltip from '../../util/InfoTooltip';
import JurisdictionInput from '../../util/JurisdictionInput';
import reportError from '../../util/ReportError';

class Jurisdiction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showJurisdictionModal: false,
      jurisdiction: { id: this.props.patient.jurisdiction_id, path: this.props.jurisdiction_paths[this.props.patient.jurisdiction_id] },
      apply_to_household: false,
      loading: false,
      reasoning: '',
    };
    this.origState = Object.assign({}, this.state);
  }

  handleJurisdictionChange = jurisdiction => {
    this.setState({ jurisdiction });
    if (jurisdiction?.id !== this.props.patient.jurisdiction_id) {
      this.toggleJurisdictionModal();
    }
  };

  handleApplyHouseholdChange = event => {
    const applyToHousehold = event.target.id === 'apply_to_household_yes';
    this.setState({ apply_to_household: applyToHousehold });
  };

  handleReasoningChange = event => {
    let value = event?.target?.value;
    this.setState({ [event.target.id]: value || '' });
  };

  toggleJurisdictionModal = () => {
    this.setState(state => {
      return {
        showJurisdictionModal: !state.showJurisdictionModal,
        jurisdiction: state.showJurisdictionModal
          ? { id: this.props.patient.jurisdiction_id, path: this.props.jurisdiction_paths[this.props.patient.jurisdiction_id] }
          : state.jurisdiction,
        apply_to_household: false,
        reasoning: '',
      };
    });
  };

  submit = () => {
    const diffState = Object.keys(this.state).filter(k => _.get(this.state, k) !== _.get(this.origState, k));
    this.setState({ loading: true }, () => {
      axios.defaults.headers.common['X-CSRF-Token'] = this.props.authenticity_token;
      axios
        .post(window.BASE_PATH + '/patients/' + this.props.patient.id + '/status', {
          patient: this.props.patient,
          jurisdiction: this.state.jurisdiction?.id,
          reasoning: this.state.reasoning,
          apply_to_household: this.state.apply_to_household,
          diffState: diffState,
        })
        .then(() => {
          const currentUserJurisdictionString = this.props.current_user.jurisdiction_path.join(', ');
          // check if current_user has access to the changed jurisdiction
          // if so, reload the page, if not, redirect to exposure or isolation dashboard
          if (!this.state.jurisdiction?.path.startsWith(currentUserJurisdictionString)) {
            const pathEnd = this.state.isolation ? '/isolation' : '';
            location.assign((window.BASE_PATH ? window.BASE_PATH : '') + '/public_health' + pathEnd);
          } else {
            location.reload(true);
          }
        })
        .catch(error => {
          reportError(error);
        });
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="disabled">
          <Form.Label className="nav-input-label">
            ASSIGNED JURISDICTION
            <InfoTooltip
              tooltipTextKey={this.props.user_can_transfer ? 'assignedJurisdictionCanTransfer' : 'assignedJurisdictionCannotTransfer'}
              location="right"></InfoTooltip>
          </Form.Label>
          <Form.Group className="d-flex mb-0">
            <JurisdictionInput
              jurisdiction_paths={this.props.jurisdiction_paths}
              jurisdiction={this.state.jurisdiction}
              onJurisdictionChange={this.handleJurisdictionChange}
              size="lg"
              isFilter={false}
            />
          </Form.Group>
        </div>
        <Modal size="lg" show={this.state.showJurisdictionModal} centered onHide={this.toggleJurisdictionModal}>
          <Modal.Header>
            <Modal.Title>Jurisdiction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to change jurisdiction from &quot;{this.props.jurisdiction_paths[this.props.patient?.jurisdiction_id]}&quot; to &quot;
              {this.state.jurisdiction?.path}&quot;?
              {this.props.patient?.assigned_user !== '' && <b> Please also consider removing or updating the assigned user if it is no longer applicable.</b>}
            </p>
            {this.props.has_dependents && (
              <React.Fragment>
                <p className="mb-2">Please select the records that you would like to apply this change to:</p>
                <Form.Group className="px-4">
                  <Form.Check
                    type="radio"
                    className="mb-1"
                    name="apply_to_household"
                    id="apply_to_household_no"
                    label="This monitoree only"
                    onChange={this.handleApplyHouseholdChange}
                    checked={!this.state.apply_to_household}
                  />
                  <Form.Check
                    type="radio"
                    className="mb-3"
                    name="apply_to_household"
                    id="apply_to_household_yes"
                    label="This monitoree and all household members"
                    onChange={this.handleApplyHouseholdChange}
                    checked={this.state.apply_to_household}
                  />
                </Form.Group>
              </React.Fragment>
            )}
            <Form.Group>
              <Form.Label>Please include any additional details:</Form.Label>
              <Form.Control as="textarea" rows="2" id="reasoning" onChange={this.handleReasoningChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary btn-square" onClick={this.toggleJurisdictionModal}>
              Cancel
            </Button>
            <Button variant="primary btn-square" onClick={this.submit} disabled={this.state.loading}>
              {this.state.loading && (
                <React.Fragment>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;
                </React.Fragment>
              )}
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

Jurisdiction.propTypes = {
  patient: PropTypes.object,
  authenticity_token: PropTypes.string,
  has_dependents: PropTypes.bool,
  jurisdiction_paths: PropTypes.object,
  current_user: PropTypes.object,
  user_can_transfer: PropTypes.bool,
};

export default Jurisdiction;
