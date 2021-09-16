import { produce } from 'immer';
import { Appointment } from '~/models/appointment.model';
import {
  AppointmentActionProps,
  AppointmentActionTypes,
} from '~/store/types/appointments.types';
import { AuthActionProps, AuthTypes } from '~/store/types/auth.types';

interface StateProps {
  loading: boolean;
  listAppointments: Array<Appointment>;
}

const INITIAL_STATE: StateProps = {
  loading: false,
  listAppointments: [],
};

export default function appointments(
  state = INITIAL_STATE,
  action: AppointmentActionProps | AuthActionProps,
): StateProps {
  return produce(state, draft => {
    switch (action.type) {
      case AppointmentActionTypes.GET_APPOINTMENT_LIST_REQUEST: {
        draft.loading = true;
        break;
      }
      case AppointmentActionTypes.GET_APPOINTMENT_LIST_SUCCESS: {
        if (draft.listAppointments.length > 0) {
          action.payload.forEach(p => {
            const findIndex = draft.listAppointments.findIndex(
              l => l.id === p.id,
            );
            if (findIndex) {
              draft.listAppointments.splice(findIndex, 1, p);
            }
          });

          draft.loading = false;
          break;
        }

        draft.loading = false;
        draft.listAppointments = action.payload;
        break;
      }
      case AppointmentActionTypes.GET_APPOINTMENT_LIST_FAILURE: {
        draft.loading = false;
        break;
      }
      case AppointmentActionTypes.GET_APPOINTMENT_LIST_ALL_REQUEST: {
        draft.loading = true;
        break;
      }
      case AuthTypes.SIGN_OUT: {
        draft.listAppointments = [];
        draft.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
}
