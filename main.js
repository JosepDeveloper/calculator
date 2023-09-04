const OPERATORS = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷'
}

const $ = (element) => document.querySelector(element)
const $$ = (element) => document.querySelectorAll(element)

const $buttonsNumbers = $$('.button-number')
const $operators = $$('.operator')
const $result = $('.result')
const $clear = $('.clear')
const $delete = $('.delete')
const $float = $('.float')
const $operation = $('.operation')
const $equal = $('.equal')

function existsOperator (element) {
  return (
    element[element.length - 1] === OPERATORS.add ||
    element[element.length - 1] === OPERATORS.divide ||
    element[element.length - 1] === OPERATORS.multiply ||
    element[element.length - 1] === OPERATORS.subtract
  )
}

function add (x, y) {
  return x + y
}

function subtract (x, y) {
  return x - y
}

function multiply (x, y) {
  return x * y
}

function divide (x, y) {
  return x / y
}

function operate (num1, num2, operator) {
  if (operator === OPERATORS.add) return add(num1, num2)
  if (operator === OPERATORS.subtract) return subtract(num1, num2)
  if (operator === OPERATORS.multiply) return multiply(num1, num2)
  if (operator === OPERATORS.divide) return divide(num1, num2)
}

$buttonsNumbers.forEach(button => {
  button.addEventListener('click', (event) => {
    if (
      Number($result.innerText) === 0 &&
      $result.innerText[$result.innerText.length - 1] !== '.'
    ) {
      $result.innerText = event.target.value
      return
    }
    $result.innerText += event.target.value
  })
})

$clear.addEventListener('click', () => {
  $result.innerText = 0
  $operation.innerText = ''
})

$delete.addEventListener('click', () => {
  const arrayResult = $result.innerText.split('')
  arrayResult.pop()
  const srtResult = arrayResult.join('')
  $result.innerText = srtResult

  if ($result.innerText === '') {
    $result.innerText = 0
  }
})

$float.addEventListener('click', () => {
  if (
    Number($result.innerText) % 1 !== 0 ||
    $result.innerText[$result.innerText.length - 1] === '.'
  ) return

  $result.innerText += '.'
})

$operators.forEach(operator => {
  operator.addEventListener('click', (event) => {
    if ($result.innerText === '0') {
      const changeOperation = $operation.innerText.split('')
      changeOperation[changeOperation.length - 1] = event.target.value
      const changeOperationStr = changeOperation.join('')
      $operation.innerText = changeOperationStr
      return
    }

    if (!existsOperator($operation.innerText) && $result.innerText !== 0) {
      $operation.innerText = `${$result.innerText} ${event.target.value}`
      $result.innerText = '0'
      return
    }

    if (existsOperator($operation.innerText)) {
      const arrayOperationNumber = $operation.innerText.split('')
      arrayOperationNumber.pop()
      const numberOne = Number(arrayOperationNumber.join(''))
      const operator = $operation.innerText.split('')[$operation.innerText.split('').length - 1]
      const result = Number(operate(numberOne, Number($result.innerText), operator).toFixed(5))
      $operation.innerText = `${result} ${event.target.value}`
      $result.innerText = 0
    }
  })
})

$equal.addEventListener('click', () => {
  if ($operation.innerText === '') return

  const operator = $operation.innerText[$operation.innerText.length - 1]
  const arrayResult = $operation.innerText.split('')
  arrayResult.pop()
  const numberResult = Number(arrayResult.join(''))
  const numberOne = Number($result.innerText)

  $result.innerText = Number(operate(numberResult, numberOne, operator).toFixed(5))
  $operation.innerText = ''
})
