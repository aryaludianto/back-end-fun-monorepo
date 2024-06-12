import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const WordSubmission: React.FC = () => {
  const [word, setWord] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({back_end__url: process.env.WORD_COUNTER_BACKEND_URL})
    console.log(word)
    // const response = await fetch(`${process.env.WORD_COUNTER_BACKEND_URL}api/text-submission`, {
    const response = await fetch('http://localhost:8080/api/text-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Accept-Language": "en",
      },
      body: JSON.stringify({ content: word }),
    });


    console.log({response})

    if (response.ok) {
      alert('Word submitted successfully');
      setWord('');
    } else {
      alert('Failed to submit word');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        required
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default WordSubmission;
