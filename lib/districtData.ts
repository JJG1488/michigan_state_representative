export interface DistrictRegion {
  id: string;
  name: string;
  color: string;
  mutedColor: string;
  population: string;
  keyIssue: string;
  candidateQuote: string;
  image: string;
}

export const districtRegions: DistrictRegion[] = [
  {
    id: "nw-detroit",
    name: "Northwest Detroit",
    color: "#060951",
    mutedColor: "#9B9DBA",
    population: "Largest population in district",
    keyIssue: "Affordability & property tax relief",
    candidateQuote: "The families who built this city deserve to afford to stay here.",
    image: "/images/detroit-skyline.jpg",
  },
  {
    id: "oak-park",
    name: "Oak Park",
    color: "#065124",
    mutedColor: "#8BB89E",
    population: "Highest voter turnout",
    keyIssue: "Educational outcomes & school investment",
    candidateQuote: "Oak Park shows up to vote — and I will show up for Oak Park.",
    image: "/images/oak-park.jpg",
  },
  {
    id: "royal-oak-twp",
    name: "Royal Oak Township",
    color: "#0D3D2B",
    mutedColor: "#8FA3B8",
    population: "Smallest, strongest community",
    keyIssue: "Infrastructure investment & community development",
    candidateQuote: "The smallest community in our district will have the biggest voice.",
    image: "/images/royal-oak-twp.jpg",
  },
];
