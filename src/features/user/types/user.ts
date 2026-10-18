export type UserDTO = {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export type CreateUserPayload = {
  name: string
  email: string
  password: string
}

export type UpdateUserPayload = {
  name: string
  email: string
}
