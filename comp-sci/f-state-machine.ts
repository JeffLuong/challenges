/**
 * A finite state machine factory that takes a definition and creates an internal
 * state machine based on those definitions. After a new FSM is created, the state
 * cannot be changed unless calling the `transition()` method with an event passed
 * into it. This is to avoid any invalid states from occurring.
 *
 * Examples:
 *  // Define lightbulb state machine factory:
 *  const createLightbulb = FMSFactory({
 *    initialState: 'off',
 *    states: {
 *      off: {
 *        ...
 *      }
 *      on: {
 *        ...
 *      }
 *    }
 *  });
 *
 *  const lightbulb = createLightbulb();  // create lightbulb from factory
 *  lightbulb.getState();                 // 'off'
 *  lightbulb.transition('switch');       // transition to next state
 *  lightbulb.getState();                 // 'on'
 *
 * @param definition 
 */

type FSMState = {
  actions: {
    [action: string]: Function
  },
  transitions: {
    [event: string]: {
      target: string,
      action: Function
    }
  }
};

type FSMDefinition = {
  initialState: string,
  states: {
    [state: string]: FSMState
  }
};

type Machine = {
  state: string,
  transition: (event: string) => string,
  getState?: () => string
}

function FSMFactory(definition: FSMDefinition) {
  const machine: Machine = {
    state: 'None',
    transition: (event: string) => ''
  };

  return function() {
    const { initialState, states } = definition;
    machine.state = initialState;
    machine.transition = function(event) {
      const currStateDef = states[machine.state];
      const nextTransition = currStateDef.transitions[event];
      if (!nextTransition) {
        throw new Error(`Missing transition for event: ${event}`);
      }
      const nextState = nextTransition.target;
      const nextTransitionDef = states[nextState];

      // End current state and prepare for next state.
      currStateDef.actions.end();
      nextTransition.action();

      // Set next state as new state.
      machine.state = nextState;
      // Fire next state's start method.
      nextTransitionDef.actions.start(machine, nextTransitionDef);

      return `Current state: ${machine.state}`;
    }
    machine.getState = function() {
      return machine.state;
    }
    return {
      transition: machine.transition,
      getState: machine.getState
    }
  }
}

const createLightbulb = FSMFactory({
  initialState: 'off',
  states: {
    on: {
      actions: {
        start() {
          console.log('Entering on...');
        },
        end() {
          console.log('Exiting on...');
        }
      },
      transitions: {
        switch: {
          target: 'off',
          action() {
            console.log('Transitioning to off...');
          }
        }
      }
    },
    off: {
      actions: {
        start() {
          console.log('Entering off...');
        },
        end() {
          console.log('Exiting off...');
        }
      },
      transitions: {
        switch: {
          target: 'on',
          action() {
            console.log('Transitioning to on...');
          }
        }
      }
    }
  }
});

const actionTransitions = {
  attack: {
    target: 'offense',
    action() {
      console.log('Transitioning to offense...');
    }
  },
  heal: {
    target: 'defense',
    action() {
      console.log('Transitioning to defense...');
    }
  }
};

const endTurn = {
  target: 'enemyTurn',
  action() {
    console.log('Transitioning to enemy turn...');
  }
};

const turnBasedGameFactory = FSMFactory({
  initialState: 'start',
  states: {
    start: {
      actions: {
        start() {
          console.log('Entering start state...');
        },
        end() {
          console.log('Exiting start state...');
        }
      },
      transitions: {
        ...actionTransitions
      }
    },
    offense: {
      actions: {
        start(machine: Machine, { transitions }: FSMState) {
          console.log('Preparing to attack...');
          if (transitions.endTurn) {
            machine.transition('endTurn');
          }
        },
        end() {
          console.log(`Hit enemy for ${Math.floor(Math.random() * 10)} points of damage!`);
        }
      },
      transitions: {
        endTurn
      }
    },
    defense: {
      actions: {
        start(machine: Machine, { transitions }: FSMState) {
          console.log('Entering defense state...');
          if (transitions.endTurn) {
            machine.transition('endTurn');
          }
        },
        end() {
          console.log(`Gained ${Math.floor(Math.random() * 10)} points of health from heal!`);
        }
      },
      transitions: {
        endTurn
      }
    },
    enemyTurn: {
      actions: {
        start(machine: Machine, { transitions }: FSMState) {
          console.log('Entering enemy turn state...');
          if (transitions.endEnemyTurn) {
            machine.transition('endEnemyTurn');
          }
        },
        end() {
          console.log(`Enemy attacked you for ${Math.floor(Math.random() * 10)} points of damage!`);
        }
      },
      transitions: {
        endEnemyTurn: {
          target: 'start',
          action() {
            console.log('Transitioning to start state...');
          }
        }
      }
    },
  }
});
