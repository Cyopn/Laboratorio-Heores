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
            <input type="number" id="matric" value="${temp[0]}">
            <p>Nombre</p>
            <input type="text" id="nombre" value="${temp[1]}">
            <p>Apellidos</p>
            <input type="text" id="apelli" value="${temp[2]}">
            <p>Nombre de usuario</p>
            <input type="text" id="userna" value="${temp[3]}">
			<p>Numero movil</p>
            <input type="number" id="numero" value="${temp[4]}">
            <p>Contraseña</p>
            <input type="password" id="contra" value="${temp[5]}">
            <p>Repetir contraseña</p>
            <input type="password" id="contrr" value="${temp[6]}">
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
				<input type="text" id="grupo">
				<br>
				<button type="submit" onclick="saveUser()">Registrate</button>`
	} else if (selectedOption === "profesor") {
		let temp = []
		form.childNodes.forEach(children => {
			if (children.nodeName.includes("INPUT")) {
				temp.push(children.value)
			}
		})
		form.innerHTML = `<p>Matricula</p>
            <input type="number" id="matric" value="${temp[0]}">
            <p>Nombre</p>
            <input type="text" id="nombre" value="${temp[1]}">
            <p>Apellidos</p>
            <input type="text" id="apelli" value="${temp[2]}">
            <p>Nombre de usuario</p>
            <input type="text" id="userna" value="${temp[3]}">
			<p>Numero movil</p>
            <input type="number" id="numero" value="${temp[4]}">
            <p>Contraseña</p>
            <input type="password" id="contra" value="${temp[5]}">
            <p>Repetir contraseña</p>
            <input type="password" id="contrr" value="${temp[6]}">
            <p>Cargo</p>
            <select id="cargo" onchange="reloadGUI(this)">
                <option value="profesor">Profesor</option>
                <option value="selecciona_uno">Selecciona uno</option>
                <option value="alumno">Alumno</option>
            </select>
            <p>Departamento</p>
				<select id="departamento">
					<option value="selecciona_uno">Selecciona uno</option>
					<option value="sistemas">Sistemas</option>
					<option value="mecatronica">Mecatronica</option>
                    <option value="administracion">Administracion</option>
				</select>
				<br>
				<button type="submit" onclick="saveUser()">Registrate</button>`
	} else if (selectedOption === "selecciona_uno") {
		let temp = []
		form.childNodes.forEach(children => {
			if (children.nodeName.includes("INPUT")) {
				temp.push(children.value)
			}
		})
		form.innerHTML = `<p>Matricula</p>
            <input type="number" id="matric" value="${temp[0]}">
            <p>Nombre</p>
            <input type="text" id="nombre" value="${temp[1]}">
            <p>Apellidos</p>
            <input type="text" id="apelli" value="${temp[2]}">
            <p>Nombre de usuario</p>
            <input type="text" id="userna" value="${temp[3]}">
			<p>Numero movil</p>
            <input type="number" id="numero" value="${temp[4]}">
            <p>Contraseña</p>
            <input type="password" id="contra" value="${temp[5]}">
            <p>Repetir contraseña</p>
            <input type="password" id="contrr" value="${temp[6]}">
            <p>Cargo</p>
				<select id="cargo" onchange="reloadGUI(this)">
				<option value="selecciona_uno">Selecciona uno</option>
				<option value="alumno">Alumno</option>
				<option value="profesor">Profesor</option>`
	}
}

function saveUser() {
	var dialog = document.getElementById("modal");
	const cargo = document.getElementById("cargo")
	const selectedOption = cargo.options[cargo.selectedIndex].value
	if (selectedOption === "alumno") {
		const matricula = parseInt(document.getElementById("matric").value)
		const nombre = document.getElementById("nombre").value
		const apellidos = document.getElementById("apelli").value
		const username = document.getElementById("userna").value
		const numero = document.getElementById("numero").value
		const password = document.getElementById("contra").value
		const repeatPassword = document.getElementById("contrr").value
		const turno = document.getElementById("turno").value
		const grupo = document.getElementById("grupo").value
		if (!matricula || !nombre || !apellidos || !username || !numero || !password || !repeatPassword || turno === "selecciona_uno" || !grupo) {
			dialog.innerHTML = `<p>Llena todos los datos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
			window.modal.showModal();
		} else {
			if (password !== repeatPassword) {
				dialog.innerHTML = `<p>Las contraseñas no coinciden.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			} else {
				const xhttp = new XMLHttpRequest();
				xhttp.open("POST", "http://127.0.0.1:4000/saveUser/", true);
				xhttp.setRequestHeader(
					"Content-Type",
					"application/json;charset=UTF-8",
				);
				xhttp.send(
					JSON.stringify({
						matricula, nombre, username, apellidos, numero, password, selectedOption, departamento: null, grupo, turno, admin: false
					}),
				);
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						dialog.innerHTML = `<p>Datos guardados.</p><p>Ahora puedes inicar sesion.</p><p><button class="dialog-button" onclick="closeModal(login)">Cerrar</button></p>`;
						window.modal.showModal();
					} else {
						dialog.innerHTML = `<p>No se pudo guardar el usuario.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
						window.modal.showModal();
					}
				};
			}
		}

	} else if (selectedOption === "profesor") {
		const matricula = document.getElementById("matric").value
		const nombre = document.getElementById("nombre").value
		const apellidos = document.getElementById("apelli").value
		const username = document.getElementById("userna").value
		const numero = document.getElementById("numero").value
		const password = document.getElementById("contra").value
		const repeatPassword = document.getElementById("contrr").value
		const departamento = document.getElementById("departamento").value
		if (!matricula || !nombre || !apellidos || !username || !numero || !password || !repeatPassword) {
			dialog.innerHTML = `<p>Llena todos los datos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
			window.modal.showModal();
		} else {
			if (password !== repeatPassword) {
				dialog.innerHTML = `<p>Las contraseñas no coinciden.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			} else {
				const xhttp = new XMLHttpRequest();
				xhttp.open("POST", "http://127.0.0.1:4000/saveUser/", true);
				xhttp.setRequestHeader(
					"Content-Type",
					"application/json;charset=UTF-8",
				);
				xhttp.send(
					JSON.stringify({
						matricula, nombre, username, apellidos, numero, password, selectedOption, departamento, grupo: null, turno: null, admin: false
					}),
				);
				xhttp.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {
						dialog.innerHTML = `<p>Datos guardados.</p><p>Ahora puedes iniciar sesion.</p><p><button class="dialog-button" onclick="closeModal(login)">Cerrar</button></p>`;
						window.modal.showModal();
					} else {
						dialog.innerHTML = `<p>No se pudo guardar el usuario.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
						window.modal.showModal();
					}
				};
			}
		}
	}
}

function login() {
	const username = document.getElementById("username").value
	const password = document.getElementById("password").value
	if (!username || !password) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>Ingresa todos los datos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://127.0.0.1:4000/getLogin/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
	);
	xhttp.send(
		JSON.stringify({
			username, password
		}),
	);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText)
			if (response.status === 200) {
				localStorage.setItem("user", JSON.stringify(response.data))
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>Bienvenido ${response.data.nombre}.</p><p><button class="dialog-button" onclick="closeModal('dashboard')">Cerrar</button></p>`;
				document.getElementById("username").value = ""
				document.getElementById("password").value = ""
				window.modal.showModal();
			} else {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>Usuario o contraseña incorrectos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			}
		}
	};
}

