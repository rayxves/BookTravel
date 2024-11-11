
import React from 'react';
import { FadeLoader } from 'react-spinners';

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div className="spinner-container">
      <FadeLoader loading={loading} color="#000000"  height={15} width={5} />
    </div>
  );
};

export default Spinner;
