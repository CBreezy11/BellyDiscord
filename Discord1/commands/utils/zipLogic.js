const zips = require('./zipData');

const zipLogic = async (data) => {
    const totals = {
        aspen: {
            tix: 0,
            percent: ''
        },
        basalt: {
            tix: 0,
            percent: ''
        },
        carbondale: {
            tix: 0,
            percent: ''
        },
        frontrange: {
            tix: 0,
            percent: ''
        },
        glenwood: {
            tix: 0,
            percent: ''
        },
        other: {
            tix: 0,
            percent: ''
        },
        snowmass: {
            tix: 0,
            percent: ''
        },
        vail: {
            tix: 0,
            percent: ''
        },
        western: {
            tix: 0,
            percent: ''
        },
        woody: {
            tix: 0,
            percent: ''
        },
        rfv: {
            tix: 0,
            percent: ''
        },
        Colorado: {
            tix: 0,
            percent: ''
        },
        Colorado: {
            tix: 0,
            percent: ''
        },
        aspen_to_snowmass: {
            tix: 0,
            percent: ''
        },
        basalt_to_glenwood: {
            tix: 0,
            percent: ''
        },
        rfv: {
            tix: 0,
            percent: ''
        },
        out_of_state: {
            tix: 0,
            percent: ''
        }
    };

    data.zipData.forEach((zip) => {
        if (zips.Aspen.includes(Number(zip[2]))) {
            totals.aspen.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.Basalt.includes(Number(zip[2]))) {
            totals.basalt.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.Carbondale.includes(Number(zip[2]))) {
            totals.carbondale.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.FrontRange.includes(Number(zip[2]))) {
            totals.frontrange.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.Glenwood.includes(Number(zip[2]))) {
            totals.glenwood.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.OtherMountains.includes(Number(zip[2]))) {
            totals.other.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.Snowmass.includes(Number(zip[2]))) {
            totals.snowmass.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.Vail.includes(Number(zip[2]))) {
            totals.vail.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.WesternSlope.includes(Number(zip[2]))) {
            totals.western.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        } else if (zips.WoodyCreek.includes(Number(zip[2]))) {
            totals.woody.tix += Number(zip[3])
            totals.Colorado.tix += Number(zip[3])
        }

    });
    totals.aspen_to_snowmass.tix = totals.aspen.tix + totals.snowmass.tix + totals.woody.tix;
    totals.basalt_to_glenwood.tix = totals.basalt.tix + totals.carbondale.tix + totals.glenwood.tix
    totals.rfv.tix = totals.aspen_to_snowmass.tix + totals.basalt_to_glenwood.tix
    totals.out_of_state.tix = data.total - totals.Colorado.tix;
    totals.show = data.show;
    totals.date = data.date;
    for (reg in totals) {
        if (reg != 'show' || reg != 'date') {
            totals[reg].percent = `${Math.floor((totals[reg].tix / data.total) * 100)}%`
        }
    }
    return totals;

}

module.exports = zipLogic;