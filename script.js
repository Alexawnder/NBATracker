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
                <strong>Player Info:</strong><br>
                Player Name: ${player.first_name} ${player.last_name} <br>
                Height: ${player.height_feet}'${player.height_inches}" <br>
                Position: ${player.position} <br>
                Team: ${player.team.full_name} <br>
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
        
        var recentInfo = document.getElementById("recentInfo");
        recentInfo.innerHTML = `
            <strong>Player Info:</strong><br>
            Average Points Past 5 Games: ${averagePoints} <br>
            Average Rebounds Past 5 Games: ${averageRebounds} <br>
            Average Assists Past 5 Games: ${averageAssists} <br>
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
            <strong>Season Averages:</strong><br>
            Games Played: ${player.games_played} <br>
            Average Minutes In Game: ${player.min} <br>
            Points per Game: ${player.pts} <br>
            Rebounds per Game: ${player.reb} <br>
            Assists per Game: ${player.ast} <br>
            Field Goal Percentage: ${player.fg_pct} <br>
            Three-Point Percentage: ${player.fg3_pct} <br>
            Free Throw Percentage: ${player.ft_pct} <br>
        `;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}