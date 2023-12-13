import { useReducer } from "react";

type requestSteps = "idle" | "start" | "pending" | "finished";

interface State {
  isRequestInProgress: boolean;
  requestStep: requestSteps;
}

enum ActionTypes {
  start = "START_REQUEST",
  pending = "PENDING_REQUEST",
  finished = "FINISH_REQUEST",
  idle = "RESET_REQUEST",
}

type Action = {
  type: ActionTypes;
};

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.start:
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case ActionTypes.pending:
      return { ...state, isRequestInProgress: true, requestStep: "pending" };
    case ActionTypes.finished:
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case ActionTypes.idle:
      return { ...state, isRequestInProgress: false, requestStep: "idle" };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = () => {
    requestDispatch({ type: ActionTypes.start });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: ActionTypes.pending });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: ActionTypes.finished });
      }, 2000);
    }, 2000);
  };

  const resetRequest = () => {
    requestDispatch({ type: ActionTypes.idle });
  };

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
