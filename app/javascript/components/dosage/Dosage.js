import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
// import moment from 'moment';

import DateInput from '../util/DateInput';
import reportError from '../util/ReportError';

class Dosage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      loading: false,
      cvx: this.props.dosage.cvx || '',
      manufacturer: this.props.dosage.manufacturer || '',
      expiration_date: this.props.dosage.expiration_date,
      lot_number: this.props.dosage.lot_number || '',
      date_given: this.props.dosage.date_given,
      sending_org: this.props.dosage.sending_org || '',
      admin_route: this.props.dosage.admin_route || '',
      admin_suffix: this.props.dosage.admin_suffix || '',
      admin_site: this.props.dosage.admin_site || '',
      dose_number: this.props.dosage.dose_number || '',
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  toggleModal() {
    this.setState(state => {
      return {
        showModal: !state.showModal,
        loading: false,
        cvx: this.props.dosage.cvx || '',
        manufacturer: this.props.dosage.manufacturer || '',
        expiration_date: this.props.dosage.expiration_date,
        lot_number: this.props.dosage.lot_number || '',
        date_given: this.props.dosage.date_given,
        sending_org: this.props.dosage.sending_org || '',
        admin_route: this.props.dosage.admin_route || '',
        admin_suffix: this.props.dosage.admin_suffix || '',
        admin_site: this.props.dosage.admin_site || '',
        dose_number: this.props.dosage.dose_number || '',
      };
    });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  // handleDateChange(field, date) {
  //   // this.setState({ [field]: date }, () => {
  //   //   this.setState(state => {
  //   //     return {
  //   //       reportInvalid: moment(state.report).isBefore(state.specimen_collection, 'day'),
  //   //     };
  //   //   });
  //   // });
  // }

  submit() {
    this.setState({ loading: true }, () => {
      let test = {
        patient_id: this.props.patient.id,
        cvx: this.state.cvx,
        manufacturer: this.state.manufacturer,
        expiration_date: this.state.expiration_date,
        lot_number: this.state.lot_number,
        date_given: this.state.date_given,
        sending_org: this.state.sending_org,
        admin_route: this.state.admin_route,
        admin_suffix: this.state.admin_suffix,
        admin_site: this.state.admin_site,
        dose_number: this.state.dose_number,
      };
      console.log('Submission', test);
      axios.defaults.headers.common['X-CSRF-Token'] = this.props.authenticity_token;
      axios
        .post(window.BASE_PATH + '/dosages' + (this.props.dosage.id ? '/' + this.props.dosage.id : ''), {
          patient_id: this.props.patient.id,
          cvx: this.state.cvx,
          manufacturer: this.state.manufacturer,
          expiration_date: this.state.expiration_date,
          lot_number: this.state.lot_number,
          date_given: this.state.date_given,
          sending_org: this.state.sending_org,
          admin_route: this.state.admin_route,
          admin_suffix: this.state.admin_suffix,
          admin_site: this.state.admin_site,
          dose_number: this.state.dose_number,
        })
        .then(() => {
          location.reload(true);
        })
        .catch(error => {
          reportError(error);
        });
    });
  }

  createModal(title, toggle, submit) {
    return (
      <Modal size="lg" show centered onHide={toggle}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Dose Number</Form.Label>
                <Form.Control as="select" className="form-control-lg" id="dose_number" onChange={this.handleChange} value={this.state.dose_number}>
                  <option disabled></option>
                  <option>1</option>
                  <option>2</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">CVX</Form.Label>
                <Form.Control size="lg" id="cvx" className="form-square" value={this.state.cvx || ''} onChange={this.handleChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Manufacturer</Form.Label>
                <Form.Control size="lg" id="manufacturer" className="form-square" value={this.state.manufacturer || ''} onChange={this.handleChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Vaccine Expiration Date</Form.Label>
                <DateInput
                  id="expiration_date"
                  date={this.state.expiration_date}
                  onChange={date => this.setState({ expiration_date: date })}
                  placement="bottom"
                  customClass="form-control-lg"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Lot Number</Form.Label>
                <Form.Control size="lg" id="lot_number" className="form-square" value={this.state.lot_number || ''} onChange={this.handleChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Date Administered</Form.Label>
                <DateInput
                  id="date_given"
                  date={this.state.date_given}
                  onChange={date => this.setState({ date_given: date })}
                  placement="bottom"
                  customClass="form-control-lg"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Sending Organization</Form.Label>
                <Form.Control size="lg" id="sending_org" className="form-square" value={this.state.sending_org || ''} onChange={this.handleChange} />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Route of Administration</Form.Label>
                <Form.Control as="select" className="form-control-lg" id="admin_route" onChange={this.handleChange} value={this.state.admin_route}>
                  <option disabled></option>
                  <option>IM</option>
                  <option>other</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Administrator Suffix</Form.Label>
                <Form.Control as="select" className="form-control-lg" id="admin_suffix" onChange={this.handleChange} value={this.state.admin_suffix}>
                  <option disabled></option>
                  <option>RN</option>
                  <option>LPN</option>
                  <option>MA</option>
                  <option>PharmD</option>
                  <option>MD</option>
                  <option>ICT</option>
                </Form.Control>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label className="nav-input-label">Vaccination Site on Body</Form.Label>
                <Form.Control as="select" className="form-control-lg" id="admin_site" onChange={this.handleChange} value={this.state.admin_site}>
                  <option disabled></option>
                  <option value="deltoid-l">Deltoid - Left</option>
                  <option value="deltoid-r">Deltoid - Right</option>
                  <option value="gluteal-l">Gluteal - Left</option>
                  <option value="gluteal-r">Gluteal - Right</option>
                  <option value="thigh-l">Thigh - Left</option>
                  <option value="thigh-r">Thigh - Right</option>
                </Form.Control>
              </Form.Group>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-square" onClick={toggle}>
            Cancel
          </Button>
          <Button variant="primary btn-square" disabled={this.state.loading} onClick={submit}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <React.Fragment>
        {!this.props.dosage.id && (
          <Button onClick={this.toggleModal}>
            <i className="fas fa-plus"></i> Add New Vaccine Dosage
          </Button>
        )}
        {this.props.dosage.id && (
          <Button variant="link" onClick={this.toggleModal} className="btn btn-link py-0" size="sm">
            <i className="fas fa-edit"></i> Edit
          </Button>
        )}
        {this.state.showModal && this.createModal('Vaccine Dosage', this.toggleModal, this.submit)}
      </React.Fragment>
    );
  }
}

Dosage.propTypes = {
  dosage: PropTypes.object,
  patient: PropTypes.object,
  authenticity_token: PropTypes.string,
};

export default Dosage;
