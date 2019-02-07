import { createBrowserHistory } from "history";
const history = createBrowserHistory({ basename: process.env.REACT_APP_BASE_NAME || "/" });
export { history };
