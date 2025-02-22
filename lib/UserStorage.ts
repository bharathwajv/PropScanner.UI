export interface User {
  username: string
  password: string
  name: string
  mobileNumber: string
}

export class UserStorage {
  private static readonly USER_KEY = "propscanner_user"

  static saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static getUser(): User | null {
    const userString = localStorage.getItem(this.USER_KEY)
    return userString ? JSON.parse(userString) : null
  }

  static removeUser(): void {
    localStorage.removeItem(this.USER_KEY)
  }

  static isLoggedIn(): boolean {
    return !!this.getUser()
  }
}

