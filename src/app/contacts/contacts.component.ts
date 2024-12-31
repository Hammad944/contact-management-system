import { Component } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { ContactsEnum } from '../shared/API_ENPOINTS_ENUMS/contacts.enum';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { User } from '../shared/models/contact.model';
import { ContactDetailComponent } from "./contact-detail/contact-detail.component";

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [FormsModule, CommonModule, ContactDetailComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  contacts: User[] = [];
  selectedContact!: User;
  page: number = 1;
  contactsPerPage: number = 11;
  totalContacts: number = 0;
  constructor(private httpServvice: HttpService) {
    this.LoadContacts(); // we can call it on in onInit but i just want it to be available early
  }
  LoadContacts() {
    this.httpServvice.get<User[]>(ContactsEnum.GET_CONTACTS_LIST).subscribe({
      next: (res: User[]) => {
        this.contacts = res && res.length ? [...res] : []
        this.totalContacts = res.length;
      },
      error: (err: any) => {
        console.error(err, "Error in reteriving contacts.")
      }
    })
  }
  showDetail(contact: User) {
    this.selectedContact = { ...contact }
  }

  searchQuery: string = '';
  get filteredContacts() {
    const filtered = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (contact.email && contact.email.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
      (contact.phone && contact.phone.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );

    const start = (this.page - 1) * this.contactsPerPage;
    const end = this.page * this.contactsPerPage;
    return filtered.slice(start, end);
  }
  get totalPages() {
    return Math.ceil(this.totalContacts / this.contactsPerPage);
  }
  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }
  prevPage() {
    if (this.page > 1) {
      this.page--;
    }
  }
}
