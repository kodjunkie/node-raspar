module.exports = (driver = "zippyshare") => {
  const Driver = require(`./drivers/${driver.trim()}`);
  return new Driver();
};
