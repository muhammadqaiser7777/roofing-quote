import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  faqs: FaqItem[] = [
    {
      question: 'How does the roofing quote process work?',
      answer: 'Fill out our detailed form with your roofing project information. We securely process your data and connect you with trusted contractors in your area who will provide personalized quotes.',
      isOpen: false
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Yes, we take privacy seriously. Your information is encrypted and only shared with licensed, insured contractors we have verified. We never sell your data to third parties.',
      isOpen: false
    },
    {
      question: 'How do you select contractors?',
      answer: 'We partner only with experienced, trusted roofing professionals who have proven track records, positive customer reviews, and meet our quality standards. All contractors undergo background checks.',
      isOpen: false
    },
    {
      question: 'How long does it take to get quotes?',
      answer: 'Most customers receive initial quotes within 24-48 hours. The exact timeline depends on your location and the complexity of your project.',
      isOpen: false
    },
    {
      question: 'What types of roofing services do you cover?',
      answer: 'We cover all major roofing services including installation, repair, replacement, maintenance, and emergency repairs for various roof types like asphalt shingle, metal, tile, and flat roofs.',
      isOpen: false
    },

    {
      question: 'What if I\'m not satisfied with the quotes?',
      answer: 'If you\'re not satisfied with the quotes received, you can request additional contractors or modify your project details. We\'re committed to finding the right match for your needs.',
      isOpen: false
    },
    {
      question: 'How do I choose the right contractor?',
      answer: 'Consider factors like licensing, insurance, experience, customer reviews, and communication style. We provide contractor profiles to help you make an informed decision.',
      isOpen: false
    },
    {
      question: 'What information do I need to provide?',
      answer: 'Basic project details including roof type, property type, project nature (install/repair/replace), timeline, and contact information. More details help contractors provide accurate quotes.',
      isOpen: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
