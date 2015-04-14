/*
    This file is for development only.
    Options added by the user will be stored in an external JSON.
    Load and save functionality to be added.
*/

var categories = {
    'Cooking': {
        color: 'abcdef',
        subjects: {
            'Vegan Recipes': {
                color: 'eeffee'
            },
            'Potatoe Recipes': {
                color: 'ff8811'
            }
        }
    },
    'Driving': {
        color: 'ff00ff',
        subjects: {
            'Cars': {
                color: '445566'
            },
            'Boats': {
                color: '0000FF'
            }
        }
    }
};

module.exports = categories;
