// Exemple de données pour les participants et leurs points
const participants = [
    { name: 'Personne', points: 0 }

];

// Fonction pour trier les participants par points (du plus élevé au plus bas)
participants.sort((a, b) => b.points - a.points);

// Fonction pour afficher le classement
function displayLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.innerHTML = ''; // Vide le tableau existant

    participants.forEach((participant, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.name}</td>
            <td>${participant.points}</td>
        `;
        leaderboard.appendChild(row);
    });
}

// Appel de la fonction pour afficher le classement au chargement de la page
window.onload = displayLeaderboard;
