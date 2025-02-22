export interface User {
  username: string
  password: string
  name: string
  mobileNumber: string
}

export class UserStorage {
  private static readonly USER_KEY = "user"

  private static isClient() {
    return typeof window !== "undefined"
  }

  static setUser(user: User) {
    if (this.isClient()) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user))
    }
  }

  static getUser(): User | null {
    if (!this.isClient()) return null
    const userString = localStorage.getItem(this.USER_KEY)
    return userString ? JSON.parse(userString) : null
  }

  static removeUser() {
    if (this.isClient()) {
      localStorage.removeItem(this.USER_KEY)
    }
  }

  static isLoggedIn(): boolean {
    return !!this.getUser()
  }
}

