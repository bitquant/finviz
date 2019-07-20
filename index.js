'use strict';
const puppeteer = require('puppeteer');

function getTextContent(element) {
    return element.getProperty('textContent').then(property => property.jsonValue());;
}

const getStockData = async (symbol) => {

    // Convert symbols like BRK.B to BRK-B
    symbol = symbol.replace(/\./g, "-");

    const browser = await puppeteer.launch({args: ["--no-sandbox"]});
    const page = await browser.newPage();

    await page.setUserAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3205.0 Safari/537.36");
    await page.setRequestInterception(true);

    page.on('request', (request) => {

        if ((request.resourceType() === 'image') || (request.resourceType() === 'stylesheet')
            || (request.resourceType() === 'font') || (request.resourceType() === 'media')) {
            //console.log("BLOCK: " + request.resourceType() + "@" + request.url());
            request.abort();
        }
        else if ((request.resourceType() === 'script') || (request.resourceType() === 'xhr')) {
            if (request.url().search(/:\/\/.*finviz\.com\//) !== -1) {
                //console.log("ALLOW: " + request.resourceType() + "@" + request.url());
                request.continue();
            }
            else {
                //console.log("BLOCK: " + request.resourceType() + "@" + request.url());
                request.abort();
            }
        }
        else if (request.resourceType() === 'document') {
            //console.log("ALLOW: " + request.resourceType() + "@" + request.url());
            request.continue();
        }
        else {
            //console.log("BLOCK: " + request.resourceType() + "@" + request.url());
            request.abort();
        }
    });

    //page.on('console', msg => console.log('PAGE_LOG:', msg.text));

    try {
        const rsp = await page.goto(`https://finviz.com/quote.ashx?t=${symbol}`);

        const selector = '.snapshot-table2 tbody tr td';
        await page.waitForSelector(selector, { timeout: 9000 });

        let pageData = await page.evaluate(function(symbol) {                       // Line 1
            var tableRoot = document.getElementsByClassName("snapshot-table2");     // Line 2
            var tableBody = tableRoot[0].getElementsByTagName("tbody");             // ....
            var tableRows = tableBody[0].getElementsByTagName("tr");

            var companyData = [];
            for (var idx = 0; idx < tableRows.length; idx++) {
               var tableData = tableRows[idx].getElementsByTagName("td");
               var historyEntry = [];
               for (var jdx = 0; jdx < tableData.length; jdx++) {
                   companyData.push(tableData[jdx].textContent);
               }
            }

            return companyData;
        }, symbol);

        let companyData = { };

        for (let i = 0; i < pageData.length; i+=2) {
            let key = pageData[i];
            let value = pageData[i + 1];

            if (companyData[key] === undefined) {
                companyData[key] = value;
            }
            else {
                companyData[key + " %"] = value;
            }
        }

        browser.close();
        return companyData;
    }
    catch (err) {
        console.error(err.stack ? err.stack : err)
    }

    browser.close();
    throw new Error(`unable to fetch data for ${symbol}`);
};

exports.getStockData = getStockData;
