// Common type definitions for the application

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

export interface Note {
  id: number;
  title: string;
  body: string;
  created_at: string;
  updated_at?: string;
  user_id: string | undefined;
}

export interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  user_id: string | undefined;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

// React component prop types
export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  variant?: string;
  size?: string;
  icon?: React.ReactNode;
  href?: string;
}

export interface SearchbarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

// Context types
export interface TaskFormContextType {
  showTaskForm: boolean;
  openTaskForm: (onTaskCreated?: (task: Task) => void) => void;
  closeTaskForm: () => void;
  handleTaskCreated: (newTask: Task) => void;
}

export interface NoteFormContextType {
  showNoteForm: boolean;
  editingNote: Note | null;
  openNoteForm: (onNoteCreated?: (note: Note) => void, noteToEdit?: Note | null) => void;
  closeNoteForm: () => void;
  handleNoteCreated: (newNote: Note) => void;
}

export interface ChatContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export interface AnalyticsData {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  productivity: number;
}

export interface AnalyticsContextType {
  analytics: AnalyticsData;
  refreshAnalytics: () => void;
}