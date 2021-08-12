# useAsync

Tracks the status, value, and possible errors of an async function

---

## Ins and Outs

### Inputs

- `asyncFunction: () => Promise`
- `immediate?: boolean` <- defaults to true, set to false it async function should not be called immediately

### Returns

- `execute: () => Promise<void>`
- `status: string`
- `value: any`
- `error: any`

---

## Uses

Basic example:
```tsx
function App() {
  const { execute, status, value, error } = useAsync<string>(myFunction, false);

  return (
    <div>
      {status === 'idle' && <div>Start your journey by clicking a button</div>}
      {status === 'success' && <div>{value}</div>}
      {status === 'error' && <div>{error}</div>}
      <button onClick={execute} disabled={status === 'pending'}>
        {status !== 'pending' ? 'Click me' : 'Loading...'}
      </button>
    </div>
  );
}
```
