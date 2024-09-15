import { Component } from '@angular/core';
import { Data, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { config, lastValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'prueba2',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './prueba2.component.html',
  //styleUrl: './app.component.css'
})
export class prueba2Component {

  constructor(private http: HttpClient) { }

  title = 'prueba2';
  email: string = '';
  name: string = '';
  users: any[] = [];

  async onSubmit() {

    const user = {
      email: this.email,
      name: this.name,
    };
    console.log(user);
    this.users.push(user);


  }
  async traerDatos() {
    try {
      const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Nsb3VkLmdvb2dsZS5jb20vd29ya3N0YXRpb25zIiwiYXVkIjoiaWR4LXBva2Vtb25nYW1lYXBpLTE3MjUyOTI1ODI5NTMuY2x1c3Rlci1yY3loZWV0eW1uZ3Q0cXg1ZnBzd3VhM3J5NC5jbG91ZHdvcmtzdGF0aW9ucy5kZXYiLCJpYXQiOjE3MjU5NDUzNTMsImV4cCI6MTcyNTk0ODk1M30.o3b5tyR0OuQXwYAFCG7O78ROG2mGAmW4wBNU-v_o_ma1RbQnoLWQf8LdN1XZgUlJ75zn6IxyTMvXqWl5jqlY7K2P4ssCBEsICQMf9imtQACBPVSCFhQk1kgaHXzGOn5OT72jhkIW33K6dHQc-cFolw4xJPG0K0ltqLs4bEqrtvk00OJWRAEUCYkjAYdCjscfSLwb3VGUCjI2qGxKEW42tWJo9xpIJxgpTMTsQi5XV5ehVGi9IUbsNZ2bkvSt-LJcEIB4KgRlLWlffHtiCa26Q8n50-OxcdADfmK9iz3xYMne4NQci5b0NAEu1P6mW5YufsD5O5YQn1_-Hze9Rpozgg'; // Reemplaza esto con tu token real

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      const response = await lastValueFrom(this.http.get<Data>(`https://3000-idx-pokemongameapi-1725292582953.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/pokemon-api/5`, { headers, withCredentials: true }));
      if (!response) return null;
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error
    }
  }
  /*async ngOnInit() {
    this.users = await this.prisma.user.findMany();
  }*/


}