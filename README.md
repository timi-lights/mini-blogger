# Blogger

A Blogger is a platform that allows you to create blog posts.

## Table of Contents

- [Posts API](#posts-api)
  - [Get All Blog Posts](#get-all-blog-posts)
  - [Update Blog Post](#update-blog-post)
  - [Create a Blog Post](#create-a-blog-post)
  - [Delete Blog Post](#delete-blog-post)
- [Authentication API](#authentication-api)
  - [Sign Up](#sign-up)
  - [Log In](#log-in)
- [DTOs](#dtos)
  - [Create a Post DTO](#create-a-post-dto)
  - [Register User DTO](#register-user-dto)
  - [Login User DTO](#login-user-dto)

## Posts API

### Get All Blog Posts

- **Method**: GET
- **URL**: `/api/posts`
- **Middleware**: None
- **Description**: Retrieves all blog posts.

### Update Blog Post

- **Method**: PUT
- **URL**: `/api/posts/:id`
- **Middleware**: `authMiddleware`
- **Description**: Updates a specific blog post.

### Create a Blog Post

- **Method**: POST
- **URL**: `/api/posts`
- **Middleware**: `authMiddleware`, `validationMiddleware(CreateAPostDto, 'body')`
- **Description**: Creates a new blog post.

### Delete Blog Post

- **Method**: DELETE
- **URL**: `/api/posts/:id`
- **Middleware**: `authMiddleware`
- **Description**: Deletes a specific blog post.

## Authentication API

### Sign Up

- **Method**: POST
- **URL**: `/api/auth/signup`
- **Middleware**: `validationMiddleware(RegisterUserDto, 'body')`
- **Description**: Registers a new user.

### Log In

- **Method**: POST
- **URL**: `/api/auth/login`
- **Middleware**: `validationMiddleware(LoginUserDto, 'body')`
- **Description**: Logs in an existing user.

## DTOs

### Create a Post DTO

```typescript
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
```

### Register User DTO

```typescript
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  public email: string;

  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name cannot be empty' })
  public full_name: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  public password: string;
}
```

### Login User DTO

```typescript
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
```
