import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  width: 100%;
  max-width: 600px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Report: React.FC = () => {
  const [words, setWords] = useState<{ [word: string]: number }>({});
  const [minRepetitions, setMinRepetitions] = useState<number>(0);

  const wordCounterBackendUrl = process.env.REACT_APP_WORD_COUNTER_BACKEND_URL;
  
  useEffect(() => {
    if (!wordCounterBackendUrl) {
      alert('Backend URL is not set in environment variables');
      return;
    }

    const fetchWords = async () => {
      const response = await fetch(`${wordCounterBackendUrl}/api/report`);
      const data = await response.json();
      setWords(data ?? {});
    };

    fetchWords();
  }, [wordCounterBackendUrl]);

  const handleFilter = async () => {
    if (!wordCounterBackendUrl) {
      alert('Backend URL is not set in environment variables');
      return;
    }

    const response = await fetch(`${wordCounterBackendUrl}/api/report?numberOfWords=${minRepetitions}`);
    const data = await response.json();
    setWords(data ?? {});
  };

  return (
    <Container>
      <Input
        type="number"
        placeholder="Enter minimum repetitions"
        value={minRepetitions}
        onChange={(e) => setMinRepetitions(parseInt(e.target.value))}
      />
      <Button onClick={handleFilter}>Filter Words</Button>
      <List>
        {Object.entries(words).map(([word, count]) => (
          <ListItem key={word}>
            <span>{word}</span>
            <span>{count}</span>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Report;
