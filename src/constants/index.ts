export const TASK_STORAGE_KEY = 'st-task' as const;
export const USERS_STORAGE_KEY = 'st-users' as const;

export const categories = {
  todo: 'to-do',
  inProgress: 'in-progress',
  inReview: 'in-review',
  closed: 'closed',
} as const;

export const dashboardTxt = {
  errorFile: 'The JSON file has an error in the Keys  or has an invalid type.',
} as const;

export const JSON_KEYS = [
  'id',
  'title',
  'deadline',
  'description',
  'category',
] as const;

export const schemaLoginText = {
  SEO_TITLE: 'Login | Secrets',
  SEO_DESCRIPTION: 'The site of secrets description',
  SEO_KEYWORDS: 'login, secrets',
  header: 'Trust your Secrets',
  username: 'username',
  password: 'password',
  lbUsername: 'Username',
  lbPassword: 'Password',
  usernamePlaceholder: 'fancy user',
  passwordPlaceholder: 'Secret',
  signInBtn: 'Sign In',
  signUpBtn: 'Sign Up',
  forgotBtn: 'Forgot password ?',
} as const;

export const REGEX = {
  atLeast2Letter2Numbers: new RegExp(
    /^(?=(?:.*[a-zA-Z]){2,})(?=(?:.*\d){2,})[a-zA-Z0-9]+$/
  ),
  atLeast1Uppercase1LowerWithNumbersAndSpecial:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])[a-zA-Z\d\W]+$/,
} as const;
