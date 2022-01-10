const sendEmail = require('./send-email');

async function sendResetPasswordEmail(req, user) {
  const passwordResetToken = user.setPasswordResetToken();

  const passwordResetLink = 
    `${req.protocol}://${req.get('host')}/api/v1/reset-password/${passwordResetToken}`
  const text =
    `Here is your password reset link.\n\nPlease perform a patch request with your new password and confirmed password to the link:\n${passwordResetLink}\n\nBest regards\nTwitter Team`
  
  await sendEmail(user.email, text);
  await user.save({ validateBeforeSave: false });
}

module.exports = sendResetPasswordEmail;