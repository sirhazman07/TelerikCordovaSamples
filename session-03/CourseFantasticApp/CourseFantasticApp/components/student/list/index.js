'use strict';

app.students = kendo.observable({
    onShow: function () { },
    afterShow: function () { }
});

(function () {
    var dataSource = new kendo.data.DataSource({
        data: [
            { id: 1, firstName: "John", lastName: "Smith" },
            { id: 2, firstName: "Joe", lastName: "Bloggs" }
        ],
        schema: {
            model: {
                id: "id"
            }
        }
    });

    app.students.set('data', dataSource);
})();

app.studentDetails = kendo.observable({
    onShow: function (event) {
        var dataSource = app.students.get('data');
        var student = dataSource.get(event.view.params.id);
        app.studentDetails
            .set('fullName', student.lastName + ', ' + student.firstName);
    },
    afterShow: function () { }
});