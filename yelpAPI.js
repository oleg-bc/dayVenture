
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCLn3kgPLJpalQ9LC4DR2lkQvEohkAIe3k",
  authDomain: "blazeit-22443.firebaseapp.com",
  databaseURL: "https://blazeit-22443.firebaseio.com",
  projectId: "blazeit-22443",
  storageBucket: "blazeit-22443.appspot.com",
  messagingSenderId: "784716485493"
};
firebase.initializeApp(config);

var database = firebase.database();

//YELP KEY
// Client ID
// mSosLSg7eDfpp54l0C7VhA

// API Key
// 93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx
$(document).ready(function () {

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. You can also check out the chrome extenstion (https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  //our key for yelp API
  var yelpKey = "93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx";

  //later, this will be grabbed from the users location. for now, let's use San Francisco"
  var where = "San+Francisco";

  //search terms
  var query = "party"

  // categories string

  // sort_by string (options best_match, rating, review_count, OR distance)

  var sorted = "rating"

  var yelpQueryURL = "https://api.yelp.com/v3/businesses/search?&location="
    + where +
    "&term=" + query +
    "&sort_by=" + sorted +
    "&open_now=true" +
    "&attribute=hot_and_new";

  // var yelpQueryURL = "https://api.yelp.com/v3/businesses/";

  //   var searchRequest ={
  //     location: where,
  //     term: query,
  //   }

$(document).ready(function () {

  // Some APIs will give us a cross-origin (CORS) error. This small function is a fix for that error. 
  jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
      options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
  });

  //our key for yelp API
  var yelpKey = "93-sQptypfHJJ-zn2q1fOKSujEsPzhm_gVzq-5g7q_P1G4TIsuM7G126ydE37pmuFcd4o2t-_a8pkiBHZV6Rt1eRkcfzMmOJ5OIFZwsFPvrkjFHdcNEYo1_JBiMAXHYx";

  //TODO, populated this value from the users location. for now, let's use San Francisco"
  var where = "San+Francisco";

  //search terms
  var query = "events"

  // sort_by string (options best_match, rating, review_count, OR distance)
  var sorted = "rating"

  var yelpQueryURL = "https://api.yelp.com/v3/businesses/search?&location="
    + where +
    "&term=" + query +
    "&sort_by=" + sorted +
    "&open_now=true" +
    "&attribute=hot_and_new";

  $.ajax({
    url: yelpQueryURL,
    headers: {
      'Authorization': "Bearer " + yelpKey,
    },
    method: "GET",
    dataType: 'json',
  }).then(function (response) {

    console.log(response)

    //make the owl carousel
    var carousel = $('<div id="owl-demo" class="owl-carousel owl-theme">');

    for (var i = 0; i < response.businesses.length; i++) {

  $.ajax({
    url: yelpQueryURL,
    headers: {
      'Authorization': "Bearer " + yelpKey,
    },
    method: "GET",
    dataType: 'json',
  }).then(function (response) {

    // response = JSON.parse(response)
    console.log(response)

    //shorten our path to getting the data we want, incorporating the ability to use a for loop in the future:
    var carousel = $('<div id="owl-demo" class="owl-carousel owl-theme">');

    for (var i = 0; i < response.businesses.length; i++) {
      //Event ID to track events internally
      //Events from this API will be a number starting at 1000. Another API could be 2000+, another 3000+ and so on.
      var eventID = (10000 + parseInt([i]))

      //Event Title
      var title = response.businesses[i].name;

      //image
      var imageURL = response.businesses[i].image_url;

      //event URL
      var link = response.businesses[i].url

      //    rating;
      var rating = response.businesses[i].rating

      //Event Title
      var title = response.businesses[i].name;
      //activity type
      var activityType;

      //image
      var imageURL = response.businesses[i].image_url;

      //event URL
      var link = response.businesses[i].url
      // console.log(link)
      //   var cost;

      //    rating;
      var rating = response.businesses[i].rating
      // console.log(rating)

      // address
      // var address = businesses[x].location.address1;


      // Owl Carousel starts here
      var displayDiv = $('<div class="card-item">');
      displayDiv.append(title, "<br>")

      var displayImage = $("<img>")
      displayImage.attr("src", imageURL)
      displayImage.appendTo(displayDiv);


      var displayLink = $("<a>");
      displayLink.attr("href", link)
      displayLink.text("Link: " + title)
      displayDiv.append(displayLink, "<br>")

      var displayRating = $("<p>");
      displayRating.text("Rated " + rating + " stars on Yelp!")
      displayDiv.append(displayRating, "<br>")

      carousel.append(displayDiv);


    }
    $("#carousel-container").html(carousel);

    $("#owl-demo").owlCarousel({
      items: 3,
      dots: true,
      nav: false
    });

    $(".owl-item").on("click", function () {
      $(this).toggleClass('checked');
    });

  });

// });



// Lindsey's testimonials



var name = "";
var review = "";


$(document).on("click", "#submit", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#fname").val().trim();
  review = $("#subject").val().trim();

  // $("#reviews-display").append(" \" " + review + " \" " + " - " + name);
  $("#reviews-display").append ("<div <p>"+ " \" " + review + " \" " + " - " + name+ "</p> </div>");

});


// Lindsey's FB

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAXIOcZoTp4y2t9tYtyiN1JA6HRZoIvT28",
  authDomain: "dayventurebylolz.firebaseapp.com",
  databaseURL: "https://dayventurebylolz.firebaseio.com",
  projectId: "dayventurebylolz",
  storageBucket: "dayventurebylolz.appspot.com",
  messagingSenderId: "858404665634"
};
firebase.initializeApp(config);

var database = firebase.database();

var review = "";
var name = "";

database.ref().on("child_added", function (snapshot) {

  if (snapshot.child("review").exists() && snapshot.child("name").exists()) {

    review = snapshot.val().review;
    name = snapshot.val().name;
  }

var reviewCarousel = $('<div id="review-carousel">');
// $("#reviews-display").append("<div <p>" + " \" " + review + " \" " + " - " + name + "</p> </div>");

$("#reviews-display").text( " \" " + review + " \" " + " - " + name );




});


$(document).on("click", "#submit", function (event) {
  // event.preventDefault();

  // Grabbed values from text boxes
  var reviewerName = $("#fname").val().trim();
  var reviewerReview = $("#subject").val().trim();

  database.ref().push({
    name: reviewerName,
    review: reviewerReview
  });
});




//  var http://api.openweathermap.org/data/2.5/forecast?appid=f54f78656d096d76ff850ad75c4be18e&q=94553,us
// apiKey = f54f78656d096d76ff850ad75c4be18e

$(document).on("click", "#getstarted-button", function (event) {
  event.preventDefault();
  var zipInput = $("#zipInput").val().trim();
  console.log(zipInput);
  var query = "http://api.openweathermap.org/data/2.5/forecast?appid=f54f78656d096d76ff850ad75c4be18e&q=" + zipInput + ",us"
  $.get(query)

    .then(function (data) {
      console.log(data)
      var kelvin = data.list[0].main.temp;
      var fahrenheit = Math.floor(kelvin * 9 / 5 - 459.67);
      console.log(fahrenheit);
      $("#weather-results").append("<h1>The weather in " + data.city.name + " is " + fahrenheit + "\u{000B0} F</h1>")
    })

    .catch(function (error) {
      console.log(error);


    })
})

      //owl carousel

      // TODO
      // address - this response is an array, where each element is a 'line' of an address (usually). Let's leave it for now, but later we will need to interpret it. possibly use a for loop to store it on the data div?
      var address = [];
      address = response.businesses[i].location.display_address
      // console.log(address)

      //Create a div to store all the data in one place
      var dataDiv = $("<data class='data-storage'>");
      dataDiv.attr("data-ID", eventID);
      dataDiv.attr("data-title", title);
      dataDiv.attr("data-image-URL", imageURL);
      dataDiv.attr("data-link-URL", link);
      dataDiv.attr("data-rating", rating);

      // Create a div to display all that sweet data we got
      var displayDiv = $('<div class="card-item">');
      

      var displayTitle = $("<div>" + title + "</div>")
      displayTitle.addClass("title")
      displayDiv.append(displayTitle, "<br>")

      var displayImage = $("<img>")
      displayImage.attr("src", imageURL)
      displayImage.attr("alt", title)
      displayImage.addClass("event-image")
      displayDiv.append(displayImage);

      var displayLink = $("<a>");
      displayLink.attr("href", link)
      displayLink.text("Link: " + title)
      displayDiv.append(displayLink, "<br>")

      var displayRating = $("<p>");
      displayRating.text("Rated " + rating + " stars on Yelp!")
      displayDiv.append(displayRating, "<br>")

      displayDiv.append(dataDiv)

      //populate the Owl carousel with the display div we created
      carousel.append(displayDiv);

      //end of activty for loop
    }

    //owl be back! 
    $("#carousel-container").html(carousel);

    $("#owl-demo").owlCarousel({
      items: 3,
      dots: false,
      nav: true
    });

    // on click of event, display that event has been selected and grab it's data
    $(".owl-item").on("click", function () {

      // Bypassing the toggle functionality
      // $(this).toggleClass('checked');

      //check if the activity card has been clicked
      if ($(this).hasClass("checked")) {

        $(this).removeClass('checked');

                // To remove the entry for checkmark unchecked (by ZOE & Lyle)
        var query = database.ref();
        //grab the event ID
        var eventIDremove = $(this).find("data").attr("data-id");

        query.once("value", (function () {

          database.ref().child(eventIDremove).remove();

        }));

        var removeItinerary = "#itinerary-"+eventIDremove;
        console.log(removeItinerary)
        $(removeItinerary).empty()


        // database.ref().on("child_added", function (childSnapshot) {

        //   //mad props to VIVIAN!!
        //   childSnapshot.forEach(function (child) {

        //     var obj = child.val();
        //     // console.log(obj);
        //     // console.log(obj.title);

        //     var fireTitle = obj.title;
        //     var fireImageURL = obj.image;
        //     var fireLink = obj.link;
        //     var fireRating = obj.rating;

        //     var itineraryDiv = $('<div>');

        //     var itineraryTitle = $("<div>" + fireTitle + "</div>")
        //     itineraryTitle.attr("id", "fireTitle")
        //     itineraryDiv.append(fireTitle, "<br>")

        //     var itineraryImage = $("<img>")
        //     itineraryImage.attr("src", fireImageURL)
        //     itineraryImage.attr("alt", fireTitle)
        //     itineraryImage.addClass("itinerary-image")
        //     itineraryDiv.append(itineraryImage);

        //     var itineraryLink = $("<a>");
        //     itineraryLink.attr("href", fireLink)
        //     itineraryLink.text("Link: " + fireTitle)
        //     itineraryDiv.append(itineraryLink, "<br>")

        //     var itineraryRating = $("<p>");
        //     itineraryRating.text("Rated " + fireRating + " stars on Yelp!")
        //     itineraryRating.attr("data-fire-rating", fireRating)
        //     itineraryDiv.append(itineraryRating, "<br>")

        //     $("#itinerary-display").append(itineraryDiv)
        //     console.log("result of unchecking")

        //   })

        //   // Handle the errors
        // }, function (errorObject) {
        //   console.log("Errors handled: " + errorObject.code);
        // });

        //end of owl item click "IF" statement

      } else {
        $(this).addClass('checked');

        //grab the info from the checked activity
        //title
        var titleFB = $(this).find("data").attr("data-title");
        // console.log(titleFB)

        //image URL
        var imageFB = $(this).find("data").attr("data-image-URL");
        // console.log(imageFB)

        //link to activity
        var linkFB = $(this).find("data").attr("data-link-URL");
        // console.log(linkFB)

        //cost

        //rating
        var ratingFB = $(this).find("data").attr("data-rating");
        // console.log(ratingFB)

        //address
        // var addressFB $(this).find("a").attr("href")

        var eventIDFB = $(this).find("data").attr("data-id");
        // console.log(eventIDFB)

        database.ref().child(eventIDFB).push({
          eventID: eventIDFB,
          title: titleFB,
          image: imageFB,
          link: linkFB,
          // cost: costFB,
          rating: ratingFB,
          // address: addressFB

        });

      };

      //end of click activity
    })

    //end of ajax response
  });

  //end of document ready
});

