import assert from 'node:assert/strict'
import test from 'node:test'
import { createBlueprint, formatBlueprint } from '../src/lib/projectBlueprint.ts'

const brief = {
  name: '  Teste Interface  ',
  email: '  teste@example.com  ',
  stage: 'Tenho uma ideia',
  project: '  Quero melhorar a rotina da empresa.  ',
}

for (const [stage, kind] of [
  ['Tenho uma ideia', 'discovery'],
  ['Preciso de um site ou landing page', 'website'],
  ['Quero construir um sistema', 'system'],
  ['Quero automatizar processos', 'automation'],
  ['Quero evoluir um produto', 'evolution'],
]) {
  test(`o momento escolhido orienta o plano: ${stage}`, () => {
    const plan = createBlueprint({ ...brief, stage })
    assert.equal(plan.kind, kind)
    assert.ok(plan.architecture.length > 30)
    assert.equal(plan.priorities.length, 3)
    assert.ok(plan.question.endsWith('?'))
  })
}

test('a escolha explícita de site tem prioridade sobre palavras de outros serviços', () => {
  const plan = createBlueprint({
    ...brief,
    stage: 'Preciso de um site ou landing page',
    project: 'Apresentar nossa empresa de automações e sistemas de gestão.',
  })
  assert.equal(plan.kind, 'website')
})

for (const [project, kind] of [
  ['AUTOMATIZAR TAREFAS REPETITIVAS', 'automation'],
  ['Quero melhorar minha PRESENÇA DIGITAL', 'website'],
  ['Quero um painel para acompanhar a gestão', 'system'],
]) {
  test(`uma ideia pode sugerir uma direção inicial: ${kind}`, () => {
    assert.equal(createBlueprint({ ...brief, project }).kind, kind)
  })
}

test('o resumo preserva o objetivo, limpa espaços nas bordas e apresenta os próximos passos', () => {
  const project = '  Organizar pedidos.\nAcompanhar a execução com a equipe.  '
  const result = formatBlueprint({ ...brief, project })
  assert.ok(result.startsWith('Olá, Newthing!'))
  assert.ok(result.includes('Nome: Teste Interface\nE-mail: teste@example.com'))
  assert.ok(
    result.includes('MEU OBJETIVO\nOrganizar pedidos.\nAcompanhar a execução com a equipe.'),
  )
  assert.ok(result.includes('1. '))
  assert.ok(result.includes('2. '))
  assert.ok(result.includes('3. '))
  assert.ok(result.includes('PRÓXIMOS PASSOS'))
  assert.ok(result.includes('ainda não foi analisado pela equipe'))
})
