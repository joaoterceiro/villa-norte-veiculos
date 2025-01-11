export interface Script {
  id: string;
  type: string;
  content: string | null;
  is_active: boolean;
  version: number | null;
}