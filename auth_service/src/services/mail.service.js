const nodemailer = require('nodemailer')

/**
 * This is variable config mail
 */
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS
  }
})

const sendTokenAuthorizeAccount = (email, accessToken) => {
  const content = 'Hãy xác thực tài khoản của bạn với đường dẫn hoặc nhấn nút bên dưới!'
  const message = 'Cảm ơn bạn đã đăng ký!'
  const url = `https://trustland.asia/active/${accessToken}`
  const formContent = {
    from: process.env.EMAIL,
    to: email,
    subject: 'E-Commerce - Active account',
    html: emailTemplate(message, content, url)
  }
  transporter.sendMail(
    formContent,
    function (error, info) {
      console.log('Trong mail')
      if (error) {
        console.log('Trong err')
        console.log(error)
      }
    }
  )
}

const emailTemplate = (message, content, url) => {
  return `<table width="90%" border="0" cellpadding="0" cellspacing="0" align="center">
  <tbody>
     <tr>
        <td width="100%" align="center">
           <h1 style="font-size:20px; color:#202020; font-weight:bold; padding-left:20px; padding-right:20px;">${message}</h1>
        </td>
     </tr>
  </tbody>
</table>
<div style="text-align: center">
  ${content}
</div>
<div style="text-align: center; margin-top: 30px;">
  <a href=${url} style="padding: 10px;font-weight: bold;
     font-size: 18px;
     width: 400px;
     height: 80px;
     font-family: Sans-Serif;  background-color: #4CAF50;
     border: 3px solid #4CAF50;
     color: white;
     text-transform: uppercase;
     height: auto;
     width: inherit;
     cursor: pointer;
     transition: transform 0.4s, box-shadow 0.4s;">Nhấn vào đây để xác thực</a>
</div>
<div style="text-align: center;word-break: break-all;">
  <p>Hoặc</p>
</div>
<div style="text-align:center">Xác thực tại đây: <a style="word-break: break-all;" href=${url}>${url}</a></div>`
}

module.exports = {
  sendTokenAuthorizeAccount
}
