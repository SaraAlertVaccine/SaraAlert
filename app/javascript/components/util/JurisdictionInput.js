import React from 'react';
import PropTypes from 'prop-types';
import { Button, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

class JurisdictionInput extends React.Component {
  constructor(props) {
    super(props);
  }

  handleJurisdictionChange = jurisdiction => {
    this.props.onJurisdictionChange({ id: jurisdiction?.value, path: jurisdiction?.label });
  };

  handleScopeChange = scope => {
    this.props.onScopeChange(scope);
  };

  render() {
    return (
      <React.Fragment>
        <InputGroup size={this.props.size || 'lg'}>
          {this.props.isFilter && (
            <InputGroup.Prepend>
              <InputGroup.Text className="rounded-0">
                <i className="fas fa-map-marked-alt"></i>
                <span className="ml-1">Jurisdiction</span>
              </InputGroup.Text>
            </InputGroup.Prepend>
          )}
          <div className="form-control p-0">
            <Select
              name="jurisdiction"
              value={{
                value: this.props.jurisdiction?.id,
                label: this.props.jurisdiction?.path,
              }}
              options={Object.keys(this.props.jurisdiction_paths).map(id => {
                return { value: id, label: this.props.jurisdiction_paths[`${id}`] };
              })}
              onChange={this.handleJurisdictionChange}
              placeholder=""
              noOptionsMessage={() => {
                return 'No Jurisdictions';
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
              <OverlayTrigger overlay={<Tooltip>Include Sub-Jurisdictions</Tooltip>}>
                <Button
                  size={this.props.size || 'lg'}
                  variant={this.props.scope === 'all' ? 'primary' : 'outline-secondary'}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => this.handleScopeChange('all')}>
                  All
                </Button>
              </OverlayTrigger>
              <OverlayTrigger overlay={<Tooltip>Exclude Sub-Jurisdictions</Tooltip>}>
                <Button
                  size={this.props.size || 'lg'}
                  variant={this.props.scope === 'exact' ? 'primary' : 'outline-secondary'}
                  style={{ outline: 'none', boxShadow: 'none' }}
                  onClick={() => this.handleScopeChange('exact')}>
                  Exact
                </Button>
              </OverlayTrigger>
            </React.Fragment>
          )}
        </InputGroup>
      </React.Fragment>
    );
  }
}
JurisdictionInput.propTypes = {
  jurisdiction_paths: PropTypes.object,
  jurisdiction: PropTypes.object,
  scope: PropTypes.string,
  onJurisdictionChange: PropTypes.func,
  onScopeChange: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'lg']),
  isFilter: PropTypes.bool,
};

export default JurisdictionInput;
