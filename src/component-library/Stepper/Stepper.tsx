import React, { useState, useEffect, useRef } from 'react'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import { Expand } from 'Types'
import { Button } from '../Button'
import { Text } from '../Text'
import './Stepper.scss'

interface RenderPropsType<DataType> {
  activeStepIndex: number
  steps: StepType<DataType>[]
  stepForward: () => void | Promise<void>
  stepBackward: () => void
  goToStep: (step: number) => void
  isLoading: boolean
  isLastStep: boolean
  isFirstStep: boolean
  data: DataType
  setData: (newData: DataType) => void
}

type ButtonPropsType<DataType> =
  | ((props: RenderPropsType<DataType>) => JSX.Element | string)
  | string

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
  path?: string
  exactPath?: boolean
}

export const Stepper = <DataType,>({
  data,
  steps,
  onDataChange,
  onFinish,
  initialStep,
  header: Header,
  footer: Footer,
}: {
  data: DataType
  steps: StepType<DataType>[]
  onDataChange: (newData: DataType) => void
  onFinish?: (() => Promise<void>) | (() => void)
  initialStep?: number
  header?: (props: Expand<RenderPropsType<DataType>>) => JSX.Element
  footer?: (
    props: RenderPropsType<DataType> & {
      NextButton: () => JSX.Element
      PrevButton: () => JSX.Element
    },
  ) => JSX.Element
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState(initialStep || 0)
  const [isLoading, setIsLoading] = useState(false)
  const {
    component: Component,
    isComplete,
    onStepForward,
    nextButton,
    prevButton,
  } = steps[activeStepIndex]
  const isLastStep = activeStepIndex === steps.length - 1
  const isFirstStep = activeStepIndex === 0

  const match = useRouteMatch()
  const history = useHistory()
  const hasRoutes = steps.some((step) => step.path)

  const stepForward = async () => {
    if (!isLoading) {
      if (isLastStep) {
        if (onFinish) onFinish()
      } else {
        if (onStepForward) {
          try {
            if (!isCanceled.current) setIsLoading(true)
            await onStepForward({ data, setData: onDataChange })
            if (!isCanceled.current) setIsLoading(false)
          } catch (error) {
            if (!isCanceled.current) setIsLoading(false)
            throw error
          }
        }
        setActiveStepIndex((prev) => prev + 1)
        if (hasRoutes && steps[activeStepIndex + 1]?.path)
          history.push(`${match.path}/${steps[activeStepIndex + 1].path}`)
      }
    }
  }

  const stepBackward = () => {
    if (!isLoading) {
      setActiveStepIndex((prev) => prev - 1)
      if (hasRoutes && steps[activeStepIndex - 1]?.path)
        history.push(`${match.path}/${steps[activeStepIndex - 1].path}`)
    }
  }

  const goToStep = (step: number) => {
    const { isDisabled = () => false } = steps[step]
    if (!isLoading && !isDisabled(data)) {
      if (step >= 0 && step < steps.length) setActiveStepIndex(step)
      if (hasRoutes) {
        const path = steps[step]?.path
        if (path) history.push(`${match.path}/${path}`)
      }
    }
  }

  const isCanceled = useRef(false)

  useEffect(() => {
    return () => {
      isCanceled.current = true
    }
  }, [])

  // handle routing
  useEffect(() => {
    if (hasRoutes) {
      const currentPath = history.location.pathname
      const basePath = match.path

      const redirectToStart = () => {
        history.replace(`${basePath}/${steps[initialStep || 0].path}`)
      }

      // if on base path, redirect to initial step
      if (currentPath === basePath || currentPath === `${basePath}/`) {
        setActiveStepIndex(initialStep || 0)
        redirectToStart()
        return
      }
      const stepIndexOfCurrentPath = steps.findIndex(
        (step) => step.path === currentPath.replace(`${match.path}/`, ''),
      )

      // if the step with this path is disabled or not found, redirect to start
      if (steps[stepIndexOfCurrentPath]) {
        const { isDisabled = () => false } = steps[stepIndexOfCurrentPath]
        if (isDisabled(data) && history.action === 'POP') {
          redirectToStart()
        }

        // checking is isCanceled prevents memory leak
        if (!isCanceled.current) setActiveStepIndex(stepIndexOfCurrentPath)
      } else redirectToStart()
    }
  }, [
    match.path,
    history,
    history.location.pathname,
    setActiveStepIndex,
    isCanceled,
    steps,
    initialStep,
    hasRoutes,
    data,
  ])

  const NextButton = () => {
    const getDisabled = () => {
      if (activeStepIndex < steps.length - 1) {
        const { isDisabled } = steps[activeStepIndex + 1]
        if (isDisabled) return isDisabled(data)
      }
      return !!isComplete && !isComplete(data)
    }

    if (typeof nextButton === 'function') {
      const btn = nextButton(renderProps)
      if (typeof btn === 'object') return btn

      if (typeof btn === 'string')
        return (
          <Button disabled={getDisabled()} onClick={stepForward}>
            {btn}
          </Button>
        )
    }

    return (
      <Button disabled={getDisabled()} onClick={stepForward}>
        {(() => {
          if (typeof nextButton === 'string') return nextButton
          if (isLoading) return 'Loading...'
          return isLastStep ? 'Finish' : 'Next'
        })()}
      </Button>
    )
  }

  const PrevButton = () => {
    const getDisabled = () => {
      if (activeStepIndex > 0) {
        const { isDisabled } = steps[activeStepIndex - 1]
        if (isDisabled) return isDisabled(data)
      }
      return isFirstStep || isLoading
    }

    if (typeof prevButton === 'function') {
      const btn = prevButton(renderProps)
      if (typeof btn === 'object') return btn

      if (typeof btn === 'string')
        return (
          <Button disabled={getDisabled()} onClick={stepBackward}>
            {btn}
          </Button>
        )
    }
    return (
      <Button disabled={getDisabled()} onClick={stepBackward}>
        {typeof prevButton === 'string' ? prevButton : 'Previous'}
      </Button>
    )
  }

  const renderProps: RenderPropsType<DataType> = {
    steps,
    activeStepIndex,
    stepBackward,
    stepForward,
    goToStep,
    isLoading,
    isFirstStep,
    isLastStep,
    data,
    setData: onDataChange,
  }

  return (
    <div className="Stepper">
      {Header ? (
        <Header {...renderProps} />
      ) : (
        <div className="Stepper__header">
          <Text on="white" tag="p" size="l" weight="bold">
            {steps[activeStepIndex].label}
          </Text>
          <Text on="white" kind="subdued" tag="p" size="m">
            {activeStepIndex + 1} / {steps.length}
          </Text>
        </div>
      )}
      {hasRoutes ? (
        steps.map((step) => {
          if (!step.path) return null
          return (
            <Route
              key={step.label}
              path={`${match.path}/${step.path}`}
              exact={step.exactPath}
            >
              <Component data={data} onDataChange={onDataChange} />
            </Route>
          )
        })
      ) : (
        <Component data={data} onDataChange={onDataChange} />
      )}

      {Footer ? (
        <Footer
          {...renderProps}
          NextButton={NextButton}
          PrevButton={PrevButton}
        />
      ) : (
        <div className="Stepper__footer">
          <PrevButton />
          <NextButton />
        </div>
      )}
    </div>
  )
}
