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

var trainName = '';

// Test to add train information to the train schedule

$('#train-btn').click(function (event) {
    // Added - Don't refresh the page
    event.preventDefault();

    // Grabbing the train name
    var trainName = $('#train-name').val().trim();
    var trainDestination = $('#train-destination').val().trim();
    var trainTime = $('#train-time').val().trim();
    var trainFrequency = $('#train-frequency').val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    // Holds train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
    };

    // Push train info to database
    database.ref().push(newTrain);

    // Log train info
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
});

// Firebase watcher + initial loader
database.ref().on('child_added', function (snapshot) {
    // Variable to make code more dry
    var sv = snapshot.val();

    // Store items into variable
    var trainName = sv.name;

    // Console log user data
    console.log(sv);
    console.log(sv.name);

    var addRow = $('<tr>').append(
        $('<td>').text(trainName)
    );

    $('#train-schedule > tbody').append(addRow);
});