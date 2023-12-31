function showInfo(){
    var playerName = document.getElementById('playerNameInput').value;
    var playerID = "0"
    fetch('https://www.balldontlie.io/api/v1/players?search=' + playerName)
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
            displayStats(playerID);
            // Display specific information in the user interface
            userInfo.innerHTML = `
                <strong>Player Info:</strong><br>
                Player ID: ${playerID} <br>
                Player Name: ${player.first_name} ${player.last_name} <br>
                Height: ${player.height_feet}'${player.height_inches}" <br>
                Position: ${player.position} <br>
                Team: ${player.team.full_name} <br>
                Weight: ${player.weight_pounds} pounds <br>
            `;
        } else {
            userInfo.textContent = 'No player found.';
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function displayStats(playerID){
    fetch('https://www.balldontlie.io/api/v1/season_averages?seasons[]=2023&player_ids[]=' + playerID)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Process the data
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