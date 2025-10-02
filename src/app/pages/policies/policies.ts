import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyPolicy } from '../../layout/policies/company-policy/company-policy';
import { PrivacyPolicy } from '../../layout/policies/privacy-policy/privacy-policy';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [CommonModule, CompanyPolicy, PrivacyPolicy],
  templateUrl: './policies.html',
  styleUrls: ['./policies.css']
})
export class Policies implements OnInit {
  activeTab: 'company' | 'privacy' = 'company';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] === 'privacy' ? 'privacy' : 'company';
    });
  }

  showTab(tab: 'company' | 'privacy') {
    this.activeTab = tab;
    this.router.navigate([], { queryParams: { tab: tab } });
  }
}
