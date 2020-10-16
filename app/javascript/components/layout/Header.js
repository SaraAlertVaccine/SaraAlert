import React from 'react';
import { PropTypes } from 'prop-types';
import { Navbar, Nav, Form } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: See if we can use react-bootstrap components for the dropdown
    return (
      <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
        <Navbar.Brand href={this.props.report_mode ? '/' : this.props.root}>
          Sara Alert<small className="nav-version ml-1">{this.props.version}</small>
        </Navbar.Brand>
        {this.props.current_user && (
          <React.Fragment>
            <Nav className="pt-1 mr-auto" activeKey={window.location.pathname}>
              {this.props.current_user.can_see_enroller_dashboard_tab && (
                <Nav.Link className="ml-3" href={`${window.BASE_PATH}/patients`}>
                  <i className="fas fa-table"></i>&nbsp;&nbsp;Enroller Dashboard
                </Nav.Link>
              )}
              {this.props.current_user.can_see_monitoring_dashboards_tab && (
                <Nav.Link className="ml-3" href={`${window.BASE_PATH}/public_health`}>
                  <i className="fas fa-table"></i>&nbsp;&nbsp;Monitoring Dashboards
                </Nav.Link>
              )}
              {this.props.current_user.can_see_admin_panel_tab && (
                <Nav.Link className="ml-3" href={`${window.BASE_PATH}/admin`}>
                  <i className="fas fa-user-cog"></i>&nbsp;&nbsp;Admin Panel
                </Nav.Link>
              )}
              {this.props.current_user.can_see_analytics_tab && (
                <Nav.Link className="ml-3" href={`${window.BASE_PATH}/analytics`}>
                  <i className="fas fa-chart-pie"></i>&nbsp;&nbsp;Analytics
                </Nav.Link>
              )}
            </Nav>
            <Form inline className="ml-auto">
              {!this.props.report_mode && (
                <React.Fragment>
                  <Navbar.Text className="text-white px-3">
                    <i className="fas fa-user"></i>&nbsp;&nbsp;{this.props.current_user.email}
                  </Navbar.Text>
                  <a className="white-border-right"></a>
                  <div className="dropdown">
                    <Nav.Link className="text-white" id="helpMenuButton" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fas fa-question-circle"></i>
                    </Nav.Link>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="helpMenuButton">
                      <a className="dropdown-item" href="https://saraalert.org/public-health/guides/" target="_blank" rel="noreferrer">
                        <i className="fas fa-book fa-fw"></i> User Guides
                      </a>
                      <a className="dropdown-item" href="https://virtualcommunities.naccho.org/saraalertforum/home" target="_blank" rel="noreferrer">
                        <i className="fas fa-comments fa-fw"></i> User Forum
                      </a>
                      <a className="dropdown-item" href="https://saraalert.org/contact/" target="_blank" rel="noreferrer">
                        <i className="fas fa-envelope-open-text fa-fw"></i> Contact Us
                      </a>
                    </div>
                  </div>
                  <a className="white-border-right"></a>
                  {this.props.current_user.is_usa_admin && (
                    <React.Fragment>
                      <Nav.Link className="night-nav-link text-white" href="/oauth/applications">
                        <i className="fas fa-share-alt"></i>&nbsp;&nbsp;API
                      </Nav.Link>
                      <a className="white-border-right"></a>
                    </React.Fragment>
                  )}
                  <Nav.Link className="night-nav-link text-white" href={`${window.BASE_PATH}/users/sign_out`} data-method="DELETE">
                    <i className="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Logout
                  </Nav.Link>
                </React.Fragment>
              )}
            </Form>
          </React.Fragment>
        )}
      </Navbar>
    );
  }
}

Header.propTypes = {
  root: PropTypes.string,
  current_user: PropTypes.object,
  report_mode: PropTypes.bool,
  version: PropTypes.string,
};

export default Header;
