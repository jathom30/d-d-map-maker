# Stepper Component

The Stepper component manages a series of steps that a user can navigate through for completing a process.

---

## Props

- `data: YourDataType`: The current data to be managed throughout the process
- `onDataChange: (newData: YourDataType) => void`: Set the new data
- `steps: StepType`: The configuration for each step (see below for StepType)
- `onFinish?: (() => Promise<void>) | (() => void)`: Function to be called on last step
- `initialStep?: number`: The step to start the Stepper on
- `header?: (props: Expand<RenderPropsType<DataType>>) => JSX.Element`: Provide a header
- `footer?: ( props: RenderPropsType<DataType> & { NextButton: () => JSX.Element PrevButton: () => JSX.Element }, ) => JSX.Element`: Override the default footer. Note that you recieve a default Next and Previous button as props.

---

## StepType

```tsx
type ButtonPropsType<DataType> =
  | ((props: RenderPropsType<DataType>) => JSX.Element | string)
  | string
```

```tsx
export interface StepType<DataType> {
  label: string
  isDisabled?: (data: DataType) => boolean
  isComplete?: (data: DataType) => boolean
  onStepForward?: ({
    data,
    setData,
  }: {
    data: DataType
    setData: (newData: DataType) => void
  }) => Promise<void> | void
  nextButton?: ButtonPropsType<DataType>
  prevButton?: ButtonPropsType<DataType>
  component: ({
    data,
    onDataChange,
  }: {
    data: DataType
    onDataChange: (newData: DataType) => void
  }) => JSX.Element
  // Note: Path should not be equal to an empty string or `'/'`
  path?: string
  exactPath?: boolean
}
```

---

## Examples

### Basic Stepper with navigation blocking

```tsx
type UserData = {
  name: string
  email: string
}

const [data, setData] = useState<UserData>({})

const steps: StepType<UserData> = [
  {
    label: 'Step 1',
    isComplete: (data) => !!data.name,
    component: ({ data, onDataChange }) => (
      <Step1 data={data} onDataChange={onDataChange} />
    ),
  },
  {
    label: 'Step 2',
    isDisabled: (data) => !!data.name,
    isComplete: (data) => !!data.email,
    component: ({ data, onDataChange }) => (
      <Step2 data={data} onDataChange={onDataChange} />
    ),
  },
  {
    label: 'Step 3',
    component: ({ data, onDataChange }) => (
      <Step3 data={data} onDataChange={onDataChange} />
    ),
  },
]

<Stepper
  data={data}
  onDataChange={setData}
  steps={steps}
  onFinish={() => alert(`${data.name} is cool`)}
/>
```

### Basic Stepper with routes and initial step index set to step 2

**Note:** Paths should not be equal to an empty string or `'/'`

```tsx
type UserData = {
  name: string
  email: string
}

const [data, setData] = useState<UserData>({})

const steps: StepType<UserData> = [
  {
    label: 'Step 1',
    path: 'step-1',
    component: ({ data, onDataChange }) => (
      <Step1 data={data} onDataChange={onDataChange} />
    ),
  },
  {
    label: 'Step 2',
    path: 'step-2',
    component: ({ data, onDataChange }) => (
      <Step2 data={data} onDataChange={onDataChange} />
    ),
  },
]

// Note that the Stepper must be within a React Router

<Stepper
  data={data}
  onDataChange={setData}
  steps={steps}
  initialStep={1}
  onFinish={() => alert(`${data.name} is cool`)}
/>
```

### Stepper with custom header and footer

```tsx
type UserData = {
  name: string
  email: string
}

const [data, setData] = useState<UserData>({})

const steps: StepType<UserData> = [
  {
    label: 'Step 1',
    path: 'step-1',
    isComplete: (data) => !!data.name,
    component: ({ data, onDataChange }) => (
      <Step1 data={data} onDataChange={onDataChange} />
    ),
  },
  {
    label: 'Step 2',
    path: 'step-2',
    isComplete: (data) => !!data.email,
    component: ({ data, onDataChange }) => (
      <Step2 data={data} onDataChange={onDataChange} />
    ),
  },
]

<Stepper
  data={data}
  onDataChange={setData}
  steps={steps}
  header={(props) => (
    <StepperHeader
      data={props.data}
      steps={props.steps}
      activeStepIndex={props.activeStepIndex}
    />
  )}
  footer={({ NextButton, PrevButton, goToStep, activeStepIndex }) => (
    <div>
      {activeStepIndex !== 3 && (
        <button type="button" onClick={() => goToStep(3)}>
          Go To Step 4
        </button>
      )}
      <Spacer />
      <PrevButton />
      <Spacer /> <NextButton />
    </div>
  )}
/>
```
