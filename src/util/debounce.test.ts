import { callWithDelay } from "./debounce"

jest.useFakeTimers()

describe("debounce", () => {
  it("works", () => expect(true).toEqual(true))

  it("calls the debounced function", () => {
    const fn = jest.fn()
    const dfn = callWithDelay(fn, 0)
    dfn()
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("doesnt call multiple times in the delay window", () => {
    const fn = jest.fn()
    const dfn = callWithDelay(fn, 100)
    for (let i = 0; i < 10; i++) {
      dfn()
    }
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it("threads arbitrary params", () => {
    const fn = jest.fn()
    const dfn = callWithDelay(fn, 100)
    dfn(1, 2, 3, 4)
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledWith(1, 2, 3, 4)
  })

  it("threads params with latest values", () => {
    const fn = jest.fn()
    const dfn = callWithDelay(fn, 100)
    dfn(1)
    dfn(2)
    jest.runAllTimers()
    dfn(3)
    dfn(4)
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledWith(2)
    expect(fn).toHaveBeenCalledWith(4)
    expect(fn).not.toHaveBeenCalledWith(1)
    expect(fn).not.toHaveBeenCalledWith(3)
  })

  it("calls multiple times outside the delay window", () => {
    const fn = jest.fn()
    const dfn = callWithDelay(fn, 100)
    for (let i = 0; i < 10; i++) {
      dfn()
    }
    jest.runAllTimers()
    for (let i = 0; i < 10; i++) {
      dfn()
    }
    jest.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it("resolves to my desired value", () => {
    const fn = jest.fn()
    fn.mockReturnValueOnce(1)
    const dfn = callWithDelay(fn, 100)
    const value = dfn()
    jest.runAllTimers()
    expect(value).resolves.toEqual(1)
  })
})
