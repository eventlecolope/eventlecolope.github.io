// Définition des données JSON directement dans le code
const data = {
    "participants": [
        { name: '🎯MrTraxy🎮', points: 0, discordId: '1078363268185346100', avatar: 'd74f819866fcc276979d97dc77651e10', tasksCompleted: [] },
        { name: 'Predator 🗿', points: 0, discordId: '1282764464822685707', avatar: '2c89ec4bc293e1e5b0ec14cbabcece2a', tasksCompleted: [] },
        { name: '🕶 AMZ Astrasec', points: 0, discordId: '829653469886414868', avatar: '0e3106976755d83d7990ddb7acf664b3', tasksCompleted: [] },
        { name: 'LeLe', points: 0, discordId: '1249271545025663099', avatar: 'ccb631dcbb19cd537764543858f191c9', tasksCompleted: [] },
    ],
    "tasks": [
        { "description": "Faire un kill avec chaque rareté d'arme en une seule game", "points": 15 },
        { "description": "Poster un screenshot du plus beau skin combo", "points": 10 },
        { "description": "Survivre 5 minutes sans tirer une seule balle (+10 points)", "points": 10 },
        { "description": "Gagner une game en restant full camouflage (bush, ombre, etc.)", "points": 20 }
    ]
};

// Variables globales pour les participants et les tâches
let participants = data.participants; 
let tasks = data.tasks;

let isAdmin = false; // Statut d'admin

// Fonction pour afficher ou masquer le panel modo
function toggleAdminPanel() {
    document.getElementById('admin-panel').style.display = isAdmin ? 'block' : 'none';
    document.getElementById('admin-btn').style.display = isAdmin ? 'none' : 'inline-block'; // Masquer le bouton admin si déjà connecté
}

// Fonction pour se connecter en tant que modo
function loginAsAdmin() {
    const password = prompt("Entrez le mot de passe admin :");
    if (password === "admin123") { // Modifier ce mot de passe en prod
        isAdmin = true;
        toggleAdminPanel();
        enableResetButton(); // Activer le bouton de réinitialisation
    } else {
        alert("Mot de passe incorrect !");
    }
}

// Fonction pour activer le bouton de réinitialisation
function enableResetButton() {
    const resetButton = document.getElementById('reset-scores-btn');
    if (resetButton) {
        resetButton.disabled = false; // Rendre le bouton cliquable
    }
}

// Fonction pour valider une tâche et ajouter des points
function validateTask(discordId, taskIndex) {
    const participant = participants.find(p => p.discordId === discordId);
    if (!participant) return;
    
    // Si la tâche a déjà été validée, on ne fait rien
    if (participant.tasksCompleted.includes(taskIndex)) {
        alert("Cette tâche a déjà été validée !");
        return;
    }

    // Ajouter les points à l'utilisateur
    participant.points += tasks[taskIndex].points;

    // Ajouter la tâche dans la liste des tâches validées
    participant.tasksCompleted.push(taskIndex);

    // Mettre à jour l'affichage du classement et des tâches
    displayLeaderboard();
    displayTasks();
}

// Fonction pour afficher les tâches en attente
function displayTasks() {
    const taskList = document.getElementById('task-list');
    if (!taskList) return;
    taskList.innerHTML = ''; // Vider les tâches existantes

    participants.forEach(participant => {
        const participantSection = document.createElement('div');
        participantSection.classList.add('participant-tasks');
        participantSection.innerHTML = `<h3>${participant.name}</h3>`;

        tasks.forEach((task, index) => {
            const isCompleted = participant.tasksCompleted.includes(index);
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <p>${task.description} (+${task.points} points)</p>
                <button onclick="validateTask('${participant.discordId}', ${index})" ${isCompleted ? 'disabled' : ''}>
                    ${isCompleted ? 'Validé ✅' : 'Valider'}
                </button>
            `;
            participantSection.appendChild(taskItem);
        });

        taskList.appendChild(participantSection);
    });
}

// Fonction pour afficher le classement
function displayLeaderboard() {
    const leaderboard = document.getElementById('leaderboard').getElementsByTagName('tbody')[0];
    if (!leaderboard) return;
    leaderboard.innerHTML = ''; // Vider le tableau existant

    participants.sort((a, b) => b.points - a.points); // Trier les participants par points

    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>
                <a href="https://discord.com/users/${participant.discordId}" target="_blank">
                    <img src="https://cdn.discordapp.com/avatars/${participant.discordId}/${participant.avatar}.webp?size=64" alt="Avatar de ${participant.name}" class="avatar">
                    ${participant.name}
                </a>
            </td>
            <td>${participant.points}</td>
            <td>
                <a href="https://discord.com/users/${participant.discordId}" target="_blank">Voir Profil</a>
            </td>
        `;
        leaderboard.appendChild(row);
    });
}

// Fonction pour réinitialiser les scores
function resetScores() {
    participants.forEach(participant => {
        participant.points = 0; // Remettre les points à 0
        participant.tasksCompleted = []; // Réinitialiser les tâches complétées
    });

    // Mettre à jour l'affichage du classement et des tâches
    displayLeaderboard();
    displayTasks();
}

// Ajouter un événement au bouton de réinitialisation
document.getElementById('reset-scores-btn').addEventListener('click', resetScores);

// Fonction pour afficher le compte à rebours
function updateCountdown() {
    const countdown = document.getElementById('countdown');
    if (!countdown) return;
    
    const now = new Date();
    const targetTime = new Date();
    targetTime.days(7, 0, 0, 0);
    
    if (now >= targetTime) {
        countdown.innerText = "Challenge | SEM.1 Finit";
        return;
    }

    function updateCountdown() {
        const countdown = document.getElementById('countdown');
        if (!countdown) return;
        
        const now = new Date();
        
        // Définir la date cible, qui est 7 jours à partir de maintenant
        const targetTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 jours en millisecondes
        
        const diff = targetTime - now;
        
        // Calculer le nombre de jours restants
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
        countdown.innerText = `Fin du challenge dans : ${days}j ${hours}h ${minutes}m ${seconds}s`;
    
        // Si le temps est écoulé, afficher un message
        if (diff <= 0) {
            countdown.innerText = "Le challenge est terminé !";
        }
    }
    
    // Mettre à jour les affichages au chargement de la page
    window.onload = function() {
        displayLeaderboard();
        displayTasks();
        updateCountdown();
        toggleAdminPanel();
        setInterval(updateCountdown, 1000); // Mettre à jour le timer chaque seconde
    };
}