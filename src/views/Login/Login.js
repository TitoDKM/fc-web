import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import { appContext } from "../..";
import { ERROR, LOGIN, SUCCESS, TOKEN } from "../../reducers/AppReducer";
import { login } from "../../services/loginService";

import './login.css';

const Login = () => {
	const email = useRef();
	const password = useRef();
	const { state, dispatch }  = useContext(appContext);

	const tryLogin = (e) => {
		e.preventDefault();
		
		dispatch({type: LOGIN});

		login(email.current.value, password.current.value)
		.then(response => {
			if(response && response.status !== 200) {
				dispatch({type: ERROR, error: 'Error al iniciar sesión. Contacte con el administrador'});
			} else {
				localStorage.setItem("loginData", JSON.stringify({token: response.data, email: email.current.value}));
				dispatch({type: TOKEN, token: response.data});
				dispatch({type: SUCCESS});
			}
		}).catch(error => {
			if(error.response && error.response.status === 400) {
				dispatch({type: ERROR, error: error.response.data});
			} else {
				dispatch({type: ERROR, error: 'Error al iniciar sesión. Contacte con el administrador'});
				console.log('Error while trying to login: ', error);
			}
		});
	}

	return (
		<Container fluid className="h-100">
			<Row className="h-100">
				<Col lg="4" md="9" className="d-flex justify-content-center">
					<div className="loginBox w-75">
						<h4 className="loginTitle mb-5">OpenBootcamp <span>| Alumnos</span></h4>
						<Form className="loginForm">
						{state.error && (<Alert variant="danger">{state.error}</Alert>)}
							<div className="mb-4">
								<label htmlFor="email" className="form-label fwBold">Email</label>
								<input type="email" className="form-control" id="email" ref={email} placeholder="Correo electrónico" required />
							</div>
							<div className="mb-3">
								<label htmlFor="password" className="form-label fwBold">Contraseña</label>
								<input type="password" className="form-control" id="password" ref={password} placeholder="Introduce tu contraseña" required />
							</div>
							<div className="mb-3">
								<div className="form-check">
									<input className="form-check-input" type="checkbox" id="remember" />
									<label className="form-check-label rememberLabel" htmlFor="remember">Recuérdame</label>
								</div>
								<a href="#" className="forgottenPassword">
									He olvidado la contraseña
								</a>
							</div>
							<Button type="submit" variant="none" className="loginButton w-100" onClick={(e) => tryLogin(e)} disabled={state.loading}>{state.loading ? 'Iniciando sesión... ' : 'Iniciar sesión'}</Button>
							<div className="footer">
								Copyright &copy; 2021 Open Bootcamp SL, Imagina Group<br />
								Todos los derechos reservados.<br />
								<a href="#">Política de Privacidad</a>
							</div>
						</Form>
					</div>
				</Col>
				<Col lg="8" md="3" className="h-100" id="photoBg"></Col>
			</Row>
		</Container>
	)
}

export default Login;