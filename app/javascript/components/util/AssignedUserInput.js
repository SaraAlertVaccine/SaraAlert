import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreatableSelect from 'react-select/creatable';

class AssignedUserInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assigned_user_input: props.assigned_user !== 'none' ? props.assigned_user : '' || '',
    };
  }

  handleAssignedUserChange = assigned_user => {
    if (!isNaN(assigned_user) && parseInt(assigned_user) > 0 && parseInt(assigned_user) <= 9999) {
      this.setState({ assigned_user_input: assigned_user });
      this.props.onAssignedUserChange(assigned_user);
    } else if ([null, ''].includes(assigned_user)) {
      this.setState({ assigned_user_input: '' });
      this.props.onAssignedUserChange(null);
    } else if (assigned_user === 'none') {
      this.setState({ assigned_user_input: '' });
      this.props.onAssignedUserChange(assigned_user);
    }
  };

  render() {
    return (
      <React.Fragment>
        <InputGroup size={this.props.size || 'lg'}>
          {this.props.isFilter && (
            <InputGroup.Prepend>
              <InputGroup.Text className="rounded-0">
                <FontAwesomeIcon icon={['fas', 'users']} />
                <span className="ml-1">Assigned User</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
          )}
          <div className="form-control p-0">
            <CreatableSelect
              name="assigned_user"
              value={{
                value: this.state.assigned_user_input || '',
                label: this.state.assigned_user_input || '',
              }}
              options={this.props.assigned_users.map(user => {
                return { value: user, label: user };
              })}
              isClearable
              formatCreateLabel={input => input}
              onChange={user => this.handleAssignedUserChange(user?.value)}
              onInputChange={user => user.replace(/\D/g, '').substr(0, 4)}
              placeholder=""
              noOptionsMessage={() => {
                return '';
              }}
              styles={{
                control: () => ({ height: 'auto', width: 'auto' }),
                indicatorsContainer: provided => ({ ...provided, display: 'none' }),
                menu: provided => ({ ...provided, margin: this.props.size === 'sm' ? '0.25rem 0' : '0.375rem 0' }),
                option: provided => ({ ...provided, cursor: 'pointer' }),
                singleValue: provided => ({ ...provided, color: '#495057' }),
                valueContainer: provided => ({
                  ...provided,
                  padding: this.props.size === 'sm' ? '0 0.375rem' : '0.3125rem 0.875rem',
                  fontSize: this.props.size === 'sm' ? '0.875rem' : '1.25rem',
                  color: '#495057',
                }),
              }}
              theme={theme => ({ ...theme, borderRadius: 0 })}
            />
            <FontAwesomeIcon
              icon={['fas', 'chevron-down']}
              style={{
                zIndex: 1,
                position: 'absolute',
                right: '0.375rem',
                top: this.props.size === 'sm' ? '0.5rem' : '1rem',
                fontSize: '10pt',
                color: '#495057',
              }}
            />
          </div>
          {this.props.isFilter && (
            <React.Fragment>
              <OverlayTrigger
                overlay={<Tooltip>Search for {this.props.workflow === 'exposure' ? 'monitorees' : 'cases'} with any or no assigned user</Tooltip>}>
                <Button
                  id="allAssignedUsers"
                  size="sm"
                  variant={this.props.assigned_user === null ? 'primary' : 'outline-secondary'}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => this.handleAssignedUserChange(null)}>
                  All
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Search for {this.props.workflow === 'exposure' ? 'monitorees' : 'cases'} with no assigned user</Tooltip>}>
                <Button
                  id="noAssignedUser"
                  size="sm"
                  variant={this.props.assigned_user === 'none' ? 'primary' : 'outline-secondary'}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => this.handleAssignedUserChange('none')}>
                  None
                </Button>
              </OverlayTrigger>
            </React.Fragment>
          )}
        </InputGroup>
      </React.Fragment>
    );
  }
}
AssignedUserInput.propTypes = {
  workflow: PropTypes.string,
  assigned_users: PropTypes.array,
  assigned_user: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAssignedUserChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
  isFilter: PropTypes.bool,
};

export default AssignedUserInput;
