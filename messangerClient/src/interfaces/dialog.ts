interface Dialog {
  peer_id: number;
  isGroupChat?: boolean;
  title?: string;
  participants?: number[];
  createdAt?: string;
  updatedAt?: string;
  accessControl?: string;
  adminUsers?: number[];
  description?: string;
}
