document.getElementById('muscle-group').addEventListener('change', function() {
    const muscleGroup = this.value;
    if (muscleGroup) {
        const exercises = getExercisesForMuscle(muscleGroup);
        updateExerciseList(exercises);
    }
});

function getExercisesForMuscle(muscle) {
    const exercises = {
        pecho: [
            { name: 'Press Banca', description: 'Ejercicio para desarrollar el pecho superior.', image: '../imagenes/pressbanca.jpg' },
            { name: 'Aperturas En Máquina', description: 'Aperturas para trabajar el pecho medio.', image: '../imagenes/aperturas.jpg' },
            { name: 'Press Inclinado Con Mancuernas', description: 'Ejercicio para desarrollar el pecho superior', image: '../imagenes/pressinclinado.jpg' }
        ],
        espalda: [
            { name: 'Dominadas', description: 'Ejercicio para fortalecer la espalda y bíceps.', image: '../imagenes/dominadas.jpg' },
            { name: 'Remo En Máquina', description: 'Trabaja la parte media de la espalda.', image: '../imagenes/remo3.jpg' },
            { name: 'Peso Muerto', description: 'Ejercicio compuesto para la espalda baja.', image: '../imagenes/pesomuerto.jpg' }
        ],
        piernas: [
            { name: 'Sentadillas', description: 'Ejercicio fundamental para piernas y glúteos.', image: '../imagenes/sentadilla.jpg' },
            { name: 'Femoral En Máquina', description: 'Ejercicio para femoral.', image: '../imagenes/femoral.jpg' },
            { name: 'Extensión De Cuádriceps', description: 'Ejercicio para cuádriceps.', image: '../imagenes/cuadriceps.jpg' }
        ],
        biceps: [
            { name: 'Curl De Bíceps', description: 'Ejercicio para desarrollar los bíceps.', image: '../imagenes/curlbiceps.jpg' },
            { name: 'Curl Martillo', description: 'Ejercicio para fortalecer los bíceps.', image: '../imagenes/martillo.jpg' }
        ],
        triceps: [
            { name: 'Curl Francés Con Barra', description: 'Ejercicio para trabajar los tríceps.', image: '../imagenes/curlfrances.jpg' },
            { name: 'Tríceps En Polea', description: 'Ejercicio para tríceps.', image:'../imagenes/triceps_polea.jpg' }
        ],
        hombros: [
            { name: 'Press Militar Con Mancuernas', description: 'Ejercicio para fortalecer los hombros.', image: '../imagenes/pressmilitar.jpg' },
            { name: 'Elevaciones Laterales', description: 'Ejercicio para el deltoides lateral.', image: '../imagenes/elevaciones.jpg' }
        ]
    };
    return exercises[muscle] || [];
}

function updateExerciseList(exercises) {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';
    exercises.forEach(exercise => {
        const exerciseItem = document.createElement('div');
        exerciseItem.classList.add('exercise-item');

        const exerciseName = document.createElement('h3');   
        exerciseName.textContent = exercise.name;
        exerciseItem.appendChild(exerciseName);

        const exerciseDescription = document.createElement('p');
        exerciseDescription.textContent = exercise.description;
        exerciseItem.appendChild(exerciseDescription);

        const exerciseImage = document.createElement('img');
        exerciseImage.src = exercise.image;
        exerciseImage.alt = exercise.name;
        exerciseItem.appendChild(exerciseImage);

        exerciseList.appendChild(exerciseItem);
    });
}

