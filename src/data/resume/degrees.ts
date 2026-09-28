export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

const degrees: Degree[] = [
  {
    school: 'East Point College of Engineering & Technology, Bengaluru (VTU)',
    degree: 'B.E. Computer Science & Engineering · CGPA 7.66',
    link: 'https://eastpoint.ac.in',
    year: 2025,
  },
  {
    school: 'MVJ College of Engineering, Bengaluru',
    degree: 'Pre-University Course (PCMC)',
    link: 'https://mvjce.edu.in',
    year: 2021,
  },
];

export default degrees;
