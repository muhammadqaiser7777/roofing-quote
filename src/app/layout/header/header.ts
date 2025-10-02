import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  dropdownOpen = false;
  isScrolled = false; // ✅ FIX: Add this property

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  // ✅ Detect scroll to toggle header style
  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // ✅ Close when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    const insideDropdown = target.closest('.menu-toggle') || target.closest('.mobile-dropdown');
    if (!insideDropdown) {
      this.dropdownOpen = false;
    }
  }
}
