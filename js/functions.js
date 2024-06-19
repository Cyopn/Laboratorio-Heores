function reloadGUI(e) {
	const selectedOption = e.options[e.selectedIndex].value
	const form = document.getElementById("form");
	console.log(selectedOption);
	if (selectedOption === "alumno") {
		form.remo
		form.insertAdjacentHTML("beforeend", `<p>Cargo</p>
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
			<button type="submit">Registrate</button>`)
		/* form.innerHTML = form.innerHTML + `<p>Cargo</p>
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
			<button type="submit">Registrate</button>`; */
	} else if (selectedOption === "profesor") {
	} else if (selectedOption === "selecciona_uno") {
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
		form.innerHTML += `
			<p>Cargo</p>
			<select id="cargo">
				<option value="selecciona_uno">Selecciona uno</option>
				<option value="alumno">Alumno</option>
				<option value="profesor">Profesor</option>
			</select>
			<p></p>
			<button type="submit">Registrate</button>`;
	}
}