module.exports = (driver) => {
  const Driver = require(`./drivers/${driver}`);
  return new Driver();
};
