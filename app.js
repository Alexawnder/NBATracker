const axios = require('axios');
const cheerio = require('cheerio');

async function getPlayerImageURL() {
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.espn.com/nba/boxscore/_/gameId/401585106",
    });

    await new Promise(resolve => setTimeout(resolve, 8000));
    
    console.log(axiosResponse.data);
    const $ = cheerio.load(axiosResponse.data);
    const imageURL = [];
    $(".PlayerImage_image__wH_YX.SearchResultsPlayer_srpPlayer__AsmDy").each((index, element) => {
        const img = $(element).attr("src");
        console.log(img);
        imageURL.push(img);
    });

    console.log(imageURL);

}

getPlayerImageURL();