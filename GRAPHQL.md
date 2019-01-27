# Easy access for Query/Mutations

### register
`mutation {
  register(
    registerData: {
      username: "t0nyandre"
      email: "post@tonyandre.co"
      password: "t3zT#123a"
    }
  ) {
    id
    username
    role
    email
    createdAt
    updatedAt
  }
}`

### verify
mutation {
  verify(verifyData: { token: "cjrfgdr410000e4mb0tyf71gi" })
}
