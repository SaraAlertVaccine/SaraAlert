import React from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Import extends React.Component {
  constructor(props) {
    super(props);
    this.state = { patients: props.patients, accepted: [], rejected: [] };
    this.importAll = this.importAll.bind(this);
    this.importSub = this.importSub.bind(this);
    this.rejectSub = this.rejectSub.bind(this);
    this.submit = this.submit.bind(this);
  }

  importAll() {
    for (let i = 0; i < this.state.patients.length; i++) {
      if (!(this.state.accepted.includes(i) || this.state.rejected.includes(i))) {
        this.importSub(i);
      }
    }
  }

  importSub(num) {
    this.submit(this.state.patients[num], num);
  }

  rejectSub(num) {
    let next = [...this.state.rejected, num];
    this.setState({ rejected: next });
  }

  submit(data, num) {
    const patient = { patient: { ...data } };
    axios.defaults.headers.common['X-CSRF-Token'] = this.props.authenticity_token;
    axios({
      method: 'post',
      url: '/patients',
      data: patient,
    })
      .then(() => {
        let next = [...this.state.accepted, num];
        this.setState({ accepted: next });
      })
      .catch(() => {
        toast.error(
          <div>
            <div> Failed to communicate with the Sara Alert System Server. </div>
            <div> If the error continues, please contact a System Administrator. </div>
          </div>,
          {
            autoClose: 10000,
          }
        );
      });
  }

  render() {
    if (this.state.patients.length === this.state.accepted.length + this.state.rejected.length) {
      location.href = '/';
    }
    return (
      <React.Fragment>
        <div className="m-4">
          <h5>Please review the patients that are about to be imported below. You can individually accept each patient, or accept all at once.</h5>
          <Button
            variant="primary"
            className="btn-lg my-2"
            onClick={() => {
              if (
                window.confirm(
                  'Are you sure you want to import all subjects? Note: This will not import already rejected or re-import already accepted subjects listed below.'
                )
              ) {
                this.importAll();
              }
            }}>
            Accept All
          </Button>
          {this.state.patients.map((patient, index) => {
            return (
              <Card
                body
                key={`p-${index}`}
                className="card-square mt-3"
                bg="light"
                border={this.state.accepted.includes(index) ? 'success' : this.state.rejected.includes(index) ? 'danger' : ''}>
                <Container fluid>
                  <Row>
                    <Col>
                      <b>State/Local ID:</b> {patient.user_defined_id_statelocal}
                      <br />
                      <b>CDC ID:</b> {patient.user_defined_id_cdc}
                      <br />
                      <b>First Name:</b> {patient.first_name}
                      <br />
                      <b>Last Name:</b> {patient.last_name}
                      <br />
                      <b>DOB:</b> {patient.date_of_birth}
                      <br />
                      <b>Language:</b> {patient.primary_language}
                      <br />
                      <b>Flight or Vessel Number:</b> {patient.flight_or_vessel_number}
                    </Col>
                    <Col>
                      <b>Home Address Line 1:</b> {patient.address_line_1}
                      <br />
                      <b>Home Town/City:</b> {patient.address_city}
                      <br />
                      <b>Home State:</b> {patient.address_state}
                      <br />
                      <b>Home Zip:</b> {patient.address_zip}
                      <br />
                      <b>Monitored Address Line 1:</b> {patient.monitored_address_line_1}
                      <br />
                      <b>Monitored Town/City:</b> {patient.monitored_address_city}
                      <br />
                      <b>Monitored State:</b> {patient.monitored_address_state}
                      <br />
                      <b>Monitored Zip:</b> {patient.monitored_address_zip}
                    </Col>
                    <Col>
                      <b>Phone Number 1:</b> {patient.primary_telephone}
                      <br />
                      <b>Phone Number 2:</b> {patient.secondary_telephone}
                      <br />
                      <b>Email:</b> {patient.email}
                      <br />
                      <b>Exposure Location:</b> {patient.potential_exposure_location}
                      <br />
                      <b>Date of Departure:</b> {patient.date_of_departure}
                      <br />
                      <b>Close Contact w/ Known Case:</b> {patient.contact_of_known_case}
                      <br />
                      <b>Was in HC Fac. w/ Known Cases:</b> {patient.was_in_health_care_facility_with_known_cases}
                    </Col>
                  </Row>
                </Container>
                {!(this.state.accepted.includes(index) || this.state.rejected.includes(index)) && (
                  <React.Fragment>
                    <Button
                      variant="danger"
                      className="my-2 ml-3 float-right"
                      onClick={() => {
                        this.rejectSub(index);
                      }}>
                      Reject
                    </Button>
                    <Button
                      variant="primary"
                      className="my-2 float-right"
                      onClick={() => {
                        this.importSub(index);
                      }}>
                      Accept
                    </Button>
                  </React.Fragment>
                )}
              </Card>
            );
          })}
        </div>
        <ToastContainer position="top-center" autoClose={3000} closeOnClick pauseOnVisibilityChange draggable pauseOnHover />
      </React.Fragment>
    );
  }
}

Import.propTypes = {
  patients: PropTypes.array,
  authenticity_token: PropTypes.string,
};

export default Import;