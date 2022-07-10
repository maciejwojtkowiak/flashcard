import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const Notification = () => {
  const notificationMessage = useSelector(
    (state: RootState) => state.notificationSlice.message
  );
  return (
    <React.Fragment>
      <div>{notificationMessage}</div>
    </React.Fragment>
  );
};

export default Notification;
