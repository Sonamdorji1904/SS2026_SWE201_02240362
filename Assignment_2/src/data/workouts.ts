// src/data/workouts.ts
// Static data used across the app — no backend needed

export type Workout = {
  id: string;
  name: string;
  category: string;
  duration: number; // minutes
  calories: number;
  description: string;
  steps: string[];
};

export const WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Morning Run',
    category: 'Cardio',
    duration: 30,
    calories: 280,
    description: 'A steady morning run to boost your energy for the day.',
    steps: [
      'Warm up with a 5-minute walk',
      'Run at a comfortable pace for 20 minutes',
      'Cool down with a 5-minute slow jog',
      'Stretch your legs for 5 minutes',
    ],
  },
  {
    id: '2',
    name: 'Push-Up Set',
    category: 'Strength',
    duration: 15,
    calories: 120,
    description: 'Classic push-ups to build chest, shoulder, and arm strength.',
    steps: [
      'Start in a plank position',
      'Do 3 sets of 10 push-ups',
      'Rest 60 seconds between sets',
      'Keep your back straight throughout',
    ],
  },
  {
    id: '3',
    name: 'Yoga Flow',
    category: 'Flexibility',
    duration: 20,
    calories: 90,
    description: 'A gentle yoga sequence to improve flexibility and calm the mind.',
    steps: [
      'Begin with deep breathing (2 min)',
      'Sun salutation x3',
      'Warrior poses (left and right)',
      'End with child\'s pose and savasana',
    ],
  },
  {
    id: '4',
    name: 'Jump Rope',
    category: 'Cardio',
    duration: 10,
    calories: 130,
    description: 'High-intensity jump rope session for cardio and coordination.',
    steps: [
      'Warm up with 1 minute slow jumping',
      'Jump at medium speed for 5 minutes',
      'Sprint pace for 2 minutes',
      'Cool down with 2 minutes slow jumping',
    ],
  },
  {
    id: '5',
    name: 'Plank Challenge',
    category: 'Core',
    duration: 10,
    calories: 80,
    description: 'Core-strengthening plank holds to build a solid midsection.',
    steps: [
      'Standard plank: 3 x 30 seconds',
      'Side plank left: 2 x 20 seconds',
      'Side plank right: 2 x 20 seconds',
      'Rest 30 seconds between sets',
    ],
  },
  {
    id: '6',
    name: 'Cycling',
    category: 'Cardio',
    duration: 45,
    calories: 380,
    description: 'Outdoor or stationary bike ride for endurance and leg strength.',
    steps: [
      'Adjust your seat height properly',
      'Warm up at low resistance for 5 min',
      'Cycle at moderate intensity for 35 min',
      'Cool down at low resistance for 5 min',
    ],
  },
];

export const CATEGORIES = ['All', 'Cardio', 'Strength', 'Flexibility', 'Core'];

export type LogEntry = {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  calories: number;
  duration: number;
};
