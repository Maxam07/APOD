import express from "express";
import path from "path"; // Import the 'path' module to handle file paths
import axios from "axios";

const app = express();
const port = 3000;

// Use the 'path' module to get the directory name
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Set EJS as view engine
app.set('view engine', 'html');

// API KEY AUTHORIZATION FROM NASA https://api.nasa.gov/
const yourAPIkey = "MUd0cY2A5pCMikTtnb65hAIh24LpPAR4Bdp1H5if";

// API Collection
const Apod_API = "https://api.nasa.gov/planetary/apod?";
const Asteriods_NeoWs_API = "https://api.nasa.gov/neo/rest/v1/feed?";

app.get("/", async (req, res) => {
    try {
        const result = await axios.get(Apod_API + `api_key=${yourAPIkey}`);
        console.log(result.data)
        const finalRes = result.data
        res.render("index.ejs", { 
            title: finalRes.title,
            img: finalRes.hdurl,
            explanation: finalRes.explanation,
            date: finalRes.date,
            copyright: finalRes.copyright,
         });
    } catch (error) {
        const message = "Failed to make request"
        console.error(message);
        res.render("index.ejs", {
          error: message,
        });
    }
})

app.listen(port, () => {
    console.log(`Server Listening to ${port}`)
}) 