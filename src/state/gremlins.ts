import { Effect } from './effects';

export type GremlinId = 'TEAM_MEMBER_MANAGEMENT_RELATION';
type Gremlin = {
  title: string;
  occursOn: number;
  effect: () => null | Effect;
};
type GremlinList = { [k in GremlinId]: Gremlin };

export const gremlinList: GremlinList = {
  TEAM_MEMBER_MANAGEMENT_RELATION: {
    title: 'Team Member/Management Relationship',
    occursOn: 2,
    effect() {
      return null;
    },
  },
};
