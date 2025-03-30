import { bootstrapApplication } from '@angular/platform-browser';
import { PostComponent } from './app/pages/post/post.component';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(PostComponent, {
  providers: [
    provideHttpClient(), 
  ]
}).catch((err) => console.error(err));
