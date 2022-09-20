const offcanvasStyle = {
  "--bs-offcanvas-width": "60wh",
};

const userTypeDict = [
  { Name: "Residents Only", Value: "non_gov" },
  { Name: "Residents and unsure", Value: "non_gov_unsure" },
  { Name: "Residents and Government Employees", Value: "all" },
];

const userTypeDictObj = {
  non_gov: "Residents Only",
  non_gov_unsure: "Residents and unsure",
  all: "Residents and Government Employees",
};

const freqDict = [
  { Name: "Both one-time and repeat users", Value: "all" },
  { Name: "Repeat users only", Value: "heavy" },
];

const freqDictObj = {
  all: "Both one-time and repeat users",
  heavy: "Repeat users only",
};

const DVDict = [
  { Name: "Total number of reports", Value: "HEX_total_reporting" },
  { Name: "Total number of 311 users", Value: "HEX_total_user" },
  // Mobility
  {
    Name: "Mobility",
    Value: "HEX_weighted_radius_of_gyration",
  },
  // {
  //   Name: "Weighted average distance between reported locations",
  //   Value: "HEX_weighted_average_distance",
  // },

  // Territoriality
  {
    Name: "Weighted number of hexagons covered",
    Value: "HEX_weighted_HEX_coverage",
  },
  // {
  //   Name: "Weighted max home distance",
  //   Value: "HEX_weighted_max_home_distance",
  // },
  // {
  //   Name: "Weighted mean home distance",
  //   Value: "HEX_weighted_mean_home_distance",
  // },
  {
    Name: "Median distance from home",
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

const DVDictObj = {
  HEX_total_reporting: "Total number of reports",
  HEX_total_user: "Total number of 311 users",
  HEX_weighted_radius_of_gyration: "Mobility",
  HEX_weighted_average_distance:
    "Weighted average distance between reported locations",
  HEX_weighted_HEX_coverage: "Weighted number of hexagons covered",
  HEX_weighted_max_home_distance: "Weighted max home distance",
  HEX_weighted_mean_home_distance: "Weighted mean home distance",
  HEX_weighted_median_home_distance: "Median distance from home",
  HEX_weighted_subject_coverage: "Weighted number of subjects reported",
  HEX_weighted_subject_hhi: "Weighted subject reversed HHI",
  HEX_weighted_num_reporting_2015: "Weighted number of reporting in 2015",
  HEX_normalized_total_311_per_100: "Number of 311 reports per 100 population",
};

const IVDict = [
  { Name: "Poverty Index", Value: "poverty_index" },
  { Name: "Total number of reports", Value: "HEX_total_reporting" },
  { Name: "Total number of 311 users", Value: "HEX_total_user" },
  // Mobility
  {
    Name: "Mobility",
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
  // {
  //   Name: "Weighted max home distance",
  //   Value: "HEX_weighted_max_home_distance",
  // },
  // {
  //   Name: "Weighted mean home distance",
  //   Value: "HEX_weighted_mean_home_distance",
  // },
  {
    Name: "Median distance from home",
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

const IVDictObj = {
  poverty_index: "Poverty Index",
  HEX_total_reporting: "Total number of reports",
  HEX_total_user: "Total number of 311 users",
  HEX_weighted_radius_of_gyration: "Mobility",
  HEX_weighted_average_distance:
    "Weighted average distance between reported locations",
  HEX_weighted_HEX_coverage: "Weighted number of hexagons covered",
  HEX_weighted_max_home_distance: "Weighted max home distance",
  HEX_weighted_mean_home_distance: "Weighted mean home distance",
  HEX_weighted_median_home_distance: "Median distance from home",
  HEX_weighted_subject_coverage: "Weighted number of subjects reported",
  HEX_weighted_subject_hhi: "Weighted subject reversed HHI",
  HEX_weighted_num_reporting_2015: "Weighted number of reporting in 2015",
  HEX_normalized_total_311_per_100: "Number of 311 reports per 100 population",
}; // end of IVDictObj

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

const SubjectDictObj = {
  all: "All subjects",
  Mayors_24_Hour_Hotline: "Mayors 24 Hour Hotline",
  Consumer_Affairs_and_Licensing: "Consumer Affair and Licensing",
  Boston_Water_and_Sewer_Commission: "Boston Water and Sewer Commission",
  Public_Works_Department: "Public Works Department",
  Inspectional_Services: "Inspectional Services",
  Neighborhood_Services: "Neighborhood Services",
  Property_Management: "Property Management",
  Boston_Public_School: "Boston Public School",
  Transportation_Traffic_Division: "Transportation Traffic Division",
  Animal_Control: "Animal Control",
  Boston_Police_Department: "Boston Police Department",
  Parks_and_Recreation_Department: "Parks and Recreation Department",
  Civil_Rights: "Civil Rights",
}; // end of SubjectDictObj

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
  COLOR_1,
  COLOR_10,
  COLOR_11,
  COLOR_2,
  COLOR_3,
  COLOR_4,
  COLOR_5,
  COLOR_6,
  COLOR_7,
  COLOR_8,
  COLOR_9,
  COLOR_NULL,
  DVDict,
  DVDictObj,
  freqDict,
  freqDictObj,
  IVDict,
  IVDictObj,
  NUM_OF_HEX_COLORS,
  offcanvasStyle,
  SubjectDict,
  SubjectDictObj,
  userTypeDict,
  userTypeDictObj,
};
