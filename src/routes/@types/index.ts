import { Construction } from '~/models/construction.model';
import { Plan } from '~/models/plans.model';

export type StackParamList = {
  SignIn: undefined;
  Dashboard: undefined;
  Drawer: undefined;
  Plans: Construction;
  Occurrences: Plan;
};

export type DrawerParamList = {
  Construction: undefined;
};
