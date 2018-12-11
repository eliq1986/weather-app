module.exports.clothesType = (temp) => {
    if (temp > 80) {
      return "Wear some sunscreen"
    } else if(temp  < 70 && temp > 50) {
      return "Bring a sweater"
    } else if (temp < 50) {
      return "Bring a peacoat its cold"
    }
    }
