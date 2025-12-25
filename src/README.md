### Controle de Versões

⚠️ Ambiente obrigatório (projeto legado)

    Este projeto NÃO é compatível com versões modernas do Node.js.

✅ Versões obrigatórias

    Node.js: 14.21.3 (LTS)

    npm: 6.14.18

    Compatível com:

    @babel/core 7.9.0

    Webpack 4

React / CRA antigos

🚫 Importante (Windows)

    ❌ Não usar nvm / nvm-windows
    ❌ Não tentar instalar Node via nvm install
    Essas abordagens não funcionam de forma confiável e causam erros de OpenSSL.

✅ Procedimento correto (obrigatório)

Desinstalar completamente:

    Node.js
    nvm / nvm-windows

Instalar manualmente o Node.js 14.21.3
    Download oficial (Windows x64):
    https://nodejs.org/dist/v14.21.3/node-v14.21.3-x64.msi

O instalador já inclui automaticamente o npm 6.14.18.

Verificar após a instalação:

    node -v   # v14.21.3
    npm -v    # 6.14.18

🧠 Observação

    O uso de versões mais novas do Node (16+) causa erros como:

    error:0308010C:digital envelope routines::unsupported

    Por isso, o uso do Node 14 é obrigatório.