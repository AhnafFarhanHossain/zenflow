import { connectDB } from "../../utils/connectDB";

export interface Task {
  id: number;
  title: string;
  priority: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  status: 'todo' | 'in-progress' | 'done';
  due_date: string;
  completed: boolean;
  user_id: string | undefined;
  description?: string;
  created_at?: string;
  updated_at?: string;
}