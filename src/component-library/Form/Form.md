# Form Component

The Form component is a simple html form tag with added functionality.

---

## Ins and Outs

### Props

- `required?: string[]`
- `onSubmit?: () => void`
- `valid?: boolean`
- `touched?: string[]`
- `missingFields?: string[]`
- `UNSAFE_style?: { [key: string]: any }`
- `UNSAFE_className?: string`

---

## Uses

The Form component can be used with or without the FormItem component. For more information on FormItem component, see its doc file.
If the form needs to **track validity**, pass the `touched` prop or else all FormItems will be considered untouched and thus **valid**.

Form example with useForm custom hook and FormItem component:
```tsx
const LoginForm = () => {
  const [username, setUserName] = useState('')
  const [password, setPassword, isValidPassword] = useValidatedState('', 'password')
  const { formData, isValidForm, touched } = useForm({
    username, password,
  })

  // required strings must match keys of form object in useForm param
  const required = ['username', 'password']
  const { validForm, missingFields } = isValidForm([...required, isValidPassword])

  const onSubmit = () => {
    console.log(formData)
  }

  return(
    <Form
      onSubmit={onSubmit}
      required={required}
      valid={validForm}
      touched={touched}
      missingFields={missingFields}
    >

      <FormItem
        htmlFor="username" <- must match a key in the form data
        label="Email"
        errorMessage="Please enter a valid username"
        valid={username.length > 6}
      >
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </FormItem>

      <FormItem
        htmlFor="password"
        label="Password"
        errorMessage="Please enter a valid password"
        valid={isValidPassword}
      >
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </FormItem>

      <Button type="submit">Submit</Button>

    </Form>
  )
}
```