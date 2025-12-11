export class MenuItem {
  dishName: string;
  description: string;
  course: string;
  price: number;

  constructor(dishName: string, description: string, course: string, price: number) {
    this.dishName = dishName;
    this.description = description;
    this.course = course;
    this.price = price;
  }
}

// Type for course averages
export interface CourseAverage {
  course: string;
  average: number;
  count: number;
}