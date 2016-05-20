'use strict';

(function () {
    var validator;

    //we get and use the validator to check the fields on the Form / or View Model

    var viewModel = kendo.observable({
        onShow: function () {
            validator = $("#create").kendoValidator().data('kendoValidator');
        },
        afterShow: function () { },
        createStudent: function () {
            if (!validator.validate()) {
                return false;
            }

            dbAddStudent(
                viewModel.get('firstName'),
                viewModel.get('LaststName'),
                viewModel.get('studentId'),
                viewModel.get('email'),
                viewModel.get('mobile')
                );
        }
    });

    

    //Create a student on DB function
    var dbAddStudent = function (firstName, lastName, studentId, email, mobile) {
        var db = app.db;
        db.transaction(function (tx) {
            tx.executeSql("INSERT INTO Student(FirstName , LastName, StudentId, Email, Mobile) " +
                //" Values ('John','Smith', '12455875', 'johnsmith@google.com', '0402125487802')", [])
                "Values (?,?,?,?,?)", [firstName, lastName, studentId, email, mobile],
                function (tx, resultSet) {
                    //debugger;
                    app.mobileApp.navigate('components/student/list/view.html');
                },
                function (tx, error) {
                    //debugger;
                });
        });
    }

    app.cstudent = viewModel;


})();