const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Triggered when a new document is added to the "orders" collection
exports.sendOrderNotification = functions.firestore
    .document("orders/{orderId}")
    .onCreate(async (snap, context) => {
      const order = snap.data();

      // Configure your email transporter
      // For Gmail, enable "App Passwords"
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "your-email@gmail.com",
          pass: "your-app-password",
        },
      });

      const mailOptions = {
        from: '"NEON Labs" <your-email@gmail.com>',
        to: "owner-email@gmail.com",
        subject: `🚨 New Order Transmission: ${order.projectName}`,
        html: `
          <h1>New Order Alert</h1>
          <p><strong>Customer:</strong> ${order.fullName}</p>
          <p><strong>Email:</strong> ${order.email}</p>
          <p><strong>Phone:</strong> ${order.phone}</p>
          <hr />
          <p><strong>Project:</strong> ${order.projectName}</p>
          <p><strong>Budget:</strong> ${order.budget}</p>
          <p><strong>City:</strong> ${order.city}</p>
          <p><strong>Message:</strong> ${order.message}</p>
          <hr />
          <p>View in Admin Dashboard: https://${process.env.GCLOUD_PROJECT}.web.app/admin</p>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Notification email sent successfully");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    });
