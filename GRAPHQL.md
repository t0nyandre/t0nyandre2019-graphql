# Easy access for Query/Mutations

### register
```graphql
mutation {
  register(
    registerData: {
      username: ""
      email: ""
      password: ""
    }
  ) {
    id
    username
    role
    email
    createdAt
    updatedAt
  }
}
```

### verify
```graphql
mutation {
  verify(verifyData: { token: "" })
}
```
