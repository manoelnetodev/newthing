export type ProjectBrief = { name: string; email: string; stage: string; project: string }

const directions = {
  website: {
    title: 'Presença digital orientada ao seu objetivo',
    architecture:
      'Site responsivo, conteúdo estruturado e um caminho claro para contato. Formulários e integrações dependem da necessidade identificada.',
    priorities: [
      'Apresentação da empresa, serviços e diferenciais',
      'Navegação acessível em celular e computador',
      'Contato ou solicitação de orçamento com contexto',
    ],
    question: 'Qual ação o visitante deve conseguir realizar e quais conteúdos a empresa já tem?',
  },
  system: {
    title: 'Gestão conectada à rotina da empresa',
    architecture:
      'Aplicação web com painel de gestão, base de dados e acessos por perfil. A estrutura final depende dos processos, volume e integrações.',
    priorities: [
      'Cadastro das informações essenciais à operação',
      'Fluxo principal com responsáveis e situação de cada tarefa',
      'Visão de acompanhamento com indicadores a definir',
    ],
    question: 'Quem utilizará o sistema e qual processo precisa funcionar primeiro?',
  },
  automation: {
    title: 'Processos conectados com acompanhamento humano',
    architecture:
      'Integração entre ferramentas, regras de processamento e histórico das execuções. APIs disponíveis, acessos e exceções precisam ser avaliados.',
    priorities: [
      'Entrada de dados e validação das informações',
      'Encaminhamento conforme regras e responsáveis',
      'Registro de execução e revisão humana das exceções',
    ],
    question: 'Quais ferramentas participam do processo e em que situações a equipe deve intervir?',
  },
  evolution: {
    title: 'Evolução orientada pela experiência de uso',
    architecture:
      'Avaliação do sistema atual antes de propor alterações. Compatibilidade, acessos ao código e qualidade dos dados orientam a solução.',
    priorities: [
      'Diagnóstico da principal dificuldade de uso',
      'Melhoria prioritária validada com quem utiliza',
      'Plano de implantação e acompanhamento da mudança',
    ],
    question:
      'O que já funciona, o que limita a operação e quais acessos técnicos estão disponíveis?',
  },
  discovery: {
    title: 'Uma direção concreta para a sua ideia',
    architecture:
      'Mapeamento da necessidade e protótipo do fluxo principal. Site, sistema ou automação serão avaliados a partir do objetivo e do contexto.',
    priorities: [
      'Objetivo, público e problema principal definidos',
      'Até três funcionalidades essenciais priorizadas',
      'Protótipo para validar a experiência antes da construção',
    ],
    question: 'Que mudança você espera perceber na prática quando a solução estiver em uso?',
  },
}

export function createBlueprint(brief: ProjectBrief) {
  const objective = brief.project.toLocaleLowerCase('pt-BR')
  const kind =
    brief.stage === 'Quero automatizar processos'
      ? 'automation'
      : brief.stage === 'Preciso de um site ou landing page'
        ? 'website'
        : brief.stage === 'Quero construir um sistema'
          ? 'system'
          : brief.stage === 'Quero evoluir um produto'
            ? 'evolution'
            : /automa|tarefas repetitiv|conectar ferramentas/.test(objective)
              ? 'automation'
              : /\bsite\b|landing page|presença digital/.test(objective)
                ? 'website'
                : /sistema|gestão|painel/.test(objective)
                  ? 'system'
                  : 'discovery'
  return { kind, ...directions[kind] }
}

export function formatBlueprint(brief: ProjectBrief) {
  const plan = createBlueprint(brief)
  return `Olá, Newthing! Gostaria de conversar sobre meu projeto.

PLANO INICIAL — NEWTHING
Nome: ${brief.name.trim()}
E-mail: ${brief.email.trim()}
Momento: ${brief.stage}

MEU OBJETIVO
${brief.project.trim()}

DIREÇÃO PRELIMINAR
${plan.title}

ARQUITETURA A AVALIAR
${plan.architecture}

PRIORIDADES PARA A PRIMEIRA VERSÃO
${plan.priorities.map((item, index) => `${index + 1}. ${item}`).join('\n')}

PONTO PARA ALINHAR NA CONVERSA
${plan.question}

NEGÓCIO + ENGENHARIA
Yuri Gabriel (Founder & CEO) e Maksuel Silva (COO): contexto de negócio e prioridades.
Manoel Neto (Co-Founder & CTO) e Ronan Severo (SDE): viabilidade técnica e construção.

PRÓXIMOS PASSOS
Entender o contexto → validar prioridades → definir a proposta.

Plano preliminar gerado a partir das opções do briefing; ainda não foi analisado pela equipe. Escopo, tecnologia, prazo e investimento serão definidos após entender o contexto.
`
}

export function createWhatsAppLink(number: string | undefined, message: string) {
  const digits = (number ?? '').replace(/\D/g, '')
  // International format, without assuming or adding a Brazilian ninth digit.
  if (!/^[1-9]\d{7,14}$/.test(digits)) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
