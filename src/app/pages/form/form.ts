import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {
  currentStep: number = 1;
  totalSteps: number = 9;
  roofingType: string = '';
  ProjectNature: string = '';
  homeOwner: string = '';
  propertyType: string = '';
  ProjectStatus: string = '';
  Purchasetimeframe: string = '';
  firstName: string = '';
  lastName: string = '';
  state: string = '';
  zip: string = '';
  phone: string = '';
  email: string = '';
  city: string = '';
  address: string = '';
  Timetocall: string = '';
  BriefRequirement: string = '';
  agreement: boolean = true;
  ipaddress: string = '';
  universalLeadid: string = '';
  xxTrustedFormCertUrl: string = '';
  aff_id: string = '';
  transaction_id: string = '';
  sub_aff_id: string = '';
  isValidatingEmail: boolean = false;
  isValidatingZip: boolean = false;
  isValidatingIP: boolean = false;
  isUSCitizen: boolean = true;
  showThankYou: boolean = false;
  private leadiDPollTimer: any = null;
  private trustedFormPollTimer: any = null;
  private trustedFormInjected = false;

  areaCodesUS = [
    // Alabama
    205, 251, 256, 334, 659,
    // Alaska
    907,
    // Arizona
    480, 520, 602, 623, 928,
    // Arkansas
    479, 501, 870,
    // California
    209, 213, 279, 310, 323, 341, 408, 415, 424, 442, 510, 530, 559,
    562, 619, 626, 650, 657, 661, 669, 707, 714, 747, 760, 805, 818,
    820, 831, 858, 909, 916, 925, 949, 951, 628,
    // Colorado
    303, 719, 720, 970,
    // Connecticut
    203, 475, 860, 959,
    // Delaware
    302,
    // District of Columbia
    202,
    // Florida
    239, 305, 321, 352, 386, 407, 561, 689, 727, 754, 772, 786,
    813, 850, 863, 904, 941, 954,
    // Georgia
    229, 404, 470, 478, 678, 706, 762, 770, 912,
    // Hawaii
    808,
    // Idaho
    208, 986,
    // Illinois
    217, 224, 309, 312, 331, 464, 618, 630, 708, 773, 815, 847, 872,
    // Indiana
    219, 260, 317, 463, 574, 765, 812, 930,
    // Iowa
    319, 515, 563, 641, 712,
    // Kansas
    316, 620, 785, 913,
    // Kentucky
    270, 364, 502, 606, 859,
    // Louisiana
    225, 318, 337, 504, 985,
    // Maine
    207,
    // Maryland
    240, 301, 410, 443, 667,
    // Massachusetts
    339, 351, 413, 508, 617, 774, 781, 857, 978,
    // Michigan
    231, 248, 269, 313, 517, 586, 616, 734, 810, 906, 947, 989,
    // Minnesota
    218, 320, 507, 612, 651, 763, 952,
    // Mississippi
    228, 601, 662, 769,
    // Missouri
    314, 417, 573, 636, 660, 816,
    // Montana
    406,
    // Nebraska
    308, 402, 531,
    // Nevada
    702, 725, 775,
    // New Hampshire
    603,
    // New Jersey
    201, 551, 609, 640, 732, 848, 856, 862, 908, 973,
    // New Mexico
    505, 575,
    // New York
    212, 315, 332, 347, 516, 518, 585, 607, 631, 646, 716,
    718, 838, 845, 914, 917, 929, 934,
    // North Carolina
    252, 336, 704, 743, 828, 910, 919, 980, 984,
    // North Dakota
    701,
    // Ohio
    216, 220, 234, 330, 380, 419, 440, 513, 567, 614, 740, 937,
    // Oklahoma
    405, 539, 580, 918,
    // Oregon
    458, 503, 541, 971,
    // Pennsylvania
    215, 223, 267, 272, 412, 445, 484, 570, 610, 717, 724, 814, 878,
    // Rhode Island
    401,
    // South Carolina
    803, 839, 843, 854, 864,
    // South Dakota
    605,
    // Tennessee
    423, 615, 629, 731, 865, 901, 931,
    // Texas
    210, 214, 254, 281, 325, 346, 361, 409, 430, 432, 469, 512,
    682, 713, 726, 737, 806, 817, 830, 832, 903, 915, 936, 940,
    945, 956, 972, 979,
    // Utah
    385, 435, 801,
    // Vermont
    802,
    // Virginia
    276, 434, 540, 571, 703, 757, 804, 826, 948,
    // Washington
    206, 253, 360, 425, 509, 564,
    // West Virginia
    304, 681,
    // Wisconsin
    262, 414, 534, 608, 715, 920,
    // Wyoming
    307,
    // Puerto Rico
    787, 939,
    // U.S. Virgin Islands
    340
  ];

  errors: { [key: string]: string } = {};

  constructor(private http: HttpClient, private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.fetchIPAddress();
    this.parseUrlParams();
    this.injectTrustedFormPing();
  }

  fetchIPAddress() {
    this.http.get('https://api64.ipify.org?format=json').subscribe({
      next: (data: any) => {
        this.ipaddress = data.ip;
      },
      error: () => {
        // Retry after 1 second
        setTimeout(() => this.fetchIPAddress(), 1000);
      }
    });
  }

  parseUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    this.aff_id = urlParams.get('aff_id') || '';
    this.transaction_id = urlParams.get('transaction_id') || '';
    this.sub_aff_id = urlParams.get('sub_aff_id') || '';
    if (this.aff_id || this.transaction_id || this.sub_aff_id) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  nextStep() {
    this.errors = {};

    // Inject TrustedForm script if not present, like in handleChange
    if (!document.querySelector("script[src*='trustedform.com/trustedform.js?field=xxTrustedFormCertUrl']")) {
      (function() {
        var tf = document.createElement('script');
        tf.type = 'text/javascript';
        tf.async = true;
        tf.src = (document.location.protocol === "https:" ? 'https' : 'http') +
          '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
          new Date().getTime() + Math.random();
        var s = document.getElementsByTagName('script')[0];
        if (s.parentNode) s.parentNode.insertBefore(tf, s);
      })();
    }

    // Poll for TrustedForm value
    setTimeout(() => {
      const certInput = document.querySelector("input[name='xxTrustedFormCertUrl']");
      if (certInput && (certInput as HTMLInputElement).value) {
        this.xxTrustedFormCertUrl = (certInput as HTMLInputElement).value;
      }
    }, 500);
    if (this.currentStep === 5) {
      // Validate phone first
      let phoneValid = true;
      if (!this.phone.trim()) {
        this.errors['phone'] = 'Please enter your phone number.';
        phoneValid = false;
      } else if (!/^\d{10}$/.test(this.phone)) {
        this.errors['phone'] = 'Phone number must be exactly 10 digits.';
        phoneValid = false;
      } else {
        const areaCode = parseInt(this.phone.substring(0, 3));
        if (areaCode < 200 || !this.areaCodesUS.includes(areaCode)) {
          this.errors['phone'] = 'Invalid area code. Please enter a valid US phone number.';
          phoneValid = false;
        }
      }
      if (phoneValid && this.validateEmailFormat()) {
        this.isValidatingEmail = true;
        this.validateEmailDomain().then(valid => {
          this.isValidatingEmail = false;
          if (valid) {
            if (this.currentStep < this.totalSteps) {
              this.currentStep++;
            }
          } else {
            this.errors['email'] = 'Invalid email.';
          }
        });
      }
    } else if (this.currentStep === 6) {
      if (this.validateCurrentStep()) {
        this.isValidatingZip = true;
        this.http.get(`https://steermarketeer.com/api/a9f3b2c1e7d4?zip=${this.zip}`).subscribe({
          next: (data: any) => {
            if (data.state_name === 'Unknown') {
              this.errors['zip'] = 'Invalid zip code.';
              this.isValidatingZip = false;
            } else if (data.zip_state !== this.state) {
              this.errors['zip'] = 'Invalid zip code for selected state.';
              this.isValidatingZip = false;
            } else {
              this.http.get(`https://api.zippopotam.us/us/${this.zip}`).subscribe({
                next: (data2: any) => {
                  this.city = data2.places[0]['place name'];
                  this.isValidatingZip = false;
                  if (this.currentStep < this.totalSteps) {
                    this.currentStep++;
                  }
                },
                error: () => {
                  this.isValidatingZip = false;
                  if (this.currentStep < this.totalSteps) {
                    this.currentStep++;
                  }
                }
              });
            }
          },
          error: () => {
            this.isValidatingZip = false;
            if (this.currentStep < this.totalSteps) {
              this.currentStep++;
            }
          }
        });
      }
    } else if (this.currentStep === 8) {
      this.isValidatingIP = true;
      this.http.get(`https://ipapi.co/${this.ipaddress}/json/`).subscribe({
        next: (data: any) => {
          this.isUSCitizen = data.country === "US";
          this.isValidatingIP = false;
          // Data captured logged
          if (this.currentStep < this.totalSteps) {
            this.currentStep++;
          }
          if (!this.isUSCitizen) {
            this.errors['general'] = 'This service is only for US citizens.';
          }
        },
        error: () => {
          this.isUSCitizen = true;
          this.isValidatingIP = false;
          // Data captured logged - error case
          if (this.currentStep < this.totalSteps) {
            this.currentStep++;
          }
        }
      });
    } else if (this.validateCurrentStep()) {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        if (this.currentStep === 2) {
          this.injectLeadiD();
        }
      }
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    let valid = true;
    if (this.currentStep === 1) {
      if (!this.roofingType) {
        this.errors['roofingType'] = 'Please select a roofing material.';
        valid = false;
      }
      if (!this.ProjectNature) {
        this.errors['ProjectNature'] = 'Please select the nature of your project.';
        valid = false;
      }
    } else if (this.currentStep === 2) {
      if (!this.ProjectStatus) {
        this.errors['ProjectStatus'] = 'Please select the project status.';
        valid = false;
      }
      if (!this.Purchasetimeframe) {
        this.errors['Purchasetimeframe'] = 'Please select the purchase time frame.';
        valid = false;
      }
    } else if (this.currentStep === 3) {
      if (!this.homeOwner) {
        this.errors['homeOwner'] = 'Please select if you are a home owner.';
        valid = false;
      }
      if (!this.propertyType) {
        this.errors['propertyType'] = 'Please select the property type.';
        valid = false;
      }
    } else if (this.currentStep === 4) {
      if (!this.firstName.trim()) {
        this.errors['firstName'] = 'Please enter your first name.';
        valid = false;
      } else if (!/^[a-zA-Z]+$/.test(this.firstName.trim())) {
        this.errors['firstName'] = 'First name must contain only letters.';
        valid = false;
      }
      if (!this.lastName.trim()) {
        this.errors['lastName'] = 'Please enter your last name.';
        valid = false;
      } else if (!/^[a-zA-Z]+$/.test(this.lastName.trim())) {
        this.errors['lastName'] = 'Last name must contain only letters.';
        valid = false;
      }
    } else if (this.currentStep === 5) {
      if (!this.phone.trim()) {
        this.errors['phone'] = 'Please enter your phone number.';
        valid = false;
      } else if (!/^\d{10}$/.test(this.phone)) {
        this.errors['phone'] = 'Phone number must be exactly 10 digits.';
        valid = false;
      } else {
        const areaCode = parseInt(this.phone.substring(0, 3));
        if (areaCode < 200 || !this.areaCodesUS.includes(areaCode)) {
          this.errors['phone'] = 'Invalid area code. Please enter a valid US phone number.';
          valid = false;
        }
      }
    } else if (this.currentStep === 6) {
      if (!this.state) {
        this.errors['state'] = 'Please select your state.';
        valid = false;
      }
      if (!this.zip.trim()) {
        this.errors['zip'] = 'Please enter your zip code.';
        valid = false;
      } else if (!/^\d{5}$/.test(this.zip)) {
        this.errors['zip'] = 'Zip code must be 5 digits.';
        valid = false;
      }
    } else if (this.currentStep === 7) {
      if (!this.city.trim()) {
        this.errors['city'] = 'Please enter your city.';
        valid = false;
      }
      if (!this.address.trim()) {
        this.errors['address'] = 'Please enter your address.';
        valid = false;
      }
    } else if (this.currentStep === 8) {
      if (!this.Timetocall.trim()) {
        this.errors['Timetocall'] = 'Please select the best time to call.';
        valid = false;
      }
      if (!this.BriefRequirement.trim()) {
        this.errors['BriefRequirement'] = 'Please provide a brief description.';
        valid = false;
      }
    } else if (this.currentStep === 9) {
      if (!this.agreement) {
        this.errors['agreement'] = 'You must agree to the terms and conditions.';
        valid = false;
      }
    }
    return valid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onNameKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if ((charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122)) {
      event.preventDefault();
    }
  }

  onPhoneKeyPress(event: KeyboardEvent) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onPhoneInput() {
    this.phone = this.phone.replace(/\D/g, '').substring(0, 10);
  }

  validateEmailFormat(): boolean {
    if (!this.email.trim()) {
      this.errors['email'] = 'Please enter your email.';
      return false;
    }
    if (!this.isValidEmail(this.email)) {
      this.errors['email'] = 'Please enter a valid email address.';
      return false;
    }
    return true;
  }

  async validateEmailDomain(): Promise<boolean> {
    const domain = this.email.split('@')[1];
    try {
      const response = await this.http.get(`https://8.8.8.8/resolve?name=${domain}&type=MX`).toPromise();
      return (response as any).Status !== 3;
    } catch {
      return false;
    }
  }

  async submit() {
    this.errors = {};
    if (this.validateCurrentStep()) {
      // Read values from DOM
      this.universalLeadid = (document.getElementById('leadid_token') as HTMLInputElement)?.value || '';
      this.xxTrustedFormCertUrl = (document.querySelector('input[name="xxTrustedFormCertUrl"]') as HTMLInputElement)?.value || '';

      const payload = {
        roofingType: parseInt(this.roofingType),
        ProjectNature: parseInt(this.ProjectNature),
        homeOwner: parseInt(this.homeOwner),
        Propertytype: parseInt(this.propertyType),
        ProjectStatus: parseInt(this.ProjectStatus),
        Purchasetimeframe: parseInt(this.Purchasetimeframe),
        firstName: this.firstName,
        lastName: this.lastName,
        state: this.state,
        zip: this.zip,
        phone: this.phone,
        email: this.email,
        city: this.city,
        address: this.address,
        Timetocall: this.Timetocall,
        BriefRequirement: this.BriefRequirement,
        agreement: this.agreement,
        ipaddress: this.ipaddress,
        universalLeadid: this.universalLeadid,
        xxTrustedFormCertUrl: this.xxTrustedFormCertUrl,
        aff_id: this.aff_id,
        transaction_id: this.transaction_id,
        sub_aff_id: this.sub_aff_id,
        url: window.location.href,
        browser: navigator.userAgent
      };
      this.http.post('https://get-roofing.com/api/ping-proxy.php', payload).subscribe({
        next: (response) => {
          this.showThankYou = true;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error: (error) => {
          this.errors['general'] = 'Something went wrong, please click submit again.';
        }
      });
    }
  }
  private injectLeadiD(): void {
    try {
      // Ensure the hidden input exists with the correct id and name
      let leadIdInput = document.getElementById('leadid_token') as HTMLInputElement | null;
      if (!leadIdInput) {
        const input = document.createElement('input') as HTMLInputElement;
        input.type = 'hidden';
        input.id = 'leadid_token';
        input.name = 'universal_leadid';
        document.body.appendChild(input);
        leadIdInput = input;
      }

      // Remove old script if it exists
      const oldScript = document.getElementById('LeadiDscript_campaign');
      if (oldScript) {
        oldScript.parentNode?.removeChild(oldScript);
      }

      // Ensure anchor script exists
      let anchor = document.getElementById('LeadiDscript') as HTMLScriptElement | null;
      if (!anchor) {
        anchor = document.createElement('script') as HTMLScriptElement;
        anchor.id = 'LeadiDscript';
        anchor.type = 'text/javascript';
        document.body.appendChild(anchor);
      }

      // Inject campaign script (only if anchor exists now)
      if (anchor.parentNode) {
        const s = document.createElement('script');
        s.id = 'LeadiDscript_campaign';
        s.type = 'text/javascript';
        s.async = true;
        s.src = '//create.lidstatic.com/campaign/548c86c2-3c24-2ec2-b201-274ffb0f5005.js?snippet_version=2';
        anchor.parentNode.insertBefore(s, anchor);
      }

      // Poll for value until success
      const poll = () => {
        if (this.showThankYou) return;
        const el = document.getElementById('leadid_token') as HTMLInputElement | null;
        const val = el?.value || '';
        if (val) {
          this.universalLeadid = val;
        } else {
          this.leadiDPollTimer = setTimeout(poll, 300);
        }
      };
      setTimeout(poll, 500);
    } catch (e) {
      console.error('Failed to inject LeadiD:', e);
    }
  }

  private injectTrustedForm() {
    try {
      // Avoid duplicate injection
      if (document.getElementById('trustedform-loader') || this.trustedFormInjected) return;

      const tf = document.createElement('script');
      tf.type = 'text/javascript';
      tf.async = true;
      tf.id = 'trustedform-loader';
      tf.src = (document.location.protocol === 'https:' ? 'https' : 'http') +
        '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&ping_field=xxTrustedFormPingUrl&use_tagged_consent=true&l=' +
        new Date().getTime() + Math.random();

      document.body.appendChild(tf);

      // Poll the hidden field for the value
      const poll = () => {
        if (this.showThankYou) return;
        const el = document.getElementById('xxTrustedFormCertUrl') as HTMLInputElement | null;
        const val = el?.value || '';
        if (val) {
          this.xxTrustedFormCertUrl = val;
        }
        this.trustedFormPollTimer = setTimeout(poll, 300);
      };
      this.trustedFormInjected = true;
      this.trustedFormPollTimer = setTimeout(poll, 500);
    } catch (e) {
      console.error('Failed to inject TrustedForm:', e);
    }
  }
  private injectTrustedFormPing() {
    const trustedFormPingScript = document.createElement("script");
    trustedFormPingScript.innerHTML = `
      function recordTrustedFormPing() {
        var pingUrlField = document.querySelector("input[name='xxTrustedFormPingUrl']");
        if (pingUrlField && pingUrlField.value) {
          var img = document.createElement("img");
          img.src = pingUrlField.value;
          img.style.display = "none";
          document.body.appendChild(img);
        }
      }
      window.addEventListener("beforeunload", recordTrustedFormPing);
    `;
    document.body.appendChild(trustedFormPingScript);
  }
}
