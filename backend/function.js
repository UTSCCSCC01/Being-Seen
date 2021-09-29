exports.md5 = (password) => {
    return require('crypto').createHash('md5').update(password).digest('hex');
}