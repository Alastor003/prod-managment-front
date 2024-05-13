export interface Product {
  idProduct:    number;
  handle:       string;
  title:        string;
  description:  string;
  sku:          number;
  grams:        number;
  stock:        number;
  price:        number;
  comparePrice: number;
  barcode:      number;
}

export interface ProductBody {
  handle?: string;
  title?: string;
  description?: string;
  sku?: number;
  grams?: number;
  stock?: number;
  price?: number;
  comparePrice?: number;
  barcode?: number;
}
