// Import Nodemailer
const nodemailer = require('nodemailer');

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'selvakumarpsk12022000@gmail.com',
    pass: 'dyem vqgr fmfl xvfa'
  }
});

// Function to send email to normal user
const sendApprovalEmailToUser = (mailid) => {
  const mailOptions = {
    from: 'selvakumarpsk12022000@gmail.com',
    to: mailid,
    subject: 'Change Request Approved',
    text: 'Your change request has been approved. Thank you!'
    // You can also use HTML for email content
    // html: '<h1>Your change request has been approved. Thank you!</h1>'
  };

  

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const sendUnApprovalEmailToUser = () => {
    const mailOptions = {
      from: 'selvakumarpsk12022000@gmail.com',
      to: 'selvakumarpsk658@gmail.com',
      subject: 'Change Request Rejected',
      text: 'Your change request has been Rejected. Thank you!'
      // You can also use HTML for email content
      // html: '<h1>Your change request has been approved. Thank you!</h1>'
    };
  
    
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }


  const sendPassword = (email,password) => {
    const mailOptions = {
      from: 'selvakumarpsk12022000@gmail.com',
      to: email,
      subject: 'New Account have been Created',
      text: password
      // You can also use HTML for email content
      // html: '<h1>Your change request has been approved. Thank you!</h1>'
    };
  
    
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

module.exports = { sendApprovalEmailToUser,sendUnApprovalEmailToUser,sendPassword };
