const puppeteer = require('puppeteer');
const zipLogic = require('./utils/zipLogic');
const sendSite = require('./utils/webflow');

module.exports = {
    name: 'seezip',
    description: '!seezip',
    async execute(message, args) {

        var final = {
            show: args[0],
            date: args[1],
            total: 0,
            zipData: []
        };

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://manage.seetickets.us/wafform.aspx?_act=signinpage&uri=https%3a%2f%2fmanage.seetickets.us%2fwafform.aspx%3f_act%3ddashboard');

        await page.type('#login_pageV3_R1_Email', 'Manager@bellyupaspen.com');
        await page.type('#login_pageV3_R1_Password', 'WELCOME');

        await page.click('#cbhref');

        await page.waitForNavigation();

        await page.type('#EventNameSearch', args[0]);

        await page.evaluate(() => {
            document.querySelector('#MyEventBoxClient_cd > div.box.box-tab.my-event-box > div.info-box > form > div.info-box-search-box-full.float-r > fieldset > button').click();
        });

        await page.waitForNavigation();


        var list = await page.evaluate(() => {
            var list = document.querySelector('#MyEventBoxClient_cd > div.box.box-tab.my-event-box > ul');
            var shows = Array.from(list.children)
            var results = shows.map(show => {
                var date = show.querySelector('.date-total.column.float-l').textContent.split(' ')[0];
                var bill = '#MyEventBoxClient_cd > div.box.box-tab.my-event-box > ul > li > div.event.column.float-l.blue-strong > a';
                var total = document.querySelector('#MyEventBoxClient_cd > div.box.box-tab.my-event-box > ul > li > div.tix-total.column.float-l').textContent.trim();
                return {
                    date,
                    bill,
                    total,
                }
            });
            return results

        }, args[1]);

        for (show of list) {
            if (show.date == args[1]) {
                final.total += Number(show.total)
                await page.evaluate((show) => document.querySelector(show.bill).click(), show);
            };
        };

        await page.waitForNavigation();

        await page.evaluate(() => {
            document.querySelector('#main > div.left-main.col-m-r.col3 > nav > ul:nth-child(10) > li:nth-child(1) > a').click();
        });

        await page.waitForNavigation();

        await page.evaluate(() => {
            document.querySelector('#ajaxcontainer > div.box-container > ul > li:nth-child(4) > a').click();
        });

        await page.waitForNavigation();

        await page.waitForSelector('#ajaxcontainer > div:nth-child(20) > a > span')
        await page.click('#ajaxcontainer > div:nth-child(20) > a > span');

        final.zipData = await page.evaluate(() => {
            var zipRows = Array.from(document.querySelectorAll('#t8r1 > td > div > table > tbody > tr'));
            var data = zipRows.map(td => {
                var entries = Array.from(td.querySelectorAll('td'));
                return entries.map(a => a.textContent)
            })
            return data
        })
        await browser.close();
        const totals = await zipLogic(final);
        msg = '';
        for (zip in totals) {
            if (totals[zip].tix != undefined) {
                msg += `${zip.toUpperCase()}\tTickets: ${totals[zip].tix}\tPercent: ${totals[zip].percent}\n`;
            }
        };
        message.channel.send(msg);
        sendSite(totals);
    }
};




