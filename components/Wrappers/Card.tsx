import React from 'react';

interface childrenProps {
  children: React.ReactNode;
}

const Card: React.FC<childrenProps> = (props) => {
  return (
    <div className="h-screen  grid place-items-center">
      <div className="h-[40rem] w-[30rem] drop-shadow-2xl shadow-2xl ">
        {props.children}
      </div>
    </div>
  );
};

export default Card;
