import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ArrowDownUp, ChevronLeft, ChevronRight, PlusLg, Search, TrashFill, X } from 'react-bootstrap-icons';

import './students.css';

const Students = () => {
	const [asc, setAsc] = useState(false);

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
		let students = document.getElementById('table-body').getElementsByTagName('tr');

		for(let i = 0; i < students.length; i++) {
			let hasMatch = false;
			
			let fields = students[i].getElementsByTagName("td");
			for(let j = 0; j < fields.length; j++) {
				const fieldText = fields[j].innerText.toLowerCase();
				if(fieldText.indexOf(filter) > -1)
					hasMatch = true;
			}

			if(hasMatch)
				students[i].style.display = "";
			else
				students[i].style.display = "none";
		}
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
									<tbody style={{borderTop: 'none'}} id="table-body">
										<tr>
											<th style={{paddingLeft: '20px'}}>Álvaro Sánchez Monteagudo</th>
											<td>Valencia</td>
											<td>España</td>
											<td>+34 657 85 25 46</td>
											<td>smonteagudo@gmail.com</td>
											<td id="tags"><span>HTML&CSS</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Amparo Herrera Climent</th>
											<td>Sevilla</td>
											<td>España</td>
											<td>+34 689 25 48 65</td>
											<td>hcliment@gmail.com</td>
											<td id="tags"><span>React</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Ana Gutierrez Lozano</th>
											<td>Valencia</td>
											<td>España</td>
											<td>+34 925 65 87 65</td>
											<td>glozano@gmail.com</td>
											<td id="tags"><span>React</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Antonio Miguel Lacambra</th>
											<td>Madrid</td>
											<td>España</td>
											<td>+34 658 95 24 56</td>
											<td>mlacunza@gmail.com</td>
											<td id="tags"><span>HTML</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Antonio Delgado Jimeno</th>
											<td>Gijón</td>
											<td>España</td>
											<td>+34 925 65 54 25</td>
											<td>djimeno@gmail.com</td>
											<td id="tags"><span>HTML&CSS</span><span>React</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Belén Jerez Rivera</th>
											<td>Barcelona</td>
											<td>España</td>
											<td>+34 697 82 95 24</td>
											<td>jrivera@gmail.com</td>
											<td id="tags"><span>HTML</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Carlos Barroso Soriano</th>
											<td>Valencia</td>
											<td>España</td>
											<td>+34 958 65 41 54</td>
											<td>bsoriano@gmail.com</td>
											<td id="tags"><span>React</span><span>Symfony</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Carlos Yuste Guerrero</th>
											<td>Oviedo</td>
											<td>España</td>
											<td>+34 697 82 95 65</td>
											<td>yguerrero@gmail.com</td>
											<td id="tags"><span>Flutter</span><span>React</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Carmina Pérez López</th>
											<td>Jaén</td>
											<td>España</td>
											<td>+34 695 84 62 54</td>
											<td>plopez@gmail.com</td>
											<td id="tags"><span>HTML</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Luis García García</th>
											<td>Toledo</td>
											<td>España</td>
											<td>+34 697 82 95 65</td>
											<td>ggarcia@gmail.com</td>
											<td id="tags"><span>HTML</span><span>Angular</span><span>+2</span></td>
										</tr>
										<tr>
											<th style={{paddingLeft: '20px'}}>Ángel Giménez Hidalgo</th>
											<td>Sevilla</td>
											<td>España</td>
											<td>+34 697 82 95 24</td>
											<td>ghidalgo@gmail.com</td>
											<td id="tags"><span>HTML</span><span>Angular</span><span>+2</span></td>
										</tr>
									</tbody>
								</table>
								<div className="table-footer position-relative">
									<div className="students-count">1.214 alumnos en total</div>
									<div className="pagination position-absolute top-0 start-50 translate-middle" style={{marginTop: '10px'}}>
										<div className="pagination-left"><ChevronLeft /></div>
										<div className="pagination-current">1</div>
										<div className="pagination-count">de 132</div>
										<div className="pagination-right"><ChevronRight /></div>
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