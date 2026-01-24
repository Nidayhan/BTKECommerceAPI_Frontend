export interface ResponseModel<T>{
    data:T;
    isSuccess:boolean;
    messaje:string
}

export interface CategoryDTO {
    id:string;
    categoryName:string;
    description:string;
    createdBy:string;
}

//  public string ProductName { get; set; }
//  public string ProductDescription { get; set; }

//  public string ImageUrl { get; set; }
//  public int StockAmount { get; set; }
//  public decimal Price { get; set; }
//  public Guid CategoryId { get; set; }

export interface ProductDTO{
    
    id: string;
    productName: string;
    productDescription: string;
    imageUrl: string;
    stockAmount: number;
    price: number;
    categoryId: string;
    productImages:ProductImageDTO[]

}

export interface ProductImageDTO{
    id:string,
    imageUrl: string
}

export interface User {

    id: string,
    email: string, 
    firstName: string, 
    lastName: string, 
    token: string, 
    roles: string[]

}

export interface LoginRequest {
    email:string,
    password:string
}

export interface RegisterRequest{
    email: string, 
    firstName: string, 
    lastName: string, 
    userName: string, 
    password: string, 
    confirmPassword: string
}