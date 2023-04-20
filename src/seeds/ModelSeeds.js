export const modelS = {
    'model': "Model S",
    'year': [
        2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
    ],
    'trim': [
        '75D',
        '85D',
        '100D',
        'P100D',
        'Long Range',
        'Plaid'
    ],
    'interior': [
        'Black',
        'White',
        'Cream'
    ],
}
export const model3 = {
    'model': "Model 3",
    'year': [
        2017, 2018, 2019, 2020, 2021, 2022, 2023
    ],
    'trim': [
        'Standard Range',
        'Standard Range Plus',
        'Long Range RWD',
        'Long Range AWD',
        'Performance'
    ],
    'interior': [
        'Black',
        'White',
    ],
}
export const modelX = {
    'model': "Model X",
    'year': [
        2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
    ],
    'trim': [
        '75D',
        '85D',
        '100D',
        'P100D',
        'Long Range',
        'Plaid'
    ],
    'interior': [
        'Black',
        'White',
        'Cream'
    ],
}

export const modelY = {
    'model': "Model Y",
    'year': [
        2020, 2021, 2022, 2023
    ],
    'trim': [
        'Standard Range',
        'Long Range',
        'Performance'
    ],
    'interior': [
        'Black',
        'White',
    ],
}

export const allData = [
    {
        'model': "Model S",
        'year': [
            2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
        ],
        'trim': [
            '75D',
            '85D',
            '100D',
            'P100D',
            'Long Range',
            'Plaid'
        ],
        'interior': [
            'Black',
            'White',
            'Cream'
        ],
    },
    {
        'model': "Model 3",
        'year': [
            2017, 2018, 2019, 2020, 2021, 2022, 2023
        ],
        'trim': [
            'Standard Range',
            'Standard Range Plus',
            'Long Range RWD',
            'Long Range AWD',
            'Performance'
        ],
        'interior': [
            'Black',
            'White',
        ],
    },
    {
        'model': "Model X",
        'year': [
            2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023
        ],
        'trim': [
            '75D',
            '85D',
            '100D',
            'P100D',
            'Long Range',
            'Plaid'
        ],
        'interior': [
            'Black',
            'White',
            'Cream'
        ],
    },
    {
        'model': "Model Y",
        'year': [
            2020, 2021, 2022, 2023
        ],
        'trim': [
            'Standard Range',
            'Long Range',
            'Performance'
        ],
        'interior': [
            'Black',
            'White',
        ],
    }]

let allModels = []
let allYears = []
let allTrims = []
let allInteriors = []
let allExteriors = ['Black','White','Gray','Blue','Red']
let allAutopilot = ['None', 'Autopilot', 'Enhanced Autopilot', 'Full Self-Driving'];
let allConditions = ['Excellent', 'Good', 'Fair']
let allTitles = ['Clean','Salvage','Rebuilt']
let allSorts = ['Price','Mileage']
let allOrders = ['Ascending','Descending']
for (let a of allData) {
    if (!allModels.includes(a.model)) {
        allModels.push(a.model)
    }
    for (let y of a.year) {
        !allYears.includes(y) && allYears.push(y)
    }
    for (let t of a.trim) {
        !allTrims.includes(t) && allTrims.push(t)
    }
    for (let int of a.interior) {
        !allInteriors.includes(int) && allInteriors.push(int)
    }
}
export const defaultFilters = {
    models: allModels,
    years: allYears,
    trims: allTrims.sort(),
    exteriors: allExteriors,
    interiors: allInteriors,
    autopilots: allAutopilot,
    conditions: allConditions,
    titles: allTitles,
    sorts: allSorts,
    orders: allOrders
}