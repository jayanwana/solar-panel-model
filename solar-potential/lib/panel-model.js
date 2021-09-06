/* Sun elevation angle data with keys as the time in hours and
values as elevation angle in degrees from table in solar panel model PDF*/
const sunElevation = {
  summer: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 2,
    5: 9,
    6: 18,
    7: 27,
    8: 37,
    9: 46,
    10: 54,
    11: 60,
    12: 62,
    13: 60,
    14: 54,
    15: 46,
    16: 37,
    17: 27,
    18: 18,
    19: 9,
    20: 2,
    21: 0,
    22: 0,
    23: 0,
  },
  winter: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 6,
    10: 11,
    11: 14,
    12: 15,
    13: 14,
    14: 11,
    15: 6,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
  }
};

export class SolarPanel {
  //  initialize an instance of the solar panel model with these variables in the constructor
  constructor(roofArea, roofAngle, panelEfficiency, panelCost) {
    this.roofArea = roofArea;
    this.roofAngle = Number(roofAngle);
    this.panelEfficiency = panelEfficiency;
    this.panelCost = panelCost;
    this.pSun = 1000;
    this.calcESunRoof = this.calcESunRoof.bind(this);
    this.calcPowerGenerated = this.calcPowerGenerated.bind(this);
    this.calcPowerGeneratedOverSolstices = this.calcPowerGeneratedOverSolstices.bind(this);
  }

  /* Method to calculate the sun elevation angle at any given time and solstice,
  taking into consideration the roof angle
  params time: current time in hours interval int
  solstice: current solstice stringify */
  calcESunRoof(soltice, time) {
    //  Get sun elevation angle at param time and soltice from sunelevation object
    const sunAngle = sunElevation[soltice][time]
    // Check if sun angle is above 0, if not angle is zero
    // Assuming roof angle is facing eastwards, take into account effect of sun going west
    if (sunAngle > 0) {
      if (time <= 12) {
        this.eSunRoof = this.roofAngle + sunAngle;
      } else {
        this.eSunRoof = sunAngle - this.roofAngle;
      }
      // this.eSunRoof = time <= 12 ? this.roofAngle + sunAngle : sunAngle - this.roofAngle;
    } else {
      this.eSunRoof = 0;
    }
  }

// calculate the power generated at the given sun roof elevation
  calcPowerGenerated() {
    this.pPanel = this.eSunRoof > 0 ? this.panelEfficiency * this.pSun
     * this.roofArea * Math.sin(this.eSunRoof * (Math.PI / 180)) : 0;
  }

// calculate total installation cost
  calcTotalInstallationCost() {
    this.totalCost = this.roofArea * this.panelCost;
  }

  // calculate cost of power generated
  calcPowerGeneratedCost() {
    this.powerCost = this.totalCost / this.pPanel;
  }

  calcPowerGeneratedOverSolstices() {
    const powerGenerated = {};
    Object.keys(sunElevation).forEach((key) => {
      powerGenerated[key] = [];
      Object.keys(sunElevation[key]).forEach((time) => {
        this.calcESunRoof(key, time);
        this.calcPowerGenerated();
        powerGenerated[key].push({ x: parseInt(time), y: this.pPanel });
      })
    });
    this.powerGenerated = powerGenerated;
    // for (key in sunElevation) {
    //   for (time in sunElevation[key]) {
    //     }}
  }
}
