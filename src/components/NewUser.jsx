import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';

export default function NewUser({ onSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const formSubmitHandler = (evt) => {
    evt.preventDefault();

    if (firstName.trim().length === 0 || lastName.trim().length === 0) {
      return;
    }

    onSubmit({
      firstName,
      lastName,
    });

    setFirstName('');
    setLastName('');
  };

  const firstNameChangeHandler = (evt) => {
    setFirstName(evt.target.value);
  };

  const lastNameChangeHandler = (evt) => {
    setLastName(evt.target.value);
  };

  return (
    <Form onSubmit={formSubmitHandler}>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          placeholder="first name"
          onChange={firstNameChangeHandler}
          type="text"
          value={firstName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          placeholder="last name"
          onChange={lastNameChangeHandler}
          type="text"
          value={lastName}
          required
        />
      </FormGroup>
      <FormGroup>
        <Button block outline type="submit" color="primary">
          Add
        </Button>
      </FormGroup>
    </Form>
  );
}

NewUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
