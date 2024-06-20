export type Todo = {
  id?: number;
  title?: string;
  description?: string;
  due_date?: string;
  status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
};
export type TOperation = "update" | "insert" | "delete" | "complete";
