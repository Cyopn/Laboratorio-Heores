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
				xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/saveUser/", true);
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
						dialog.innerHTML = `<p>Datos guardados.</p><p>Ahora puedes inicar sesion.</p><p><button class="dialog-button" onclick="closeModal('login')">Cerrar</button></p>`;
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
				xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/saveUser/", true);
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
	xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/getLogin/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
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
	const cargo = document.getElementById("cargo").value === undefined ? null : document.getElementById("cargo").value
	const departamento = document.getElementById("departamento").value === undefined ? null : document.getElementById("departamento").value
	const grupo = document.getElementById("grupo").value === undefined ? null : document.getElementById("grupo").value
	const turno = document.getElementById("turno").value === undefined ? null : document.getElementById("turno").value
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/updateUser/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
	);
	xhttp.send(
		JSON.stringify({
			id: data.id_usuario, matricula, nombre, apellidos, username, numero, password, departamento, grupo, turno, cargo
		}),
	);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
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

function prepareUserUpdateA() {
	const data = JSON.parse(localStorage.getItem("data"))
	if (data.update) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>¿Estas seguro de actualizar tus datos?</p><p><button class="dialog-button" onclick="closeModal('none')">Cancelar</button><button class="dialog-button" onclick="updateSelfUser()">Aceptar</button></p>`;
		window.modal.showModal();
	}
}

function updateSelfUserA() {
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
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/updateUser/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
	);
	xhttp.send(
		JSON.stringify({
			id: data.id_usuario, matricula, nombre, apellidos, username, numero, password, departamento, grupo, turno
		}),
	);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText)
			if (response.status === 200) {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>Datos actualizados.</p><p><button class="dialog-button" onclick="closeModal('admin-users')">Cerrar</button></p>`;
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
	const inputSel = document.getElementById("sel")
	const input = inputSel.options[inputSel.selectedIndex].value
	const can = document.getElementById("cn").value
	if (input === "selo" || !can || can === 0) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>Selecciona una opcion y llena la cantidad.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
	} else {
		const table = document.getElementsByTagName("table")[0]
		table.innerHTML += `<tr>
		<td>${inputSel.options[inputSel.selectedIndex].innerHTML}</td>
		<td>${can}</td>
		<td><img class="trash-button" src="../img/icons/trash.svg" onclick="deleteRow(this)"></img></td>
		</tr>`
		inputSel.selectedIndex = 0
		document.getElementById("cn").value = ""
	}
}

function saveLend() {
	const user = JSON.parse(localStorage.getItem("data"))
	const table = document.getElementsByTagName("table")[0]
	const rows = table.rows
	const data = []
	for (let i = 1; i < rows.length; i++) {
		data.push({
			id_usuario: user.id_usuario,
			id_equipo: rows[i].cells[0].innerHTML,
			cantidad: rows[i].cells[1].innerHTML
		})
	}
	if (data.length === 0) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>No hay equipos agregados en la lista.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	const devolucion = new Date(document.getElementById("devolucion").value)
	if (devolucion == "Invalid Date") {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>Ingresa una fecha.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	if (devolucion < new Date(Date.UTC(Date.now()))) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>La fecha de devolucion no puede ser menor a la fecha actual.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	if (devolucion.getDay() === 5 || devolucion.getDay() === 6) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>La fecha de devolucion no puede ser un fin de semana.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/addLend/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
	);
	xhttp.send(
		JSON.stringify({ id: user.id_usuario, entrega: new Date(Date.now()), devolucion: devolucion, data }),
	);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText)
			if (response.status === 200) {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>${response.result}</p><p><button class="dialog-button" onclick="closeModal('dashboard')">Cerrar</button></p>`;
				window.modal.showModal();
			} else {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>No se pudo prestar el equipo.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			}
		}
	};
}

function saveReserve() {
	const user = JSON.parse(localStorage.getItem("data"))
	const table = document.getElementsByTagName("table")[0]
	const rows = table.rows
	const data = []
	for (let i = 1; i < rows.length; i++) {
		data.push({
			id_usuario: user.id_usuario,
			id_equipo: rows[i].cells[0].innerHTML,
			cantidad: rows[i].cells[1].innerHTML
		})
	}
	if (data.length === 0) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>No hay equipos agregados en la lista.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	const entrega = new Date(document.getElementById("entrega").value)
	const devolucion = new Date(document.getElementById("devolucion").value)
	if (devolucion == "Invalid Date" || entrega == "Invalid Date") {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>Ingresa una fecha de entrega/devolucion.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	if (devolucion < new Date(Date.UTC(Date.now())) || entrega < new Date(Date.UTC(Date.now()))) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>La fecha de entrega/devolucion no puede ser menor a la fecha actual.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	if (devolucion.getDay() === 5 || devolucion.getDay() === 6 || entrega.getDay() === 5 || entrega.getDay() === 6) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>La fecha de entrega/devolucion no puede ser un fin de semana.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/addLend/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
	);
	xhttp.send(
		JSON.stringify({ id: user.id_usuario, entrega: entrega, devolucion: devolucion, data }),
	);
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText)
			if (response.status === 200) {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>${response.result}</p><p><button class="dialog-button" onclick="closeModal('dashboard')">Cerrar</button></p>`;
				window.modal.showModal();
			} else {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>No se pudo prestar el equipo.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			}
		}
	};
}

