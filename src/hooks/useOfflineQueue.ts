import { useContext } from 'react';
import { OfflineQueue } from '~/context/OfflineQueue';

const useOfflineQueue = () => {
  const context = useContext(OfflineQueue);

  if (!context) {
    throw new Error('useOfflineQueue hook must be inside OfflineQueueProvider');
  }

  return context;
};

export default useOfflineQueue;
