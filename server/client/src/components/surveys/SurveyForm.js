// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title', noValueError: 'Provide a  Survey Title' },
  { label: 'Subject Line', name: 'subject',  noValueError: 'Provide a Subject'},
  { label: 'Email Body', name: 'body', noValueError: 'Provide a  body' },
  { label: 'Recipient List', name: 'emails', noValueError: 'Provide a  email' }
];

class SurveyForm extends Component {

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <div className="row">
            <div className="col s6">
              <Link to="/surveys" className="red btn-flat white-text">
                Cancel
              </Link>
              <button type="submit" className="teal btn-flat right white-text">
                <i className="material-icons right">done</i>
                Next</button>
            </div>
          </div>
        </form>
      </div>
    );

  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  })


  return errors;

}

export default reduxForm({
  validate: validate,
  form: 'surveyForm'
})(SurveyForm);
