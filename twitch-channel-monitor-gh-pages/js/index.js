var myUsers = ["Summit1g", "Tfue", "gorgc", "justcooman"];
var userData = [];
var htmlOffline = "";
var htmlOnline = "";
var htmlInactive = "";
var count = 0;
var inactiveUsers = [];
clientid = "wkx1l5vtmsi33feoavz1xu0q17861g";


function doSearch() {
  $(".groups").hide();
  $(".toggle").removeClass("active");
  $(".black-head").hide();
  username = $(".search-span > input").val().trim();
  fetch( 'https://api.twitch.tv/helix/streams?user_login=' + username, { headers: { 'client-id': clientid}})
  .then(resp=>resp.json())
  .then(
    data => {
      console.log(data);
      console.log(username);
      if (data.data.length != 0) {
        //append stream mini player
        htmlSearch = "<div><a href='https://twitch.tv/" + username + "' target='_blank'><span class='picture'><img src='" + (data.logo == null ? "images/placeholder.png" : data.logo) + "'></span><span class='name'>" + data.data[0].user_name + "</span></a><span class='status'><!-- offline --></span><i class='material-icons add-search'>add</i></div>"
        $(".search-container").html(htmlSearch);
        $(".search-title > h2").html("Search Results");
        $(".search-container").show();
        $(".search-group").show();

      } else {
      $(".search-container").hide();
      $(".search-title > h2").html(username[0].toUpperCase() + username.substr(1) + " Not Found.")
      $(".search-group").show();
      };
      $(".search-span > input").val("");
    }
  )
}

function renderList(str) { // This function merely
  // renders and shows the list.
  $(".groups").show();
  $(".search-group").hide();
  $(".clear-skies").hide();
  str = str === undefined ? "All" : str.trim();

  switch (str) {
    case "All":
      if (htmlOnline + htmlOffline + htmlInactive != "") {
        if (htmlOnline != "") {
          $(".online-container").html(htmlOnline);
          $(".online-container").show();
          $(".online-title").show();
        } else {
          $(".online-container").hide();
          $(".online-title").hide();
          $(".online-container").html("");
        }
        if (htmlOffline != "") {
          $(".offline-container").html(htmlOffline);
          $(".offline-container").show();
          $(".offline-title").show();
        } else {
          $(".offline-container").hide();
          $(".offline-title").hide();
          $(".offline-container").html("");
        }
        if (htmlInactive != "") {
          $(".inactive-container").html(htmlInactive);
          $(".inactive-container").show();
          $(".inactive-title").show();
        } else {
          $(".inactive-container").hide();
          $(".inactive-title").hide();
          $(".inactive-container").html("");
        }
      } else {
        $(".online-container").hide();
        $(".online-title").hide();
        $(".offline-container").hide();
        $(".offline-title").hide();
        $(".inactive-container").hide();
        $(".inactive-title").hide();
        $(".clear-skies").css({
          "display": "flex"
        });
        $(".clear-skies > p").text("There's nothing here! Try adding your favorite Twitch channels.");
      }
      if (inactiveUsers.length > 0) {
        $(".inactive-number").text(inactiveUsers.length);
        $(".inactive-word").text(inactiveUsers.length === 1 ? "account" : "accounts");
        $(".them-it").text(inactiveUsers.length === 1 ? "it" : "them");
        $(".black-head").show();
      }
      break;
    case "Online":
      if (htmlOnline != "") {
        $(".online-container").html(htmlOnline);
        $(".online-container").show();
        $(".online-title").show();
      } else {
        $(".online-container").hide();
        $(".online-title").hide();
        $(".clear-skies").css({
          "display": "flex"
        });
        $(".clear-skies > p").text(myUsers.length === 0 ? "There's nothing here! Try adding your favorite Twitch channels." : "None of the channels you are monitoring are online.");
      }
      $(".offline-container").hide();
      $(".offline-title").hide();
      $(".inactive-container").hide();
      $(".inactive-title").hide();
      break;
    case "Offline":
      $(".online-container").hide();
      $(".online-title").hide();
      if (htmlOffline != "") {
        $(".offline-container").html(htmlOffline);
        $(".offline-container").show();
        $(".offline-title").show();
      } else {
        $(".offline-container").hide();
        $(".offline-title").hide();
        $(".clear-skies").css({
          "display": "flex"
        });
        $(".clear-skies > p").text(myUsers.length === 0 ? "There's nothing here! Try adding your favorite Twitch channels." : "None of the channels you are monitoring are offline.");
      }
      $(".inactive-container").hide();
      $(".inactive-title").hide();
  }
  $(".toggle-bar").show();

}

