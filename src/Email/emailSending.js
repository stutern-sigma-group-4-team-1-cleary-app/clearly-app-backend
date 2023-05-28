import nodemailer from "nodemailer";
import path from "path";
import { Random } from "random-js";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.USER}`,
    pass: `${process.env.PASS}`,
  },
  from: `${process.env.USER}`,
});

// transporter.use(
//   "compile",
//   hbs({
//     viewEngine: {
//       extname: ".hbs",
//       layoutsDir: path.join("src", "views"),
//       defaultLayout: false,
//       partialsDir: path.join("src", "views"),
//     },
//     viewPath: path.join("src", "views"),
//     extName: ".hbs",
//   })
// );
// transporter.sendMail(mailOptions, (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   return console.log("email-sent");
// });

const sentMail = async (user, resetCode) => {
  let mailOptions = {
    from: "clearlyappmail@gmail.com",
    to: `${user}`,
    subject: "request for a new password",
    html: `your password generation code is ${resetCode}`,
  };
  await transporter.sendMail(mailOptions);
};

export { sentMail };
