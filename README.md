# Portal de Painéis REMO

Central estática para organizar dashboards e painéis referentes à REMO.

## Acesso

A senha inicial do portal é:

```text
REMO@2026
```

Essa senha é uma proteção simples no front-end, adequada apenas para evitar acesso casual. Para controle de acesso forte, use autenticação no provedor de hospedagem.

## Como adicionar painéis

Edite o arquivo `paineis.json` e adicione um novo objeto com:

- `nome`
- `descricao`
- `area`
- `responsavel`
- `status`
- `atualizadoEm`
- `url`
- `tipo` opcional: use `planilha` para abrir em nova aba, sem carregar dentro do visualizador.

Quando o painel estiver pronto, altere `status` para `Publicado` e informe a URL.

O botão do portal abre `visualizar.html?painel=...`, mantendo o gestor dentro do endereço do portal.

## Links externos individuais

Para compartilhar somente um painel, sem mostrar a lista completa do portal, use:

- `externo.html?painel=anomalias-equatorial`
- `externo.html?painel=controle-execucao-remo`
