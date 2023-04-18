const axios = require('axios').default;

export async function sendSlack(subject, msg, endpoint): Promise<any> {

  if (process.env.NODE_ENV === "local") {
      return;
  }

  if (msg == "" || subject == "" || endpoint == "") {
    return;
  }

  msg = subject + "\n" + msg;

  var post_data = { "text": msg };

  await axios({
    url: "https://hooks.slack.com" + endpoint,
    method: 'POST',
    timeout: 8000,
    data: post_data
  }).then(function (res) {
    // console.dir(res); // we are good here, the res has the JSON data
    return res;
  }).catch(function (err) {
    console.error(err);
  })
}