// Firebase Configuration
var firebaseConfig = {
    apiKey: "AIzaSyDlXrQ9XqJiUbc40ofsLY4ljcJvI7qjFzU",
    authDomain: "train-scheduler-edf2d.firebaseapp.com",
    databaseURL: "https://train-scheduler-edf2d.firebaseio.com",
    projectId: "train-scheduler-edf2d",
    storageBucket: "train-scheduler-edf2d.appspot.com",
    messagingSenderId: "85464607165",
    appId: "1:85464607165:web:6c8e6f327101679fe6cad4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to database
var database = firebase.database();

$('#train-btn').click(function (event) {
    // Added - Don't refresh the page
    event.preventDefault();

    // Grabbing the train name
    var trainName = $('#train-name').val().trim();
    var trainDestination = $('#train-destination').val().trim();
    var trainFrequency = $('#train-frequency').val().trim();
    var trainTime = $('#train-time').val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(trainTime);

    // Holds train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        time: trainTime,
    };

    // Push train info to database
    database.ref().push(newTrain);

    // Log train info
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.time);
});

// Firebase watcher + initial loader
database.ref().on('child_added', function (snapshot) {
    // Variable to make code more dry
    var sv = snapshot.val();

    // Store items into variable
    var trainName = sv.name;
    var trainDestination = sv.destination;
    var trainFrequency = sv.frequency;
    var trainTime = sv.time;

    // Moment.js

    var trainArrival = moment(trainTime, 'hh:mm A');
    var newArrival;

    newArrival = trainArrival.format('h:mm A');
    console.log(newArrival);

    // Minutes awway

    // Difference between the times
    var diffTime = moment().diff(moment(trainArrival), "minutes");

    // Time apart
    var timeRemainder = diffTime % sv.frequency;

    // Minutes away
    var minutesAway = sv.frequency - timeRemainder;

    // Console log user data
    console.log(sv);
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.time);

    // Appending variable info from Firebase to HTML
    var addRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(trainDestination),
        $('<td>').text(trainFrequency),
        $('<td>').text(newArrival),
        $('<td>').text(minutesAway),
    );

    $('#train-schedule > tbody').append(addRow);

    // Error handling
}, function (errorObject) {
    console.log('You have errors son: ' + errorObject.code);




});