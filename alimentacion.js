document.addEventListener('DOMContentLoaded', function() {
   function obtenerDietaParaMeta(meta) {
        const dietas = {
            perdida: {
                Lunes: [
                    { name: 'Desayuno', description: 'Avena con frutas y semillas.', calories: 300 },
                    { name: 'Comida', description: 'Ensalada de pollo con quinoa.', calories: 450 },
                    { name: 'Cena', description: 'Pescado al horno con verduras.', calories: 400 }
                ],
                Martes: [
                    { name: 'Desayuno', description: 'Batido de proteínas con espinacas.', calories: 250 },
                    { name: 'Comida', description: 'Sopa de lentejas y verduras.', calories: 400 },
                    { name: 'Cena', description: 'Pollo a la plancha con brócoli.', calories: 350 }
                ],
                Miercoles: [
                    { name: 'Desayuno', description: 'Tostadas integrales con tomate.', calories: 280 },
                    { name: 'Comida', description: 'Quinoa con verduras asadas.', calories: 420 },
                    { name: 'Cena', description: 'Tortilla de espinacas y champiñones.', calories: 370 }
                ],
                Jueves: [
                    { name: 'Desayuno', description: 'Yogur natural con nueces.', calories: 300 },
                    { name: 'Comida', description: 'Pasta de trigo integral con atún.', calories: 450 },
                    { name: 'Cena', description: 'Ensalada de garbanzos y espinacas.', calories: 380 }
                ],
                Viernes: [
                    { name: 'Desayuno', description: 'Batido de frutas y avena.', calories: 290 },
                    { name: 'Comida', description: 'Pollo al horno con ensalada verde.', calories: 460 },
                    { name: 'Cena', description: 'Salmón a la plancha con espárragos.', calories: 400 }
                ],
                Sabado: [
                    { name: 'Desayuno', description: 'Huevos revueltos con espinacas.', calories: 310 },
                    { name: 'Comida', description: 'Hamburguesa de lentejas con ensalada.', calories: 450 },
                    { name: 'Cena', description: 'Pechuga de pollo con verduras al vapor.', calories: 390 }
                ],
                Domingo: [
                    { name: 'Desayuno', description: 'Porridge de avena y plátano.', calories: 320 },
                    { name: 'Comida', description: 'Ensalada César ligera.', calories: 430 },
                    { name: 'Cena', description: 'Merluza al horno con patatas.', calories: 410 }
                ]
            },
            ganancia: {
                Lunes: [
                    { name: 'Desayuno', description: 'Tostadas con aguacate y huevo.', calories: 400 },
                    { name: 'Comida', description: 'Pasta integral con pollo y brócoli.', calories: 600 },
                    { name: 'Cena', description: 'Carne magra con arroz y frijoles.', calories: 550 }
                ],
                Martes: [
                    { name: 'Desayuno', description: 'Yogur con granola y frutas.', calories: 350 },
                    { name: 'Comida', description: 'Hamburguesa de pavo con ensalada.', calories: 500 },
                    { name: 'Cena', description: 'Salmón al horno con quinoa.', calories: 600 }
                ],
                Miercoles: [
                    { name: 'Desayuno', description: 'Batido de proteínas con avena.', calories: 450 },
                    { name: 'Comida', description: 'Arroz con pollo al curry.', calories: 650 },
                    { name: 'Cena', description: 'Ternera a la plancha con puré de patatas.', calories: 600 }
                ],
                Jueves: [
                    { name: 'Desayuno', description: 'Tortilla de claras con espinacas.', calories: 400 },
                    { name: 'Comida', description: 'Pasta con salsa de tomate y carne.', calories: 700 },
                    { name: 'Cena', description: 'Pollo al horno con batatas.', calories: 650 }
                ],
                Viernes: [
                    { name: 'Desayuno', description: 'Pancakes de avena con miel.', calories: 500 },
                    { name: 'Comida', description: 'Quinoa con pollo y verduras.', calories: 600 },
                    { name: 'Cena', description: 'Pescado al horno con arroz.', calories: 650 }
                ],
                Sabado: [
                    { name: 'Desayuno', description: 'Tostadas francesas con frutas.', calories: 550 },
                    { name: 'Comida', description: 'Ensalada de atún con pasta.', calories: 700 },
                    { name: 'Cena', description: 'Carne asada con patatas.', calories: 700 }
                ],
                Domingo: [
                    { name: 'Desayuno', description: 'Smoothie bowl con frutos secos.', calories: 500 },
                    { name: 'Comida', description: 'Pizza casera con verduras.', calories: 750 },
                    { name: 'Cena', description: 'Pollo a la parrilla con ensalada.', calories: 600 }
                ]
            },
            mantenimiento: {
                Lunes: [
                    { name: 'Desayuno', description: 'Batido de proteínas con frutas.', calories: 350 },
                    { name: 'Comida', description: 'Sándwich de pavo con ensalada.', calories: 450 },
                    { name: 'Cena', description: 'Pollo a la plancha con puré de patatas.', calories: 500 }
                ],
                Martes: [
                    { name: 'Desayuno', description: 'Tortilla de claras con espinacas.', calories: 300 },
                    { name: 'Comida', description: 'Ensalada de atún con garbanzos.', calories: 400 },
                    { name: 'Cena', description: 'Ternera a la plancha con verduras.', calories: 550 }
                ],
                Miercoles: [
                    { name: 'Desayuno', description: 'Yogur con frutas y semillas.', calories: 320 },
                    { name: 'Comida', description: 'Pollo al horno con arroz integral.', calories: 500 },
                    { name: 'Cena', description: 'Pescado a la plancha con ensalada.', calories: 480 }
                ],
                Jueves: [
                    { name: 'Desayuno', description: 'Avena con leche y frutas.', calories: 350 },
                    { name: 'Comida', description: 'Wrap de pollo y verduras.', calories: 450 },
                    { name: 'Cena', description: 'Lasaña de verduras.', calories: 500 }
                ],
                Viernes: [
                    { name: 'Desayuno', description: 'Smoothie de espinacas y plátano.', calories: 300 },
                    { name: 'Comida', description: 'Quinoa con pollo y espárragos.', calories: 480 },
                    { name: 'Cena', description: 'Hamburguesa de pollo con ensalada.', calories: 520 }
                ],
                Sabado: [
                    { name: 'Desayuno', description: 'Tostadas con mantequilla de almendra.', calories: 330 },
                    { name: 'Comida', description: 'Sopa de verduras con pollo.', calories: 450 },
                    { name: 'Cena', description: 'Filete de ternera con patatas.', calories: 550 }
                ],
                Domingo: [
                    { name: 'Desayuno', description: 'Porridge con nueces y miel.', calories: 340 },
                    { name: 'Comida', description: 'Ensalada de quinoa y garbanzos.', calories: 460 },
                    { name: 'Cena', description: 'Pizza de pollo y espinacas.', calories: 500 }
                ]
            }
        };
        return dietas[meta] || {};
    }

    function obtenerDietaParaCalorias(calorias) {
        if (calorias < 2000) {
            return obtenerDietaParaMeta('perdida');
        } else if (calorias <= 2500) {
            return obtenerDietaParaMeta('mantenimiento');
        } else {
            return obtenerDietaParaMeta('ganancia');
        }
    }

    function renderizarTarjetaDieta(dia, comidas) {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'diet-card';
        tarjeta.innerHTML = `<h3>${dia}</h3>`;
        comidas.forEach(comida => {
            const divComida = document.createElement('div');
            divComida.className = 'meal';
            divComida.innerHTML = `
                <strong>${comida.name}</strong>
                <p>${comida.description}</p>
                <span>${comida.calories} Cal</span>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            `;
            tarjeta.appendChild(divComida);
        });
        document.getElementById('diet-plan').appendChild(tarjeta);
    }

    document.querySelectorAll('.dropdown-content a').forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault(); // Evita que el enlace navegue
            const meta = event.target.getAttribute('data-value');
            if (meta) {
                const dieta = obtenerDietaParaMeta(meta);
                actualizarPlanDieta(dieta);
            }
        });
    });

    function actualizarPlanDieta(dieta) {
        const planDieta = document.getElementById('diet-plan');
        planDieta.innerHTML = ''; // Limpiar contenido existente
        Object.keys(dieta).forEach(dia => {
            renderizarTarjetaDieta(dia, dieta[dia]);
        });
        agregarEventosBotones();
    }

    function agregarEventosBotones() {
        const botonesEditar = document.querySelectorAll('.edit');
        const botonesEliminar = document.querySelectorAll('.delete');
        // Implementar lógica para botones
    }

    // Aquí puedes agregar más inicializaciones si es necesario
});