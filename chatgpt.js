const OpenAI = require("openai");
require('dotenv').config()


const openai = new OpenAI({
  apiKey: process.env.apiKey
});

async function mailCamOn() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a email sender for a ecommerce website, my name is Hoàng and the website is named 'Lego', write in vietnamese",
      },
      {
        role: "user",
        content:
          "Write an email giving thanks to the customer just purchased an order from our website",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return (res = completion.choices[0].message.content);
}

async function mailHoaDon() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a email sender for a ecommerce website, my name is Hoàng and the website is named 'Lego', write in vietnamese",
      },
      {
        role: "user",
        content:
          "Write an email giving the invoice to the customer who has just purchased an order",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  return (res = completion.choices[0].message.content);
}

module.exports = { mailCamOn, mailHoaDon };
