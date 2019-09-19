const year = [{
    nameOfeSeason: 'summer',
    month: [6,7,8]
}, {
    nameOfSeason: 'autumn',
    month:  [9,10,11]
}, {
    nameOfSeason: 'spring',
    month:  [3,4,5]
}, {
    nameOfSeason: 'winter',
    month:  [12,1,2]
}];

const seasons = function(numberOfMonth) {
    for (const i of year) {
        for (const number of i.month) {
            if (number === numberOfMonth) {
                return i.nameOfSeason;
            }
        }
    }
};

console.log(seasons(5));