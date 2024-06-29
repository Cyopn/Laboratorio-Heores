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
	if (window.location.href.includes("user")) {
		const user = JSON.parse(localStorage.getItem("user"))
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://127.0.0.1:4000/getSelfUser/" + user.id);
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
	if (window.location.href.includes("lend")) {
		const xhttp = new XMLHttpRequest();
		xhttp.open("GET", "http://127.0.0.1:4000/getInputs/");
		xhttp.send();
		xhttp.onreadystatechange = function () {
			const response = JSON.parse(this.responseText);
			if (this.readyState == 4 && this.status == 200) {
				const data = response.result;
				const select=document.getElementById("sel");
				select.innerHTML = `<option value="selo">Selecciona un equipo</option>`;
				data.forEach(element => {
					if(element.estado === "prestado" || element.estado === "mantenimiento")return
					if(select.innerHTML.includes(element.nombre))return
					select.innerHTML += `<option value="${element.clave}">${element.nombre}</option>`;
				});
				document.getElementsByClassName("loader-background")[0].style["display"] = "none";
			}
		}
	}
})

function closeModal(location) {
	console.log(location)
	if (location === "none") {
		window.modal.close();
	} else {
		window.location.href = `../${location}.html`
		window.modal.close();
	}
}

