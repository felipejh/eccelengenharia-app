import Realm from 'realm';

import OccurrenceSchema from '~/schemas/OccurrenceSchema';

export default function getRealm(): ProgressPromise {
  return Realm.open({
    schemaVersion: 1,
    schema: [OccurrenceSchema],
  });
}
