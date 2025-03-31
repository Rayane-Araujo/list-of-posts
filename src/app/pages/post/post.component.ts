import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { CommentService } from '../../service/comment.service';

interface Post {
  id: any;
  title: string;
  body: string;
}

interface Comment {
  id: any;
  postId: number;
  name: string;
  email: string;
  body: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  templateUrl: './post.component.html',
})

export class PostComponent implements OnInit {

showButton = false;
toggleComments(arg0: any) {
throw new Error('Method not implemented.');
}
openAddCommentDialog() {
throw new Error('Method not implemented.');
}
openEditCommentDialog(_t68: Comment) {
throw new Error('Method not implemented.');
}
addComment() {
throw new Error('Method not implemented.');
}
closeAddCommentDialog() {
throw new Error('Method not implemented.');
}
saveCommentEdit() {
throw new Error('Method not implemented.');
}
closeEditCommentDialog() {
throw new Error('Method not implemented.');
}
closeDeleteCommentDialog() {
throw new Error('Method not implemented.');
}
  @ViewChild('commentSection') commentSection: ElementRef | undefined;

  posts: Post[] = []; 
  comments: Comment[] = [];
  isEditModalOpen = false; 
  isDeleteModalOpen = false; 
  isAddModalOpen = false; 
  isAddCommentModalOpen = false;
  selectedPost: Post | null = null;
  newPost: Post = { id: '', title: '', body: '' }; 
  editingPost: Post | null = null;
  editingComment: Comment | null = null;
  newComment: Comment = { id: 0, postId: 0, name: '', email: '', body: '' };
  post: any;
  isDeleteCommentModalOpen: any;
  comment: any;

  constructor(private postService: PostService, private commentService: CommentService) {}

  ngOnInit() {
    this.getPosts();
  }


  getPosts() {
    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.error('Erro ao carregar posts', error);
      }
    );
  }


  openAddDialog() {
    this.isAddModalOpen = true;
    this.newPost = { id: '', title: '', body: '' }; 
  }

  closeAddDialog() {
    this.isAddModalOpen = false;
  }

  addPost() {
    const postToAdd = { ...this.newPost };  
    this.postService.addPost(postToAdd).subscribe(
      (response) => {
        this.posts.push(response);
        this.posts.unshift(response);  
        this.newPost = { id: '', title: '', body: '' };  
        this.closeAddDialog();  
      },
      (error) => {
        console.error('Erro ao adicionar o post', error);
      }
    );
  }

  openEditDialog(post: Post) {
    this.editingPost = { ...post };  
    this.isEditModalOpen = true;
  }

  closeEditDialog() {
    this.isEditModalOpen = false;
  }

  saveEdit() {
    if (!this.editingPost?.title || !this.editingPost?.body) {
      alert('Título e corpo do post são obrigatórios!');
      return;
    }

    if (!this.editingPost?.id) {
      alert('ID do post não encontrado para edição!');
      return;
    }

    this.postService.updatePost(this.editingPost).subscribe(
      (response) => {
        const index = this.posts.findIndex((post) => post.id === response.id);
        if (index !== -1) {
          this.posts[index] = response;
        }
        this.editingPost = null;
      },
      (error) => {
        console.error('Erro ao editar o post', error);
      }
    );
  }

  openDeleteDialog(postId: number) {
    this.selectedPost = this.posts.find(post => post.id === postId) || null; 
    this.isDeleteModalOpen = true; 
  }

  closeDeleteDialog() {
    this.isDeleteModalOpen = false;  
  }

  deletePost() {
    const postId = this.selectedPost?.id;
    if (postId !== undefined) {
      this.postService.deletePost(postId).subscribe(
        () => {
          this.posts = this.posts.filter((post) => post.id !== postId); 
          this.closeDeleteDialog();
        },
        (error) => {
          console.error('Erro ao excluir o post', error);
        }
      );
    }
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId).subscribe(
      () => {
        this.comments = this.comments.filter(comment => comment.id !== commentId);
      },
      (error) => {
        console.error('Erro ao excluir o comentário', error);
      }
    );
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.showButton = window.scrollY > 300;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
