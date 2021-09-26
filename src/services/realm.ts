import Realm from 'realm';

import { OccurrenceSchema, GroupsSchema } from '~/schemas';

export default function getRealm(): ProgressPromise {
  return Realm.open({
    schemaVersion: 1,
    schema: [OccurrenceSchema, GroupsSchema],
  });
}
