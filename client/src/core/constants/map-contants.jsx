const offcanvasStyle = {
  "--bs-offcanvas-width": "60wh",
};

const userTypeDict = [
  { Name: "Residents and Government Employees", Value: "all" },
  { Name: "Residents Only", Value: "non_gov" },
  // { Name: "Residents and Unsure", Value: "non_gov_unsure" },
];

const userTypeDictObj = {
  all: "Residents and Government Employees",
  non_gov: "Residents Only",
  // non_gov_unsure: "Residents and Unsure",
};

const freqDict = [
  { Name: "Both One-time and Repeat Users", Value: "all" },
  { Name: "Repeat Users Only", Value: "heavy" },
];

const freqDictObj = {
  all: "Both One-time and Repeat Users",
  heavy: "Repeat Users Only",
};

const DVDict = [
  // Reporting Frequency
  { Name: "Number of 311 Reports", 
    Value: "HEX_total_reporting"
  },

  // User Volume
  { Name: "Number of 311 Users per Capita", 
    Value: "HEX_total_user" 
  },

  // {
  //   Name: "Weighted number of reporting in 2015",
  //   Value: "HEX_weighted_num_reporting_2015",
  // },

  // User Mobility
  // {
  //   Name: "User Mobility (variations in reporting locations)",
  //   Value: "HEX_weighted_radius_of_gyration",
  // },

  // {
  //   Name: "Weighted average distance between reported locations",
  //   Value: "HEX_weighted_average_distance",
  // },

  // Territoriality
  // {
  //   Name: "Territoriality (distance from user’s home)",
  //   Value: "HEX_weighted_median_home_distance",
  // },
  // {
  //   Name: "Weighted number of hexagons covered",
  //   Value: "HEX_weighted_HEX_coverage",
  // },
  // {
  //   Name: "Weighted max home distance",
  //   Value: "HEX_weighted_max_home_distance",
  // },
  // {
  //   Name: "Weighted mean home distance",
  //   Value: "HEX_weighted_mean_home_distance",
  // },

  // Topic Variety
  // {
  //   Name: "Topic Variety (number of reporting types covered)",
  //   Value: "HEX_weighted_subject_coverage",
  // },
  // { Name: "Weighted subject reversed HHI", 
  //   Value: "HEX_weighted_subject_hhi" 
  // },
  
  // {
  //   Name: "Number of 311 reports per 100 population",
  //   Value: "HEX_normalized_total_311_per_100",
  // },
];

const DVDictObj = {
  HEX_total_reporting: "Number of 311 Reports",
  HEX_total_user: "Number of 311 Users per Capita",

  // HEX_weighted_radius_of_gyration: "User Mobility (variations in reporting locations)",
  // HEX_weighted_median_home_distance: "Territoriality (distance from user’s home)",
  // HEX_weighted_subject_coverage: "Topic Variety (number of reporting types covered)",

  // HEX_weighted_average_distance:
  //   "Weighted average distance between reported locations",
  // HEX_weighted_HEX_coverage: "Weighted number of hexagons covered",
  // HEX_weighted_max_home_distance: "Weighted max home distance",
  // HEX_weighted_mean_home_distance: "Weighted mean home distance",
  // HEX_weighted_subject_hhi: "Weighted subject reversed HHI",
  // HEX_weighted_num_reporting_2015: "Weighted number of reporting in 2015",
  // HEX_normalized_total_311_per_100: "Number of 311 reports per 100 population",
};

const IVDict = [
  { Name: "Poverty Index", 
    Value: "poverty_index" 
  },

  // Reporting Frequency
  { Name: "Reporting Frequency (number of reports)", 
    Value: "HEX_total_reporting"
  },
  // {
  //   Name: "Weighted number of reporting in 2015",
  //   Value: "HEX_weighted_num_reporting_2015",
  // },

  // User Mobility
  {
    Name: "User Mobility (variations in reporting locations)",
    Value: "HEX_weighted_radius_of_gyration",
  },

  // {
  //   Name: "Weighted average distance between reported locations",
  //   Value: "HEX_weighted_average_distance",
  // },

  // Territoriality
  {
    Name: "Territoriality (distance from user’s home)",
    Value: "HEX_weighted_median_home_distance",
  },
  // {
  //   Name: "Weighted number of hexagons covered",
  //   Value: "HEX_weighted_HEX_coverage",
  // },
  // {
  //   Name: "Weighted max home distance",
  //   Value: "HEX_weighted_max_home_distance",
  // },
  // {
  //   Name: "Weighted mean home distance",
  //   Value: "HEX_weighted_mean_home_distance",
  // },

  // Topic Variety
  {
    Name: "Topic Variety (number of reporting types covered)",
    Value: "HEX_weighted_subject_coverage",
  },
  // { Name: "Weighted subject reversed HHI", 
  //   Value: "HEX_weighted_subject_hhi" 
  // },

  // User Volume
  { Name: "User Volume (number of users per capita)", 
    Value: "HEX_total_user" 
  },
  
  // {
  //   Name: "Number of 311 reports per 100 population",
  //   Value: "HEX_normalized_total_311_per_100",
  // },
];

