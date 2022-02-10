import React, { createContext, useCallback, useState } from 'react';
import * as Sentry from '@sentry/react-native';

import {
  postOccurrence,
  putPostponedOccurrence,
  putConclusionOccurrence,
} from '~/services/occurrencesServices';

type OfflineQueueType = {
  enqueue: (value: any) => void;
  dequeue: () => void;
  isEmpty: () => boolean;
  getQueue: () => any[] | string;
};

type Node = {
  value: any;
  next: Node | null;
};

const OfflineQueue = createContext<OfflineQueueType>({} as OfflineQueueType);

const OfflineQueueProvider = ({ children }: { children: any }) => {
  const [front, setFront] = useState<Node | null | undefined>(null);
  const [back, setBack] = useState<Node | null | undefined>(null);

  const isEmpty = useCallback(() => !front, [front]);

  const enqueue = useCallback(
    (value: any) => {
      const node: Node = {
        value,
        next: null,
      };

      if (isEmpty()) {
        setFront(node);
        setBack(node);

        return;
      }

      setBack({
        ...back,
        next: node,
      } as Node);

      setFront(node);
    },
    [back, isEmpty],
  );

  const dequeue = useCallback(() => {
    const node = front;

    if (!isEmpty()) {
      setFront(state => state?.next);
    }

    if (!front) {
      setBack(null);
    }

    return node;
  }, [front, isEmpty]);

  const getQueue = useCallback(() => {
    if (isEmpty()) {
      return 'Queue is empty';
    }

    const tempArr = [];

    let temp = front;

    while (temp) {
      tempArr.push(temp.value);

      temp = temp.next;
    }

    return tempArr;
  }, [front, isEmpty]);

  return (
    <OfflineQueue.Provider value={{ enqueue, isEmpty, dequeue, getQueue }}>
      {children}
    </OfflineQueue.Provider>
  );
};

const sendQueue = async (queue: any): Promise<void> => {
  const offlineData = queue.getQueue();

  if (Array.isArray(offlineData)) {
    offlineData.forEach(async data => {
      try {
        if (data.type === 'occurrence/add') {
          await postOccurrence(data.data);
        }

        if (data.type === 'occurrence/postponed') {
          await putPostponedOccurrence(data.data);
        }

        if (data.type === 'occurrence/conclusion') {
          await putConclusionOccurrence(data.data);
        }
      } catch (e) {
        Sentry.captureException(e);
      }
    });

    queue.dequeue();
  }
};

// useEffect(() => {
//   async function sendQueue() {
//     if (!queue.isEmpty() && isConnected) {
//       const offlineData = queue.getQueue();

//       if (Array.isArray(offlineData)) {
//         offlineData.forEach(async data => {
//           try {
//             if (data.conclusionData) {
//               putConclusionOccurrence(data);
//             }

//             if (data.userCreateId) {
//               await postOccurrence(data);
//             }

//             if (data.postponedDate) {
//               await putPostponedOccurrence(data);
//             }
//           } catch (e) {
//             Sentry.captureException(e);
//           }
//         });

//         queue.dequeue();
//       }
//     }
//   }

//   sendQueue();
// }, [isConnected]);

export { OfflineQueueProvider, OfflineQueue, sendQueue };
