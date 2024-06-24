function reloadGUI(e) {
	const selectedOption = e.options[e.selectedIndex].value
	const form = document.getElementById("form");
	if (selectedOption === "alumno") {
		let temp = []
		form.childNodes.forEach(children => {
			if (children.nodeName.includes("INPUT")) {
				temp.push(children.value)
			}
		})
		form.innerHTML = `<p>Matricula</p>
            <input type="text" value="${temp[0]}">
            <p>Nombre</p>
            <input type="text" value="${temp[1]}">
            <p>Apellidos</p>
            <input type="text" value="${temp[2]}">
            <p>Nombre de usuario</p>
            <input type="text" value="${temp[3]}">
			<p>Numero movil</p>
            <input type="number" value="${temp[4]}">
            <p>Contraseña</p>
            <input type="password" value="${temp[5]}">
            <p>Repetir contraseña</p>
            <input type="password" value="${temp[6]}">
            <p>Cargo</p>
				<select id="cargo" onchange="reloadGUI(this)">
				<option value="alumno">Alumno</option>
				<option value="selecciona_uno">Selecciona uno</option>
				<option value="profesor">Profesor</option>
				</select>
				<p>Turno</p>
				<select id="turno">
					<option value="selecciona_uno">Selecciona uno</option>
					<option value="matutino">Matutino</option>
					<option value="vespertino">Vespertino</option>
				</select>
				<p>Grupo</p>
				<input type="text">
				<br>
				<button type="submit">Registrate</button>`
	} else if (selectedOption === "profesor") {
		let temp = []
		form.childNodes.forEach(children => {
			if (children.nodeName.includes("INPUT")) {
				temp.push(children.value)
			}
		})
		form.innerHTML = `<p>Matricula</p>
            <input type="text" value="${temp[0]}">
            <p>Nombre</p>
            <input type="text" value="${temp[1]}">
            <p>Apellidos</p>
            <input type="text" value="${temp[2]}">
            <p>Nombre de usuario</p>
            <input type="text" value="${temp[3]}">
			<p>Numero movil</p>
            <input type="number" value="${temp[4]}">
            <p>Contraseña</p>
            <input type="password" value="${temp[5]}">
            <p>Repetir contraseña</p>
            <input type="password" value="${temp[6]}">
            <p>Cargo</p>
            <select id="cargo" onchange="reloadGUI(this)">
                <option value="profesor">Profesor</option>
                <option value="selecciona_uno">Selecciona uno</option>
                <option value="alumno">Alumno</option>
            </select>
            <p>Departamento</p>
				<select id="turno">
					<option value="selecciona_uno">Selecciona uno</option>
					<option value="sistemas">Sistemas</option>
					<option value="mecatronica">Mecatronica</option>
                    <option value="administracion">Administracion</option>
				</select>
				<p>Horario</p>
                <i class="inicio">Inicio</i>
				<input type="time">
                <i>Final</i>
				<input type="time">
				<br>
				<button type="submit">Registrate</button>`
	} else if (selectedOption === "selecciona_uno") {
		let temp = []
		form.childNodes.forEach(children => {
			if (children.nodeName.includes("INPUT")) {
				temp.push(children.value)
			}
		})
		form.innerHTML = `<p>Matricula</p>
            <input type="text" value="${temp[0]}">
            <p>Nombre</p>
            <input type="text" value="${temp[1]}">
            <p>Apellidos</p>
            <input type="text" value="${temp[2]}">
            <p>Nombre de usuario</p>
            <input type="text" value="${temp[3]}">
            <p>Contraseña</p>
            <input type="password" value="${temp[4]}">
            <p>Repetir contraseña</p>
            <input type="password" value="${temp[5]}">
            <p>Cargo</p>
				<select id="cargo" onchange="reloadGUI(this)">
				<option value="selecciona_uno">Selecciona uno</option>
				<option value="alumno">Alumno</option>
				<option value="profesor">Profesor</option>`
	}
}