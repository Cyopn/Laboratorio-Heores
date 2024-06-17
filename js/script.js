document.addEventListener("DOMContentLoaded", function () {
	try {
		if (document.getElementById("hamburger")) {
			const hamburger = document.getElementById("hamburger");
			hamburger.addEventListener("click", function () {
				navMenu.classList.toggle("active");
			});
		}

		if (document.getElementById("nav-menu")) {
			const navMenu = document.getElementById("nav-menu");
			navMenu.addEventListener("click", function () {
				navMenu.classList.remove("active");
			});
		}

		if (document.getElementById("cargo")) {
			const cargo = document.getElementById("cargo");
			cargo.addEventListener("change", function (e) {
				const selectedOption = e.target.value;
				const form = document.getElementById("form");
				console.log(selectedOption);
				if (selectedOption === "alumno") {
					form.innerHTML = form.innerHTML.replace(
						`<button type="submit">Registrate</button>`,
						``,
					);
					form.innerHTML = form.innerHTML.replace(`<p>Cargo</p>`, ``);
					form.innerHTML = form.innerHTML.replace(
						`<select id="cargo">`,
						``,
					);
					form.innerHTML = form.innerHTML.replace(
						`<option value="selecciona_uno">Selecciona uno</option>`,
						``,
					);
					form.innerHTML = form.innerHTML.replace(
						`<option value="alumno">Alumno</option>`,
						``,
					);
					form.innerHTML = form.innerHTML.replace(
						`<option value="profesor">Profesor</option>`,
						``,
					);
					form.innerHTML = form.innerHTML.replace(`</select>`, ``);
					form.innerHTML = form.innerHTML.replace(`<p></p>`, ``);
					form.innerHTML += `<p>Cargo</p>
				<select id="cargo">
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
				<button type="submit">Registrate</button>`;
				} else if (selectedOption === "proesfor") {
				} else if (selectedOption === "selecciona_uno") {
					form.innerHTML = `<p>Matricula</p>
				<input type="text">
				<p>Nombre</p>
				<input type="text">
				<p>Apellidos</p>
				<input type="text">
				<p>Nombre de usuario</p>
				<input type="text" required>
				<p>Contraseña</p>
				<input type="text" required>
				<p>Repetir contraseña</p>
				<input type="text">
				<p>Cargo</p>
				<select id="cargo">
					<option value="selecciona_uno">Selecciona uno</option>
					<option value="alumno">Alumno</option>
					<option value="profesor">Profesor</option>
				</select>
				<p></p>
				<button type="submit">Registrate</button>`;
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
});

