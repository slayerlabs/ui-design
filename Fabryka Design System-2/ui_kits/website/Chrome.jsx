const { Wordmark } = window.FabrykaDesignSystem_ec938d;
function TopRail({ view, setView }) {
  return <header style={{background:'var(--paper)',borderBottom:'1px solid var(--rule)'}}><div style={{maxWidth:1440,margin:'auto',padding:'24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,flexWrap:'wrap'}}>
    <a href="https://fabryka.ai" style={{border:0}}><Wordmark size={32} /></a>
    <nav aria-label="Nawigacja" style={{display:'flex',gap:24,flexWrap:'wrap',fontFamily:'var(--font-text)',fontSize:16}}>
      <a href="https://fabryka.ai/research">Badania</a><a href="https://fabryka.ai/publications">Publikacje</a><a href="https://fabryka.ai/doing">Praca</a><a href="https://fabryka.ai/platform">Platforma API</a>
    </nav>
  </div></header>;
}
function PageFooter(){return <footer style={{borderTop:'1px solid var(--rule)',padding:24,maxWidth:1440,margin:'auto'}}><p>Fabryka AI · niezależne laboratorium badawcze · Warszawa</p><div style={{display:'flex',gap:24,flexWrap:'wrap',marginTop:20}}><a href="https://fabryka.ai/media">Materiały marki</a><a href="https://fabryka.ai/story">Historia</a><a href="https://fabryka.ai/docs">Dokumentacja API</a></div></footer>;}
Object.assign(window,{TopRail,PageFooter});
