import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { useActions } from 'typeless';
import { MatchResult } from '~/components/MatchResult';
import { appHistory } from './appHistory';
import { Header } from './components/Header';
import { getSessionState, SessionActions } from './features/session/interface';
import { useSessionModule } from './features/session/module';

export const App: React.FC = () => {
  useSessionModule();

  return (
    <Router history={appHistory}>
      <Header></Header>
      <Switch>
        <Route path="/" exact>
          <InnerWrapper>
            <Home></Home>
          </InnerWrapper>
        </Route>
        <Route path="/groups">
          <InnerWrapper>
            <Groups></Groups>
          </InnerWrapper>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route>
          <InnerWrapper>
            <div>not found</div>
          </InnerWrapper>
        </Route>
      </Switch>
    </Router>
  );
};
const Login: React.FC = () => {
  const { loginSucceeded } = useActions(SessionActions);
  const { user } = getSessionState.useState();

  if (user) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <div>
      <h3>login</h3>
      <button onClick={() => loginSucceeded({ name: 'okina' })}>login as `okina` user</button>
    </div>
  );
};

const InnerWrapper: React.FC = ({ children }) => {
  return (
    <div>
      <b>inner</b> <MatchResult></MatchResult>
      {children}
    </div>
  );
};

function Home() {
  return (
    <>
      <div>slash</div>
      <MatchResult></MatchResult>
    </>
  );
}
function Groups() {
  return (
    <>
      <div>groups</div>
      <Route path="/groups/list">
        <div>
          this is list
          <div>
            <MatchResult></MatchResult>
          </div>
        </div>
      </Route>
      <Route path="/groups/new">
        <div>this is new</div>
      </Route>
    </>
  );
}
