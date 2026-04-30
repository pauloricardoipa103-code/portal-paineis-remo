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

Quando o painel estiver pronto, altere `status` para `Publicado` e informe a URL.
