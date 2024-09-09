export class CreateTransactionDto {
    readonly userId: string;
    readonly type: string;
    readonly amount: number;
    readonly currency: string;
    readonly referrerClientId?: string;
    readonly operator: string;
    phoneNumber: string; // Add this line
    operatorId: string; // Add this line
    transactionId: string; // Add this line
    status: string;
    serviceCode: string;
    transMessage: string;
    serviceTransId: string;
    transStatus: string;
    balance_before: string;
    balance_after: string;
  }
  