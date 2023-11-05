declare global {
  namespace Express {
    interface Request {
      isAuthenticated: () => this is AuthenticatedRequest
      session?: {
        passport: {
          user: {}
        }
      }
      user?: {}
    }
  }
}

export {}
