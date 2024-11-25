import React from 'react';

interface RadioProps {
  isSelected: boolean;
}

const Radio = ({ isSelected }: RadioProps) => {
  return (
    <div className="bg-foreground flex justify-center items-center h-5 w-5 rounded-full">
      <div className="flex justify-center items-center bg-background h-4 w-4 rounded-full">
        {isSelected && (
          <div className="w-2.5 h-2.5 bg-foreground rounded-full" />
        )}
      </div>
    </div>
  );
};

export default Radio;
