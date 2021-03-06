import React, {useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Redirect } from 'react-router-dom';
import AuthenticationService from 'lib/AuthenticationService' 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(16),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ authenticated, login, location}) => {
    
    const classes = useStyles();
    
    const history = useHistory();
  
    const handleRoute = () =>{ 
      history.push("/signUp");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasLoginFailed, setHasLoginFailed] = useState(false);

    const handleClick = () => {
      try {
        AuthenticationService.executeJwtAuthenticationService(email, password)
        .then((response) => {
            console.log(response)
            //토큰 저장
            AuthenticationService.registerSuccessfulLoginForJwt(email,response.data.data.user.token)
            login(response.data.data.user.nickName)
            if(location.state == null){
              history.push("/"+response.data.data.user.nickName+"/overview");
            }
        }).catch( (error) =>{
            setHasLoginFailed(true)
            console.log(error.response)
        })
      } catch (e) {
        console.log(e)
        alert("Failed to login")
        setEmail("")
        setPassword("")
      }
    }
    
    const handleFormSubmit = (e) => {
      e.preventDefault()
    }
    
    const { from } = location.state || { from: { pathname: "/" } }
    if (authenticated) return <Redirect to={from} />


    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleFormSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={({ target: { value } }) => setEmail(value)}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={({ target: { value } }) => setPassword(value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              { hasLoginFailed && '로그인 실패'}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClick}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  
                  <Link onClick={handleRoute} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );
};


export default SignIn;