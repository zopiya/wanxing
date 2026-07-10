/* App shell — header + active screen + footer.
   State machine: home | forms | journal | article. */

function App() {
  const [screen, setScreen] = React.useState('home');
  const [openPost, setOpenPost] = React.useState(null);

  function navigate(target) {
    if (target === 'article') {
      // shortcut — open the first journal post
      setOpenPost(POSTS[0]);
      setScreen('article');
    } else {
      setScreen(target);
      setOpenPost(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openArticle(post) {
    setOpenPost(post);
    setScreen('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const navScreen = screen === 'article' ? 'journal' : screen;

  return (
    <React.Fragment>
      <Header screen={navScreen} onNavigate={navigate} />
      <main id="main" data-screen-label={`F1 / ${screen}`}>
        {screen === 'home'    && <HomeScreen onCta={() => navigate('forms')} onNavigate={navigate} />}
        {screen === 'forms'   && <FormsScreen />}
        {screen === 'journal' && <JournalScreen onOpen={openArticle} />}
        {screen === 'article' && openPost &&
          <ArticleScreen post={openPost} onBack={() => navigate('journal')} />}
      </main>
      <Footer />
    </React.Fragment>
  );
}

window.App = App;
