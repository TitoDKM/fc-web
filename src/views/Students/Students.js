import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { ArrowDownUp, ChevronLeft, ChevronRight, PlusLg, Search, TrashFill, X } from 'react-bootstrap-icons';
import { appContext } from '../..';
import { LOAD_STUDENTS, LOAD_STUDENTS_ERROR, LOAD_STUDENTS_SUCCESS, LOGOUT, RESET_ERRORS } from '../../reducers/AppReducer';
import { getStudents } from '../../services/studentsService';

import './students.css';

const Students = () => {
	const { state, dispatch }  = useContext(appContext);
	const [asc, setAsc] = useState(false);
	const [totalStudents, setTotalStudents] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);
	const [students, setStudents] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		dispatch({type: LOAD_STUDENTS});
		getStudents(0, 25, '', state.token)
		.then(response => {
			dispatch({type: LOAD_STUDENTS_SUCCESS});
			setStudents(response.data.students);
			setTotalStudents(response.data.total);
			setCurrentPage(response.data.current + 1);
			setTotalPages(response.data.pages);
		})
		.catch(error => {
			if(error.response && error.response.status === 403){ 
				dispatch({type: LOGOUT});
			} else if(error.response && error.response.status === 400) {
				dispatch({type: LOAD_STUDENTS_ERROR, error: error.response.data});
			} else {
				dispatch({type: LOAD_STUDENTS_ERROR, error: 'Error al obtener los datos del servidor'});
			}
		});
	}, []);

	const nextPage = () => {
		if(currentPage < totalPages && currentPage != totalPages) {
			dispatch({type: LOAD_STUDENTS});
			getStudents(currentPage, 25, search, state.token)
			.then(response => {
				dispatch({type: LOAD_STUDENTS_SUCCESS});
				setStudents(response.data.students);
				setTotalStudents(response.data.total);
				setCurrentPage(response.data.current + 1);
				setTotalPages(response.data.pages);
			})
			.catch(error => {
				if(error.response && error.response.status === 403)
					dispatch({type: LOGOUT});
			});
		}
	}

	const prevPage = () => {
		if(currentPage > 1 && currentPage <= totalPages) {
			dispatch({type: LOAD_STUDENTS});
			getStudents(currentPage - 2, 25, search, state.token)
			.then(response => {
				dispatch({type: LOAD_STUDENTS_SUCCESS});
				setStudents(response.data.students);
				setTotalStudents(response.data.total);
				setCurrentPage(response.data.current + 1);
				setTotalPages(response.data.pages);
			})
			.catch(error => {
				if(error.response && error.response.status === 403)
					dispatch({type: LOGOUT});
			});
		}
	}

	const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

	const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

	const handleSort = (e) => {
		const newAsc = !asc;
		setAsc(newAsc);
		const th = e.target;
		const table = document.getElementById('table-body');
		Array.from(table.querySelectorAll('tr:nth-child(n+1)'))
			.sort(comparer(Array.from(th.parentNode.children).indexOf(th), newAsc))
			.forEach(tr => table.appendChild(tr));
	}

	const handleSearch = (e) => {
		const filter = e.target.value.toLowerCase();
		setSearch(filter);
		getStudents(0, 25, filter, state.token)
		.then(response => {
			dispatch({type: LOAD_STUDENTS_SUCCESS});
			setStudents(response.data.students);
			setTotalStudents(response.data.total);
			setCurrentPage(response.data.current + 1);
			setTotalPages(response.data.pages);
		})
		.catch(error => {
			if(error.response && error.response.status === 403){ 
				dispatch({type: LOGOUT});
			} else if(error.response && error.response.status === 400) {
				dispatch({type: LOAD_STUDENTS_ERROR, error: error.response.data});
			} else {
				dispatch({type: LOAD_STUDENTS_ERROR, error: 'Error al obtener los datos del servidor'});
			}
		});
	}

	return (
		<div className="gray-background">
			<Container fluid>
				<nav className="navbar">
					<a className="navbar-brand text-black" href="/">OpenBootcamp <span>| Alumnos</span></a>
					<ul className="nav navbar-nav">
						<li className="nav-item dropdown">
							<a href="#" className="nav-link dropdown-toggle text-black user-dropdown" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								<span className="user-photo">NA</span>
								<span className="user-text">UserName</span>
							</a>
							<div className="dropdown-menu dropdown-menu-right position-absolute" aria-labelledby="navbarDropdown">
								<a className="dropdown-item" href="#">Action</a>
							</div>
						</li>
					</ul>
				</nav>
				<Container fluid>
					<Row className="p-4">
						<Col className="col-9 students-container">
							<div className="table-header">
								<h4 className="me-4">Alumnos</h4>
								<div className="w-100 search-container">
									<span className="bi"><Search /></span>
									<input type="text" placeholder="Busca por nombre, email o palabra clave..." className="search-input" onKeyUp={(e) => handleSearch(e)} />
								</div>
								<button className="btn add-student-btn"><PlusLg /> Añadir alumnos</button>
							</div>
								{state.error && (<Alert variant="danger" className="mt-4">{state.error}</Alert>)}
							<div className="table-content mt-4">
								<table className="table students-table">
									<thead>
										<tr>
											<th onClick={(e) => handleSort(e)} style={{paddingLeft: '20px'}}>Nombre <ArrowDownUp /></th>
											<th onClick={(e) => handleSort(e)}>Ciudad <ArrowDownUp /></th>
											<th onClick={(e) => handleSort(e)}>País <ArrowDownUp /></th>
											<th onClick={(e) => handleSort(e)}>Teléfono <ArrowDownUp /></th>
											<th onClick={(e) => handleSort(e)}>Correo electrónico <ArrowDownUp /></th>
											<th onClick={(e) => handleSort(e)}>Etiquetas <ArrowDownUp /></th>
										</tr>
									</thead>
									<tbody style={{borderTop: 'none', height: '50px', position: 'relative'}} id="table-body">
										{state.loadingStudents && <h3 className="table-message">Cargando..</h3>}
										{(!state.loadingStudents && students.length === 0) ? (<h3 className="table-message">Aún no hay estudiantes registrados</h3>) :
										(<>
											{students.map(student => (
											<tr key={student.id}>
												<th style={{paddingLeft: '20px'}}>{student.fullName}</th>
												<td>{student.city}</td>
												<td>{student.country}</td>
												<td>{student.phone}</td>
												<td>{student.email}</td>
												<td id="tags"><span>HTML&CSS</span><span>Angular</span><span>+2</span></td>
											</tr>))}
										</>)}
									</tbody>
								</table>
								<div className="table-footer position-relative">
									<div className="students-count">Mostrando {students.length} de {totalStudents} alumnos</div>
									<div className="pagination position-absolute top-0 start-50 translate-middle" style={{marginTop: '10px'}}>
										<div className="pagination-left" className={((currentPage > 1 && currentPage <= totalPages) ? 'pointer-cursor' : '')} onClick={prevPage}><ChevronLeft /></div>
										<div className="pagination-current">{currentPage}</div>
										<div className="pagination-count">de {totalPages}</div>
										<div className="pagination-right" className={((currentPage < totalPages && currentPage != totalPages) ? 'pointer-cursor' : '')} onClick={nextPage}><ChevronRight /></div>
									</div>
								</div>
							</div>
						</Col>
						<Col className="col-3 filters-container mt-3">
							<div className="table-header">
								<div className="w-100">
									<h4>Filtros de búsqueda</h4>
								</div>
								<TrashFill />
							</div>
							<div className="table-content mt-4">
								<div>
									<label htmlFor="tagsSelect" className="form-label">Etiquetas</label>
									<select className="selectpicker w-100" id="tagsSelect" data-live-search="true" title="Escribe para buscar...">
										<option value="js">JavaScript</option>
										<option value="html">HTML&CSS</option>
										<option value="react">React</option>
									</select>
								</div>
								<div className="mt-3" id="search-tags">
									<span>HTML&CSS <X /></span><span>React <X /></span><span>Angular <X /></span>
								</div>
								<div>
									<label htmlFor="countrySelect" className="form-label">País</label>
									<select className="form-select filters-select w-100" id="countrySelect">
										<option value="ES">España</option>
										<option value="CO">Colombia</option>
										<option value="MX">México</option>
									</select>
								</div>
								<div>
									<label htmlFor="citySelect" className="form-label">Ciudad</label>
									<select className="form-select filters-select w-100" id="citySelect">
										<option value="huelva">Huelva</option>
										<option value="madrid">Madrid</option>
										<option value="toledo">Toledo</option>
									</select>
								</div>
								<div>
									<label htmlFor="citySelect" className="form-label w-100">Presencial / a distancia</label>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="checkSite" />
										<label className="form-check-label mt-0" htmlFor="checkSite">Presencial</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="checkRemote" />
										<label className="form-check-label mt-0" htmlFor="checkcheckRemoteSite">En remoto</label>
									</div>
								</div>
								<div>
									<label htmlFor="citySelect" className="form-label w-100">Posibilidad traslado</label>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="canMoveYes" />
										<label className="form-check-label mt-0" htmlFor="canMoveYes">Sí</label>
									</div>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="canMoveNo" />
										<label className="form-check-label mt-0" htmlFor="canMoveNo">No</label>
									</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</Container>
		</div>
	);
}

export default Students;