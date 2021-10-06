import Realm from 'realm';

import {
  OccurrenceSchema,
  GroupsSchema,
  AppointmentsSchema,
  ConstructionSchema,
  ChecklistsSchema,
  PlansSchema,
} from '~/schemas';

export default function getRealm(): ProgressPromise {
  return Realm.open({
    schemaVersion: 1,
    schema: [
      OccurrenceSchema,
      GroupsSchema,
      AppointmentsSchema,
      ConstructionSchema,
      ChecklistsSchema,
      PlansSchema,
    ],
  });
}
