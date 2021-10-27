import { Appointment } from '~/models/appointment.model';
import { Checklist } from '~/models/checklist.model';
import { Construction } from '~/models/construction.model';
import { Plan } from '~/models/plans.model';

export type StackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Dashboard: undefined;
  Drawer: undefined;
  Plans: Construction;
  Occurrences: Plan;
  AppointmentsGroups: Plan;
  Checklist: Plan & Pick<Appointment, 'gruposapontamentoId'>;
  ChecklistAnswers: Checklist;
};

export type DrawerParamList = {
  Construction: undefined;
};
