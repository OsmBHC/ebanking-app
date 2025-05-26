import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/customer.model';
import { CommonModule } from '@angular/common';
import { AccountService } from '../services/account.service';
import { Account, AccountDetails } from '../models/account.model';

@Component({
  selector: 'app-customer-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-accounts.component.html',
  styleUrl: './customer-accounts.component.css'
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer!: Customer;
  accounts: Account[] = [];
  accountDetails: { [key: string]: AccountDetails } = {};
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.loading = true;
    this.accountService.getAccountsByCustomerId(+this.customerId).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.loading = false;
        this.accounts.forEach(account => this.loadAccountDetails(account.id));
      },
      error: (err) => {
        this.errorMessage = 'Failed to load accounts: ' + err.message;
        this.loading = false;
      }
    });
  }

  loadAccountDetails(accountId: string): void {
    this.accountService.getAccount(accountId, 0, 5).subscribe({
      next: (details) => {
        this.accountDetails[accountId] = details;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load account details for ' + accountId + ': ' + err.message;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/customers']);
  }
}