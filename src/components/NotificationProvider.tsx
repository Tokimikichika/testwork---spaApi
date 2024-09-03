import React, { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';

export const NotificationProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <SnackbarProvider maxSnack={3}>
      {children}
    </SnackbarProvider>
  );
};
