/* Post-list — F1 archetype B (blog index, search results, archive).
   Date column + title + meta, hairline between rows, no cards. */

function PostList({ posts, onOpen }) {
  return (
    <ul className="post-list">
      {posts.map(p => (
        <li key={p.slug}>
          <span className="post-date">{p.date}</span>
          <div>
            <a
              href={'#' + p.slug}
              className="post-link"
              onClick={e => { e.preventDefault(); onOpen && onOpen(p); }}
            >
              {p.title}
            </a>
            <div className="post-meta">{p.tags.join(' · ')} · {p.readTime}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

window.PostList = PostList;
