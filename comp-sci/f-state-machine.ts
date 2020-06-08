/**
 * A finite state machine factory that takes a definition and creates an internal
 * state machine based on those definitions. After a new FSM is created, the state
 * cannot be changed unless calling the `transition()` method with an event passed
 * into it. This is to avoid any invalid states from occurring.
 *
 * @param definition 
 */

type FSMDefinition = {
  initialState: string,
  states: {
    [state: string]: {
      actions: {
        [action: string]: Function
      },
      transitions: {
        [event: string]: {
          target: string,
          action: Function
        }
      }
    }
  }
};

type Machine = {
  state: string,
  transition?: (event: string) => string,
  getState?: () => string
}

function FSMFactory(definition: FSMDefinition) {
  const machine: Machine = {
    state: 'None'
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

      currStateDef.actions.exit();
      nextTransition.action();
      nextTransitionDef.actions.enter();

      machine.state = nextState;

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

const lightbulbFactory = FSMFactory({
  initialState: 'off',
  states: {
    on: {
      actions: {
        enter() {
          console.log('Entering on...');
        },
        exit() {
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
        enter() {
          console.log('Entering off...');
        },
        exit() {
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
