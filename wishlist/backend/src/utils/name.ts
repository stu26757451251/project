import { string } from "fp-ts"
import * as E from "fp-ts/Either"
import * as P from "fp-ts/Predicate"
import { pipe } from "fp-ts/function"
import * as S from "fp-ts/Semigroup"
import * as A from "fp-ts/Apply"

// type Title = string

// const isString: P.Predicate<unknown> = (input) => typeof input === "string"
// const isLengthSmallerThan: (length: number) => P.Predicate<string> =
//   (length) => (input) =>
//     input.length < length

// const Applicative = E.getApplicativeValidation(
//   pipe(string.Semigroup, S.intercalate(", "))
// )

// const apS = A.apS(Applicative)

// const isStringE = E.fromPredicate(isString, () => "Input is not a string")
// const isLengthSmallerThanE = E.fromPredicate(
//   isLengthSmallerThan(10),
//   () => `Input length should smaller than 10`
// )

import { getApplicativeValidation } from "fp-ts/Either"
import { getSemigroup } from "fp-ts/Array"

const applicativeValidation = getApplicativeValidation(getSemigroup<string>())

// Validation functions
const validatePositive = (n: number): E.Either<string[], number> =>
  n > 0 ? E.right(n) : E.left(["Must be positive"])
const validateEven = (n: number): E.Either<string[], number> =>
  n % 2 === 0 ? E.right(n) : E.left(["Must be even"])

// Generalized function to combine validations
const validateWith =
  (validations: Array<(n: number) => E.Either<string[], number>>) =>
  (n: number): E.Either<string[], number> =>
    validations.reduce<E.Either<string[], number>>(
      (acc, validation) =>
        applicativeValidation.ap(
          applicativeValidation.map(acc, () => (x: number) => x),
          validation(n)
        ),
      E.right(n)
    )

// Create the validateNumber function
const validateNumber = validateWith([validatePositive, validateEven])

// Example usage
const input1 = -4
const input2 = 3
const input3 = 4

console.log(validateNumber(input1)) // Left(['Must be positive'])
console.log(validateNumber(input2)) // Left(['Must be even'])
console.log(validateNumber(input3)) // Right(4)
