export const getRegionsByName = (name, regions) => {
    if (!regions || regions.length === 0) {
        return [];
    }
    let regionsFilter = [];
    let i = 0;
    for (i = 0; i < regions.length; i++) {
        const region = regions[i];
        const regionName = region.name;
        if (regionName.indexOf(name) >= 0) {
            regionsFilter.push(region);
            break;
        }
    }
    return regionsFilter;
}