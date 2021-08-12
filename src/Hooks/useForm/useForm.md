# useForm

A custom form hook that tracks form data

---

## Ins and Outs

### Types

- `FormObjectType: {[key: string]: string | boolean | number}`

### Inputs

- `formData: FormObjectType`

### Returns

- `formData: FormObjectType` <- this is different from the inputs in that it is cleaned of any null values
- `isValidForm: ((string | boolean)[]) => {validForm: boolean, missingFields: string[]}`
- `touched: string[]`

---

## Uses

useForm should be used when one or more inputs need to be tracked in a form

Example with required and validation fields:
```tsx
const [email, setEmail, isValidEmail] = useValidatedState('', 'email')
const [password, setPassword, isValidPassword] = useValidatedState('', 'password')
const [age, setAge] = useState('')

const { formData, isValidForm, touched } = useForm({ email, password, age })

// this array contains both strings (to be checked as keys against the formData) and validation booleans
const { validForm } = isValidForm(['age', 'email', isValidEmail, 'password', isValidPassword])

console.log(validForm) // true if 'age' is a key in the formData object and isValidEmail and isValidPassword are both true
```

Example with required fields:
```tsx
const [title, setTitle] = useState('')
const [subject, setSubject] = useState('')

const { formData, isValidForm, touched } = useForm({ title, subject })

// an array of strings can be passed
// each string must correspond to a key on the object for validForm to return true
const { validForm, missingFields } = isValidForm(['title', 'subject'])

console.log(validForm) // boolean
console.log(missingFields) // string[]
```

Example with **NO** required fields nor validation:
```tsx
const [name, setName] = useState('')
const [lastName, setLastName] = useState('')

// name and lastName can be blank and still pass validForm below
const { formData, isValidForm } = useForm({ name, lastName })

// isValidForm is unneeded here as there are no required fields and no validation
const { validForm } = isValidForm([])
```