function getNamePhoto(username) {
  userID_api = "https://api.twitch.tv/helix/users?login=";
  let answer =  fetch( userID_api + username, { headers: { 'client-id': clientid}})
  .then(resp => resp.json())
  .then(val => {
    return [val.data[0].display_name, val.data[0].profile_image_url];
  })
  return answer;
}

function populateList(searchQuery) { // This function grabs the data from
  // The API and creates the list.

  var list = myUsers;
  if (searchQuery) {
    $(".online-group").hide();
    $(".offline-group").hide();
    $(".inactive-group").hide();
    $(".search-group").show();
  } else {
    userData = [];
    htmlOffline = "";
    htmlOnline = "";
    htmlInactive = "";
    inactiveUsers = [];
    count = 0;
    if (list.length === 0) {
      renderList();
    }
    list.forEach(function(username) {
      fetch( 'https://api.twitch.tv/helix/streams?user_login=' + username, { headers: { 'client-id': clientid}})
      .then(resp => resp.json())
      .then(
        data => {
          console.log(data.data)
          getNamePhoto(username).then( nameandlink =>
              {
                name = nameandlink[0]
                link = nameandlink[1]
                channel = data.data[0]
                if (data.data.length == 0) {
                  htmlOffline += "<div><a href='https://twitch.tv/" + username + "/videos' target='_blank'><span class='picture'><img src='" + link + "'></span><span class='name'>" + name + "</span></a><span class='status'><a href='https://twitch.tv/" + username + "' target='_blank'>Offline</a></span></div>"
                  count++;
                  if (count == list.length) {
                    renderList($(".active").text());
                  };
                  userData.push(data);
                } else { // Else, add the user to the online list.
                  userData.push(data);
                  htmlOnline += "<div><a href='https://twitch.tv/" + username + "' target='_blank'><span class='picture'><img src='" + link + "'></span><span class='name'>" + name + "</span></a><span class='status'><a href='https://twitch.tv/" + username + "' target='_blank'>" + channel.viewer_count + "</a></span></div>"
                  count++;
                  if (count == list.length) {
                    renderList($(".active").text());
                  };
                }
              }
            )
          }
        )
    });
  }
}

$(document).ready(function() {
  populateList();
  $(".add-new-btn").hover(function() {
    $(".tool-tip, .tool-tip-tri").css({
      "display": "block"
    });
  }, function() {
    $(".tool-tip, .tool-tip-tri").css({
      "display": "none"
    });
  });

  $(".add-new-btn").click(function() {
    $(".tool-tip, .tool-tip-tri").css({
      "display": "none"
    });
    $(".add-wrap").show();
    $("#new-streamer-id").focus();
  });
  $(".add-window button").click(function() {
    addNewUser();
  });

  $("#new-streamer-id").on("keypress", function(e) {
    if (e.keyCode == 13) {
      addNewUser();
      return false;
    }
  });

  $(".add-wrap").click(function(e) {
    if (e.target == this) {
      $(this).hide();
      $("#new-streamer-id").val("");
      $(".error-message").hide();
    }
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".add-wrap").hide();
      $(".add-wrap").hide();
      $("#new-streamer-id").val("");
      $(".error-message").hide();
    }
  });

  $(".search").click(function() {
    doSearch();
  });

  $(".search-span > input").keyup(function(e) {
    if (e.keyCode == 13) {
      doSearch();
      return false;
    }
  });

  $('.content').on('click', '.clear', function() {
    linkVal = $(this).siblings("a").text().toLowerCase();
    spanVal = $(this).siblings("span").text().toLowerCase()

    myUsers.splice(myUsers.indexOf(linkVal ? linkVal : spanVal), 1);
    if ($(this).parent().parent().children().length === 1) {
      $(this).parent().parent().parent().hide();
      populateList();
      $(".black-head").hide();
    }
    $(this).parent().remove();
  });

  $('.content').on('click', '.add-search', function() {
    $(".toggle:nth-of-type(1)").addClass("active");
    addNewUser($(this).siblings("a").text().toLowerCase());
  });

  $(".yes").click(function() {
    myUsers = myUsers.filter(function(user) {
      return inactiveUsers.indexOf(user) < 0;
    });
    populateList();
    $(".black-head").hide();
  })

  $(".no").click(function() {
    $(".black-head").hide();
  });

  $(".toggle").click(function() {
    $(".active").removeClass("active");
    $(this).addClass("active");
    renderList($(this).text());
  });

  $(".fa-twitch").click(function() {
    //
  });
});
