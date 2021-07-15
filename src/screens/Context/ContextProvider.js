import React from 'react';

import AuthContextProvider from './AuthContext';
import LocationContextProvider from './LocationContext';
import RecordContextProvider from './RecordContext';
import GuardianContextProvider from './GuardianContext';

const ContextProvider = props => {
  return (
    <AuthContextProvider>
      <LocationContextProvider>
        <RecordContextProvider>
          <GuardianContextProvider>{props.children}</GuardianContextProvider>
        </RecordContextProvider>
      </LocationContextProvider>
    </AuthContextProvider>
  );
};

export default ContextProvider;
