const puppeteer = require('puppeteer');

module.exports = {
    name: 'tix',
    description: '!tix',
    async execute(message, args) {

        var showData = {
            show: '',
            date: args[1],
            gaSold: 0,
            gaScanned: 0,
            resSold: 0,
            resScanned: 0
        };

        const browser = await puppeteer.launch({ args: [`--no-sandbox`] });
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://manage.seetickets.us/wafform.aspx?_act=signinpage&uri=https%3a%2f%2fmanage.seetickets.us%2fwafform.aspx%3f_act%3ddashboard');

        await page.type('#login_pageV3_R1_Email', '');
        await page.type('#login_pageV3_R1_Password', '');

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
                var show = document.querySelector('#MyEventBoxClient_cd > div.box.box-tab.my-event-box > ul > li > div.event.column.float-l.blue-strong > a').textContent.trim();
                return {
                    date,
                    bill,
                    show
                }
            });
            return results

        }, formData.date);

        for (show of list) {
            if (show.date == formData.date) {
                showData.show = show.show;
                await page.evaluate((show) => document.querySelector(show.bill).click(), show);
            };
        };

        await page.waitForNavigation();

        await page.evaluate(() => {
            document.querySelector('#main > div.left-main.col-m-r.col3 > nav > ul:nth-child(10) > li:nth-child(1) > a').click();
        });

        await page.waitForNavigation();

        await page.evaluate(() => {
            document.querySelector('#ajaxcontainer > div.box-container > ul > li:nth-child(5) > a').click();
        });

        await page.waitForNavigation();

        let eventId = page.url().split('pky=', 2)[1];

        await page.goto(`https://manage.seetickets.us/wafform.aspx?_act=save&_tab=Event&_for=EventStatsV3Reports&_pky=${eventId}&EventStatsV3Reports_R1_FullStats=&EventStatsV3Reports_R1_HideFacilityFees=&EventStatsV3Reports_R1_DateStart=4%2F19%2F2020&EventStatsV3Reports_R1_DateEnd=7%2F21%2F2026&EventStatsV3Reports_R1_ReportType=Current+Scan+Status+Per+Ticket&EventStatsV3Reports_R1_ReportFormat=html`)
        showData.data = await page.evaluate(() => {
            var buyerRows = Array.from(document.querySelectorAll('#table0 > table > tbody > tr'));
            var data = buyerRows.map(td => {
                var entries = Array.from(td.querySelectorAll('td'));
                return entries.map(a => a.textContent)
            })
            return data
        })
        showData.data.forEach(entry => {
            if (entry[4] != undefined) {
                if (entry[4].trim() == 'GA') {
                    if (entry[2].trim().split(':')[0] == 'GA') {
                        showData.gaSold += 1;
                        if (entry[7].trim() == 'Yes') {
                            showData.gaScanned += 1;
                        }
                    } else if (entry[2].trim().split(':')[0] == 'RES') {
                        showData.resSold += 1;
                        if (entry[7].trim() == 'Yes') {
                            showData.resScanned += 1;
                        }
                    }
                }
            }
        })
        await browser.close();
        const msg = `${data.show}\n${data.date}\nGA SOLD: ${data.gaSold}\nGA SCANNED: ${data.gaScanned}\nRES SOLD: ${data.resSold}\nRES SCANNED: ${data.resScanned}`
        message.channel.send(msg);
    }
};
