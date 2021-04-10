let nodemailer = require("nodemailer")

module.exports = {
    /**
     * Create random a string.
     * @param {string} length The length of string.
     */
    createRandomString: function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for (var i = 0; i < length; i++)
           text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    },

    /**
     * Send a code string to email.
     * @param {string} to The email will be received code string.
     * @param {string} code The code will be sended.
     */
    sendCodeToEmail: function (to, code) {
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "vutrandpqn123@gmail.com",
            pass: "TranLeAnhVu1999",
          },
        });
    
        var mailOptions = {
          from: "vutrandpqn123@gmail.com",
          to: to,
          subject: "CONFIRM REGISTER PLEASE",
          html: `
                <div style =" max-width: 600px; min-height: 700px; margin: 0 auto; padding: 50px 0; line-height: 1.5">
                  <div style="border-left: 1px solid #d5d5d5; border-right: 1px solid #d5d5d5">
                    <div style=" background-color: #30271c; color: #fff; font-size: 30px; font-weight: 600; letter-spacing: 2px; padding: 4px 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;
                    ">Welcome</div>
        
                    <div style="padding: 4px 20px;">
                        <h2 style=" color: #30271c; text-transform: uppercase">Verify  your e-mail to finish signing up for BaristaCoffee</h2>
                        <span style=" color: #666;">Thank you for choosing BaristaCoffee</span>
                    </div>
                </div>
                <div style="padding: 4px 20px; border-left: 1px solid #d5d5d5; border-right: 1px solid #d5d5d5">
                    <p style=" color: #666;">Please confirm that tranleanhvudpqn123@gmail.com is your eamil address by copy this code for finish signing. This verification code is valid within 3 minutes from the time of receiving the message.</p>
                    <div
                        style="
                            font-size: 32px;
                            font-weight: 600;
                            background-color: #c7a17a;
                            color: #30271c;
                            letter-spacing: 4px;
                            text-align: center;
                            line-height: 2;
                            margin: 30px 0 40px;
                        "
                    >${code}</div>
                    <div style="text-align: center; color: #666; margin-bottom: 40px">Need help? Ask at 
                        <a href="https://www.facebook.com/tranvudpqn123/" style="text-decoration: none; color: #c7a17a;">https://www.facebook.com/tranvudpqn123/</a>
                    </div>
                </div>
                
                <div style="text-align: center; background-color: #30271c; color: #fff; letter-spacing: 2px; padding: 10px 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; " >
                  <p style="margin: 0 0 10px; font-size: 18px;">BaristaCoffee, Inc</p>
                  <p style=" color: #fff;">01 Vo Van Ngan Street, 11th Floor, <br> Ho Chi Minh, Viet Nam</p>
                </div>
            </div>
                `,
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
          } else {
            console.log("Email sent: " + info.response);
          }
        });
    },
}