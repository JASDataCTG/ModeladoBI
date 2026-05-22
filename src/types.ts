export type SchemaType = 'STAR' | 'SNOWFLAKE';

export interface Column {
  name: string;
  type: string;
  isKey?: boolean;
  isForeignKey?: boolean;
  references?: string; // Table name it references
  description: string;
}

export interface Table {
  id: string;
  name: string;
  type: 'FACT' | 'DIMENSION' | 'SUB_DIMENSION';
  columns: Column[];
  description: string;
  position?: { x: number; y: number }; // For canvas placing
}

export interface TeacherMessage {
  text: string;
  mood: 'happy' | 'neutral' | 'idea' | 'warning' | 'success';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExerciseOneState {
  placedTables: { [tableId: string]: 'FACT_ZONE' | 'DIM_ZONE' | null };
  correctlyPlaced: boolean | null;
  selectedConnections: { from: string; to: string }[];
}

export interface ExerciseTwoState {
  normalizedDimensions: { [dimId: string]: string | null }; // Maps subdimension to parent dimension
  correctlyLinked: boolean | null;
}
