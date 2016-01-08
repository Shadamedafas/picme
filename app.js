var config = require('./config.json');

var twilio = require('twilio')('AC4967590ab5db91810713ab5c7210da6b', 'd06d1376b405bc695542948086e9652c');
var imgur = require('imgur');

imgur.setClientId('fa033d3fa3a0ea3');

var dropTarget = $('.drop-target');

var sendImage = function (url) {
  twilio.sendMessage({
    to : '13213385315',
    from : '12515807869',
    body : 'Hello, there.',
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
