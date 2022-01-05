import { Button, Col, Container, Form, Row } from "react-bootstrap";

import './login.css';

const Login = () => {
	return (
		<Container fluid className="h-100">
			<Row className="h-100">
				<Col lg="4" md="9" className="d-flex justify-content-center">
					<div className="loginBox w-75">
						<h4 class="loginTitle mb-5">OpenBootcamp <span>| Alumnos</span></h4>
						<Form className="loginForm">
							<div className="mb-4">
								<label for="email" className="form-label fwBold">Email</label>
								<input type="email" className="form-control" id="email" placeholder="Correo electrónico" />
							</div>
							<div className="mb-3">
								<label for="password" className="form-label fwBold">Contraseña</label>
								<input type="password" className="form-control" id="password" placeholder="Introduce tu contraseña" />
							</div>
							<div className="mb-3">
								<div className="form-check">
									<input className="form-check-input" type="checkbox" id="remember" />
									<label className="form-check-label rememberLabel" for="remember">Recuérdame</label>
								</div>
								<a href="#" className="forgottenPassword">
									He olvidado la contraseña
								</a>
							</div>
							<Button type="submit" variant="none" className="loginButton w-100">Iniciar sesión</Button>
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