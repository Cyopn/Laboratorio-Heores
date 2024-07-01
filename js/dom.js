document.addEventListener("DOMContentLoaded", function () {
	if (window.location.href.includes("dashboard")) {
		const navMenu = document.getElementById("nav-menu");
		navMenu.addEventListener("click", function () {
			navMenu.classList.remove("active");
		});
		const hamburger = document.getElementById("hamburger");
		hamburger.addEventListener("click", function () {
			navMenu.classList.toggle("active");
		});
	}
	if (localStorage.getItem("user") == null) {
		const dialog = document.getElementById("modal");
		dialog.innerHTML = `<p>Es necesario primero iniciar sesion.</p><p><button class="dialog-button" onclick="closeModal('login')">Aceptar</button></p>`;
		window.modal.showModal();
	}
	if (window.location.href.includes("/user")) {
		const user = JSON.parse(localStorage.getItem("user"))
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getSelfUser/" + user.id);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				const response = JSON.parse(xhttp.responseText);
				if (response.status == 200) {
					let data = response.result
					data["update"] = false
					localStorage.setItem("data", JSON.stringify(data))
					document.getElementById("nombre").value = data.nombre;
					document.getElementById("apellidos").value = data.apellidos;
					document.getElementById("matricula").value = data.matricula;
					document.getElementById("username").value = data.username;
					document.getElementById("numero").value = data.movil;
					document.getElementById("contraseña").value = data.contraseña;
					document.getElementById("cargo").value = data.cargo;
					document.getElementById("departamento").value = data.departamento === "null" ? "No aplica" : data.departamento;
					document.getElementById("grupo").value = data.grupo === "null" ? "No aplica" : data.grupo;
					document.getElementById("turno").value = data.turno === "null" ? "No aplica" : data.turno;
					document.getElementById("loader").style["display"] = "none";
					document.getElementsByClassName("loader-background")[0].style["display"] = "none";
					document.getElementById("update").style["opacity"] = 0.5;
				} else {
					const dialog = document.getElementById("modal");
					dialog.innerHTML = `<p>Usuario no encontrado</p><p><button class="dialog-button" onclick="closeModal('login')">Aceptar</button></p>`;
					window.modal.showModal();
				}
			}
		}
		document.getElementById("username").addEventListener("input", function () {
			let data = JSON.parse(localStorage.getItem("data"))
			if (this.value === data.username) {
				data["update"] = false
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 0.5;
			} else {
				data["update"] = true
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 1;
			}
		})
		document.getElementById("numero").addEventListener("input", function () {
			let data = JSON.parse(localStorage.getItem("data"))
			if (this.value === data.movil) {
				data["update"] = false
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 0.5;
			} else {
				data["update"] = true
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 1;
			}
		})
		document.getElementById("contraseña").addEventListener("input", function () {
			let data = JSON.parse(localStorage.getItem("data"))
			if (this.value === data.contraseña) {
				data["update"] = false
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 0.5;
			} else {
				data["update"] = true
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 1;
			}
		})
	}
	if (window.location.href.includes("lend") || window.location.href.includes("reserve")) {
		const user = JSON.parse(localStorage.getItem("data"))
		document.getElementById("nombre").value = `${user.nombre} ${user.apellidos}`;
		document.getElementById("matricula").value = user.matricula;
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getInputs/");
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result;
				const select = document.getElementById("sel");
				select.innerHTML = `<option value="selo">Selecciona un equipo</option>`;
				data.forEach(element => {
					if (element.estado === "prestado" || element.estado === "mantenimiento") return
					if (select.innerHTML.includes(element.nombre)) return
					select.innerHTML += `<option value="${element.clave}">${element.nombre}</option>`;
					document.getElementsByClassName("loader-background")[0].style["display"] = "none";
				});
			}
		}
	}

	if (window.location.href.includes("/devolution.")) {
		const data = JSON.parse(localStorage.getItem("data"))
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getLends/" + data.id_usuario);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			const container = document.getElementById("container");
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result
				if (response.status === 200) {
					if (data.length > 0) {
						let strdata = ""
						data.forEach(e => {
							let insumos = ""
							e.insumos.forEach(i => {
								insumos += `Insumo: ${i.nombre} - Cantidad: ${i.cantidad}`
								if (e.insumos[e.insumos.length - 1].nombre !== i.nombre) {
									insumos += ", "
								}
							})
							strdata += `<div class="card" onclick="showLend(this)">
											<img src="../img/icons/time-delete.svg" alt="">
											<div class="card-content">
												<h2>Identificador:  ${e.id_prestamo}</h2>
												<p>${insumos}</p>
												<p>Fecha de entrega: ${e.fecha_entrega.substring(0, 10)}</p>
												<p>Fecha de devolucion: ${e.fecha_devolucion.substring(0, 10)}</p>
											</div>
										</div>`
						});
						container.innerHTML += `${strdata} <br>`
						insumos = ""
					} else {
						container.innerHTML += `<div class="card">
												<img src="../img/icons/time-check.svg" alt="">
												<div class="card-content">
													<h2>Sin prestamos</h2>
													<p>No existen prestamos pendientes por devolver</p>
													</div>
												</div>`
					}
				} else {
					container.innerHTML = `<div class="card">
											<img src="../img/icons/time-check.svg" alt="">
											<div class="card-content">
												<h2>Sin prestamos</h2>
												<p>No existen prestamos pendientes por devolver</p>
												</div>
											</div>`
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/admin-devolution.")) {
		const data = JSON.parse(localStorage.getItem("data"))
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getAllLendsE/");
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			const container = document.getElementById("container");
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result
				if (response.status === 200) {
					if (data.length > 0) {
						let strdata = ""
						data.forEach(e => {
							let insumos = ""
							e.insumos.forEach(i => {
								insumos += `Insumo: ${i.nombre} - Cantidad: ${i.cantidad}`
								if (e.insumos[e.insumos.length - 1].nombre !== i.nombre) {
									insumos += ", "
								}
							})
							strdata += `<div class="card">
											<img src="../img/icons/time-delete.svg" alt="">
											<div class="card-content">
												<h2>Identificador:  ${e.id_prestamo}</h2>
												<p>${insumos}</p>
												<p>Fecha de entrega: ${e.fecha_entrega.substring(0, 10)}</p>
												<p>Fecha de devolucion: ${e.fecha_devolucion.substring(0, 10)}</p>
											</div>
										</div>`
						});
						container.innerHTML += `${strdata} <br>`
						insumos = ""
					} else {
						container.innerHTML += `<div class="card">
												<img src="../img/icons/time-check.svg" alt="">
												<div class="card-content">
													<h2>Sin prestamos</h2>
													<p>No existen prestamos pendientes por devolver</p>
													</div>
												</div>`
					}
				} else {
					container.innerHTML = `<div class="card">
											<img src="../img/icons/time-check.svg" alt="">
											<div class="card-content">
												<h2>Sin prestamos</h2>
												<p>No existen prestamos pendientes por devolver</p>
												</div>
											</div>`
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/admin-reg-devolution.")) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getAllLendsE/");
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			const container = document.getElementById("container");
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result
				if (response.status === 200) {
					if (data.length > 0) {
						let strdata = ""
						data.forEach(e => {
							let insumos = ""
							e.insumos.forEach(i => {
								insumos += `Insumo: ${i.nombre} - Cantidad: ${i.cantidad}`
								if (e.insumos[e.insumos.length - 1].nombre !== i.nombre) {
									insumos += ", "
								}
							})
							strdata += `<div class="card" onclick="showLendAdmin(this)">
											<img src="../img/icons/time-delete.svg" alt="">
											<div class="card-content">
												<h2>Identificador:  ${e.id_prestamo}</h2>
												<p>${insumos}</p>
												<p>Fecha de entrega: ${e.fecha_entrega.substring(0, 10)}</p>
												<p>Fecha de devolucion: ${e.fecha_devolucion.substring(0, 10)}</p>
											</div>
										</div>`
						});
						container.innerHTML += `${strdata} <br>`
						insumos = ""
					} else {
						container.innerHTML += `<div class="card">
												<img src="../img/icons/time-check.svg" alt="">
												<div class="card-content">
													<h2>Sin prestamos</h2>
													<p>No existen prestamos pendientes por devolver</p>
													</div>
												</div>`
					}
				} else {
					container.innerHTML = `<div class="card">
											<img src="../img/icons/time-check.svg" alt="">
											<div class="card-content">
												<h2>Sin prestamos</h2>
												<p>No existen prestamos pendientes por devolver</p>
												</div>
											</div>`
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/devolutionview.")) {
		const data = JSON.parse(localStorage.getItem("id_lend"))
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getLend/" + data);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const response = JSON.parse(this.responseText);
				if (response.status === 200) {
					const data = response.result[0]
					const content = document.getElementById("content");
					content.innerHTML += `<div class="item">
											<div class="label">
												<h3>Identificador</h3>
											</div>
											<div class="info">
												<input type="text" id="id" value="${data.id_prestamo}" readonly>
											</div>
										</div>
										<div class="item">
											<div class="label">
												<h3>Fecha de entrega</h3>
											</div>
											<div class="info">
												<input type="text" id="fechae" value="${data.fecha_entrega.slice(0, 10)}" readonly>
											</div>
										</div>
										<div class="item">
											<div class="label">
												<h3>Fecha de devolucion</h3>
											</div>
											<div class="info">
												<input type="text" id="fechad" value="${data.fecha_devolucion.slice(0, 10)}" readonly>
											</div>
										</div>
										`
					content.innerHTML += `<div class="item">
											<div class="label">
												<h3>Insumos</h3>
											</div>
											<div class="info">
												<table>
													<tr>
														<th>Nombre</th>
														<th>Cantidad</th>
													</tr>
												${data.insumos.map(e => `<tr>
																			<td>${e.nombre}</td>
																			<td>${e.cantidad}</td>
																		</tr>`).join("")}
																		</table>
										</div>
									</div>
									<div class="item">
											<div class="label">
												<h3>Fecha de devolucion</h3>
											</div>
											<div class="info">
												<input type="text" id="estado" value="${data.estado}" readonly>
											</div>
										</div>
									<br>`
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/admin-historial.")) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getAllLends/");
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			const container = document.getElementById("container");
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result
				if (response.status === 200) {
					if (data.length > 0) {
						let strdata = ""
						data.forEach(e => {
							let insumos = ""
							e.insumos.forEach(i => {
								insumos += `Insumo: ${i.nombre} - Cantidad: ${i.cantidad}`
								if (e.insumos[e.insumos.length - 1].nombre !== i.nombre) {
									insumos += ", "
								}
							})
							strdata += `<div class="card">
											<img src="../img/icons/time-delete.svg" alt="">
											<div class="card-content">
												<h2>Identificador:  ${e.id_prestamo}</h2>
												<p>Estado: ${e.estado}</p>
												<p>${insumos}</p>
												<p>Fecha de entrega: ${e.fecha_entrega.substring(0, 10)}</p>
												<p>Fecha de devolucion: ${e.fecha_devolucion.substring(0, 10)}</p>
											</div>
										</div>`
						});
						container.innerHTML += `${strdata} <br>`
						insumos = ""
					} else {
						container.innerHTML += `<div class="card">
												<img src="../img/icons/time-check.svg" alt="">
												<div class="card-content">
													<h2>Sin historial</h2>
													<p>No existen antecedentes de prestamos</p>
													</div>
												</div>`
					}
				} else {
					container.innerHTML = `<div class="card">
											<img src="../img/icons/time-check.svg" alt="">
											<div class="card-content">
												<h2>Sin historial</h2>
												<p>No existen antecedentes de prestamos</p>
												</div>
											</div>`
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/admin-devolutionview.")) {
		const data = JSON.parse(localStorage.getItem("id_lend"))
		document.getElementById("update").style["opacity"] = 0.5;
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getLend/" + data);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				const response = JSON.parse(this.responseText);
				if (response.status === 200) {
					const data = response.result[0]
					const content = document.getElementById("content");
					content.innerHTML += `<div class="item">
											<div class="label">
												<h3>Identificador</h3>
											</div>
											<div class="info">
												<input type="text" id="id" value="${data.id_prestamo}" readonly>
											</div>
										</div>
										<div class="item">
											<div class="label">
												<h3>Fecha de entrega</h3>
											</div>
											<div class="info">
												<input type="text" id="fechae" value="${data.fecha_entrega.slice(0, 10)}" readonly>
											</div>
										</div>
										<div class="item">
											<div class="label">
												<h3>Fecha de devolucion</h3>
											</div>
											<div class="info">
												<input type="text" id="fechad" value="${data.fecha_devolucion.slice(0, 10)}" readonly>
											</div>
										</div>
										`
					content.innerHTML += `<div class="item">
											<div class="label">
												<h3>Insumos</h3>
											</div>
											<div class="info">
												<table>
													<tr>
														<th>Nombre</th>
														<th>Cantidad</th>
													</tr>
												${data.insumos.map(e => `<tr>
																			<td>${e.nombre}</td>
																			<td>${e.cantidad}</td>
																		</tr>`).join("")}
																		</table>
										</div>
									</div>
									<div class="item">
											<div class="label">
												<h3>Fecha de devolucion</h3>
											</div>
											<div class="info">
												<input type="text" id="estado" value="${data.estado}" readonly>
											</div>
										</div>
									<br>`
					if (data.estado === "entregado") {
						document.getElementById("update").style["opacity"] = 1;
					}
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/admin-users.")) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getUsers/");
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			const container = document.getElementById("container");
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result
				if (response.status === 200) {
					if (data.length > 0) {
						let strdata = ""
						data.forEach(e => {
							strdata += `<div class="card" onclick="showUser(this)">
											<img src="../img/icons/user.svg" alt="">
											<div class="card-content">
												<h2>${e.nombre} ${e.apellidos}</h2>
												<p>Matricula: ${e.matricula}</p>
												<p>Cargo: ${e.cargo}</p>
											</div>
										</div>`
						});
						container.innerHTML += `${strdata} <br>`
					} else {
						container.innerHTML += `<div class="card">
												<img src="../img/icons/time-check.svg" alt="">
												<div class="card-content">
													<h2>Sin historial</h2>
													<p>No existen antecedentes de prestamos</p>
													</div>
												</div>`
					}
				} else {
					container.innerHTML = `<div class="card">
											<img src="../img/icons/time-check.svg" alt="">
											<div class="card-content">
												<h2>Sin usuarios</h2>
												<p>No existen usuarios registrados</p>
												</div>
											</div>`
				}
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}

	if (window.location.href.includes("/admin-userview.")) {
		const id = localStorage.getItem("id_user")
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://8f0b0525-3b3c-4875-af4e-19700379a090-00-ij7v0lfrj4jd.riker.replit.dev//getUser/" + id);
		xhttp.send();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				const response = JSON.parse(xhttp.responseText);
				if (response.status == 200) {
					let data = response.result
					data["update"] = false
					localStorage.setItem("data", JSON.stringify(data))
					document.getElementById("nombre").value = data.nombre;
					document.getElementById("apellidos").value = data.apellidos;
					document.getElementById("matricula").value = data.matricula;
					document.getElementById("username").value = data.username;
					document.getElementById("numero").value = data.movil;
					document.getElementById("contraseña").value = data.contraseña;
					document.getElementById("cargo").value = data.cargo;
					document.getElementById("departamento").value = data.departamento === "null" ? "No aplica" : data.departamento;
					document.getElementById("grupo").value = data.grupo === "null" ? "No aplica" : data.grupo;
					document.getElementById("turno").value = data.turno === "null" ? "No aplica" : data.turno;
					document.getElementById("loader").style["display"] = "none";
					document.getElementsByClassName("loader-background")[0].style["display"] = "none";
					document.getElementById("update").style["opacity"] = 0.5;
				} else {
					const dialog = document.getElementById("modal");
					dialog.innerHTML = `<p>Usuario no encontrado</p><p><button class="dialog-button" onclick="closeModal('admin-users')">Aceptar</button></p>`;
					window.modal.showModal();
				}
			}
		}
		document.getElementById("username").addEventListener("input", function () {
			let data = JSON.parse(localStorage.getItem("data"))
			if (this.value === data.username) {
				data["update"] = false
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 0.5;
			} else {
				data["update"] = true
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 1;
			}
		})
		document.getElementById("numero").addEventListener("input", function () {
			let data = JSON.parse(localStorage.getItem("data"))
			if (this.value === data.movil) {
				data["update"] = false
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 0.5;
			} else {
				data["update"] = true
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 1;
			}
		})
		document.getElementById("contraseña").addEventListener("input", function () {
			let data = JSON.parse(localStorage.getItem("data"))
			if (this.value === data.contraseña) {
				data["update"] = false
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 0.5;
			} else {
				data["update"] = true
				localStorage.setItem("data", JSON.stringify(data))
				document.getElementById("update").style["opacity"] = 1;
			}
		})
	}

})

function closeModal(location) {
	if (location === "none") {
		window.modal.close();
	} else {
		window.location.href = `../${location}.html`
		window.modal.close();
	}
}

