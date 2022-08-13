// export const DDDD = {};

const offcanvasStyle = {
  "--bs-offcanvas-width": "60wh",
};

const userTypeDict = [
  { Name: "Non-gov", Value: "non_gov" },
  { Name: "Non-gov and unsure", Value: "non_gov_unsure" },
  { Name: "All users", Value: "all" },
];
const freqDict = [
  { Name: "All", Value: "all" },
  { Name: "heavy", Value: "heavy" },
];

const DVDict = [
  { Name: "Total number of reports", Value: "HEX_total_reporting" },
  { Name: "Total number of 311 users", Value: "HEX_total_user" },
  // Mobility
  {
    Name: "Weighted radius of gyration",
    Value: "HEX_weighted_radius_of_gyration",
  },
  {
    Name: "Weighted average distance between reported locations",
    Value: "HEX_weighted_average_distance",
  },

  // Territoriality
  {
    Name: "Weighted number of hexagons covered",
    Value: "HEX_weighted_HEX_coverage",
  },
  {
    Name: "Weighted max home distance",
    Value: "HEX_weighted_max_home_distance",
  },
  {
    Name: "Weighted mean home distance",
    Value: "HEX_weighted_mean_home_distance",
  },
  {
    Name: "Weighted median home distance",
    Value: "HEX_weighted_median_home_distance",
  },

  // Variety
  {
    Name: "Weighted number of subjects reported",
    Value: "HEX_weighted_subject_coverage",
  },
  { Name: "Weighted subject reversed HHI", Value: "HEX_weighted_subject_hhi" },

  {
    Name: "Weighted number of reporting in 2015",
    Value: "HEX_weighted_num_reporting_2015",
  },
  {
    Name: "Number of 311 reports per 100 population",
    Value: "HEX_normalized_total_311_per_100",
  },
];

const IVDict = [
  { Name: "Poverty Index", Value: "poverty_index" },
  { Name: "Total number of reports", Value: "HEX_total_reporting" },
  { Name: "Total number of 311 users", Value: "HEX_total_user" },
  // Mobility
  {
    Name: "Weighted radius of gyration",
    Value: "HEX_weighted_radius_of_gyration",
  },
  {
    Name: "Weighted average distance between reported locations",
    Value: "HEX_weighted_average_distance",
  },

  // Territoriality
  {
    Name: "Weighted number of hexagons covered",
    Value: "HEX_weighted_HEX_coverage",
  },
  {
    Name: "Weighted max home distance",
    Value: "HEX_weighted_max_home_distance",
  },
  {
    Name: "Weighted mean home distance",
    Value: "HEX_weighted_mean_home_distance",
  },
  {
    Name: "Weighted median home distance",
    Value: "HEX_weighted_median_home_distance",
  },

  // Variety
  {
    Name: "Weighted number of subjects reported",
    Value: "HEX_weighted_subject_coverage",
  },
  { Name: "Weighted subject reversed HHI", Value: "HEX_weighted_subject_hhi" },

  {
    Name: "Weighted number of reporting in 2015",
    Value: "HEX_weighted_num_reporting_2015",
  },
  {
    Name: "Number of 311 reports per 100 population",
    Value: "HEX_normalized_total_311_per_100",
  },
];

const SubjectDict = [
  { Name: "All subjects", Value: "all" },
  { Name: "Mayors 24 Hour Hotline", Value: "Mayors_24_Hour_Hotline" },
  {
    Name: "Consumer Affair and Licensing",
    Value: "Consumer_Affairs_and_Licensing",
  },
  {
    Name: "Boston Water and Sewer Commission",
    Value: "Boston_Water_and_Sewer_Commission",
  },
  { Name: "Public Works Department", Value: "Public_Works_Department" },
  { Name: "Inspectional Services", Value: "Inspectional_Services" },
  { Name: "Neighborhood Services", Value: "Neighborhood_Services" },
  { Name: "Property Management", Value: "Property_Management" },
  { Name: "Boston Public School", Value: "Boston_Public_School" },
  {
    Name: "Transportation Traffic Division",
    Value: "Transportation_Traffic_Division",
  },
  { Name: "Animal Control", Value: "Animal_Control" },
  { Name: "Boston Police Department", Value: "Boston_Police_Department" },
  {
    Name: "Parks and Recreation Department",
    Value: "Parks_and_Recreation_Department",
  },
  { Name: "Civil Rights", Value: "Civil_Rights" },
];

const COLOR_1 = "#ffe6e6";
const COLOR_2 = "#ffb6b6";
const COLOR_3 = "#ff8686";
const COLOR_4 = "#ff5656";
const COLOR_5 = "#ff2626";
const COLOR_6 = "#ff0000";
const COLOR_7 = "#f00000";
const COLOR_8 = "#d00000";
const COLOR_9 = "#b00000";
const COLOR_10 = "#900000";
const COLOR_11 = "#700000";
const COLOR_NULL = "#ffffff";

const NUM_OF_HEX_COLORS = 11;

export {
  offcanvasStyle,
  userTypeDict,
  freqDict,
  DVDict,
  IVDict,
  SubjectDict,
  COLOR_1,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
  COLOR_8,
  COLOR_9,
  COLOR_10,
  COLOR_11,
  COLOR_NULL,
  NUM_OF_HEX_COLORS,
};
