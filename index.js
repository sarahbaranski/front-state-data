const fetchStates = () => {
  axios
    .get("http://localhost:3000/api/states")
    .then((response) => {
      var statesData = response.data.state;
      console.log(statesData[0].name);
      getMap(statesData);
    })
    .catch((error) => console.error(error));
};

fetchStates();

// axios.get("http://localhost:3000/api/states").then((response) => console.log(response.data));

function getMap(stateData) {
  console.log(stateData);
  var states = {
    AZ: {
      fillKey: "Republican",
      electoralVotes: 5,
    },
    CO: {
      fillKey: "Light Democrat",
      electoralVotes: 5,
    },
    DE: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    FL: {
      fillKey: "UNDECIDED",
      electoralVotes: 29,
    },
    GA: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    HI: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    ID: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    IL: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    IN: {
      fillKey: "Republican",
      electoralVotes: 11,
    },
    IA: {
      fillKey: "Light Democrat",
      electoralVotes: 11,
    },
    KS: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    KY: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    LA: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    MD: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    ME: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    MA: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    MN: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    MI: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    MS: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    MO: {
      fillKey: "Republican",
      electoralVotes: 13,
    },
    MT: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    NC: {
      fillKey: "Light Republican",
      electoralVotes: 32,
    },
    NE: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    NV: {
      fillKey: "Heavy Democrat",
      electoralVotes: 32,
    },
    NH: {
      fillKey: "Light Democrat",
      electoralVotes: 32,
    },
    NJ: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    NY: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    ND: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    NM: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    OH: {
      fillKey: "UNDECIDED",
      electoralVotes: 32,
    },
    OK: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    OR: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    PA: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    RI: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    SC: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    SD: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    TN: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    TX: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    UT: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    WI: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    VA: {
      fillKey: "Light Democrat",
      electoralVotes: 32,
    },
    VT: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    WA: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    WV: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    WY: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    CA: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    CT: {
      fillKey: "Democrat",
      electoralVotes: 32,
    },
    AK: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    AR: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    AL: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
    DC: {
      fillKey: "Republican",
      electoralVotes: 32,
    },
  };

  // var test = stateData.map((state) => state.abbrev);
  // console.log(test);

  stateData.forEach((state) => {
    console.log(state);
    states[state.abbrev].share_population_in_metro_areas = `${
      state.share_population_in_metro_areas * 100
    }%`;
    states[state.abbrev].share_population_with_high_school_degree = `${
      state.share_population_with_high_school_degree * 100
    }%`;
    states[state.abbrev].share_unemployed_seasonal = `${
      state.share_unemployed_seasonal * 100
    }%`;
  });

  var election = new Datamap({
    scope: "usa",
    element: document.getElementById("map_election"),
    geographyConfig: {
      highlightBorderColor: "#bada55",
      popupTemplate: function (geography, data) {
        return (
          '<div class="hoverinfo">' +
          geography.properties.name +
          "\nElectoral Votes: " +
          data.electoralVotes +
          "\nShare Population in Metro Areas: " +
          data.share_population_in_metro_areas +
          "\nShare Population with High School Degrees: " +
          data.share_population_with_high_school_degree +
          "\nShare Unemployed Seasonal: " +
          data.share_unemployed_seasonal
        );
      },
      highlightBorderWidth: 3,
    },

    fills: {
      Republican: "#CC4731",
      Democrat: "#306596",
      "Heavy Democrat": "#667FAF",
      "Light Democrat": "#A9C0DE",
      "Heavy Republican": "#CA5E5B",
      "Light Republican": "#EAA9A8",
      defaultFill: "#EDDC4E",
    },
    data: states,
  });

  election.labels();
}
