import jwtDecode from "jwt-decode";
import { resolve } from "../resolver";
import api from "../api";
import { renderToStaticMarkup } from 'react-dom/server';

// Define the email templates
export function acceptEmail(username) {
    const emailBody = (
        <html>
        <head>
            <style>
                {`
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #3498db;
            }
            p {
              line-height: 1.6;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
            strong {
              font-weight: bold;
            }
            img {
              max-width: 10%;
              height: auto;
              margin-bottom: 20px;
            }
          `}
            </style>
        </head>
        <body>
        <img src="https://i.ibb.co/QJvx1Zn/check-mark-symbol-icon-tick-illustration-choice-vote-correct-check-mark-approved-green-button-yes-or.jpg"
            alt="check-mark-symbol-icon-tick-illustration-choice-vote-correct-check-mark-approved-green-button-yes-or"
            border="0"/>
        <h2>Your Request Has Been Approved!</h2>
        <p>Dear {username},</p>
        <p>We want to inform you that your request was approved by an admin!</p>
        </body>
        </html>
    );

    return renderToStaticMarkup(emailBody);
}

export function denyEmail(username) {
    const emailBody = (
        <html>
        <head>
            <style>
                {`
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #e74c3c;
            }
            p {
              line-height: 1.6;
            }
            ul {
              list-style-type: none;
              padding: 0;
            }
            li {
              margin-bottom: 10px;
            }
            strong {
              font-weight: bold;
            }
            img {
              max-width: 10%;
              height: auto;
              margin-bottom: 20px;
            }
          `}
            </style>
        </head>
        <body>
        <img src="https://i.ibb.co/5xqDSdr/Exclamation-Mark-Symbol-PNG-Clipart.png"
                                              alt="Exclamation-Mark-Symbol-PNG-Clipart" border="0"/>
        <h2>Your Request Has Been Rejected</h2>
        <p>Dear {username},</p>
        <p>We regret to inform you that your request was rejected by an admin.</p>
        </body>
        </html>
    );

    return renderToStaticMarkup(emailBody);
}