/**
 * Which side of the road a country drives on. "Left" = left-hand traffic
 * (steering wheel on the right). GeoGuessr tell: look at the car's shadow,
 * road markings, and which side bus stops / driveways favour.
 */
export type Side = "Left" | "Right";

export interface DrivingEntry {
  country: string;
  side: Side;
}

export const DRIVING: DrivingEntry[] = [
  // Left-hand traffic
  { country: "United Kingdom", side: "Left" },
  { country: "Ireland", side: "Left" },
  { country: "Japan", side: "Left" },
  { country: "Australia", side: "Left" },
  { country: "New Zealand", side: "Left" },
  { country: "India", side: "Left" },
  { country: "South Africa", side: "Left" },
  { country: "Thailand", side: "Left" },
  { country: "Indonesia", side: "Left" },
  { country: "Malaysia", side: "Left" },
  { country: "Kenya", side: "Left" },
  { country: "Cyprus", side: "Left" },
  { country: "Malta", side: "Left" },
  { country: "Sri Lanka", side: "Left" },
  { country: "Pakistan", side: "Left" },
  { country: "Nepal", side: "Left" },
  // Right-hand traffic
  { country: "Brazil", side: "Right" },
  { country: "United States", side: "Right" },
  { country: "Canada", side: "Right" },
  { country: "Mexico", side: "Right" },
  { country: "Argentina", side: "Right" },
  { country: "France", side: "Right" },
  { country: "Germany", side: "Right" },
  { country: "Spain", side: "Right" },
  { country: "Portugal", side: "Right" },
  { country: "Italy", side: "Right" },
  { country: "Netherlands", side: "Right" },
  { country: "Poland", side: "Right" },
  { country: "Russia", side: "Right" },
  { country: "Turkey", side: "Right" },
  { country: "China", side: "Right" },
  { country: "South Korea", side: "Right" },
  { country: "Vietnam", side: "Right" },
  { country: "Philippines", side: "Right" },
  { country: "Nigeria", side: "Right" },
  { country: "Egypt", side: "Right" },
];
