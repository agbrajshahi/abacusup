// src/data/courses.ts

export type Course = {
  id: number;
  title: string;
  tagline: string;
  description: string;
  price: string;
  priceNumber: number;
  duration: string;
  level: string;
  tag: string;
  tagColor: string;
  accent: string;
  numColor: string;
  cardBg: string;
  hoverBg: string;
  features: string[];
  whatYouLearn: string[];
  requirements: string[];
};

export const courses: Course[] = [
  {
    id: 1,
    title: "Foundation",
    tagline: "Start your Abacus journey",
    description:
      "The perfect starting point for young learners. Master basic bead movement, number recognition, and simple addition & subtraction.",
    price: "৳3,000",
    priceNumber: 3000,
    duration: "3 months",
    level: "Level 1",
    tag: "Beginner",
    tagColor: "text-emerald-600 bg-emerald-50",
    accent: "#10b981",
    numColor: "text-emerald-600",
    cardBg: "bg-emerald-50 border-emerald-200",
    hoverBg: "hover:bg-emerald-100 hover:border-emerald-300",
    features: [
      "16 live classes",
      "Interactive virtual Abacus",
      "Printable worksheets",
      "Weekly quiz & assessment",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Understand the Soroban structure",
      "Basic bead movements (upper & lower)",
      "Read and write numbers on Abacus",
      "Simple addition (1–2 digit)",
      "Simple subtraction (1–2 digit)",
    ],
    requirements: [
      "Age 5 years or above",
      "Basic number recognition (1–100)",
      "A stable internet connection",
      "No prior Abacus experience needed",
    ],
  },
  {
    id: 2,
    title: "Basic Addition",
    tagline: "Build speed and accuracy",
    description:
      "Strengthen your fundamentals with faster single-digit addition and subtraction techniques using the Soroban method.",
    price: "৳3,000",
    priceNumber: 3000,
    duration: "3 months",
    level: "Level 2",
    tag: "Beginner",
    tagColor: "text-emerald-600 bg-emerald-50",
    accent: "#14b8a6",
    numColor: "text-teal-600",
    cardBg: "bg-teal-50 border-teal-200",
    hoverBg: "hover:bg-teal-100 hover:border-teal-300",
    features: [
      "16 live classes",
      "Speed drills",
      "Interactive virtual Abacus",
      "Weekly quiz",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Fast single-digit addition",
      "Fast single-digit subtraction",
      "Bead efficiency techniques",
      "Mental visualization basics",
    ],
    requirements: [
      "Completed Level 1 (Foundation)",
      "Comfortable with numbers 1–100",
    ],
  },
  {
    id: 3,
    title: "Small Friends",
    tagline: "Master the first formula",
    description:
      "Learn the Small Friends formula — the first powerful technique for fast mental calculations when direct movement isn't possible.",
    price: "৳3,000",
    priceNumber: 3000,
    duration: "3 months",
    level: "Level 3",
    tag: "Intermediate",
    tagColor: "text-blue-600 bg-blue-50",
    accent: "#06b6d4",
    numColor: "text-cyan-600",
    cardBg: "bg-cyan-50 border-cyan-200",
    hoverBg: "hover:bg-cyan-100 hover:border-cyan-300",
    features: [
      "24 live classes",
      "Small Friends formula mastery",
      "Speed drills",
      "Progress tracking",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Small Friends (5-complement) formula",
      "Fast addition with complements",
      "Fast subtraction with complements",
      "Mental arithmetic with small friends",
    ],
    requirements: [
      "Completed Level 2",
      "Comfortable with 2-digit numbers",
    ],
  },
  {
    id: 4,
    title: "Big Friends",
    tagline: "Level up your mental math",
    description:
      "Master the Big Friends formula (10-complement) — the key to rapid multi-digit calculations without writing.",
    price: "৳3,000",
    priceNumber: 3000,
    duration: "3 months",
    level: "Level 4",
    tag: "Intermediate",
    tagColor: "text-blue-600 bg-blue-50",
    accent: "#0ea5e9",
    numColor: "text-sky-600",
    cardBg: "bg-sky-50 border-sky-200",
    hoverBg: "hover:bg-sky-100 hover:border-sky-300",
    features: [
      "24 live classes",
      "Big Friends formula mastery",
      "Combined formula practice",
      "Speed drills",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Big Friends (10-complement) formula",
      "Combining Small + Big Friends",
      "Mental addition & subtraction",
      "Multi-digit calculations",
    ],
    requirements: [
      "Completed Level 3",
      "Strong in Small Friends formula",
    ],
  },
  {
    id: 5,
    title: "Multiplication",
    tagline: "Multiply like a pro",
    description:
      "Learn fast single and double-digit multiplication using the Soroban method — no more fear of long numbers.",
    price: "৳4,000",
    priceNumber: 4000,
    duration: "3 months",
    level: "Level 5",
    tag: "Advanced",
    tagColor: "text-amber-600 bg-amber-50",
    accent: "#6366f1",
    numColor: "text-indigo-600",
    cardBg: "bg-indigo-50 border-indigo-200",
    hoverBg: "hover:bg-indigo-100 hover:border-indigo-300",
    features: [
      "24 live classes",
      "Multiplication tables 1–20",
      "Speed drills",
      "Weekly timed tests",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Single-digit × single-digit",
      "Single-digit × multi-digit",
      "Multiplication tables",
      "Speed multiplication tricks",
    ],
    requirements: [
      "Completed Level 4",
      "Strong addition & subtraction skills",
    ],
  },
  {
    id: 6,
    title: "Division",
    tagline: "Divide with confidence",
    description:
      "Master division on the Abacus — from simple remainders to long division with multi-digit divisors.",
    price: "৳4,000",
    priceNumber: 4000,
    duration: "3 months",
    level: "Level 6",
    tag: "Advanced",
    tagColor: "text-amber-600 bg-amber-50",
    accent: "#8b5cf6",
    numColor: "text-violet-600",
    cardBg: "bg-violet-50 border-violet-200",
    hoverBg: "hover:bg-violet-100 hover:border-violet-300",
    features: [
      "24 live classes",
      "Division techniques",
      "Fractions & decimals",
      "Speed drills",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Basic division with remainder",
      "Long division on Abacus",
      "Fractions & decimals",
      "Speed division tricks",
    ],
    requirements: [
      "Completed Level 5",
      "Strong in multiplication tables",
    ],
  },
  {
    id: 7,
    title: "Mental Math",
    tagline: "Calculate without the Abacus",
    description:
      "The most exciting level — perform all calculations entirely in your mind, without touching a physical or virtual Abacus.",
    price: "৳4,000",
    priceNumber: 4000,
    duration: "3 months",
    level: "Level 7",
    tag: "Expert",
    tagColor: "text-purple-600 bg-purple-50",
    accent: "#d946ef",
    numColor: "text-fuchsia-600",
    cardBg: "bg-fuchsia-50 border-fuchsia-200",
    hoverBg: "hover:bg-fuchsia-100 hover:border-fuchsia-300",
    features: [
      "32 live classes",
      "Pure mental calculation",
      "Advanced speed drills",
      "Competition-style tests",
      "Certificate on completion",
    ],
    whatYouLearn: [
      "Anzan (blind mental math)",
      "Visualize the Abacus mentally",
      "Multi-digit mental operations",
      "Competition-level speed",
    ],
    requirements: [
      "Completed Level 6",
      "Excellent command of all formulas",
    ],
  },
  {
    id: 8,
    title: "Grand Master",
    tagline: "Become a champion",
    description:
      "The highest level — prepare for national and international Abacus competitions with advanced mental math mastery.",
    price: "৳4,000",
    priceNumber: 4000,
    duration: "3 months",
    level: "Level 8",
    tag: "Master",
    tagColor: "text-rose-600 bg-rose-50",
    accent: "#f59e0b",
    numColor: "text-amber-500",
    cardBg: "bg-amber-50 border-amber-200",
    hoverBg: "hover:bg-amber-100 hover:border-amber-300",
    features: [
      "32 live classes",
      "Competition training",
      "Personal mentorship",
      "Mock competition exams",
      "Grand Master certificate",
    ],
    whatYouLearn: [
      "Advanced Anzan (mental math)",
      "Competition-level speed & accuracy",
      "Multi-operation problem solving",
      "Stage performance techniques",
    ],
    requirements: [
      "Completed Level 7",
      "Teacher recommendation",
      "Commitment for competitions",
    ],
  },
];

export function getCourseById(id: number): Course | undefined {
  return courses.find((c) => c.id === id);
}