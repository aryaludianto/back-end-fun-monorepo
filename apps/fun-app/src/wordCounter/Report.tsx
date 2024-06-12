import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Report: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/report`);
      const data = await response.json();
      setWords(data);
    };

    fetchWords();
  }, []);

  return (
    <List>
      {words.map((word, index) => (
        <ListItem key={index}>{word}</ListItem>
      ))}
    </List>
  );
};

export default Report;
