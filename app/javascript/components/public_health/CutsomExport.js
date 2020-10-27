import React from 'react';
import { PropTypes } from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

class CustomExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preset: this.props.preset || '',
      format: 'xlsx',
      filter: true,
      fields: {},
    };
  }

  render() {
    return (
      <Modal size="lg" show centered onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Custom Export Format</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Row className="mx-3 py-2 g-border-bottom">
            <Col md="6" className="pl-1">
              <p className="pt-1 mb-0 font-weight-bold">{this.props.preset ? 'Export Preset' : 'Save as Preset:'}</p>
            </Col>
            <Col md="12">
              {this.props.preset ? (
                <p>{this.props.preset}</p>
              ) : (
                <Form.Control
                  id="preset"
                  as="input"
                  size="sm"
                  type="text"
                  className="form-square"
                  placeholder="(Optional name for Export Preset)"
                  autoComplete="off"
                  value={this.state.preset}
                  onChange={event => this.setState({ preset: event.target.value })}
                />
              )}
            </Col>
            <Col md="6">
              <Button size="sm" variant="secondary btn-square">
                Remove
              </Button>
            </Col>
          </Row>
          <Row className="mx-3 py-2 g-border-bottom">
            <Col md="6" className="pl-1">
              <p className="pt-1 mb-0 font-weight-bold">Export Format:</p>
            </Col>
            <Col md="18">
              <Button
                id="csvFormatBtn"
                size="sm"
                variant={this.state.format === 'csv' ? 'primary' : 'outline-secondary'}
                onClick={() => this.setState({ format: 'csv' })}>
                CSV
              </Button>
              <Button
                id="xlsxFormatBtn"
                size="sm"
                variant={this.state.format === 'xlsx' ? 'primary' : 'outline-secondary'}
                onClick={() => this.setState({ format: 'xlsx' })}>
                Excel
              </Button>
            </Col>
          </Row>
          <Row className="mx-3 py-2 g-border-bottom">
            <Col md="6" className="pl-1">
              <p className="pt-1 mb-0 font-weight-bold">Export Monitorees:</p>
            </Col>
            <Col md="18">
              <Form.Check
                id="currentFilterMonitoreesBtn"
                type="radio"
                size="sm"
                className="py-1"
                label={`Current Filter (${this.props.currentFilterMonitoreesCount})`}
                onChange={() => this.setState({ filter: true })}
              />
              <Form.Check
                id="allMonitoreesBtn"
                type="radio"
                size="sm"
                className="py-1"
                label={`All Monitorees (${this.props.allMonitoreesCount})`}
                onChange={() => this.setState({ filter: false })}
              />
            </Col>
          </Row>
          <Row className="mx-3 pt-2">
            <Col md="24" className="pl-1">
              <p className="pt-1 mb-1 font-weight-bold">Export Data:</p>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="Monitoree Details"></Form.Check>
              <Form.Check size="sm" className="ml-4" label="Identification"></Form.Check>
              <Form.Check size="sm" className="ml-4" label="Contact Information"></Form.Check>
              <Form.Check size="sm" className="ml-4" label="Address"></Form.Check>
              <Form.Check size="sm" className="ml-4" label="Arrival Information"></Form.Check>
              <Form.Check size="sm" className="ml-4" label="Planned Travel"></Form.Check>
              <Form.Check size="sm" className="ml-4" label="Case Information"></Form.Check>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="Monitoring Actions"></Form.Check>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="Report History"></Form.Check>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="Lab Results"></Form.Check>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="Close Contacts"></Form.Check>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="History"></Form.Check>
            </Col>
          </Row>
          <Row className="mx-0 px-3 py-1" style={{ backgroundColor: '#ccc', borderTop: '1px solid #fff' }}>
            <Col md="24">
              <Form.Check size="md" label="Comments"></Form.Check>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-square">Cancel</Button>
          <Button variant="primary btn-square">Export</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CustomExport.propTypes = {
  preset: PropTypes.string,
  currentFilterMonitoreesCount: PropTypes.number,
  allMonitoreesCount: PropTypes.number,
  onClose: PropTypes.func,
};

export default CustomExport;
