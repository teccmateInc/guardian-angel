import React from 'react';

import LanguageContextProvider from './LanguageContext';
import AuthContextProvider from './AuthContext';
import LocationContextProvider from './LocationContext';
import RecordContextProvider from './RecordContext';
import GuardianContextProvider from './GuardianContext';

const ContextProvider = props => {
  return (
    <LanguageContextProvider>
      <AuthContextProvider>
        <LocationContextProvider>
          <RecordContextProvider>
            <GuardianContextProvider>{props.children}</GuardianContextProvider>
          </RecordContextProvider>
        </LocationContextProvider>
      </AuthContextProvider>
    </LanguageContextProvider>
  );
};

export default ContextProvider;
