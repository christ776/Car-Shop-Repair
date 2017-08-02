import React, { Component } from 'react';
import { Checkbox,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Radio,
  Button } from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        fullname: '',
        email: '',
        password: '',
      },
      userToken: undefined,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
  }

  handleFullNameChange(e) {
    this.setState({ ownerName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePwdChange(e) {
    this.setState({ password: e.target.value });
  }

  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      email: '',
      password: '',
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
    };

    this.createUser(formPayload);
    this.handleClearForm(e);
  }

  createUser(formPayload) {
    const request = new Request('http://localhost:3000/api/createUser', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        fullname: formPayload.fullname,
        email: formPayload.email,
        password: formPayload.password }),
    });

    fetch(request).then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
      .then(({ token, user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userToken', token);
        this.setState(user);
      });
  }

  render() {
    return (
      <form>
        <FieldGroup
          id="formControlsText"
          type="text"
          label="Text"
          placeholder="Enter text"
        />
        <FieldGroup
          id="formControlsEmail"
          type="email"
          label="Email address"
          placeholder="Enter email"
        />
        <FieldGroup
          id="formControlsPassword"
          label="Password"
          type="password"
        />
        <FieldGroup
          id="formControlsFile"
          type="file"
          label="File"
          help="Example block-level help text here."
        />

        <Checkbox checked readOnly>
        Checkbox
        </Checkbox>
        <Radio checked readOnly>
        Radio
        </Radio>

        <FormGroup>
          <Checkbox inline>
          1
          </Checkbox>
          {' '}
          <Checkbox inline>
          2
          </Checkbox>
          {' '}
          <Checkbox inline>
          3
          </Checkbox>
        </FormGroup>
        <FormGroup>
          <Radio name="radioGroup" inline>
          1
          </Radio>
          {' '}
          <Radio name="radioGroup" inline>
          2
          </Radio>
          {' '}
          <Radio name="radioGroup" inline>
          3
          </Radio>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Select</ControlLabel>
          <FormControl componentClass="select" placeholder="select">
            <option value="select">select</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="formControlsSelectMultiple">
          <ControlLabel>Multiple select</ControlLabel>
          <FormControl componentClass="select" multiple>
            <option value="select">select (multiple)</option>
            <option value="other">...</option>
          </FormControl>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Textarea</ControlLabel>
          <FormControl componentClass="textarea" placeholder="textarea" />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Static text</ControlLabel>
          <FormControl.Static>
          email@example.com
          </FormControl.Static>
        </FormGroup>

        <Button type="submit">
        Submit
        </Button>
      </form>
    );
  }
}

export default CreateUser;
