/*
    This file is for development only.
    Options added by the user will be stored in an external JSON.
    Load and save functionality to be added.
*/

var categories = {
    'Cooking': {
        color: 'rgb(180,200,50)',
        subjects: {
            'Vegan Recipes': {
                color: 'rgb(10,210,180)'
            },
            'Potato Recipes': {
                color: 'rgb(20,250,50)'
            }
        }
    },
    'Driving': {
        color: 'rgb(120,200,100)',
        subjects: {
            'Cars': {
                color: 'rgb(120,200,100)'
            },
            'Boats': {
                color: 'rgb(120,200,100)'
            }
        }
    }
};

module.exports = categories;
