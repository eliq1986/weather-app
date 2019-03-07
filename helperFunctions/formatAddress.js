

const formatAddress = (req) => {
  const city = req.body.city;
  const zip = req.body.zip;
  const address = req.body.address;
  const state = req.body.state;
  return `${address}, ${city}, ${state} ${zip}`;

}


module.exports = formatAddress;
