import { BillpaymentsService } from './billpayments.service';
import { BillpaymentDto } from './dto/billpayments.dto';
export declare class BillpaymentsController {
    private billpaymentService;
    private logger;
    constructor(billpaymentService: BillpaymentsService);
    buyInternetData(bidDto: BillpaymentDto): Promise<any>;
    listDataBundle(ldbDto: BillpaymentDto): Promise<any>;
}