function showLend(card) {
	const parent = card.innerHTML.split("\n")
	let id = ""
	parent.forEach(e => {
		if (e.includes("Identificador:")) {
			id = e.slice(e.indexOf(":") + 1, e.length)
		}
	})
	id = id.replace("</h2>", "")
	localStorage.setItem("id_lend", `"${id}"`)
	window.location.href = `../Laboratorio-Heores/devolutionview.html`
}

function showLendAdmin(card) {
	const parent = card.innerHTML.split("\n")
	let id = ""
	parent.forEach(e => {
		if (e.includes("Identificador:")) {
			id = e.slice(e.indexOf(":") + 1, e.length)
		}
	})
	id = id.replace("</h2>", "")
	localStorage.setItem("id_lend", `"${id}"`)
	window.location.href = `../Laboratorio-Heores/admin-devolutionview.html`
}

function showUser(card) {
	const parent = card.innerHTML.split("\n")
	let id = ""
	parent.forEach(e => {
		if (e.includes("Matricula:")) {
			id = e.slice(e.indexOf(":") + 1, e.length)
		}
	})
	id = id.replace("</p>", "")
	localStorage.setItem("id_user", `${id}`)
	window.location.href = `../Laboratorio-Heores/admin-userview.html`
}

function deleteRow(r) {
	var i = r.parentNode.parentNode.rowIndex;
	document.getElementsByTagName("table")[0].deleteRow(i);
}

function closeModal(location) {
	if (location === "none") {
		window.modal.close();
	} else {
		window.location.href = `../Laboratorio-Heores/${location}.html`
		window.modal.close();
	}
}

function logout() {
	localStorage.removeItem("user")
	window.location.href = `../Laboratorio-Heores/login.html`
}

function logoutAdmin() {
	localStorage.removeItem("user")
	window.location.href = `../Laboratorio-Heores/login-admin.html`
}

function loginAdmin() {
	const username = document.getElementById("username").value
	const password = document.getElementById("password").value
	if (!username || !password) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>Ingresa todos los datos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
		window.modal.showModal();
		return
	}
	const xhttp = new XMLHttpRequest();
	xhttp.open("POST", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/getLoginAdmin/", true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
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
				const data = response.data
				if (data.admin) {
					const dialog = document.getElementById("modal");
					dialog.innerHTML = `<p>Bienvenido ${data.nombre}.</p><p><button class="dialog-button" onclick="closeModal('admin-dashboard')">Cerrar</button></p>`;
					document.getElementById("username").value = ""
					document.getElementById("password").value = ""
					window.modal.showModal();
				} else {
					const dialog = document.getElementById("modal");
					dialog.innerHTML = `<p>No tienes permisos para acceder a esta pagina.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
					window.modal.showModal();
				}
			} else {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>Usuario o contraseña incorrectos.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			}
		}
	};
}

function updateLend() {
	const estado = document.getElementById("estado").value
	const id = document.getElementById("id").value
	if (estado === "devuelto") return
	const xhttp = new XMLHttpRequest();
	xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev/updateLend/" + id, true);
	xhttp.setRequestHeader(
		"Content-Type",
		"application/json;charset=UTF-8",
		"Access-Control-Allow-Origin", "*"
	);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			const response = JSON.parse(this.responseText)
			if (response.status === 200) {
				const data = response.result
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>Prestamo devuelto.</p><p><button class="dialog-button" onclick="closeModal('admin-dashboard')">Cerrar</button></p>`;
				window.modal.showModal();
			} else {
				const dialog = document.getElementById("modal");
				dialog.innerHTML = `<p>No se pudo actualizar el prestamo.</p><p><button class="dialog-button" onclick="closeModal('none')">Cerrar</button></p>`;
				window.modal.showModal();
			}
		}
	};
}