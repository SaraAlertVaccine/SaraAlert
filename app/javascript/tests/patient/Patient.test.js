import React from 'react'
import { shallow } from 'enzyme';
import { Button, Collapse, Row } from 'react-bootstrap';
import Patient from '../../components/patient/Patient.js'
import BadgeHOH from '../../components/util/BadgeHOH';
import ChangeHOH from '../../components/subject/ChangeHOH';
import MoveToHousehold from '../../components/subject/MoveToHousehold';
import RemoveFromHousehold from '../../components/subject/RemoveFromHousehold';
import { mockPatient1, mockPatient2, mockPatient3, mockPatient4, blankMockPatient } from '../mocks/mockPatients'
import { nameFormatter, dateFormatter } from '../util.js'

const goToMock = jest.fn();
const authyToken = "Q1z4yZXLdN+tZod6dBSIlMbZ3yWAUFdY44U06QWffEP76nx1WGMHIz8rYxEUZsl9sspS3ePF2ZNmSue8wFpJGg==";
const hohTableHeaders = [ 'Name', 'Workflow', 'Monitoring Status', 'Continuous Exposure?' ];
const identificationFields = [ 'DOB', 'Age', 'Language', 'State/Local ID', 'CDC ID', 'NNDSS ID', 'Birth Sex', 'Gender Identity', 'Sexual Orientation', 'Race', 'Ethnicity', 'Nationality' ];
const contactFields = [ 'Phone', 'Preferred Contact Time', 'Type', 'Email', 'Preferred Reporting Method' ];
const domesticAddressFields = [ 'Address 1', 'Address 2', 'Town/City', 'State', 'Zip' ];
const foreignAddressFields = [ 'Address 1', 'Address 2', 'Town/City', 'Zip', 'Country' ];
const additionalTravelFields = [ 'Type', 'Place', 'Port Of Departure', 'End Date', 'Start Date' ];
const potentialExposureFields = [ 
    'CLOSE CONTACT WITH A KNOWN CASE',
    'MEMBER OF A COMMON EXPOSURE COHORT',
    'TRAVEL FROM AFFECTED COUNTRY OR AREA',
    'WAS IN HEALTH CARE FACILITY WITH KNOWN CASES',
    'LABORATORY PERSONNEL',
    'HEALTHCARE PERSONNEL',
    'CREW ON PASSENGER OR CARGO FLIGHT'
]

