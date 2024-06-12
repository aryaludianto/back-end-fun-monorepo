import React, { useState } from 'react';
import styled from 'styled-components';
import WordSubmission from './WordSubmission';
import Report from './Report';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Tabs = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#f0f0f0')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  text-align: center;
`;

const WordCounterPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wordSubmission' | 'report'>('wordSubmission');

  return (
    <Container>
      <Tabs>
        <Tab active={activeTab === 'wordSubmission'} onClick={() => setActiveTab('wordSubmission')}>
          Word Submission
        </Tab>
        <Tab active={activeTab === 'report'} onClick={() => setActiveTab('report')}>
          Report
        </Tab>
      </Tabs>
      {activeTab === 'wordSubmission' ? <WordSubmission /> : <Report />}
    </Container>
  );
};

export default WordCounterPage;
