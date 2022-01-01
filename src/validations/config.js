module.exports.USER_PASSWORD_PATTERN = /^[a-zA-Z0-9]{3,30}$/;
module.exports.USER_EMAIL_OPTIONS    = { minDomainSegments: 2, tlds: { allow: ['com', 'net'] } };