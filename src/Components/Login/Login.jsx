import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import auth from '../../ProtectedRoutes/auth'
import './Login.scss'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logo from '../../Assets/Images/trendify_light.svg';
import { getLogin } from '../../Axios/Axios';

const CustomTextField = withStyles({
    root: {
        '& .MuiFormLabel-root': {
            color: '#E1E2E3'
        },
        '& label.Mui-focused': {
            color: '#E1E2E3',
        },
        '& .MuiInput-underline:before': {
            'border-bottom-color': '#E1E2E3 !important',
        },
        '& .MuiInput-underline:after': {
            'border-bottom-color': '#E1E2E3 !important',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#E1E2E3',
            },
            '&:hover fieldset': {
                borderColor: '#E1E2E3',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#E1E2E3',
            },
        },
        '& input[type="text"]': {
            color: '#E1E2E3',
        },
        '& input[type="password"]': {
            color: '#E1E2E3',
        }
    },
})(TextField);

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            hasError: false,
        };
    }

    /* atributo 'name' viene de la referencia al atributo que se pasa por parametro en el input */
    handleChange = name => event => this.setState({ [name]: event.target.value })

    login = (e) => {
        e.preventDefault();

        const request = { 
            email: this.state.email, 
            password: this.state.password 
        }

        if (request.email !== '' || request.password !== '') {
            this.setState({ isLoading: true });

            getLogin(this.state.email, this.state.password)
            .then((response) => {
                if(response && response.id) {
                    auth.authenticate(response, () => this.props.history.push('/'));
                } else {
                    this.setState(prevState => ({ ...prevState, 
                        isLoading: false,
                        hasError: true 
                    }));
                }
            });
        }
    };

    render() {
        return (
            <div className="loginContainer">
                <div>
                    <img src={Logo} alt="Logo" className="logo-trendify" />
                </div>
                <Container maxWidth="xs">
                    <form onSubmit={this.login}>
                        <div className="loginInput">
                            <CustomTextField id="email" label="Email" type="text" fullWidth onChange={this.handleChange('email')}/>
                        </div>
                        <div className="loginInput">
                            <CustomTextField id="password" label="Password" type="password" fullWidth onChange={this.handleChange('password')}/>
                        </div>
                        <div className="loginButton">
                            {this.state.hasError && <p style={{ color: "red" }}>Email o password incorrecto/s.</p>}
                            {!this.state.isLoading && <Button type="submit" variant="contained" color="secondary"  fullWidth>Ingresar</Button>}
                            {this.state.isLoading && <Button variant="contained" color="primary" fullWidth disabled> <CircularProgress size={18} color="secondary" style={{ marginRight: '10px' }} /> Validando...</Button>}
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}
