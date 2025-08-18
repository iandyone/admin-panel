import { ShowcaseDataMock } from "@/types";

export const SHOWCASES_DATA: ShowcaseDataMock[] = [
  {
    id: 1,
    title: "Total orders",
    value: 2181,
    chip: {
      isPositive: true,
      value: 25,
    },
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340,
      380, 360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    id: 2,
    title: "Completed",
    value: 2013,
    chip: {
      isPositive: false,
      value: 9,
    },
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600,
      820, 780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300,
      220,
    ],
  },
  {
    id: 3,
    title: "Canceled",
    value: 57,
    chip: {
      isPositive: true,
      value: 3,
    },
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 330, 250,
    ],
  },
  {
    id: 4,
    title: "Benefits",
    value: 9500,
    chip: {
      isPositive: true,
      value: 10,
    },
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510,
      530, 520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 800,
    ],
  },
];


export const TRENDING_DATA = [
  { date: new Date(2023, 0, 4), orders: 82, month: "January", day: 4, year: 2023 },
  { date: new Date(2023, 0, 20), orders: 3, month: "January", day: 20, year: 2023 },
  { date: new Date(2023, 1, 24), orders: 52, month: "February", day: 24, year: 2023 },
  { date: new Date(2023, 1, 26), orders: 19, month: "February", day: 26, year: 2023 },
  { date: new Date(2023, 2, 23), orders: 16, month: "March", day: 23, year: 2023 },
  { date: new Date(2023, 2, 30), orders: 5, month: "March", day: 30, year: 2023 },
  { date: new Date(2023, 3, 1), orders: 94, month: "April", day: 1, year: 2023 },
  { date: new Date(2023, 3, 26), orders: 19, month: "April", day: 26, year: 2023 },
  { date: new Date(2023, 3, 27), orders: 24, month: "April", day: 27, year: 2023 },
  { date: new Date(2023, 3, 30), orders: 73, month: "April", day: 30, year: 2023 },
  { date: new Date(2023, 4, 4), orders: 94, month: "May", day: 4, year: 2023 },
  { date: new Date(2023, 4, 18), orders: 38, month: "May", day: 18, year: 2023 },
  { date: new Date(2023, 5, 20), orders: 15, month: "June", day: 20, year: 2023 },
  { date: new Date(2023, 6, 3), orders: 48, month: "July", day: 3, year: 2023 },
  { date: new Date(2023, 9, 22), orders: 34, month: "October", day: 22, year: 2023 },
  { date: new Date(2023, 9, 26), orders: 33, month: "October", day: 26, year: 2023 },
  { date: new Date(2023, 9, 27), orders: 74, month: "October", day: 27, year: 2023 },
  { date: new Date(2023, 10, 11), orders: 61, month: "November", day: 11, year: 2023 },
  { date: new Date(2023, 11, 30), orders: 70, month: "December", day: 30, year: 2023 },

  { date: new Date(2024, 0, 26), orders: 71, month: "January", day: 26, year: 2024 },
  { date: new Date(2024, 1, 3), orders: 87, month: "February", day: 3, year: 2024 },
  { date: new Date(2024, 1, 23), orders: 29, month: "February", day: 23, year: 2024 },
  { date: new Date(2024, 2, 11), orders: 55, month: "March", day: 11, year: 2024 },
  { date: new Date(2024, 5, 19), orders: 28, month: "June", day: 19, year: 2024 },
  { date: new Date(2024, 6, 2), orders: 34, month: "July", day: 2, year: 2024 },
  { date: new Date(2024, 8, 30), orders: 63, month: "September", day: 30, year: 2024 },
  { date: new Date(2024, 9, 8), orders: 38, month: "October", day: 8, year: 2024 },
  { date: new Date(2024, 9, 21), orders: 27, month: "October", day: 21, year: 2024 },

  { date: new Date(2025, 0, 1), orders: 10, month: "January", day: 1, year: 2025 },
  { date: new Date(2025, 1, 12), orders: 56, month: "February", day: 12, year: 2025 },
  { date: new Date(2025, 1, 18), orders: 43, month: "February", day: 18, year: 2025 },
  { date: new Date(2025, 2, 10), orders: 18, month: "March", day: 10, year: 2025 },
  { date: new Date(2025, 3, 2), orders: 74, month: "April", day: 2, year: 2025 },
  { date: new Date(2025, 3, 26), orders: 78, month: "April", day: 26, year: 2025 },
  { date: new Date(2025, 4, 15), orders: 64, month: "May", day: 15, year: 2025 },
  { date: new Date(2025, 4, 17), orders: 31, month: "May", day: 17, year: 2025 },
  { date: new Date(2025, 6, 27), orders: 91, month: "July", day: 27, year: 2025 },
  { date: new Date(2025, 7, 3), orders: 11, month: "August", day: 3, year: 2025 },
  { date: new Date(2025, 7, 13), orders: 39, month: "August", day: 13, year: 2025 },
  { date: new Date(2025, 7, 15), orders: 67, month: "August", day: 15, year: 2025 },
  { date: new Date(2025, 7, 27), orders: 43, month: "August", day: 27, year: 2025 },
  { date: new Date(2025, 8, 20), orders: 88, month: "September", day: 20, year: 2025 },
  { date: new Date(2025, 9, 10), orders: 57, month: "October", day: 10, year: 2025 },
  { date: new Date(2025, 10, 21), orders: 1, month: "November", day: 21, year: 2025 },
  { date: new Date(2025, 10, 23), orders: 46, month: "November", day: 23, year: 2025 },
  { date: new Date(2025, 11, 26), orders: 78, month: "December", day: 26, year: 2025 }
];
