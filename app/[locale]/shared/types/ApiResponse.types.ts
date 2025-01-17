// feat: Add MetaData interface for reusable pagination structure

// - Created a `MetaData` interface to standardize the metadata structure used across the application.
//   - Fields include: page, pageSize, totalPages, and total.

// This interface will be used wherever pagination metadata is required, ensuring consistency and reusability across the codebase.

export interface IMetaData {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

export interface ResponseData<T> {
  data: T;
  metaData?: IMetaData;
}

export interface ApiResponse<T> {
  code: number;
  data: ResponseData<T> | null;
  message?: string;
  success?: boolean;
  error?: string;
}
export interface ApiResponse2<T> {
  code: number;
  data: T | null;
  message?: string;
  success?: boolean;
  error?: string;
}
