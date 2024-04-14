export class Expense {
    id: number;
    category: string;
    amount: number;
    date: Date;
    description: string;
    receiver: string;
    account: string;
    constructor(
        id: number,
        category: string,
        amount: number,
        date: Date,
        description: string,
        receiver: string,
        account: string,
    ) {
        this.id = id;
        this.category = category;
        this.amount = amount;
        this.date = date;
        this.description = description;
        this.receiver = receiver;
        this.account = account;
    }
    public getId(): number {
        return this.id;
    }
    public getCategory(): string {
        return this.category;
    }
    public getAmount(): number {
        return this.amount;
    }
    public getDate(): Date {
        return this.date;
    }

    public getDescription(): string {
        return this.description;
    }
    public getReceiver(): string {
        return this.receiver;
    }

    public getAccount(): string {
        return this.account;
    }
    public setDescription(description: string): void {
        this.description = description;
    }
    public setCategory(category: string): void {
        this.category = category;
    }
    public setId(id: number): void {
        this.id = id;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }
    public setDate(date: Date): void {
        this.date = date;
    }
    public setReceiver(receiver: string): void {
        this.receiver = receiver;
    }
    public setAccount(account: string): void {
        this.account = account;
    }
}
export enum Category {
    FOOD = 'Food',
    TRANSPORTATION = 'Transportation',
    ENTERTAIMENT = 'Entertainment',
    SERVICES = 'Services',
    HEALTH = 'Health',
    OTHER = 'Other',
}
