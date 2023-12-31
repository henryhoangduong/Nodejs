const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
var cors = require("cors");
const Sendemail = require('./Sendemail.js')
const chatgpt = require("./chatgpt");
const main = require('./Excel.js')

// const methodOverride = require("method-override");

app.use(
  cors()
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(methodOverride("_method"));

const getToken = async (req, res, next) => {
  const url =
    "https://open.larksuite.com/open-apis/auth/v3/app_access_token/internal";
  const post = {
    app_id: "cli_a5fe6e903038d02f",
    app_secret: "hpGFs4IXnGwG4aHlCjkP3eAR2AJK5CfI",
  };
  const response = await axios.post(url, post);
  // console.log("getToken response: ", response.data.app_access_token);
  req.token = response.data.app_access_token;
  next();
};

app.get("/listrecord", getToken, async (req, res) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${req.token}`,
  };
  const data = await axios.get(
    "https://open.larksuite.com/open-apis/bitable/v1/apps/VuOJbA1FhaF1oGsIi3IlFmDsgad/tables/tblcVRE6mcPTnTVS/records"
  );
  //   const data = [...res];
  console.log("index.js data: ", data);
  res.json(data.data.data.items);
});


//Send email
app.get('/sendemail', (req, res) => {
  
  Sendemail.sendMail();
  res.json({ 'message':'successful'});
})


//Send email using chatgpt
app.post('/sendemailchatgpt', async (req, res) => {
  
  const text = await chatgpt.mailHoaDon ();
  Sendemail.sendMail(text,'henryhoangduong@gmail.com');
  res.json({ 'message':'successful'});
})

app.post("/lead", getToken, async (req, res) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${req.token}`,
  };

  const user = req.body;
  const data = {
    "fields": {
      "Giới tính": [user["Giới tính"]],
      "Họ và tên": user["Họ và tên"],
      "Nguồn": "website",
      "địa chỉ": user["Tỉnh thành"],
      "email": user["email"],
      "số điện thoại":user["số điện thoại"],
    },
  };
  const url = "https://open.larksuite.com/open-apis/bitable/v1/apps/VuOJbA1FhaF1oGsIi3IlFmDsgad/tables/tblGeyIIuLH1TFPD/records";
  const response = await axios.post(url, data);
  res.send(response.data);
});


app.get("/excel", async (req, res) => {
  main.main();
  res.send('successful')
  }
)
app.listen(5000, (req, res) => {
  console.log("App is listening on port 5000");
});

