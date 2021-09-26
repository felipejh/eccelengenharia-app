import Realm from 'realm';

import { OccurrenceSchema, GroupsSchema, AppointmentsSchema } from '~/schemas';

export default function getRealm(): ProgressPromise {
  return Realm.open({
    schemaVersion: 1,
    schema: [OccurrenceSchema, GroupsSchema, AppointmentsSchema],
  });
}
