import { useState } from 'react';
import {
  Header,
  Form,
  Button,
  Input,
  Icon,
} from 'components/Searchbar/Searchbar.styled';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) {
      console.log('Error');
    }
    onSearch(value);
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Icon />
        </Button>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleChange}
          required
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
