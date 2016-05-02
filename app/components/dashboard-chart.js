import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'canvas',
    setup: false,

    /**
    * Construction handler
    * This will create the canvas and check the given
    * input values since Chart.js can react pretty odd
    * when getting wrong and/or missing values.
    */
    didInsertElement: function(){
        var canvas  = this.get('element');
        var context = canvas.getContext('2d');

        canvas.width  = this.get('width') || $(canvas).parent().width();
        canvas.height = this.get('height') || $(canvas).parent().height();

        var data = this.get('data');
        var type = this.get('type') || 'line';
        if(!type.match(/(line|bar|radar|polarArea|pie|doughnut)/)) type = 'line';
        var options = (this.get('options') !== undefined) ? this.get('options') : {};

        this.setProperties({
            '_data': data,
            '_type': type,
            '_canvas':  canvas,
            '_context': context,
            '_options': options
        });
        this.chartRender();
    },

    /**
    * Render the chart to the canvas
    * This function is separated from the event hook to
    * allow data overwriting which more or less results
    * in updating the chart.
    */
    chartRender: function(){
        var chart = this.get('_chart');
        if (chart !== undefined) {
            chart.destroy();
        }

        chart = new Chart(this.get('_context'), {
            type: this.get('_type'),
            data: this.get('_data'),
            options: this.get('_options')
        });

        this.setProperties({
            '_chart': chart,
            'setup': true
        });
    },

    /**
    * Chart Update Handler
    * This will re-render the chart whenever its data or
    * options changes, if the 'update' property is set to true
    */
    chartUpdate : function() {
        if (this.get('update') === true && this.get('setup') === true) {
            this.setProperties({
                '_data' : this.get('data'),
                '_options' : this.get('options')
            });
            this.chartRender();
        }
    }.observes('data', 'options')
});
