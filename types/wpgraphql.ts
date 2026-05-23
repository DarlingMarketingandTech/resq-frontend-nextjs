export interface GraphQLError {
  message: string;
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}
