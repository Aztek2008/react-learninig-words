import React, { useEffect } from 'react';
import { useAppSelector } from 'app/hooks';
import { InputForm } from 'features/inputForm/InputForm';
import { Layout } from 'features/layout/Layout';

export const AddWordPage = () => {
  const words = useAppSelector((state) => state.wordPairs.words);

  useEffect(() => {
    console.log('Word saved!');
  }, [words]);

  return (
    <Layout>
      <InputForm />
    </Layout>
  );
};
