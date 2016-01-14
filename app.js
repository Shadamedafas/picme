var config = require('./config.json');

// User will need to create a config.json file with twilio account creds
var twilio = require('twilio')(config.twilio.account_sid, config.twilio.auth_token);
var imgur = require('imgur');

// User will need to create a config.json file with imgur account creds
imgur.setClientId(config.imgur.account_id);

var dropTarget = $('.drop-target');

var sendImage = function (url) {
  twilio.sendMessage({
    to : config.twilio.phone_number,
    from : '12515807869',
    mediaUrl : url
  }, function (error, message) {
    if (!error) {
      console.log('success');
    } else {
      console.log(error);
    }
  });
};

dropTarget.on('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();

  dropTarget.addClass('drag-over');
});

dropTarget.on('dragenter', function (e) {
  e.preventDefault();
  e.stopPropagation();

  dropTarget.addClass('drag-over');
});

dropTarget.on('dragleave', function (e) {
  e.preventDefault();
  e.stopPropagation();

  dropTarget.removeClass('drag-over');
});

dropTarget.on('drop', function (e) {
  var dt = e.originalEvent.dataTransfer;

  if (dt && dt.files.length) {
    e.preventDefault();
    e.stopPropagation();
  }

  imgur.uploadFile(dt.files[0].path)
    .then(function (json) {
      sendImage(json.data.link);
    })
    .catch(function (err) {
      console.error(err.message);
    });

  dropTarget.removeClass('drag-over');
});
