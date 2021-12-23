//jshint esversion: 6

const PORT = 3000;

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const { response } = require('express');

const app = express();
let url = "https://www.theguardian.com/"
axios(url)
     .then(response => {
        const html = response.data
        //console.log(html);
        const timz = cheerio.load(html)
        const sections = [];


        timz('.fc-item__title', html).each(function(){
            const title = timz(this).text();
            const url = timz(this).find('a').attr('href');
            sections.push({
                title,
                url
            })
        });
        console.log(sections);
     }).catch(err => console.log(err));

app.listen(PORT, ()=> console.log(`Server running on Port ${PORT}`));