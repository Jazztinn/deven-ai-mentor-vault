import assert from 'node:assert/strict'
import test from 'node:test'
import { literalCurrency } from './literal-currency'

test('both currency amounts remain literal', () => {
  assert.equal(literalCurrency('I turned $76 to $20,000'), String.raw`I turned \$76 to \$20,000`)
})
test('already escaped dollar is not double escaped', () => {
  assert.equal(literalCurrency(String.raw`\$76`), String.raw`\$76`)
})
test('code fences retain literal contents', () => {
  const value = '```json\n{"claim":"$76"}\n```'
  assert.equal(literalCurrency(value), value)
})
test('YAML titles retain valid escapes and quoted values', () => {
  assert.equal(literalCurrency('---\ntitle: "$76"\n---\n$76'), '---\ntitle: "$76"\n---\n\\$76')
})
