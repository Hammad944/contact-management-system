import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent implements OnChanges {
  contact = {
    name: 'Johanna Stevens',
    avatar: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    designation: 'UI/UX Designer',
    bio: 'When I first got into the advertising, I was looking for the magical combination that would put website into the top search engine rankings',
    email: 'johanna.stevens@gmail.com',
    dial: 'j.stevens@ymsg.com',
    meeting: 'http://go.betacall.com/meet/j.stevens',
    phone: '439-582-1578',
    socialLinks: {
      facebook: '#',
      twitter: '#',
      pinterest: '#',
      instagram: '#',
      linkedin: '#'
    }
  };
  @Input() selectedContact!: any;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes["selectedContact"].currentValue) {
      //including some dummy data here 
      this.contact = { ...changes["selectedContact"].currentValue, meeting: 'http://go.betacall.com/meet/j.stevens', bio: 'When I first got into the advertising, I was looking for the magical combination that would put website into the top search engine rankings', };
    }
  }

}
