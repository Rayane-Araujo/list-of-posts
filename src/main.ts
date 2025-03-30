import { bootstrapApplication } from '@angular/platform-browser';
import { PostComponent } from './app/pages/post/post.component';


bootstrapApplication(PostComponent)
  .catch((err) => console.error(err));
