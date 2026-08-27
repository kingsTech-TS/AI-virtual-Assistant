import type { DepartmentOption } from "@/types/auth";

export interface EKSUFaculty {
  name: string;
}

export const EKSU_FACULTIES: string[] = [
  "College of Medicine",
  "Faculty of Law",
  "Faculty of Computing and Information Engineering",
  "Faculty of Engineering",
  "Faculty of Communication and Media Studies",
  "Faculty of Environmental Design and Management",
  "Faculty of Management Sciences",
  "Faculty of Social Sciences",
  "Faculty of Science",
  "Faculty of Arts",
  "Faculty of Agriculture",
  "Faculty of Education",
  "Faculty of Multidisciplinary Studies",
];

export const EKSU_DEPARTMENTS: DepartmentOption[] = [
  // College of Medicine
  {
    id: "dept-com-mbbs",
    name: "Medicine and Surgery",
    code: "MBBS",
    faculty: "College of Medicine",
  },
  {
    id: "dept-com-nursing",
    name: "Nursing Science",
    code: "NURS",
    faculty: "College of Medicine",
  },
  {
    id: "dept-com-mls",
    name: "Medical Laboratory Science",
    code: "MLS",
    faculty: "College of Medicine",
  },
  {
    id: "dept-com-anatomy",
    name: "Anatomy",
    code: "ANAT",
    faculty: "College of Medicine",
  },
  {
    id: "dept-com-physiology",
    name: "Physiology",
    code: "PHYS",
    faculty: "College of Medicine",
  },

  // Faculty of Law
  {
    id: "dept-law-law",
    name: "Law",
    code: "LAW",
    faculty: "Faculty of Law",
  },

  // Faculty of Computing and Information Engineering
  {
    id: "dept-comp-cs",
    name: "Computer Science",
    code: "COS",
    faculty: "Faculty of Computing and Information Engineering",
  },
  {
    id: "dept-comp-cyber",
    name: "Cyber Security",
    code: "CYB",
    faculty: "Faculty of Computing and Information Engineering",
  },
  {
    id: "dept-comp-ai",
    name: "Artificial Intelligence",
    code: "AI",
    faculty: "Faculty of Computing and Information Engineering",
  },

  // Faculty of Engineering
  {
    id: "dept-eng-agric",
    name: "Agricultural and Bio-Resources Engineering",
    code: "ABE",
    faculty: "Faculty of Engineering",
  },
  {
    id: "dept-eng-civil",
    name: "Civil Engineering",
    code: "CIV",
    faculty: "Faculty of Engineering",
  },
  {
    id: "dept-eng-comp",
    name: "Computer Engineering",
    code: "CPE",
    faculty: "Faculty of Engineering",
  },
  {
    id: "dept-eng-elect",
    name: "Electrical and Electronic Engineering",
    code: "EEE",
    faculty: "Faculty of Engineering",
  },
  {
    id: "dept-eng-mech",
    name: "Mechanical Engineering",
    code: "MEC",
    faculty: "Faculty of Engineering",
  },
  {
    id: "dept-eng-mechat",
    name: "Mechatronics Engineering",
    code: "MCT",
    faculty: "Faculty of Engineering",
  },

  // Faculty of Communication and Media Studies
  {
    id: "dept-comm-masscomm",
    name: "Mass Communication",
    code: "MAC",
    faculty: "Faculty of Communication and Media Studies",
  },
  {
    id: "dept-comm-journalism",
    name: "Journalism and Media Studies",
    code: "JMS",
    faculty: "Faculty of Communication and Media Studies",
  },
  {
    id: "dept-comm-broadcast",
    name: "Broadcasting",
    code: "BRD",
    faculty: "Faculty of Communication and Media Studies",
  },
  {
    id: "dept-comm-pr",
    name: "Public Relations and Advertising",
    code: "PRA",
    faculty: "Faculty of Communication and Media Studies",
  },

  // Faculty of Environmental Design and Management
  {
    id: "dept-env-arch",
    name: "Architecture",
    code: "ARC",
    faculty: "Faculty of Environmental Design and Management",
  },
  {
    id: "dept-env-building",
    name: "Building Technology",
    code: "BLD",
    faculty: "Faculty of Environmental Design and Management",
  },
  {
    id: "dept-env-estate",
    name: "Estate Management",
    code: "EST",
    faculty: "Faculty of Environmental Design and Management",
  },
  {
    id: "dept-env-qty",
    name: "Quantity Surveying",
    code: "QTY",
    faculty: "Faculty of Environmental Design and Management",
  },
  {
    id: "dept-env-urp",
    name: "Urban and Regional Planning",
    code: "URP",
    faculty: "Faculty of Environmental Design and Management",
  },

  // Faculty of Management Sciences
  {
    id: "dept-mgt-acc",
    name: "Accounting",
    code: "ACC",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-baf",
    name: "Banking and Finance",
    code: "BAF",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-busad",
    name: "Business Administration",
    code: "BUS",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-coop",
    name: "Cooperative and Rural Development",
    code: "CRD",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-entre",
    name: "Entrepreneurship",
    code: "ENT",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-irpm",
    name: "Industrial Relations and Personnel Management",
    code: "IRP",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-insure",
    name: "Insurance",
    code: "INS",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-mktg",
    name: "Marketing",
    code: "MKT",
    faculty: "Faculty of Management Sciences",
  },
  {
    id: "dept-mgt-actuarial",
    name: "Actuarial Science",
    code: "ACT",
    faculty: "Faculty of Management Sciences",
  },

  // Faculty of Social Sciences
  {
    id: "dept-soc-econs",
    name: "Economics",
    code: "ECO",
    faculty: "Faculty of Social Sciences",
  },
  {
    id: "dept-soc-geo",
    name: "Geography and Planning Science",
    code: "GPS",
    faculty: "Faculty of Social Sciences",
  },
  {
    id: "dept-soc-pol",
    name: "Political Science",
    code: "POL",
    faculty: "Faculty of Social Sciences",
  },
  {
    id: "dept-soc-psy",
    name: "Psychology",
    code: "PSY",
    faculty: "Faculty of Social Sciences",
  },
  {
    id: "dept-soc-soc",
    name: "Sociology",
    code: "SOC",
    faculty: "Faculty of Social Sciences",
  },
  {
    id: "dept-soc-tourism",
    name: "Tourism and Hospitality Management",
    code: "THM",
    faculty: "Faculty of Social Sciences",
  },
  {
    id: "dept-soc-envmgt",
    name: "Environmental Management",
    code: "EVM",
    faculty: "Faculty of Social Sciences",
  },

  // Faculty of Science
  {
    id: "dept-sci-bioch",
    name: "Biochemistry",
    code: "BCH",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-chem",
    name: "Chemistry",
    code: "CHM",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-geology",
    name: "Geology",
    code: "GEO",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-indchem",
    name: "Industrial Chemistry",
    code: "ICH",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-math",
    name: "Mathematics",
    code: "MAT",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-microbio",
    name: "Microbiology",
    code: "MCB",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-physics",
    name: "Physics",
    code: "PHY",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-plantbio",
    name: "Plant Science and Biotechnology",
    code: "PSB",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-slt",
    name: "Science Laboratory Technology",
    code: "SLT",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-stat",
    name: "Statistics",
    code: "STA",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-zoology",
    name: "Zoology and Environmental Biology",
    code: "ZOO",
    faculty: "Faculty of Science",
  },
  {
    id: "dept-sci-geophys",
    name: "Geophysics",
    code: "GPY",
    faculty: "Faculty of Science",
  },

  // Faculty of Arts
  {
    id: "dept-arts-english",
    name: "English and Literary Studies",
    code: "ELS",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-french",
    name: "French",
    code: "FRE",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-his",
    name: "History and International Studies",
    code: "HIS",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-ling",
    name: "Linguistics and Nigerian Languages",
    code: "LIN",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-philo",
    name: "Philosophy",
    code: "PHI",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-religion",
    name: "Religious Studies",
    code: "REL",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-theatre",
    name: "Theatre and Media Arts",
    code: "TMA",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-yoruba",
    name: "Yoruba",
    code: "YOR",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-arabic",
    name: "Arabic and Islamic Studies",
    code: "ARS",
    faculty: "Faculty of Arts",
  },
  {
    id: "dept-arts-crs",
    name: "Christian Religious Studies",
    code: "CRS",
    faculty: "Faculty of Arts",
  },

  // Faculty of Agriculture
  {
    id: "dept-agri-agec",
    name: "Agricultural Economics and Extension Services",
    code: "AEC",
    faculty: "Faculty of Agriculture",
  },
  {
    id: "dept-agri-aphs",
    name: "Animal Production and Health",
    code: "APH",
    faculty: "Faculty of Agriculture",
  },
  {
    id: "dept-agri-chd",
    name: "Crop, Horticulture and Landscape Design",
    code: "CHD",
    faculty: "Faculty of Agriculture",
  },
  {
    id: "dept-agri-fam",
    name: "Fisheries and Aquaculture Management",
    code: "FAM",
    faculty: "Faculty of Agriculture",
  },
  {
    id: "dept-agri-fwem",
    name: "Forestry, Wildlife and Environmental Management",
    code: "FWE",
    faculty: "Faculty of Agriculture",
  },
  {
    id: "dept-agri-srem",
    name: "Soil Resources and Environmental Management",
    code: "SRE",
    faculty: "Faculty of Agriculture",
  },
  {
    id: "dept-agri-fst",
    name: "Food Science and Technology",
    code: "FST",
    faculty: "Faculty of Agriculture",
  },

  // Faculty of Education
  {
    id: "dept-edu-adult",
    name: "Adult Education",
    code: "AED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-agri",
    name: "Agricultural Science Education",
    code: "ASE",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-english",
    name: "English Education",
    code: "EED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-french",
    name: "French Education",
    code: "FED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-yoruba",
    name: "Yoruba Education",
    code: "YED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-crs",
    name: "Education Christian Religious Studies",
    code: "ECR",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-ars",
    name: "Education Arabic Studies",
    code: "EAR",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-his",
    name: "Education History",
    code: "EHI",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-bio",
    name: "Biology Education",
    code: "BED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-math",
    name: "Mathematics Education",
    code: "MED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-chem",
    name: "Chemistry Education",
    code: "CED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-sci",
    name: "Basic/Integrated Science Education",
    code: "SED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-comp",
    name: "Computer Science Education",
    code: "CSE",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-phys",
    name: "Physics Education",
    code: "PED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-social",
    name: "Social Studies",
    code: "SOS",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-econs",
    name: "Economics Education",
    code: "ECE",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-pol",
    name: "Political Science Education",
    code: "PSE",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-geo",
    name: "Geography Education",
    code: "GED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-lis",
    name: "Library and Information Science",
    code: "LIS",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-mechtech",
    name: "Mechanical Technology",
    code: "MTC",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-bwtech",
    name: "Building and Woodwork Technology",
    code: "BWT",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-elettech",
    name: "Electrical/Electronic Technology",
    code: "EET",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-bused",
    name: "Business Education",
    code: "BSE",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-edtech",
    name: "Educational Technology",
    code: "ETC",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-gc",
    name: "Guidance and Counselling",
    code: "GCD",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-ecce",
    name: "Nursery & Primary/Early Childhood Education",
    code: "ECC",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-tme",
    name: "Test, Measurement and Evaluation",
    code: "TME",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-hkhe",
    name: "Human Kinetics/Physical and Health Education",
    code: "HKE",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-hed",
    name: "Health Education",
    code: "HED",
    faculty: "Faculty of Education",
  },
  {
    id: "dept-edu-edmgt",
    name: "Educational Management",
    code: "EMG",
    faculty: "Faculty of Education",
  },

  // Faculty of Multidisciplinary Studies
  {
    id: "dept-multi-iss",
    name: "Intelligence and Security Studies",
    code: "ISS",
    faculty: "Faculty of Multidisciplinary Studies",
  },
  {
    id: "dept-multi-ir",
    name: "International Relations",
    code: "IRL",
    faculty: "Faculty of Multidisciplinary Studies",
  },
  {
    id: "dept-multi-masscomm",
    name: "Mass Communication",
    code: "MSC",
    faculty: "Faculty of Multidisciplinary Studies",
  },
  {
    id: "dept-multi-pcr",
    name: "Peace and Conflict Resolution",
    code: "PCR",
    faculty: "Faculty of Multidisciplinary Studies",
  },
  {
    id: "dept-multi-pubadm",
    name: "Public Administration",
    code: "PAD",
    faculty: "Faculty of Multidisciplinary Studies",
  },
  {
    id: "dept-multi-sowk",
    name: "Social Work",
    code: "SOW",
    faculty: "Faculty of Multidisciplinary Studies",
  },
];
