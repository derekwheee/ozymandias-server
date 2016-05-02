import Ember from 'ember';

var data = {
    labels: ['1:00', '2:00', '3:00', '4:00', '5:00', '6:00'],
    datasets: [
        {
            label: 'Living Room',
            data: [
                69.4,
                68.3,
                70.1,
                75.9,
                55.4,
                66.6
            ]
        },
        {
            label: 'Garage',
            data: [
                55.2,
                58.4,
                60.2,
                60.4,
                60.3,
                55.9
            ]
        },
    ]
};

export default Ember.Route.extend({
    model() {
        return data;
    }
});