function prepareUserUpdate() {
	const data = JSON.parse(localStorage.getItem("data"))
	if (data.update) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>¿Estas seguro de actualizar tus datos?</p><p><button class="dialog-button" onclick="closeModal('none')">Cancelar</button><button class="dialog-button" onclick="updateSelfUser()">Aceptar</button></p>`;
		window.modal.showModal();
	}
}

function updateSelfUser() {
	window.modal.close();
	const data = JSON.parse(localStorage.getItem("data"))
	const matricula = document.getElementById("matricula").value
	const nombre = document.getElementById("nombre").value
	const apellidos = document.getElementById("apellidos").value
	const username = document.getElementById("username").value
	const numero = document.getElementById("numero").value
	const password = document.getElementById("contraseña").value
	const departamento = document.getElementById("departamento").value
	const grupo = document.getElementById("grupo").value
	const turno = document.getElementById("turno").value
	console.log(data)
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "http://127.0.0.1:4000/updateUser/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
	);
	xhttp.send(
		JSON.stringify({
			id: data.id_usuario, matricula, nombre, apellidos, username, numero, password, departamento, grupo, turno
		}),
	);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText)
			const response = JSON.parse(this.responseText)
			if (response.status === 200) {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>Datos actualizados.</p><p><button class="dialog-button" onclick="closeModal('dashboard')">Cerrar</button></p>`;
				window.modal.showModal();
			} else {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>No se pudo actualizar tus datos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			}
		}
	};
}

function addInput() {
	
}

function closeModal(location) {
	if (location === "none") {
		window.modal.close();
	} else {
		window.location.href = `../${location}.html`
		window.modal.close();
	}
}

function logout() {
	localStorage.removeItem("user")
	window.location.href = `../login.html`
}