const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.querySelector('.calculate-btn');
    const viewDetailsBtn = document.querySelector('.view-details');
    const ageInput = document.querySelector('input[placeholder="Edad"]');
    const genderSelect = document.querySelectorAll('select')[0];
    const weightInput = document.querySelector('input[placeholder="Peso (kgs)"]');
    const heightInput = document.querySelector('input[placeholder="Altura (cm)"]');
    const goalSelect = document.querySelectorAll('select')[1];
    const activitySelect = document.querySelectorAll('select')[2];
    const resultDisplay = document.querySelector('.calories');

    let caloriasTotales = 0;
    let goal = '';
    function guardarResultado(usuarioId, calorias, objetivo) {
        ipcRenderer.invoke('guardar-resultado-calorias', usuarioId, calorias, objetivo)
            .then(result => {
                if (result.success) {
                    console.log('Resultado guardado exitosamente');
                } else {
                    console.error('Error al guardar resultado:', result.error);
                }
            })
            .catch(error => console.error('Error en la comunicación:', error));
    }

    function obtenerUsuarioIdActual() {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) {
            console.error('No se encontró el ID del usuario. Asegúrate de que el usuario haya iniciado sesión.');
            return null;
        }
        return parseInt(usuarioId);
    }

    function calcularMacronutrientes(calorias, objetivo) {
        let proteinas, carbohidratos, grasas;
    
        switch(objetivo) {
            case 'perder peso':
                proteinas = calorias * 0.4 / 4;
                carbohidratos = calorias * 0.3 / 4;
                grasas = calorias * 0.3 / 9;
                break;
            case 'mantener peso':
                proteinas = calorias * 0.3 / 4;
                carbohidratos = calorias * 0.4 / 4;
                grasas = calorias * 0.3 / 9;
                break;
            case 'ganar peso':
                proteinas = calorias * 0.25 / 4;
                carbohidratos = calorias * 0.5 / 4;
                grasas = calorias * 0.25 / 9;
                break;
            default:
                throw new Error('Objetivo no reconocido');
        }
    
        return {
            proteinas: Math.round(proteinas),
            carbohidratos: Math.round(carbohidratos),
            grasas: Math.round(grasas)
        };
    }

    calculateBtn.addEventListener('click', function() {
        const age = parseInt(ageInput.value);
        const gender = genderSelect.value;
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
         goal = goalSelect.value;
        const activityLevel = activitySelect.value;

        if (isNaN(age) || isNaN(weight) || isNaN(height) || !goal || !activityLevel) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }

        let bmr;
        if (gender === 'hombre') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender === 'mujer') {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
            alert('Género no reconocido. Usa "hombre" o "mujer".');
            return;
        }

        let activityMultiplier;
        switch(activityLevel) {
            case 'sedentary':
                activityMultiplier = 1.2;
                break;
            case 'light':
                activityMultiplier = 1.375;
                break;
            case 'moderate':
                activityMultiplier = 1.55;
                break;
            case 'active':
                activityMultiplier = 1.725;
                break;
            case 'very active':
                activityMultiplier = 1.9;
                break;
            default:
                alert('Nivel de actividad no reconocido.');
                return;
        }

        let caloricIntake = bmr * activityMultiplier;

        if (goal === 'perder peso') {
            caloricIntake -= 500;
        } else if (goal === 'ganar peso') {
            caloricIntake += 500;
        }
        
        caloriasTotales = Math.round(caloricIntake);
        resultDisplay.textContent = caloriasTotales;
        const usuarioId = obtenerUsuarioIdActual();
        guardarResultado(usuarioId, caloriasTotales, goal);
    });
        viewDetailsBtn.addEventListener('click', function() {
            console.log('Objetivo seleccionado:', goal);
            try {
                const macronutrientes = calcularMacronutrientes(caloriasTotales, goal);
                document.querySelector('.recomendaciones').innerHTML = `
                    <h3>Recomendación de Dieta</h3>
                    <p>Proteínas: ${macronutrientes.proteinas}g</p>
                    <p>Carbohidratos: ${macronutrientes.carbohidratos}g</p>
                    <p>Grasas: ${macronutrientes.grasas}g</p>
                `;
                
            } catch (error) {
                alert(error.message);
            }
        });
    });