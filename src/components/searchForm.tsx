'use client'

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export type SearchFormProps = {
    onIdFromSearchForm: (data: string) => void;
  }

export default function SearchForm({onIdFromSearchForm}: SearchFormProps) {
  const [id, setId] = useState('');

  const handleIdChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setId(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Vous pouvez ajouter ici la logique pour traiter l'ID saisi
    console.log('ID saisi :', id);
    onIdFromSearchForm(id);

  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="ID"
        variant="outlined"
        value={id}
        onChange={handleIdChange}
        style={{
            marginBottom: '8px',
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        style={{
            marginTop: '16px',
        }}
      >
        Chercher
      </Button>
    </form>
  );
}