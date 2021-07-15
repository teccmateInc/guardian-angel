import React, {createContext, useState} from 'react';

export const GuardianContext = createContext();

const GuardianContextProvider = props => {
  const [angels, setAngels] = useState([
    {
      name: 'M. Daniyal Malik',
      email: 'daniyalmalikc@gmail.com',
      relation: 'Brother',
    },
    {
      name: 'Unknown Person',
      email: 'unkown@gmail.com',
      relation: 'Father',
    },
    {
      name: 'Domain Com',
      email: 'domain@gmail.com',
      relation: 'Mother',
    },
    {
      name: 'Hello World',
      email: 'helloworld@gmail.com',
      relation: 'Sister',
    },
  ]);

  const addAngel = (name, email, relation) => {
    setAngels([...angels, {name, email, relation}]);
  };

  const removeAngel = email => {
    setAngels(angels.filter(data => data.email !== email));
  };

  return (
    <GuardianContext.Provider value={{angels, addAngel, removeAngel}}>
      {props.children}
    </GuardianContext.Provider>
  );
};

export default GuardianContextProvider;
