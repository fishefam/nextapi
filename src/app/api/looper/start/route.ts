import { NextRequest, NextResponse } from 'next/server'
import { encode } from 'html-entities'

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get('from')
  const reversed = req.nextUrl.searchParams.get('reversed')
  const quoteResponse = await fetch('https://api.quotable.io/quotes/random')
  const [{ content, author }] = await quoteResponse.json()
  const quote = encode(`"${content}" - ${author}`)
  const num = from?.replace(/[^\d]/g, '')
  const startNum = num !== '' ? parseInt(num ?? '1') : 1
  return new NextResponse(getHTML(startNum, quote, reversed), {
    headers: { 'content-type': 'text/html' },
  })
}

function getHTML(counter: number, quote: string, reversed?: unknown) {
  return `
  <script>
    setTimeout(() => {
      document.body.innerHTML = '<div id="root" style="width:100vw;height:100vh;display:grid;place-items:center;"><div>Current count: <span>${counter}</span></div><div style="display:flex;flex-direction:column;justify-content:center;align-items:center;"><div>Random Quote</div><div>${quote}</div></div><div>This is not a session</div><div>Check your Inspector and Network Monitor</div><span></span></div>'
      setTimeout(() => {
        fetch(location.origin + '/api/looper/start?from=${reversed ? counter - 1 : counter + 1}${
    reversed ? '&reversed=true' : ''
  }').then(r => r.text()).then(text => {
          document.head.innerHTML = ''
          const content = text.replace('<script>','').replace('<\\/script>','')
          const script = document.createElement('script')
          script.textContent = content
          document.querySelector("#root").lastElementChild.appendChild(script)
        })
      }, 1000)
    }, 1)
    </script>
    `
}
