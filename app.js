const axios = require('axios');
const cheerio = require('cheerio');

async function getPlayerImageURL() {
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://www.nba.com/search?filters=player&q=$Anthony%20Davis",
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

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
