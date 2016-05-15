'use strict';

app.movies = kendo.observable({
    onShow: function () {
    },
    afterShow: function () {
    }
});

(function () {
    var dataSource = new kendo.data.DataSource({
        data: [{
            id: 1,
            title: "Jungle Book"
        },
        {
            id: 2,
            title: "Batman Vs Superman"
        }]
    })

    app.movies.set('dataSource', dataSource);
})();