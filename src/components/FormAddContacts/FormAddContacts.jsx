import css from './FormAddContacts.module.css';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class FormAddContacts extends Component {
  state = {
    name: '',
    number: '',
  };

  inputChange = e => {
    const { name, value } = e.target;
    // const name = e.target.name;
    // const value = e.target.value;

    this.setState({ [name]: value });    
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.addContacts(name, number);

    this.setState({ name: '', number: '' });
  };

  idNameInput = nanoid();
  idNumberInput = nanoid();
  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label htmlFor={this.idNameInput}>Name</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          pattern="^[A-Za-z\u0080-\uFFFF ']+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          id={this.idNameInput}
          onChange={this.inputChange}
          required
        />

        <label htmlFor={this.idNumberInput}>Number</label>
        <input
          type="tel"
          name="number"
          value={this.state.number}
          pattern="^(\+?[0-9.\(\)\-\s]*)$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          id={this.idNumberInput}
          onChange={this.inputChange}
          required
        />
        
        <button type="submit" className={css.button}>
          Add contact
        </button>
      </form>
    );
  }
}

FormAddContacts.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  addContacts: PropTypes.func.isRequired,
};