//empty the itinerary div
// $("#itinerary-display").empty()

database.ref().on("child_added", function (childSnapshot) {

  //mad props to VIVIAN!!
  childSnapshot.forEach(function (child) {

    var obj = child.val();
    // console.log(obj);
    // console.log(obj.title);

    var fireTitle = obj.title;
    var fireImageURL = obj.image;
    var fireLink = obj.link;
    var fireRating = obj.rating;
    var fireID = obj.eventID
    console.log(fireID)

    var itineraryDiv = $('<div class="itinerary-activity">');
    var itineraryID = "itinerary-" + fireID
    console.log (itineraryID)
    itineraryDiv.attr("id", itineraryID)
    console.log(itineraryDiv)

    var itineraryTitle = $("<div>" + fireTitle + "</div>")
    itineraryTitle.attr("id", "fireTitle")
    itineraryDiv.append(fireTitle, "<br>")

    var itineraryImage = $("<img>")
    itineraryImage.attr("src", fireImageURL)
    itineraryImage.attr("alt", fireTitle)
    itineraryImage.addClass("itinerary-image")
    itineraryDiv.append(itineraryImage);

    var itineraryLink = $("<a>");
    itineraryLink.attr("href", fireLink)
    itineraryLink.text("Link: " + fireTitle)
    itineraryDiv.append(itineraryLink, "<br>")

    var itineraryRating = $("<p>");
    itineraryRating.text("Rated " + fireRating + " stars on Yelp!")
    itineraryRating.attr("data-fire-rating", fireRating)
    itineraryDiv.append(itineraryRating, "<br>")

    $("#itinerary-display").append(itineraryDiv)
    console.log("global scope")
  })

  // Handle the errors
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});
