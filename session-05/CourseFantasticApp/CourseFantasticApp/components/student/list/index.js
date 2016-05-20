'use strict';
(function () {
    var viewModel = kendo.observable({
        onShow: function () {
            //debugger;
            var data;
        
            var db = app.db;
            db.transaction(function (tx) {
                tx.executeSql("Select * From Student", [], function (tx,resultSet) {
                    debugger;
                    var student = resultSet.rows[0];
                    dataSource.add(student);
                }, function (tx, error) {
                    //debugger;
                });
            });
        },
            afterShow: function(){}
        });

    var dataSource = new kendo.data.DataSource({
        
        schema: {
            model: {
                id: "Id"
            }
        }
    });

    app.students = viewModel;

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