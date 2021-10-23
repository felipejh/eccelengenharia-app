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
  Checklist: Plan;
  ChecklistAnswers: Checklist;
};

export type DrawerParamList = {
  Construction: undefined;
};