describe('Patient', () => {
    it('Properly renders all main components', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ mockPatient2 ]} goto={goToMock} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);

        expect(wrapper.find('#monitoree-details-header').exists()).toBeTruthy();
        expect(wrapper.find('#monitoree-details-header').find('h4').text().includes(nameFormatter(mockPatient1))).toBeTruthy();
        expect(wrapper.find('#monitoree-details-header').find(BadgeHOH).exists()).toBeTruthy();
        expect(wrapper.find('.jursdiction-user-box').exists()).toBeTruthy();
        expect(wrapper.find('#jurisdiction-path').text()).toEqual('Assigned Jurisdiction: USA, State 1, County 2');
        expect(wrapper.find('#assigned-user').text()).toEqual('Assigned User: ' + mockPatient1.assigned_user);
        expect(wrapper.find('#identification').exists()).toBeTruthy();
        expect(wrapper.find('#contact-information').exists()).toBeTruthy();
        expect(wrapper.find('#address').exists()).toBeTruthy();
        expect(wrapper.find('#arrival-information').exists()).toBeTruthy();
        expect(wrapper.find('#planned-travel').exists()).toBeTruthy();
        expect(wrapper.find('#potential-exposure-information').exists()).toBeTruthy();
        expect(wrapper.find('#exposure-notes').exists()).toBeTruthy();
        expect(wrapper.find('#case-information').exists()).toBeTruthy();
    });

    it('Properly renders identification section', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#identification');
        expect(section.find(Row).first().text()).toEqual('IDENTIFICATION');
        expect(section.find(Button).length).toEqual(0);
        identificationFields.forEach(function(field, index) {
            expect(section.find('b').at(index+1).text()).toEqual(field+':');
        });
    });

    it('Properly renders contact information section', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#contact-information');
        expect(section.find(Row).first().text()).toEqual('CONTACT INFORMATION');
        expect(section.find(Button).length).toEqual(0);
        contactFields.forEach(function(field, index) {
            expect(section.find('b').at(index+1).text()).toEqual(field+':');
        });
    });

    it('Properly renders address section for domestic address', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#address');
        expect(section.find(Row).first().text()).toEqual('ADDRESS');
        expect(section.find(Button).length).toEqual(0);

        const detailRow = section.find(Row).at(1);
        expect(detailRow.find('b').first().text()).toEqual('HOME ADDRESS');
        domesticAddressFields.forEach(function(field, index) {
            expect(detailRow.find('b').at(index+1).text()).toEqual(field+':');
        });
    });

    it('Properly renders address section for foreign address', () => {
        const wrapper = shallow(<Patient details={mockPatient4} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#address');
        expect(section.find(Row).first().text()).toEqual('ADDRESS');
        expect(section.find(Button).length).toEqual(0);

        const detailRow = section.find(Row).at(1);
        expect(detailRow.find('b').first().text()).toEqual('HOME ADDRESS');
        foreignAddressFields.forEach(function(field, index) {
            expect(detailRow.find('b').at(index+1).text()).toEqual(field+':');
        });
    });

    it('Properly renders arrival information section', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#arrival-information');
        expect(section.find(Row).first().text()).toEqual('ARRIVAL INFORMATION');
        expect(section.find(Button).length).toEqual(0);

        const departedColumn = section.find('.departed-col');
        const arrivalColumn = section.find('.arrival-col');
        expect(departedColumn.find('b').first().text()).toEqual('DEPARTED');
        expect(departedColumn.find('b').at(1).text()).toEqual('Port of Origin:');
        expect(departedColumn.find('span').at(0).text()).toEqual(mockPatient1.port_of_origin);
        expect(departedColumn.find('b').at(2).text()).toEqual('Date of Departure:');
        expect(departedColumn.find('span').at(1).text()).toEqual(dateFormatter(mockPatient1.date_of_departure));
        expect(arrivalColumn.find('b').first().text()).toEqual('ARRIVAL');
        expect(arrivalColumn.find('b').at(1).text()).toEqual('Port of Entry:');
        expect(arrivalColumn.find('span').at(0).text()).toEqual(mockPatient1.port_of_entry_into_usa);
        expect(arrivalColumn.find('b').at(2).text()).toEqual('Date of Arrival:');
        expect(arrivalColumn.find('span').at(1).text()).toEqual(dateFormatter(mockPatient1.date_of_arrival));
        expect(section.find('.carrier-row').find('span').at(0).text()).toEqual(mockPatient1.flight_or_vessel_carrier);
        expect(section.find('.carrier-row').find('span').at(1).text()).toEqual(mockPatient1.flight_or_vessel_number);
    });

    it('Displays "None" if arrival information is empty', () => {
        const wrapper = shallow(<Patient details={blankMockPatient} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#arrival-information');
        expect(section.exists()).toBeTruthy();
        expect(section.find(Row).at(1).find('span').text()).toEqual('None');
    });

    it('Properly renders planned travel section', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#planned-travel');
        expect(section.find(Row).first().text()).toEqual('PLANNED TRAVEL');
        expect(section.find(Button).length).toEqual(0);
        additionalTravelFields.forEach(function(field, index) {
            expect(section.find('b').at(index+1).text()).toEqual(field+':');
        });
    });

    it('Displays "None" if planned travel is empty', () => {
        const wrapper = shallow(<Patient details={blankMockPatient} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#planned-travel');
        expect(section.exists()).toBeTruthy();
        expect(section.find(Row).at(1).find('span').text()).toEqual('None');
    });

    it('Properly renders potential exposure information section', () => {
        const wrapper = shallow(<Patient details={mockPatient2} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#potential-exposure-information');

        expect(section.find(Row).first().text()).toEqual('POTENTIAL EXPOSURE INFORMATION');
        expect(section.find(Button).length).toEqual(0);
        expect(section.find(Row).at(1).find('b').at(0).text()).toEqual('Last Date of Exposure:');
        expect(section.find(Row).at(1).find('span').at(0).text()).toEqual(dateFormatter(mockPatient2.last_date_of_exposure));
        expect(section.find(Row).at(1).find('b').at(1).text()).toEqual('Exposure Location:');
        expect(section.find(Row).at(1).find('span').at(1).text()).toEqual(mockPatient2.potential_exposure_location);
        expect(section.find(Row).at(1).find('b').at(2).text()).toEqual('Exposure Country:');
        expect(section.find(Row).at(1).find('span').at(2).text()).toEqual(mockPatient2.potential_exposure_country);
        potentialExposureFields.forEach(function(field, index) {
            expect(section.find('.text-danger').at(index).text().includes(field)).toBeTruthy();
        });
    });

    it('Properly renders exposure notes section', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(wrapper.find('#exposure-notes').find(Row).first().text()).toEqual('EXPOSURE NOTES');
        expect(wrapper.find('#exposure-notes').find(Button).exists()).toBeFalsy();
        expect(wrapper.find('#exposure-notes').find(Row).at(1).find('span').text()).toEqual(mockPatient1.exposure_notes);
    });

    it('Displays "None" if exposure notes is empty', () => {
        const wrapper = shallow(<Patient details={mockPatient2} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(wrapper.find('#exposure-notes').exists()).toBeTruthy();
        expect(wrapper.find('#exposure-notes').find(Button).exists()).toBeFalsy();
        expect(wrapper.find('#exposure-notes').find(Row).at(1).find('span').text()).toEqual('None');
    });

    it('Collapses/expands exposure notes if longer than 500 characters', () => {
        const wrapper = shallow(<Patient details={mockPatient3} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(wrapper.find('#exposure-notes').find(Row).first().text()).toEqual('EXPOSURE NOTES');
        expect(wrapper.find('#exposure-notes').find(Button).exists()).toBeTruthy();

        expect(wrapper.find('#exposure-notes').find(Button).text()).toEqual('(View all)');
        expect(wrapper.find('#exposure-notes').find(Row).at(1).find('span').text()).toEqual(mockPatient3.exposure_notes.slice(0, 500) + ' ...');

        wrapper.find('#exposure-notes').find(Button).simulate('click');
        expect(wrapper.find('#exposure-notes').find(Button).text()).toEqual('(Collapse)');
        expect(wrapper.find('#exposure-notes').find(Row).at(1).find('span').text()).toEqual(mockPatient3.exposure_notes);

        wrapper.find('#exposure-notes').find(Button).simulate('click');
        expect(wrapper.find('#exposure-notes').find(Button).text()).toEqual('(View all)');
        expect(wrapper.find('#exposure-notes').find(Row).at(1).find('span').text()).toEqual(mockPatient3.exposure_notes.slice(0, 500) + ' ...');
    });

    it('Properly renders case information section', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        const section = wrapper.find('#case-information');

        expect(section.find(Row).first().text()).toEqual('CASE INFORMATION');
        expect(section.find(Button).length).toEqual(0);
        expect(section.find(Row).at(1).find('b').at(0).text()).toEqual('Symptom Onset:');
        expect(section.find(Row).at(1).find('span').at(0).text().includes(dateFormatter(mockPatient1.symptom_onset))).toBeTruthy();
        expect(section.find(Row).at(1).find('b').at(1).text()).toEqual('Case Status:');
        expect(section.find(Row).at(1).find('span').at(1).text().includes(mockPatient1.case_status)).toBeTruthy();
    });

    it('Hides case information section when monitoree is in the exposure workflow and exposure notes is empty', () => {
        const wrapper = shallow(<Patient details={mockPatient2} dependents={[ ]} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />)
        expect(wrapper.find('#case-information').exists()).toBeFalsy();
    });

    it('Properly renders HoH section and name HoH badge', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ mockPatient2, blankMockPatient ]} goto={goToMock} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);

        expect(wrapper.find('#monitoree-details-header').find(BadgeHOH).exists()).toBeTruthy();
        expect(wrapper.find('#head-of-household').exists()).toBeTruthy();
        expect(wrapper.find('#head-of-household').find(Row).at(1).text())
            .toEqual('This monitoree is responsible for handling the reporting of the following other monitorees:');
        expect(wrapper.containsMatchingElement(<ChangeHOH />)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<RemoveFromHousehold />)).toBeFalsy();
        expect(wrapper.containsMatchingElement(<MoveToHousehold />)).toBeFalsy();
        hohTableHeaders.forEach(function(header, index) {
            expect(wrapper.find('thead th').at(index).text()).toEqual(header);
        });
        expect(wrapper.find('tbody tr').length).toEqual(2);
    });

    it('Properly renders household member section and name HoH badge', () => {
        const wrapper = shallow(<Patient details={mockPatient2} dependents={[ ]} goto={goToMock} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);

            expect(wrapper.find('#monitoree-details-header').find(BadgeHOH).exists()).toBeFalsy();
        expect(wrapper.find('#household-member-not-hoh').exists()).toBeTruthy();
        expect(wrapper.find('#household-member-not-hoh').find(Row).first().text())
            .toEqual('The reporting responsibility for this monitoree is handled by another monitoree. Click here to view that monitoree.');
        expect(wrapper.find('#household-member-not-hoh a').prop('href')).toEqual('/patients/17');
        expect(wrapper.containsMatchingElement(<RemoveFromHousehold />)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<MoveToHousehold />)).toBeFalsy();
        expect(wrapper.containsMatchingElement(<ChangeHOH />)).toBeFalsy();
    });

    it('Properly renders single member (not in household) section and name HoH badge', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ ]} goto={goToMock} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);

            expect(wrapper.find('#monitoree-details-header').find(BadgeHOH).exists()).toBeFalsy();
        expect(wrapper.find('#no-household').exists()).toBeTruthy();
        expect(wrapper.find('#no-household').find(Row).at(1).text()).toEqual('This monitoree is not a member of a household:');
        expect(wrapper.containsMatchingElement(<MoveToHousehold />)).toBeTruthy();
        expect(wrapper.containsMatchingElement(<ChangeHOH />)).toBeFalsy();
        expect(wrapper.containsMatchingElement(<RemoveFromHousehold />)).toBeFalsy();
    });

    it('Properly renders no details message', () => {
        const blankWrapper = shallow(<Patient />);
        expect(blankWrapper.text()).toEqual('No monitoree details to show.');
    });

    it('Expands/collapses details with props.hideBody', () => {
        const collapsedWrapper = shallow(<Patient details={mockPatient1} dependents={[ mockPatient2 ]} goto={goToMock} hideBody={true}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(collapsedWrapper.find(Collapse).prop('in')).toBeFalsy();

        const expandedWrapper = shallow(<Patient details={mockPatient1} dependents={[ mockPatient2 ]} goto={goToMock} hideBody={false}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(expandedWrapper.find(Collapse).prop('in')).toBeTruthy();
    });

    it('Renders edit buttons if props.goto is defined', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ mockPatient2 ]} goto={goToMock} hideBody={false}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(wrapper.find(Button).length).toEqual(7);
        wrapper.find(Button).forEach(function(btn) {
            expect(btn.text()).toEqual('(Edit)');
        });
    });

    it('Calls props goto method when the edit buttons are clicked', () => {
        const wrapper = shallow(<Patient details={mockPatient1} dependents={[ mockPatient2 ]} goto={goToMock} hideBody={false}
            jurisdiction_path="USA, State 1, County 2" authenticity_token={authyToken} />);
        expect(goToMock).toHaveBeenCalledTimes(0);
        wrapper.find(Button).forEach(function(btn, index) {
            btn.simulate('click');
            expect(goToMock).toHaveBeenCalledTimes(index+1);
        });
    });
});
