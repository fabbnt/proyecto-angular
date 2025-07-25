import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';
import { Router } from '@angular/router';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  templateUrl: './list.html',
  styleUrl: './list.css',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
})
export class List implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.loading = true;
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar productos';
        this.loading = false;
      },
    });
  }

  deleteProduct(id: string | undefined) {
    if (!id) return;
    if (!confirm('¿Seguro que deseas borrar este producto?')) return;
    this.productService.delete(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p._id !== id);
      },
      error: () => {
        this.error = 'Error al borrar producto';
      },
    });
  }

  editProduct(id: string | undefined) {
    if (!id) return;
    this.router.navigate(['/products/edit', id]);
  }

  createProduct() {
    this.router.navigate(['/products/create']);
  }
}
