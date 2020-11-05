import { Effect } from './effects';

export type GremlinId = 'EMERGENCY_ON_ANOTHER_TEAM';
type Gremlin = {
  title: string;
  occurs: () => boolean;
  effect: (age: number) => null | Effect;
};
type GremlinList = { [k in GremlinId]: Gremlin };

export const gremlinList: GremlinList = {
  EMERGENCY_ON_ANOTHER_TEAM: {
    title:
      'We’ve had an emergency on another team, we need your best tester for a while.',
    occurs: () => Math.random() <= 0.1,
    effect(age) {
      return null;
    },
  },
};
