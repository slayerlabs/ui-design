const { Button } = window.FabrykaDesignSystem_ec938d;
function Home({ setView }) {
  return <main style={{maxWidth:1440,margin:'auto',padding:'64px 24px'}}>
    <p className="f-label">Fabryka AI / niezależne laboratorium badawcze</p>
    <h1 style={{maxWidth:900,margin:'24px 0'}}>Budujemy modele.<br/>Potem je wykorzystujemy.</h1>
    <p style={{maxWidth:660,fontSize:19,lineHeight:1.7}}>Badamy małe modele językowe, wydajną inferencję oraz polskie dane i ewaluację.</p>
    <div style={{display:'flex',gap:16,flexWrap:'wrap',margin:'32px 0'}}><Button href="https://fabryka.ai/research">Zobacz badania</Button><Button href="https://fabryka.ai/doing" variant="secondary">Zobacz bieżącą pracę</Button></div>
    <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:24,marginTop:64}}>
      {[
        ['01','Małe modele','Trening, tokenizacja, mieszanki danych i destylacja.','https://fabryka.ai/research#slm'],
        ['02','Wydajna inferencja','Koszt, opóźnienie i jakość na opisanym sprzęcie.','https://fabryka.ai/research#sys'],
        ['03','Polskie dane i ewaluacja','DynaWord, benchmarki i powtarzalny pomiar.','https://fabryka.ai/research#data']
      ].map(([id,title,text,url])=><article key={id} style={{borderTop:'1px solid var(--rule)',paddingTop:24}}><p className="f-label">{id} / program badań</p><h2 style={{fontSize:38,margin:'16px 0'}}>{title}</h2><p style={{fontSize:16,lineHeight:1.6,marginBottom:20}}>{text}</p><a href={url}>Przeczytaj program ↗</a></article>)}
    </section>
    <p className="f-label" style={{marginTop:64}}>Przykład interfejsu. Aktualne wyniki i dostępność: fabryka.ai.</p>
  </main>;
}
Object.assign(window, {Home});
