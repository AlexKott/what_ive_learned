/*
    This file is for development only.
    Options added by the user will be stored in an external JSON.
    Load and save functionality to be added.
*/

var events = {
    20140410: {
        primary: {
            isMilestone: true,
            category: 'Cooking',
            subject: 'Vegan Recipes',
            description: 'I learned to cook flowers'
        }
    },
    20150413: {
        primary: {
            isMilestone: false,
            category: 'Driving',
            subject: 'Boats',
            description: 'I am sailing....'
        },
        secondary: {
            isMilestone: false,
            category: 'Driving',
            subject: 'Boats',
            description: 'Water is wet...'
        }

    }
};

module.exports = events;
