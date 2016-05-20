'use strict';

// This is a self-executing anonymous function
(function() {
    var app = {
        data: {}
    };

    // This 'bootstrap' variable contains a reference to a function
    var bootstrap = function () {
        // Here we add a handler to the document's ready event, to initialize
        // our app
        $(document).ready(function() {
            app.mobileApp = new kendo.mobile.Application(document.body, {
                transition: 'slide',
                skin: 'nova',
                initial: 'components/student/create/view.html'
            });
        });
    };
    //initialize structure of database
    var dbInit = function () {
        var db = app.db;
        db.transaction(function (tx) {
            //debugger;
            tx.executeSql("CREATE TABLE IF NOT EXISTS Student(Id integer primary key asc, " +
                "FirstName varchar(250), LastName varchar(250), StudentId char(8), Email varchar(250), " +
                "Mobile char(12))", []);
        });
    };
        
    if (window.cordova) {
        document.addEventListener('deviceready', function () {
            //Check to see if the phone is in simulator mode or if its using the sql simulator
            //debugger;
            if (navigator.simulator === true) {
                app.db = window.openDatabase("CourseFantastic.sqlite", "1.1", "Course Fantastic App", 20000);
            }
            else {
                app.db = window.sqlitePlugin.openDatabase("Coursefantastic.sqLite");
            }

            if (navigator && navigator.splashscreen) {
                navigator.splashscreen.hide();
            }
            dbInit();
            bootstrap();            
            //dbAddStudent('John', 'Smith', '12455875', 'johnsmith@google.com', '0402125487802');
        }, false);
    } else {
        bootstrap();
    }

    app.keepActiveState = function _keepActiveState(item) {
        var currentItem = item;
        $('#navigation-container li.active').removeClass('active');
        currentItem.addClass('active');
    };

    window.app = app;

    app.isOnline = function() {
        if (!navigator || !navigator.connection) {
            return true;
        } else {
            return navigator.connection.type !== 'none';
        }
    };
// This is the self-executing part
}());

