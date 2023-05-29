import nodemailer from "nodemailer";
import path from "path";
import { Random } from "random-js";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.PRODUCTION_USER}`,
    pass: `${process.env.PRODUCTION_PASS}`,
  },
  from: `${process.env.PRODUCTION_PASS}`,
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
export async function sentMail(user, resetCode) {
  let mailOptions = {
    from: `${process.env.PRODUCTION_USER}`,
    to: `${user}`,
    subject: "request for a new password",
    html: `your password generation code is ${resetCode}`,
  };
  transporter.sendMail(mailOptions);
}
