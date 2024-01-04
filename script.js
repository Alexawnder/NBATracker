async function showInfo(){
    var playerName = document.getElementById('search-bar').value;
    var playerID = "0"
    await fetch('https://www.balldontlie.io/api/v1/players?search=' + playerName)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the data
        var userInfo = document.getElementById("playerInfo");

        if (data.data.length > 0) {
            var player = data.data[0];
            playerID = player.id;
            getPlayerStats(playerID);
            displayStats(playerID);
            // Display specific information in the user interface
            userInfo.innerHTML = `
                <strong>Player ID:</strong> ${player.id} <br>
                <strong>Player Name:</strong> ${player.first_name} ${player.last_name} <br>
                <strong>Height:</strong> ${player.height_feet}'${player.height_inches}" <br>
                <strong>Position:</strong> ${player.position} <br>
                <strong>Team:</strong> ${player.team.full_name} <br>
            `;
        } else {
            userInfo.textContent = 'No player found.';
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function getPlayerStats(playerID) {
    await fetch('https://www.balldontlie.io/api/v1/stats?seasons[]=2023&page=2&player_ids[]=' + playerID)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const recentGames = data.data.slice(-5); 
        const totalPoints = recentGames.reduce((sum, game) => sum + game.pts, 0);
        const averagePoints = totalPoints / recentGames.length;
        const totalRebounds = recentGames.reduce((sum, game) => sum + game.reb, 0);
        const averageRebounds = totalRebounds / recentGames.length;
        const totalAssists = recentGames.reduce((sum, game) => sum + game.ast, 0);
        const averageAssists = totalAssists / recentGames.length;
        const totalMin = recentGames.reduce((sum, game) => sum + parseInt(game.min,10), 0);
        const averageMin = totalMin / recentGames.length;
        const totalThrees = recentGames.reduce((sum, game) => sum + game.fg3m, 0);
        const averageThrees = totalThrees / recentGames.length;
        
        var recentInfo = document.getElementById("recentInfo");
        recentInfo.innerHTML = `
            <strong>Avg Mins Past 5 Games:</strong> ${averageMin} <br>
            <strong>Avg Pts Past 5 Games:</strong> ${averagePoints} <br>
            <strong>Avg Rebounds Past 5 Games:</strong> ${averageRebounds} <br>
            <strong>Avg Assists Past 5 Games:</strong> ${averageAssists} <br>
            <strong>Avg Threes Past 5 Games:</strong> ${averageThrees} <br>
        `;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

async function displayStats(playerID){
    await fetch('https://www.balldontlie.io/api/v1/season_averages?seasons[]=2023&player_ids[]=' + playerID)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var statInfo = document.getElementById("statInfo");
        var player = data.data[0];
        statInfo.innerHTML = `
            <strong>Games Played:</strong> ${player.games_played} <br>
            <strong>Average Minutes In Game:</strong> ${player.min} <br>
            <strong>Points per Game:</strong> ${player.pts} <br>
            <strong>Rebounds per Game:</strong> ${player.reb} <br>
            <strong>Assists per Game:</strong> ${player.ast} <br>
            <strong>Field Goal Percentage:</strong> ${player.fg_pct} <br>
            <strong>Three-Point Percentage:</strong> ${player.fg3_pct} <br>
            <strong>Free Throw Percentage:</strong> ${player.ft_pct} <br>
        `;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}