const IVDictObj = {
  poverty_index: "Poverty Index",
  HEX_total_reporting: "Reporting Frequency (number of reports)",
  HEX_weighted_radius_of_gyration: "User Mobility (variations in reporting locations)",
  HEX_weighted_median_home_distance: "Territoriality (distance from user’s home)",
  HEX_weighted_subject_coverage: "Topic Variety (number of reporting types covered)",
  HEX_total_user: "User Volume (number of users per capita)",

  // HEX_weighted_average_distance:
  //   "Weighted average distance between reported locations",
  // HEX_weighted_HEX_coverage: "Weighted number of hexagons covered",
  // HEX_weighted_max_home_distance: "Weighted max home distance",
  // HEX_weighted_mean_home_distance: "Weighted mean home distance",
  // HEX_weighted_subject_hhi: "Weighted subject reversed HHI",
  // HEX_weighted_num_reporting_2015: "Weighted number of reporting in 2015",
  // HEX_normalized_total_311_per_100: "Number of 311 reports per 100 population",
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

const ReportTypeDict = [
  { Name: "All report types", Value: "all" },
  { Name: "Missed trash/ recycling/ yard waste/ bulk item", 
    Value: "MISSED_TRASH_and_RECYCLING_and_YARD_WASTE_and_BULK_ITEM" 
  },
  {
    Name: "Schedule a bulk item pickup",
    Value: "SCHEDULE_A_BULK_ITEM_PICKUP",
  },
  {
    Name: "Request for recycling cart",
    Value: "REQUEST_FOR_RECYCLING_CART",
  },
  { Name: "Schedule a bulk item pickup ss", Value: "SCHEDULE_A_BULK_ITEM_PICKUP_SS" },
  { Name: "Unsatisfactory living conditions", Value: "UNSATISFACTORY_LIVING_CONDITIONS" },
  
];

const ReportTypeDictObj = {
  all: "All report types",
  MISSED_TRASH_and_RECYCLING_and_YARD_WASTE_and_BULK_ITEM: "Missed trash/ recycling/ yard waste/ bulk item",
  SCHEDULE_A_BULK_ITEM_PICKUP: "Schedule a bulk item pickup",
  REQUEST_FOR_RECYCLING_CART: "Request for recycling cart",
  SCHEDULE_A_BULK_ITEM_PICKUP_SS: "Schedule a bulk item pickup ss",
  UNSATISFACTORY_LIVING_CONDITIONS: "Unsatisfactory living conditions"
}; // end of ReportTypetDictObj


const ReasonDict = [
  { Name: "All Report Types", Value: "all" },
  { Name: "Sanitation (e.g., trash)", Value: "Sanitation"},
  { Name: "Housing (e.g., no utilities)", Value: "Housing"},
  { Name: "Highway Maintenance (e.g., potholes)", Value: "Highway_Maintenance"},
  { Name: "Code Enforcement (e.g., illegal parking)", Value: "Code_Enforcement"},
  { Name: "Trees (e.g., fallen trees)", Value: "Trees"},
];

const ReasonDictObj = {
  all: "All Report Types",
  Sanitation: "Sanitation (e.g., trash)",
  Housing: "Housing (e.g., no utilities)",
  Highway_Maintenance: "Highway Maintenance (e.g., potholes)",
  Code_Enforcement: "Code Enforcement (e.g., illegal parking)",
  Trees: "Trees (e.g., fallen trees)"
}; // end of ReasonDictObj






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
  ReportTypeDictObj,
  ReportTypeDict,
  ReasonDict,
  ReasonDictObj
};
