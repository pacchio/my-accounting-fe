// Transaction Description/Category Types

import { OperationType } from './transaction';

export interface Description {
  id: number;
  type: OperationType;
  description: string;
  occurrences?: number;
}

export interface DescriptionsResponse {
  earningDescription: Description[];
  expenseDescription: Description[];
}

export interface UpdateDescriptionRequest {
  id: number;
  type: OperationType;
  description: string;
}
