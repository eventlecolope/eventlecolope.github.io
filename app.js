// Exemple de données pour les participants et leurs points, avec leurs IDs Discord et avatars
const participants = [
    { name: '🎯MrTraxy🎮', points: 0, discordId: '1078363268185346100', avatar: 'd74f819866fcc276979d97dc77651e10' },
    { name: 'Predator 🗿    ', points: 0, discordId: '1282764464822685707', avatar: '2c89ec4bc293e1e5b0ec14cbabcece2a' },
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

// Fonction pour mettre à jour le compte à rebours
function updateCountdown() {
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(21, 0, 0, 0); // 21h00 aujourd'hui
    
    if (now >= targetTime) {
        document.getElementById('countdown').innerText = "Le challenge a commencé !";
        return;
    }

    const diff = targetTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerText = `Début du challenge dans : ${hours}h ${minutes}m ${seconds}s`;
}

// Mettre à jour le compte à rebours chaque seconde
setInterval(updateCountdown, 1000);
updateCountdown();

// Appel de la fonction pour afficher le classement au chargement de la page
window.onload = function() {
    displayLeaderboard();
    updateCountdown();
};
