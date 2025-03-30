import { Component, OnInit } from '@angular/core';
import { PostService } from '../../service/post.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], 
  templateUrl: './post.component.html',
})

export class PostComponent implements OnInit {
  posts: any[] = []; 
  isEditModalOpen = false; 
  isDeleteModalOpen = false; 
  isAddModalOpen = false; 
  selectedPost: any = {}; 
  newPost: any = { title: '', body: '' }; 
  editingPost: any = null; 

  constructor(private postService: PostService) {}

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
    this.newPost = { title: '', body: '' }; 
  }

  
  closeAddDialog() {
    this.isAddModalOpen = false;
  }


  addPost() {
    this.postService.addPost(this.newPost).subscribe(
      (response) => {
        this.posts.push(response);
        this.posts.unshift(response); 
        this.newPost = { title: '', body: '' };
        this.closeAddDialog(); 
      },
      (error) => {
        console.error('Erro ao adicionar o post', error);
      }
    );
  }


  openEditDialog(post: any) {
    this.editingPost = { ...post };
    this.isEditModalOpen = true;
  }


  closeEditDialog() {
    this.isEditModalOpen = true; 
  }


  saveEdit() {
    if (!this.editingPost.title || !this.editingPost.body) {
      alert('Título e corpo do post são obrigatórios!');
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
    this.selectedPost.id = postId;  
    this.isDeleteModalOpen = true; 
  }

  
  closeDeleteDialog() {
    this.isDeleteModalOpen = false;  
  }

  
  deletePost() {
    const postId = this.selectedPost.id;
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
