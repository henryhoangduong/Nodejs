const { google } = require("googleapis");
const fs = require('fs')
//////////////////////////////////EXCEL//////////////////////////////////
const SCOPE = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
];

async function authorize() {
  const jwtClient = new google.auth.JWT(
    "test2-128@excel-408407.iam.gserviceaccount.com",
    null,
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDLDSEgLinObvDJ\nJlHYdk49skntAL0nifcKI29aXkljQGkS5Z3hchUySKa6r8u7bXx3skfYl0ia2SpY\n+KA30CM0WN4epyGdGYdHWQv1uAabasidL42Y8MrVQk40EUtkjokIMmTwEp4NWPoB\nKqxZAmkuJ/zW2L2jNCKpmeSJ/PpvIZ/sy65bxYMhuDNG3b9S64waM04MXOU3CpCn\nA0nKv1mK+0SLEtAe7r5/mtoYaR1z8btBNBjlaoOcP6nPEouv26uMG3f6oRr+YOYy\nI+++J8LGsHIHGtEkRQHxzmV/XuUt6XIz8XNX2VLcajz5QvHYnXYRP/0Cn489empX\nT3Ibr5UTAgMBAAECggEAYgBZP53oQaFcB8m98PrQsohtk70qjn3RRQxrPzOIuiWp\nURyQAfK89kMIbcxRSYoDbAYZFRmXSl2MSdreAXIsu6Q0uJiz6Y4bs7zvv83tKm/0\nmaEM94cobpuNASZjvAnra5BfFVv2+rw6FfwRqPg36bYVG2EKzk1oeXE0U8FM4ft9\njnPUSNKl6eT9rv+yly98fZQ1X+2LTWBuRheeSA/D8jlNBR2adqR7hrJfI66VR0tq\nSXm7qqKT3fqu7cLh1sB36GKdPNULT62Kszl3KrXvYCncviEcng5+TsxZctz5t9Qk\nuH59CXljteP1STW34UUFXr29/QzU75HVnEhtG9qPwQKBgQDj/uNdk5DzE2H9YrGW\nP3WFlunuX3YKpmGcFV8qnjGpjv9uBvFkYXbUwWUVe+AGCi7A2/NpoR9qVpiG5gbH\njJGSwnk+99nib0p66GmE/l2cNBs9UEtaCE5iEy7WWF6EYqyJF9AC979yYiBVaQko\nW7tg6/AdbDpupSKdD/341hHHIQKBgQDj/eOAjTrUPvhneJncWBmT96vMCz8Pojdw\n8WLSYQnOfwl3E4XnJSkZUGqzHxEh61SGFlOOn5eZ0mx6CAluMI9cvYm8P6VVQITN\nCHIyc1jsobUUBGLYxzN5qrDxEE3qYcyYVVUihJUUf9PDzDBsH5Fg/YABr7RN8FG9\nDwEtOYs5swKBgEo8ZRXEBa9QAVj6uK4eTYrI37SQ+qNvF1s2Dj2XMr5t5DeUJSc1\nIPcXXW2IXyI4UI7VT0V2g/8g4RsTbOOunnu1vLrHAvfamtq4MBtwo1RIFxJ4wYA4\nMiV274o1Tdk3M8yTp1RADOMWlkaZI7UzYSimyhEae1ApjsKrQVuzgChhAoGAH920\nlpsmxdOnVI7+slV9/bh4QqSvw7egmCCk91Ko1DvdTs9jv9Lp06fxwedttZf20Gb+\ndsjHn7BRiRzmdIhFAWlcfvtGWIwUA7RSgcqteyV+8bVLO5FcGH1LDeaBfWj996y1\noYV2cM8NAijf+7zNzQihg5rTULFuO0aFm5SXaRECgYB5B59dks5znu+3P3nEJHDO\ndXpnCIFR9u6pWDWNBG9+ccS+qvCwRdErvOzedHCJPKTgcNFTC/3LMk53eW11RhfI\nlQKi7lfMAniRbk30gI/6CcrQdeK/WLdDqhhEDIeafCAKL5FYXiieA0O2dCAD9BTA\n7x8aM8mGnXUiYbk2RsyFtw==\n-----END PRIVATE KEY-----\n",
    SCOPE
  );
  await jwtClient.authorize();
  return jwtClient;
}

async function addRowToSheet(auth) {
  const sheets = google.sheets({ version: "v4", auth });

  const spreadsheetId = "1o3GRnJopTJe6uN6v1LiHveE3_u6JtcyOwGzIH_WyC34";

  const range = "Sheet1"; // Modify this based on your sheet's name or range

  const values = [
    ["Công ty xăng dầu Dĩ An", "18/12/2023", "5 Nguyễn Chánh"], // Add your row data here
  ];

  const resource = {
    values: values,
  };

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: "USER_ENTERED",
      resource: resource,
    });

    console.log(`Row added successfully!`);
    console.log(response.data);
  } catch (err) {
    console.error(`Error adding row: ${err}`);
  }
}

async function main() {
  try {
    const auth = await authorize();
    await addRowToSheet(auth);
  } catch (err) {
    console.error(`Error authorizing or adding row: ${err}`);
  }
}

module.exports = {main}