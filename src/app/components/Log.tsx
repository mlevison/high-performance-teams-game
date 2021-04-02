import React from 'react';
import type {
  AppRound,
  AppState,
  GameActionAction,
  GameConfig,
} from '../../state';
import { findGameActionById } from '../../lib';
import { RoundDescription } from './Round';
import { ActionImage } from './Actions';
import styles from './Log.module.css';
import FinalResults from './FinalResults';
import { ActiveEffects } from './Status';

type RoundLogEntry = AppRound & {
  storiesCompleted?: number;
  actions: GameActionAction[];
};
type Props = {
  state: AppState;
  config: GameConfig;
  totalRounds: number;
};
export default function Log(props: Props) {
  const rounds = [...props.state.pastRounds, props.state.currentRound];
  const roundsLog: RoundLogEntry[] = [];
  let currentRound: RoundLogEntry = { ...rounds[0], actions: [] };
  roundsLog.push(currentRound);
  props.state.log.forEach((action) => {
    if (action.type === 'NEXT_ROUND') {
      if (roundsLog.length < props.totalRounds) {
        currentRound = { ...rounds[roundsLog.length], actions: [] };
        roundsLog.push(currentRound);
      }
    } else {
      currentRound.actions.push(action);
    }
  });

  return (
    <>
      <h2>Game Log</h2>
      <ol className={styles.roundList}>
        {roundsLog.map((round) => {
          return (
            <li key={round.number}>
              <h3>Round {round.number}</h3>
              <ul>
                <li>Total Capacity: {round.capacity.total}</li>
                <li>User Stories Attempted: {round.capacity.available}</li>
                <li>
                  Chance of completing User Stories: {round.userStoryChance}
                </li>
                {round.storiesCompleted !== undefined && (
                  <li>User Stories Completed: {round.storiesCompleted}</li>
                )}
              </ul>
              <RoundDescription gremlin={round.gremlin}>
                {round.description}
              </RoundDescription>
              {round.activeEffects.length ? (
                <>
                  <h4>Active Effects</h4>
                  <ul>
                    <ActiveEffects effects={round.activeEffects} showUnit />
                  </ul>
                </>
              ) : null}
              {round.actions.length ? (
                <>
                  <h4>Actions Taken</h4>
                  <ul className={styles.actionList}>
                    {round.actions.map((action, i) => {
                      const gameAction = findGameActionById(
                        action.payload,
                        props.config.rounds,
                      );
                      const isReSelect = round.actions
                        .slice(0, i)
                        .map((action) => action.payload)
                        .includes(action.payload);

                      if (isReSelect) {
                        return (
                          <li key={i}>
                            {action.type === 'UNSELECT_GAME_ACTION' && (
                              <>
                                Un-Selected: <del>{gameAction.name}</del>
                              </>
                            )}
                            {action.type === 'SELECT_GAME_ACTION' && (
                              <>
                                Re-Selected: <ins>{gameAction.name}</ins>
                              </>
                            )}
                          </li>
                        );
                      }

                      return (
                        <li key={i}>
                          <ActionImage
                            gameAction={gameAction}
                            className={styles.actionImage}
                          />
                          <h5>
                            Selected: (Cost: {gameAction.cost}){' '}
                            {gameAction.name}
                          </h5>
                          {gameAction.description}
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
      <FinalResults state={props.state} />
    </>
  );
}
