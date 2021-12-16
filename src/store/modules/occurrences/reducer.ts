// import produce from 'immer';
import { createActions } from 'reduxsauce';
import { markActionsOffline } from 'redux-offline-queue';
// import { Occurrence } from '~/models/occurrences.model';

// interface StateProps {
//   occurrence: Occurrence;
//   loading: boolean;
// }

const { Types, Creators } = createActions({
  addOccurrenceRequest: ['repositoryName'],
  addOccurrenceSuccess: ['repository'],
});

markActionsOffline(Creators, ['addOccurrenceRequest']);

export const OccurrencesTypes = Types;
export default Creators;

// const INITIAL_STATE: StateProps = {
//   occurrence: [],
//   loading: false,
// };

// export default function occurrences(state = INITIAL_STATE, action: )
