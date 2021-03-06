

import 'shared/App.scss';
import React, { useState } from 'react';
import { SignIn, SignUp, Contents } from 'pages';
import { Route, Switch, useHistory } from 'react-router-dom';
import AuthenticationService from 'lib/AuthenticationService';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomAppBar from 'components/CustomAppBar'

const App= () => {
  const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
  }));

  /* view 관련 변수 선언 시작 */
    const classes = useStyles();
    /* view 관련 변수 선언 끝 */
    const history = useHistory();

    const [user, setUser] = useState(null);
    const authenticated = user != null;
      
    const login = (nickname) => {
      setUser(nickname);
    }

    const logout = () => {
      setUser(null);
      AuthenticationService.logout();
      history.push("/");
    };
      
    return (
      <div className={classes.root}>
        <CssBaseline />
        <CustomAppBar authenticated={authenticated} logout={logout}/>
        <Switch>
          <Route
            path="/signIn"
            render={props => (
              <SignIn authenticated={authenticated} login={login} {...props} />
            )}
          />
          <Route path="/signUp" 
                render={props => <SignUp login={login} {...props}/>}
          />
          {user && <Route path="/:user" render={props => <Contents user={user} {...props}/>}/>}
          <Route exact path="/" />
        </Switch>
      </div>
    );
};

export default App;