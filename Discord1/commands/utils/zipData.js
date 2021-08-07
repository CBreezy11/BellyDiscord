const zips = {}

zips.FrontRange = [80019, 80040, 80042, 80045, 80102, 80601, 80602, 80022, 80037, 80221, 80229, 80233, 80234, 80260, 80024, 80614, 80640, 80136, 80241, 80137, 80030, 80031, 80035, 80036, 80010, 80011, 80012, 80013, 80014, 80015, 80016, 80017, 80018, 80041, 80044, 80046, 80047, 80103, 80105, 80247, 80110, 80111, 80112, 80113, 80150, 80151, 80155, 80120, 80121, 80122, 80160, 80161, 80165, 80166, 81029, 81064, 81073, 81084, 81087, 81090, 81038, 81044, 81054, 81057, 80510, 80301, 80302, 80303, 80304, 80305, 80306, 80307, 80308, 80309, 80310, 80314, 80025, 80516, 80533, 80455, 80026, 80501, 80502, 80503, 80027, 80540, 80466, 80544, 80471, 80481, 80020, 80023, 80038, 80802, 80810, 80825, 80862, 80436, 80438, 80444, 80452, 80476, 81120, 81124, 81129, 81140, 81141, 81148, 81151, 81123, 81126, 81133, 81138, 81152, 81033, 81062, 81034, 81063, 81076, 81252, 81253, 80201, 80202, 80203, 80204, 80205, 80206, 80207, 80208, 80209, 80210, 80211, 80212, 80216, 80217, 80218, 80219, 80220, 80222, 80223, 80224, 80230,
    80231, 80236, 80237, 80238, 80239, 80243, 80244, 80246, 80248, 80249, 80250, 80251, 80256, 80257, 80259, 80261, 80262, 80263, 80264, 80265, 80266, 80271, 80273, 80274, 80281, 80290, 80291, 80293, 80294, 80299, 80104, 80108, 80109, 80116, 80118, 80125, 80126, 80129, 80130, 80163, 80124, 80131, 80134, 80138, 80135, 80808, 80809, 80901, 80902, 80903, 80904, 80905, 80906, 80907, 80908, 80909, 80910, 80911, 80912, 80913, 80914, 80915, 80916, 80917, 80918, 80919, 80920, 80921, 80922, 80923, 80924, 80925, 80926, 80927, 80928, 80929, 80930, 80931, 80932, 80933, 80934, 80935, 80936, 80937, 80938, 80939, 80941, 80942, 80946, 80947, 80949, 80950, 80951, 80960, 80962, 80970, 80977, 80995, 80997, 80106, 80817, 80819, 80829, 80132, 80133, 80831, 80832, 80833, 80840, 80841, 80864, 80101, 80107, 80117, 80830, 80835, 81212, 81215, 81221, 81222, 81223, 81226, 81290, 81232, 81233, 81240, 81244, 80422, 80427, 80474, 81040, 81055, 81089, 80001, 80002, 80003, 80004, 80005, 80006, 80007, 80021, 80425, 80433, 80214, 80215, 80225, 80226, 80227, 80228, 80232, 80235, 80437, 80439, 80401, 80402, 80403, 80419, 80453, 80454, 80457, 80123, 80127, 80128, 80162, 80465, 80470, 80033, 80034, 81021, 81036, 81045, 81071, 80805, 80807, 80815, 80834, 80836, 80861, 80512, 80513, 80515, 80511, 80517, 80521, 80522, 80523, 80524, 80525, 80526, 80527, 80528, 80553, 80532, 80535, 80536, 80537, 80538, 80539, 80541,
    80545, 80547, 80549, 81020, 81024, 81027, 81046, 81049, 81059, 81081, 81082, 81091, 80804, 80818, 80821, 80823, 80826, 80828, 80722, 80726, 80728, 80736, 80741, 80745, 80747, 80751, 80723, 80701, 80733, 80705, 80649, 80750, 80653, 80654, 81030, 81039, 81050, 81058, 81067, 81077, 81427, 81432, 80721, 80731, 80734, 80746, 81041, 81043, 81047, 81052, 81092, 81022, 81023, 81025, 81019, 81001, 81002, 81003, 81004, 81005, 81006, 81007, 81008, 81009, 81010, 81011, 81012, 81069, 80737, 80744, 80749, 80813, 80814, 80816, 80860, 80863, 80866, 80720, 80801, 80812, 80740, 80743, 80757, 80610, 80611, 80603, 80612, 80514, 80615, 80620, 80520, 80621, 80530, 80622, 80623, 80624, 80631, 80632, 80633, 80634, 80638, 80639, 80729, 80732, 80642, 80534, 80643, 80644, 80645, 80504, 80646, 80542, 80543, 80742, 80648, 80650, 80651, 80652, 80546, 80754, 80550, 80551, 80727, 80735, 80822, 80824, 80755, 80758, 80759];

zips.OtherMountains = [81101, 81102, 81136, 81146, 81121, 81128, 81147, 81157, 81211, 81228, 81227, 81236, 81242, 81201, 80442, 80446, 80447, 80451, 80459, 80468, 80478, 80482, 81235, 80430, 80434, 80473, 80480, 81122, 81301,
    81302, 81303, 81326, 81137, 81329, 81130, 81125, 81132, 81135, 81144, 81154, 80428, 81639, 80467, 80469, 80477, 80487, 80488, 80479, 80483, 81131, 81143, 81149, 81248, 81155, 81433, 81325, 81423, 81426, 81430, 81435];

zips.WesternSlope = [81410, 81413, 81414, 81415, 81416, 81418, 81419, 81420, 81428, 81320, 81324, 81332, 81636, 81647, 81635, 81650, 81652, 81210, 81224, 81225, 81230, 81231, 81237, 81239, 81241, 81243, 81434, 81520, 81624, 81630, 81521, 81522, 81523, 81501, 81502,
    81503, 81504, 81505, 81506, 81507, 81524, 81525, 81643, 81646, 81526, 81527, 81625, 81626, 81610, 81633, 81638, 81640, 81653, 81321, 81323, 81327, 81328, 81330, 81331, 81334, 81335, 81411, 81220, 81401, 81402, 81403, 81422, 81424, 81425, 81429, 81431, 81641, 81648];

zips.Vail = [81620, 80423, 80426, 81631, 81632, 81637, 80463, 81645, 81649, 81657, 81658, 81655, 80429, 80461, 81251,
    80420, 80421, 80432, 80440, 80448, 80820, 80449, 80456, 80827, 80475, 80424, 80435, 80443, 80497, 80498];

zips.Basalt = [81621, 81642];

zips.Carbondale = [81623];

zips.Glenwood = [81601, 81602];

zips.Aspen = [81611, 81612];

zips.Snowmass = [81654, 81615];

zips.WoodyCreek = [81656];

module.exports = zips;
