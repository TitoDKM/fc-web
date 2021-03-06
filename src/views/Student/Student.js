import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { CloudArrowUp, GeoAlt, Trash, X } from "react-bootstrap-icons";

import './student.css';

const Student = () => {
	const [currentTags, setCurrentTags] = useState([{id: 2, title: 'HTML&CSS'}, {id: 3, title: 'React'}, {id: 6, title: 'Angular'}]);

	const handleChange = (e) => {
		const clickedIndex = e.target.value;
		const tagValue = document.getElementById('tagsSelect').options[clickedIndex].text;
		if(!currentTags.find(tag => tag.title.includes(tagValue.includes("HTML") ? "HTML" : tagValue)))
			setCurrentTags([...currentTags, {id: clickedIndex, title: tagValue}]);
	}

	const handleItemClick = (item) => {
		const newTags = currentTags.filter(tag => tag.id !== item.id);
		setCurrentTags(newTags);
	}

	return (
		<div className="gray-background">
			<Container fluid>
				<Row className="p-4">
					<div className="col-4 student-card">
						<div className="student-header d-flex">
							<div className="student-photo"><img src="student.jpg" /></div>
							<div className="student-info">
								<h4>Nombre Alumno</h4>
								<span><GeoAlt /> Valencia | España</span>
							</div>
						</div>
						<div className="student-form">
							<div>
								<label htmlFor="studentName" className="form-label w-100">Nombre y Apellidos</label>
								<input type="text" id="studentName" className="w-100" placeholder="Nombre Alumno" />
							</div>
							<div className="d-flex">
								<div className="w-50">
									<label htmlFor="studentPhone" className="form-label w-100">Nº Teléfono</label>
									<input type="text" id="studentPhone" className="w-100" placeholder="+34 654 85 52 48" />
								</div>
								<div className="w-50 ms-4">
									<label htmlFor="studentMail" className="form-label w-100">Email</label>
									<input type="email" id="studentMail" className="w-100" placeholder="hcliment@gmail.com" />
								</div>
							</div>
							<div className="d-flex">
								<div className="w-50">
									<label htmlFor="studentCountry" className="form-label w-100">País</label>
									<select className="form-select w-100" id="studentCountry">
										<option value="ES">España</option>
										<option value="CO">Colombia</option>
										<option value="MX">México</option>
									</select>
								</div>
								<div className="w-50 ms-4">
									<label htmlFor="studentCity" className="form-label w-100">Ciudad</label>
									<select className="form-select w-100" id="studentCity">
										<option value="HLV">Huelva</option>
										<option value="SVQ">Sevilla</option>
										<option value="MLG">Málaga</option>
									</select>
								</div>
							</div>
							<div className="d-flex">
								<div className="w-50">
									<label htmlFor="studentMove" className="form-label w-100">Traslado</label>
									<select className="form-select w-100" id="studentMove">
										<option value="0">No</option>
										<option value="1">Sí</option>
									</select>
								</div>
								<div className="w-50 ms-4">
									<label htmlFor="studentSite" className="form-label w-100">Presencialidad</label>
									<select className="form-select w-100">
										<option value="0">En remoto</option>
										<option value="1">Presencial</option>
									</select>
								</div>
							</div>
							<div>
								<label htmlFor="studentCV" className="form-label w-100">Documento CV</label>
								<div className="d-flex">
									<label htmlFor="cvUpload" className="cvUploadButton mt-1"><CloudArrowUp />&nbsp;&nbsp;Subir de nuevo</label>
									<input type="file" id="cvUpload" />
									<button className="btn studentDeleteCV mt-1"><Trash />&nbsp;&nbsp;Borrar</button>
								</div>
							</div>
							<div>
								<label htmlFor="tagsSelect" className="form-label">Etiquetas</label>
								<select className="selectpicker w-100" id="tagsSelect" data-live-search="true" title="Escribe para buscar..." onChange={(e) => handleChange(e)}>
									<option value="1">JavaScript</option>
									<option value="2">HTML&CSS</option>
									<option value="3">React</option>
									<option value="4">C#</option>
									<option value="5">PHP</option>
									<option value="6">Angular</option>
								</select>
							</div>
							<div className="mt-3" id="search-tags">
								{currentTags.map(tag => <span id={"tag-" + tag.id} key={tag.id}>{tag.title} <X id={tag.id} onClick={(e) => handleItemClick(e.target)} /></span>)}
							</div>
						</div>
					</div>
					<div className="col-8">
						<iframe src="cv.pdf" height="100%" width="100%"></iframe>
					</div>
				</Row>
			</Container>
		</div>
	);
}

export default Student;