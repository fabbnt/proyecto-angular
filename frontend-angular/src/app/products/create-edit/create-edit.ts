import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../product.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.html',
  styleUrl: './create-edit.css',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
})
export class CreateEdit implements OnInit {
  productForm: FormGroup;
  loading = false;
  error = '';
  isEdit = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.productId;
    if (this.isEdit && this.productId) {
      this.loading = true;
      this.productService.getById(this.productId).subscribe({
        next: (product) => {
          this.productForm.patchValue(product);
          this.loading = false;
        },
        error: () => {
          this.error = 'Error al cargar producto';
          this.loading = false;
        }
      });
    }
  }

  submit() {
    if (this.productForm.invalid) {
      console.log('Formulario inválido');
      return;
    }
    this.loading = true;
    this.error = '';
    const product: Product = this.productForm.value;
    console.log('Enviando producto:', product);
  
    if (this.isEdit && this.productId) {
      this.productService.update(this.productId, product).subscribe({
        next: () => {
          console.log('Producto actualizado');
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error al actualizar producto:', err);
          this.error = 'Error al actualizar producto';
          this.loading = false;
        }
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          console.log('Producto creado');
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          this.error = 'Error al crear producto';
          this.loading = false;
        }
      });
    }
  }
  

  cancel() {
    this.router.navigate(['/products']);
  }
}
