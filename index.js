$(document).on("ready", function() {

  var streamers = ["freecodecamp", "sheevergaming", "riotgames", "esl_csgo", "summit1g", "captainsparklez", "LIRIK", "PhantomL0rd", "Nightblue3", "sodapoppin", "imaqtpie", "tsm_bjergsen", "Tsm_dyrus", "trick2g", "syndicate", "OgamingSC2", "ESL_SC2"];
  streamers.forEach(function(item) {
    display(item);
  })

  function display(item) {
    $.ajax({
      url: "https://api.twitch.tv/kraken/streams/" + item,
      dataType: "jsonp",
      success: function(data) {

        if (data.stream === null) {
          $.ajax({
            url: data._links.channel,
            dataType: "jsonp",
            success: function(data) {
              $(".cards").append("<div class='row offlineCardDetails text-center'> <div class='col-xs-4'> <img class='img-circle' src='" + data.logo + "'> </div> <div class='col-xs-8'> <div class='row'><div class='col-md-8 col-md-push-4 offlineColor'>Offline</div><div class='col-md-4 col-md-pull-8 channelName'><a target='_blank' href='" + data.url + "'>" + data.display_name + "</a></div></div></div>");
              $(".offlineCardDetails").css({
                "background-color": "#FF9800",
                "box-shadow": "0px 10px 0px #212121",
                "font-weight": "700"
              })
            }
          });
        }

        $(".cards").append("<div class='row cardDetails text-center'> <div class='col-xs-4'> <img class='img-circle' src='" + data.stream.channel.logo + "'> </div> <div class='col-xs-8'> <div class='row'><div class='col-md-8 col-md-push-4'>" + data.stream.channel.game + ": " + data.stream.channel.status + "</div><div class='col-md-4 col-md-pull-8 channelName'><a target='_blank' href='" + data.stream.channel.url + "'>" + data.stream.channel.display_name + "</a></div></div></div>");
      }
    });
  }

  $(".online").on("click", function() {
    $(".offlineCardDetails").hide();
    $(".cardDetails").show();
  });
  $(".offline").on("click", function() {
    $(".cardDetails").hide();
    $(".offlineCardDetails").show();
  });
  $(".all").on("click", function() {
    $(".cardDetails").show();
    $(".offlineCardDetails").show();
  });

});
//logo, display_name, links, game, status
