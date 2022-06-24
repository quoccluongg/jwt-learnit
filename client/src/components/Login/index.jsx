import  React,{useState,useContext} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Link as LinkChange,Navigate,useNavigate} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import { LOCAL_STORAGE_TOKEN_NAME } from '../../context/constants';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    const {loginUser} = useContext(AuthContext)
    const [loginForm,setLoginForm] = useState({
        username:'',
        password:''
    })
    const {username,password} = loginForm
    const onChangeLogin = (event) => {
        setLoginForm({...loginForm,[event.target.name]: event.target.value})
    }
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if(loginData.success) {
        navigate('/dashboard',{replace:true})
      }else{

      }
    } catch (error) {
      console.log(
        "🚀 ~ file: index.jsx ~ line 49 ~ handleSubmit ~ error",
        error
      );
    }
  };
  if(token) return <Navigate to='/dashboard' />

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoFocus
              autoComplete='off'
              value={username}
              onChange={onChangeLogin}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete='off'
              value={password}
              onChange={onChangeLogin}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <LinkChange to='/signup'>
                  {"Don't have an account? Sign Up"}
                </LinkChange>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}