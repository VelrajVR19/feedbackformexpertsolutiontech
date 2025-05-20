const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.post('/send', (req, res) => {
  const {interviewername, name, role, communication, technical, jobKnowledge, contribution, overall, comments, finalResult } = req.body;

  const output = `
  <div style="text-align: center; margin-bottom: 30px;">
    <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSjxqhopL41jucffDJTIFNRRTPnEhV0jDXuHBHEhGwhKdSTXNby" alt="Company Logo" style="max-width: 50px;"/>
    <h2 style="font-family: Arial, sans-serif; color: #1e293b;">Interview Evaluation - ${name}, ${role}</h2>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
    <thead>
      <tr style="background-color: #1e293b; color: #ffffff;">
        <th style="padding: 12px; text-align: left; font-size: 14px;">Evaluation Criteria</th>
        <th style="padding: 12px; text-align: left; font-size: 14px;">Description</th>
      </tr>
    </thead>
    <tbody>
    <tr style="background-color: #f8fafc;">
        <td style="padding: 10px;"><strong>Interviewer Name</strong></td>
        <td style="padding: 10px;">${interviewername}</td>
      </tr>

      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px;"><strong>Candidate Name</strong></td>
        <td style="padding: 10px;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f1f5f9;"><strong>Applied Role</strong></td>
        <td style="padding: 10px; background-color: #f1f5f9;">${role}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px;"><strong>Communication (out of 5)</strong></td>
        <td style="padding: 10px;">${communication}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f1f5f9;"><strong>Technical Skills (out of 5)</strong></td>
        <td style="padding: 10px; background-color: #f1f5f9;">${technical}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px;"><strong>Job Knowledge (out of 5)</strong></td>
        <td style="padding: 10px;">${jobKnowledge}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f1f5f9;"><strong>Project Contribution</strong></td>
        <td style="padding: 10px; background-color: #f1f5f9;">${contribution}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px;"><strong>Overall Score (out of 5)</strong></td>
        <td style="padding: 10px;">${overall}</td>
      </tr>
      <tr>
        <td style="padding: 10px; background-color: #f1f5f9;"><strong>Reviewer Comments</strong></td>
        <td style="padding: 10px; background-color: #f1f5f9;">${comments}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px;"><strong>Final Decision</strong></td>
        <td style="padding: 10px;">${finalResult}</td>
      </tr>
    </tbody>
  </table>
`;




  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'expsoltechfeedback@gmail.com',
      pass: 'vwgempvhjtjpwkxq'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  

  const mailOptions = {
    from: 'expsoltechfeedback@gmail.com',
    to: 'daniel.est777@gmail.com',
    subject: `Interview Evaluation - ${name}, ${role}`,
    text: output,
    headers: {
      'Content-Type': 'text/html; charset=UTF-8' 
    },
    
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err);
      res.send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Feedback Submitted</title>
          <style>
            * {
              box-sizing: border-box;
            }
      
            body {
              margin: 0;
              padding: 0;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
              color: #0f172a;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
      
            .card {
              background-color: #ffffff;
              padding: 40px 30px;
              border-radius: 16px;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
              text-align: center;
              max-width: 480px;
              width: 100%;
              animation: fadeIn 0.6s ease-out;
            }
      
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
      
            .icon {
              width: 64px;
              height: 64px;
              margin-bottom: 16px;
            }
      
            h1 {
              font-size: 22px;
              margin-bottom: 12px;
            }
      
            .quote {
              font-style: italic;
              color: #475569;
              font-size: 16px;
              margin: 20px 0;
              position: relative;
              padding: 0 15px;
            }
      
            .quote::before,
            .quote::after {
              content: '"';
              font-size: 24px;
              color: #94a3b8;
              vertical-align: middle;
            }
      
            .btn {
              display: inline-block;
              margin-top: 30px;
              background-color: #2563eb;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 8px;
              font-size: 16px;
              text-decoration: none;
              cursor: pointer;
              transition: background-color 0.3s ease;
            }
      
            .btn:hover {
              background-color: #1e40af;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="green">
              <circle cx="12" cy="12" r="10" stroke="green" stroke-width="2" fill="#dcfce7"/>
              <path stroke="green" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M7 12l3 3 6-6" />
            </svg>
            <h1>Thank you! Your feedback has been submitted successfully.</h1>
            <div class="quote">Expert Solution Technologies – Crafting digital excellence from the heart of Chennai.</div>
            <a href="/" class="btn">Back to Form</a>
          </div>
        </body>
        </html>
      `);
    }
  });
});
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
