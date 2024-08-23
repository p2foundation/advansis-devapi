export class CreateTransactionDto {
  readonly userId: string;
  readonly merchantId?: string;
  readonly merchantName?: string;
  transType: string; // 'airtime' or 'data'
  serviceType?: String; // debit|credit|reverse wallet
  customerName?: String;
  customerEmail?: String;
  customerPhone?: String;
  serviceTransId?: String; // 5F9MGT61D7K6
  transMessage?: String; // Transaction Successful|Failed|Completed
  paymentMethod?: String; // momo, visa, mpesa
  paymentStatus?: String; // enum { pending, complete }
  currentBalance?: String;
  balanceBefore?: String;
  balanceAfter?: String;
  reward?: String;
  commentary?: String;
  amount?: number;
  currency?: string;
  localTransId?: String;
  amountPaid?: String;
  charge?: String;
  recipientNumber?: String;
  senderNumber?: String;
  transDescription?: String;
  transStatus?: string; // 'pending', 'completed', 'failed'
  referrerClientId?: string;
  transactionId: string;
  networkOperator?: string; // network operator like MTN, AIRTEL, VODAFONE
}
